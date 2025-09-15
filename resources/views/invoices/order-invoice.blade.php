<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Invoice - {{ $order->order_number }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12px;
            line-height: 1.5;
            color: #1f2937;
            background: #ffffff;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
        }
        
        /* Header Section */
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 25px;
        }
        
        .company-info {
            margin-bottom: 15px;
        }
        
        .company-name {
            font-size: 28px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .company-details {
            font-size: 13px;
            color: #6b7280;
            line-height: 1.6;
        }
        
        .invoice-title {
            font-size: 22px;
            font-weight: bold;
            margin: 15px 0;
            text-align: center;
            color: #1f2937;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
         
        .amount-value {
            font-size: 16px;
            font-weight: bold;
            color: #059669;
        }
        
        /* Status Badge */
        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .status-completed {
            background-color: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
        }
        
        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
            border: 1px solid #fde68a;
        }
        
        .status-processing {
            background-color: #dbeafe;
            color: #1e40af;
            border: 1px solid #93c5fd;
        }
        
        .status-cancelled {
            background-color: #fee2e2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
        
        .status-paid {
            background-color: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
        }
        
        .status-failed {
            background-color: #fee2e2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
        
     
        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 11px;
            color: #6b7280;
            border-top: 2px solid #e5e7eb;
            padding-top: 25px;
            line-height: 1.6;
        }
        
        .footer p {
            margin-bottom: 8px;
        }
        
        .footer .highlight {
            color: #2563eb;
            font-weight: bold;
        }
        
      
        
        /* Print Optimizations */
        @media print {
            body {
                font-size: 11px;
            }
            
            .container {
                padding: 20px;
            }
            
            .card {
                box-shadow: none;
                border: 1px solid #d1d5db;
            }
        }
        
        /* Responsive */
        @media screen and (max-width: 600px) {
            .main-content {
                flex-direction: column;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
            
            .invoice-header {
                flex-direction: column;
                gap: 15px;
            }
            
            .invoice-info, .order-info {
                text-align: left;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <table style="width: 100%; text-align: center;">
                <tr>
                    <td>
                      
                                
            <div class="company-info">
                <div class="company-name">{{ $company_name }}</div>
                <div class="company-details">
                    {{ $company_address }}<br>
                    📞 Phone: {{ $company_phone }} | 📧 Email: {{ $company_email }}
                </div>
            </div>
        </div>
        
        <!-- Invoice Title -->
        <div class="invoice-title">Order Invoice</div>
        
        <!-- Invoice Details -->
        <div class="invoice-details">
            <table class="invoice-table" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="width: 50%; padding: 10px; border: 1px solid #ddd;">
                        <table style="width: 100%;">
                            <tr>
                                <td style="padding: 5px;"><strong>Invoice Number:</strong></td>
                                <td style="padding: 5px;">{{ $order->order_number }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 5px;"><strong>Invoice Date:</strong></td>
                                <td style="padding: 5px;">{{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y H:i') }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 5px;"><strong>Order ID:</strong></td>
                                <td style="padding: 5px;">#{{ $order->id }}</td>
                            </tr>
                        </table>
                    </td>
                    <td style="width: 50%; padding: 10px; border: 1px solid #ddd;">
                        <table style="width: 100%;">
                            <tr>
                                <td style="padding: 5px;"><strong>Order Date:</strong></td>
                                <td style="padding: 5px;">{{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y H:i') }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 5px;"><strong>Order Status:</strong></td>
                                <td style="padding: 5px;">
                                    <span class="status-badge status-{{ strtolower($order->status) }}">
                                        {{ $order->status }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px;"><strong>Payment Status:</strong></td>
                                <td style="padding: 5px;">
                                    <span class="status-badge status-{{ strtolower($order->payment_status) }}">
                                        {{ $order->payment_status }}
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Main Content -->
        <div class="main-content">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="width: 60%; padding: 10px; vertical-align: top;">
                        <!-- Order Information -->
                        <table style="width: 100%; margin-bottom: 20px; border: 1px solid #ddd;">
                            <tr>
                                <td colspan="2" style="padding: 10px; background: #f8f9fa; font-weight: bold; border-bottom: 1px solid #ddd;">Order Information</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Order Number</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $order->order_number }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Order Date</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y H:i') }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Order Status</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">
                                    <span class="status-badge status-{{ strtolower($order->status) }}">
                                        {{ $order->status }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Payment Status</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">
                                    <span class="status-badge status-{{ strtolower($order->payment_status) }}">
                                        {{ $order->payment_status }}
                                    </span>
                                </td>
                            </tr>
                            @if($order->notes)
                            <tr>
                                <td style="padding: 8px;"><strong>Order Notes</strong></td>
                                <td style="padding: 8px; background: #f3f4f6; border-radius: 4px; font-size: 11px;">{{ $order->notes }}</td>
                            </tr>
                            @endif
                        </table>

                        <!-- Customer Information -->
                        <table style="width: 100%; margin-bottom: 20px; border: 1px solid #ddd;">
                            <tr>
                                <td colspan="2" style="padding: 10px; background: #f8f9fa; font-weight: bold; border-bottom: 1px solid #ddd;">Customer Information</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer Name</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $order->user->name }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer ID</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">#{{ $order->user->id }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $order->user->email }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px;"><strong>Phone</strong></td>
                                <td style="padding: 8px;">{{ $order->user->phone ?? 'N/A' }}</td>
                            </tr>
                        </table>

                        <!-- Product Details -->
                        <table style="width: 100%; margin-bottom: 20px; border: 1px solid #ddd;">
                            <tr>
                                <td colspan="5" style="padding: 10px; background: #f8f9fa; font-weight: bold; border-bottom: 1px solid #ddd;">Product Details</td>
                            </tr>
                            <tr style="background: #f8f9fa;">
                                <th style="padding: 8px; border-bottom: 1px solid #ddd;">Product Name</th>
                                <th style="padding: 8px; border-bottom: 1px solid #ddd;">Description</th>
                                <th style="padding: 8px; border-bottom: 1px solid #ddd;">Quantity</th>
                                <th style="padding: 8px; border-bottom: 1px solid #ddd;">Unit Price</th>
                                <th style="padding: 8px; border-bottom: 1px solid #ddd;">Total</th>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $order->product_name }}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $order->description ?? 'N/A' }}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $order->quantity }}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">${{ number_format($order->amount, 2) }}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;" class="amount-value">${{ number_format($order->total_amount, 2) }}</td>
                            </tr>
                        </table>

                        <!-- Payment History -->
                        @if($order->payments && $order->payments->count() > 0)
                        <table style="width: 100%; margin-bottom: 20px; border: 1px solid #ddd;">
                            <tr>
                                <td colspan="5" style="padding: 10px; background: #f8f9fa; font-weight: bold; border-bottom: 1px solid #ddd;">Payment History</td>
                            </tr>
                            <tr style="background: #f8f9fa;">
                                <th style="padding: 8px; border-bottom: 1px solid #ddd;">Payment Number</th>
                                <th style="padding: 8px; border-bottom: 1px solid #ddd;">Amount</th>
                                <th style="padding: 8px; border-bottom: 1px solid #ddd;">Method</th>
                                <th style="padding: 8px; border-bottom: 1px solid #ddd;">Date</th>
                                <th style="padding: 8px; border-bottom: 1px solid #ddd;">Status</th>
                            </tr>
                            @foreach($order->payments as $payment)
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $payment->payment_number }}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">${{ number_format($payment->amount, 2) }}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $payment->payment_method }}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ \Carbon\Carbon::parse($payment->payment_date)->format('d/m/Y') }}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">
                                    <span class="status-badge status-{{ strtolower($payment->status) }}">
                                        {{ $payment->status }}
                                    </span>
                                </td>
                            </tr>
                            @endforeach
                        </table>
                        @endif
                    </td>

                    <td style="width: 40%; padding: 10px; vertical-align: top;">
                        <!-- Order Summary -->
                        <table style="width: 100%; border: 1px solid #ddd; background: #f8f9fa;">
                            <tr>
                                <td colspan="2" style="padding: 10px; font-weight: bold; border-bottom: 1px solid #ddd;">Order Summary</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Unit Price</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${{ number_format($order->amount, 2) }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Quantity</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">{{ $order->quantity }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Subtotal</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${{ number_format($order->amount * $order->quantity, 2) }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Total Amount</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;" class="amount-value">${{ number_format($order->total_amount, 2) }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Order Status</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">
                                    <span class="status-badge status-{{ strtolower($order->status) }}">
                                        {{ $order->status }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px;"><strong>Payment Status</strong></td>
                                <td style="padding: 8px; text-align: right;">
                                    <span class="status-badge status-{{ strtolower($order->payment_status) }}">
                                        {{ $order->payment_status }}
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p><span class="highlight">Thank you for your order!</span></p>
            <p>This is a computer generated invoice. No signature required.</p>
            <p>Generated on: {{ now()->format('d/m/Y H:i:s') }}</p>
            <p style="margin-top: 15px; font-size: 10px; color: #9ca3af;">
                For any queries, please contact us at {{ $company_email }} or call {{ $company_phone }}
            </p>
        </div>
    </div>
</body>
</html>
