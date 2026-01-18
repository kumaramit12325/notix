<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use App\Models\UserPayment;

class PhonePeController extends Controller
{
    public function pay(Request $request)
    {
        $data = [
            'merchantId' => env('PHONEPE_MERCHANT_ID'),
            'merchantTransactionId' => Str::random(10),
            'merchantUserId' => auth()->id(),
            'amount' => $request->amount * 100,
            'redirectUrl' => route('phonepe.callback'),
            'redirectMode' => 'POST',
            'callbackUrl' => route('phonepe.callback'),
            'mobileNumber' => '9999999999',
            'paymentInstrument' => [
                'type' => 'PAY_PAGE',
            ],
        ];

        $encode = base64_encode(json_encode($data));
        $saltKey = env('PHONEPE_SALT_KEY');
        $saltIndex = env('PHONEPE_SALT_INDEX');

        $string = $encode . '/pg/v1/pay' . $saltKey;
        $sha256 = hash('sha256', $string);
        $finalXHeader = $sha256 . '###' . $saltIndex;

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-VERIFY' => $finalXHeader,
        ])->post('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', [
            'request' => $encode,
        ]);

        $rData = json_decode($response->body());

        return redirect()->to($rData->data->instrumentResponse->redirectInfo->url);
    }

    public function callback(Request $request)
    {
        $input = $request->all();
        $saltKey = env('PHONEPE_SALT_KEY');
        $saltIndex = env('PHONEPE_SALT_INDEX');

        $finalXHeader = hash('sha256', '/pg/v1/status/' . $input['merchantId'] . '/' . $input['transactionId'] . $saltKey) . '###' . $saltIndex;

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-VERIFY' => $finalXHeader,
            'X-MERCHANT-ID' => $input['merchantId'],
        ])->get('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/' . $input['merchantId'] . '/' . $input['transactionId']);

        $rData = json_decode($response->body());

        if ($rData->success === true) {
            UserPayment::create([
                'user_id' => $rData->data->merchantUserId,
                'payment_number' => UserPayment::generatePaymentNumber(),
                'amount' => $rData->data->amount / 100,
                'payment_method' => 'PhonePe',
                'status' => 'Completed',
                'transaction_id' => $rData->data->transactionId,
                'gateway_response' => json_encode($rData),
            ]);

            return redirect()->route('user.dashboard')->with('success', 'Payment successful!');
        } else {
            return redirect()->route('user.dashboard')->with('error', 'Payment failed!');
        }
    }
}
