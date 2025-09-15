<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Invoice - {{ $payment->payment_number }}</title>
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
            margin: 25px 0;
            text-align: center;
            color: #1f2937;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .main-content {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
        }
         
        
        .amount-value {
            font-size: 16px;
            font-weight: bold;
            color: #059669;
        }
        
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
        
        .status-failed {
            background-color: #fee2e2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
        
        .status-refunded {
            background-color: #fed7aa;
            color: #c2410c;
            border: 1px solid #fdba74;
        }
        
        .invoice-details {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
        }
        
        .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
        }
        
        .invoice-info, .payment-info {
            flex: 1;
        }
        
        .invoice-info {
            text-align: left;
        }
        
        .payment-info {
            text-align: right;
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
        
        .page-break {
            page-break-before: always;
        }
        
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
            
            .invoice-info, .payment-info {
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
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Invoice Title -->
        <div class="invoice-title">Payment Invoice</div>
        
        <!-- Invoice Details -->
        <div class="invoice-details">
            <table class="invoice-table" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="width: 50%; padding: 10px; border: 1px solid #ddd;">
                        <table style="width: 100%;">
                            <tr>
                                <td style="padding: 5px;"><strong>Invoice Number:</strong></td>
                                <td style="padding: 5px;">{{ $invoice_number }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 5px;"><strong>Invoice Date:</strong></td>
                                <td style="padding: 5px;">{{ $invoice_date }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 5px;"><strong>Payment Number:</strong></td>
                                <td style="padding: 5px;">{{ $payment->payment_number }}</td>
                            </tr>
                        </table>
                    </td>
                    <td style="width: 50%; padding: 10px; border: 1px solid #ddd;">
                        <table style="width: 100%;">
                            <tr>
                                <td style="padding: 5px;"><strong>Payment Date:</strong></td>
                                <td style="padding: 5px;">{{ \Carbon\Carbon::parse($payment->payment_date)->format('d/m/Y H:i') }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 5px;"><strong>Status:</strong></td>
                                <td style="padding: 5px;">
                                    <span class="status-badge status-{{ strtolower($payment->status) }}">
                                        {{ $payment->status }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px;"><strong>Amount:</strong></td>
                                <td style="padding: 5px;" class="amount-value">${{ number_format($payment->amount, 2) }}</td>
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
                        <!-- Payment Information -->
                        <table style="width: 100%; margin-bottom: 15px; border: 1px solid #ddd;">
                            <tr>
                                <td colspan="2" style="padding: 10px; background: #f8f9fa; font-weight: bold; border-bottom: 1px solid #ddd;">Payment Information</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Payment Number</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $payment->payment_number }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Amount</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;" class="amount-value">${{ number_format($payment->amount, 2) }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Payment Method</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">
                                    @if($payment->payment_method == 'Credit Card' || $payment->payment_method == 'Debit Card')
                                        💳
                                    @elseif($payment->payment_method == 'Cash')
                                        💵
                                    @elseif($payment->payment_method == 'Wallet')
                                        📱
                                    @elseif($payment->payment_method == 'UPI')
                                        📲
                                    @elseif($payment->payment_method == 'Net Banking')
                                        🏦
                                    @else
                                        💰
                                    @endif
                                    {{ $payment->payment_method }}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Status</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">
                                    <span class="status-badge status-{{ strtolower($payment->status) }}">{{ $payment->status }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Transaction ID</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $payment->transaction_id ?? 'N/A' }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Payment Date</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ \Carbon\Carbon::parse($payment->payment_date)->format('d/m/Y H:i') }}</td>
                            </tr>
                            @if($payment->gateway_response)
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Gateway Response</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee; background: #f3f4f6; font-size: 11px;">{{ $payment->gateway_response }}</td>
                            </tr>
                            @endif
                            @if($payment->notes)
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Notes</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee; background: #f3f4f6; font-size: 11px;">{{ $payment->notes }}</td>
                            </tr>
                            @endif
                        </table>

                        <!-- Customer Information -->
                        <table style="width: 100%; margin-bottom: 15px; border: 1px solid #ddd;">
                            <tr>
                                <td colspan="2" style="padding: 10px; background: #f8f9fa; font-weight: bold; border-bottom: 1px solid #ddd;">Customer Information</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer Name</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $payment->user->name }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer ID</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">#{{ $payment->user->id }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $payment->user->email }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $payment->user->phone ?? 'N/A' }}</td>
                            </tr>
                        </table>

                        <!-- Related Order Information -->
                        @if($payment->order)
                        <table style="width: 100%; border: 1px solid #ddd;">
                            <tr>
                                <td colspan="2" style="padding: 10px; background: #f8f9fa; font-weight: bold; border-bottom: 1px solid #ddd;">Related Order Information</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Order Number</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $payment->order->order_number }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Product Name</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $payment->order->product_name }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Order Amount</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">${{ number_format($payment->order->total_amount, 2) }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Order ID</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">#{{ $payment->order->id }}</td>
                            </tr>
                        </table>
                        @endif
                    </td>

                    <td style="width: 40%; padding: 10px; vertical-align: top;">
                        <!-- Payment Summary -->
                        <table style="width: 100%; border: 1px solid #ddd; background: #f8f9fa;">
                            <tr>
                                <td colspan="2" style="padding: 10px; font-weight: bold; border-bottom: 1px solid #ddd;">Payment Summary</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Payment Amount</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;" class="amount-value">${{ number_format($payment->amount, 2) }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Status</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">
                                    <span class="status-badge status-{{ strtolower($payment->status) }}">{{ $payment->status }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Method</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ $payment->payment_method }}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date</strong></td>
                                <td style="padding: 8px; border-bottom: 1px solid #eee;">{{ \Carbon\Carbon::parse($payment->payment_date)->format('d/m/Y') }}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p><span class="highlight">Thank you for your payment!</span></p>
            <p>This is a computer generated invoice. No signature required.</p>
            <p>Generated on: {{ now()->format('d/m/Y H:i:s') }}</p>
            <p style="margin-top: 15px; font-size: 10px; color: #9ca3af;">
                For any queries, please contact us at {{ $company_email }} or call {{ $company_phone }}
            </p>
        </div>
    </div>
</body>
</html>