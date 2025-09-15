<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Order::with('user');
        
        // Search functionality
        if (request('search')) {
            $search = request('search');
            $query->where(function($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhere('product_name', 'like', "%{$search}%")
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
        
        // Payment status filter
        if (request('payment_status')) {
            $query->where('payment_status', request('payment_status'));
        }
        
        // Get per_page parameter, default to 10
        $perPage = request('per_page', 10);
        
        $orders = $query->latest()->paginate($perPage);
        
        return inertia('orders/index', compact('orders'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        return Inertia::render('orders/create', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'notes' => 'nullable|string',
        ]);

        $order = new Order($request->all());
        $order->order_number = Order::generateOrderNumber();
        $order->calculateTotalAmount();
        $order->save();

        return redirect()->route('orders.show', $order->id)->with('success', 'Order created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with(['user', 'payments'])->findOrFail($id);
        return Inertia::render('orders/show', compact('order'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $order = Order::with('user')->findOrFail($id);
        $users = User::all();
        return Inertia::render('orders/edit', compact('order', 'users'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'status' => 'required|in:Pending,Processing,Completed,Cancelled',
            'payment_status' => 'required|in:Pending,Paid,Failed',
            'notes' => 'nullable|string',
        ]);

        $order = Order::findOrFail($id);
        $order->update($request->all());
        $order->calculateTotalAmount();
        $order->save();

        return redirect()->route('orders.show', $order->id)->with('success', 'Order updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return redirect()->route('orders.index')->with('success', 'Order deleted successfully');
    }

    /**
     * Get orders for a specific user
     */
    public function userOrders(string $userId): JsonResponse
    {
        $user = User::findOrFail($userId);
        $orders = $user->orders()->with('payments')->latest()->get();

        return response()->json([
            'user' => $user,
            'orders' => $orders,
            'total_orders' => $user->getTotalOrders(),
            'completed_orders' => $user->getCompletedOrders(),
            'total_spent' => $user->getTotalSpent(),
        ]);
    }

    /**
     * Get order statistics
     */
    public function statistics(): JsonResponse
    {
        $stats = [
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'Pending')->count(),
            'completed_orders' => Order::where('status', 'Completed')->count(),
            'total_revenue' => Order::where('payment_status', 'Paid')->sum('total_amount'),
            'pending_payments' => Order::where('payment_status', 'Pending')->sum('total_amount'),
        ];

        return response()->json($stats);
    }

    public function downloadInvoice($id)
    {
        $order = Order::with(['user', 'payments'])->findOrFail($id);
        
        $data = [
            'order' => $order,
            'company_name' => 'Your Company Name',
            'company_address' => 'Your Company Address',
            'company_phone' => '+91 1234567890',
            'company_email' => 'info@yourcompany.com',
        ];

        try {
            $pdf = Pdf::loadView('invoices.order-invoice', $data)
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
                'Content-Disposition' => 'attachment; filename="invoice-' . $order->order_number . '.pdf"',
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
