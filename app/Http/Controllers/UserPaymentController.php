<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\UserPayment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class UserPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = UserPayment::with(['user', 'order']);
        
        // Search functionality
        if (request('search')) {
            $search = request('search');
            $query->where(function($q) use ($search) {
                $q->where('payment_number', 'like', "%{$search}%")
                  ->orWhere('transaction_id', 'like', "%{$search}%")
                  ->orWhereHas('user', function($userQuery) use ($search) {
                      $userQuery->where('name', 'like', "%{$search}%")
                               ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }
        
        // Status filter
        if (request('status')) {
            $query->where('status', request('status'));
        }
        
        // Payment method filter
        if (request('payment_method')) {
            $query->where('payment_method', request('payment_method'));
        }
        
        // Get per_page parameter, default to 10
        $perPage = request('per_page', 10);
        
        $payments = $query->latest()->paginate($perPage);
        
        return inertia('payments/index', compact('payments'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        $orders = Order::where('payment_status', '!=', 'Paid')->get();
        return Inertia::render('payments/create', compact('users', 'orders'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'order_id' => 'nullable|exists:orders,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:Cash,Credit Card,Debit Card,UPI,Net Banking,Wallet',
            'status' => 'required|in:Pending,Completed,Failed,Refunded',
            'transaction_id' => 'nullable|string|max:255',
            'gateway_response' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $payment = new UserPayment($request->all());
        $payment->payment_number = UserPayment::generatePaymentNumber();
        $payment->save();

        // Update order payment status if payment is completed
        if ($payment->order_id && $payment->status === 'Completed') {
            $order = Order::find($payment->order_id);
            if ($order) {
                $order->update(['payment_status' => 'Paid']);
            }
        }

        return redirect()->route('payments.show', $payment->id)->with('success', 'Payment created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $payment = UserPayment::with(['user', 'order'])->findOrFail($id);
        return Inertia::render('payments/show', compact('payment'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $payment = UserPayment::with(['user', 'order'])->findOrFail($id);
        $users = User::all();
        $orders = Order::all();
        return Inertia::render('payments/edit', compact('payment', 'users', 'orders'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'order_id' => 'nullable|exists:orders,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:Cash,Credit Card,Debit Card,UPI,Net Banking,Wallet',
            'status' => 'required|in:Pending,Completed,Failed,Refunded',
            'transaction_id' => 'nullable|string|max:255',
            'gateway_response' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $payment = UserPayment::findOrFail($id);
        $payment->update($request->all());

        // Update order payment status based on payment status
        if ($payment->order_id) {
            $order = Order::find($payment->order_id);
            if ($order) {
                if ($payment->status === 'Completed') {
                    $order->update(['payment_status' => 'Paid']);
                } elseif ($payment->status === 'Failed') {
                    $order->update(['payment_status' => 'Failed']);
                }
            }
        }

        return redirect()->route('payments.show', $payment->id)->with('success', 'Payment updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $payment = UserPayment::findOrFail($id);
        $payment->delete();

        return redirect()->route('payments.index')->with('success', 'Payment deleted successfully');
    }

    /**
     * Get payments for a specific user
     */
    public function userPayments(string $userId): JsonResponse
    {
        $user = User::findOrFail($userId);
        $payments = $user->payments()->with('order')->latest()->get();

        return response()->json([
            'user' => $user,
            'payments' => $payments,
            'total_payments' => $user->payments()->count(),
            'completed_payments' => $user->payments()->where('status', 'Completed')->count(),
            'total_amount_paid' => $user->payments()->where('status', 'Completed')->sum('amount'),
        ]);
    }

    /**
     * Get payment statistics
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total_payments' => UserPayment::count(),
            'completed_payments' => UserPayment::where('status', 'Completed')->count(),
            'pending_payments' => UserPayment::where('status', 'Pending')->count(),
            'failed_payments' => UserPayment::where('status', 'Failed')->count(),
            'total_amount_collected' => UserPayment::where('status', 'Completed')->sum('amount'),
            'pending_amount' => UserPayment::where('status', 'Pending')->sum('amount'),
        ];

        return response()->json($stats);
    }

    /**
     * Download invoice for a specific payment
     */
    public function downloadInvoice($id)
    {
        $payment = UserPayment::with(['user', 'order'])->findOrFail($id);
        
        $data = [
            'payment' => $payment,
            'company_name' => 'Your Company Name',
            'company_address' => 'Your Company Address',
            'company_phone' => '+91 1234567890',
            'company_email' => 'info@yourcompany.com',
            'invoice_date' => now()->format('d/m/Y'),
            'invoice_number' => 'INV-' . $payment->payment_number,
        ];
       
        
        try {
            $pdf = Pdf::loadView('invoices.payment-invoice', $data)
                ->setPaper('a4', 'portrait')
                ->setWarnings(false)
                 ->setOptions([
                    'isHtml5ParserEnabled' => true,
                    'isRemoteEnabled' => true,
                    'defaultFont' => 'Times New Roman',
                    'chroot' => public_path(),
                    'enable_remote' => true,
                    'debugCss' => false,
                    'defaultMediaType' => 'screen',
                    'isFontSubsettingEnabled' => true,
                    'isPhpEnabled' => false,
                    'isJavascriptEnabled' => false,
                    'isLocalFileAccessEnabled' => true,
                ]);
            
            // Generate the PDF content once
            $pdfContent = $pdf->output();
            
            return response($pdfContent, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="invoice-' . $payment->payment_number . '.pdf"',
                'Content-Length' => strlen($pdfContent),
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0'
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'PDF generation failed: ' . $e->getMessage()], 500);
        }
    }


 
}
