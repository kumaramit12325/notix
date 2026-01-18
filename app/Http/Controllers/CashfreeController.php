<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use LoveyCom\CashFree\PaymentGateway\Order;
use App\Models\UserPayment;

class CashfreeController extends Controller
{
    public function pay(Request $request)
    {
        $order = new Order();
        $od["orderId"] = "CF-" . rand(1000, 9999);
        $od["orderAmount"] = $request->amount;
        $od["orderNote"] = "LaraPush Subscription";
        $od["customerPhone"] = "9999999999";
        $od["customerName"] = auth()->user()->name;
        $od["customerEmail"] = auth()->user()->email;
        $od["returnUrl"] = route('cashfree.callback');
        $od["notifyUrl"] = route('cashfree.callback');

        $order->create($od);
        $link = $order->getLink($od['orderId']);

        return redirect()->to($link->paymentLink);
    }

    public function callback(Request $request)
    {
        $order = new Order();
        $payment = $order->getDetails($request->orderId);

        if ($payment->txStatus === 'SUCCESS') {
            UserPayment::create([
                'user_id' => auth()->id(),
                'payment_number' => UserPayment::generatePaymentNumber(),
                'amount' => $payment->orderAmount,
                'payment_method' => 'Cashfree',
                'status' => 'Completed',
                'transaction_id' => $payment->referenceId,
                'gateway_response' => json_encode($payment),
            ]);

            return redirect()->route('user.dashboard')->with('success', 'Payment successful!');
        } else {
            return redirect()->route('user.dashboard')->with('error', 'Payment failed!');
        }
    }
}
