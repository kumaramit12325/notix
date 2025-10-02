<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminUserSiteController;
use App\Http\Controllers\Backend\LPLinkController;  
use App\Http\Controllers\Backend\CampaignController;
use App\Http\Controllers\Backend\AutomationController;
use App\Http\Controllers\Backend\WelcomePushController;
use App\Http\Controllers\Backend\YouTubePushController;
use App\Http\Controllers\Backend\SegmentationController;
use App\Http\Controllers\YouTubeController;
use App\Http\Controllers\Admin\YouTubeController as AdminYouTubeController;

///
use App\Http\Controllers\User\appdashboard\DashboardController;
use App\Http\Controllers\User\appdashboard\EngagementController;
use App\Http\Controllers\User\appdashboard\AutoresponderController;
use App\Http\Controllers\User\appdashboard\TemplateController;
use App\Http\Controllers\User\appdashboard\SubscriberController;
use App\Http\Controllers\User\appdashboard\SegmentController;
use App\Http\Controllers\User\appdashboard\AudienceController;
use App\Http\Controllers\User\appdashboard\AttributeController;
use App\Http\Controllers\User\appdashboard\AnalytiOverviewController;
use App\Http\Controllers\User\appdashboard\AnalytiSubscriptionController;


use App\Http\Controllers\Backend\DomainController as BackendDomainController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\User\ProfileController as UserProfileController;
use App\Http\Controllers\UserPaymentController;
use App\Http\Controllers\User\UserSiteController;
use App\Http\Controllers\User\SiteVerificationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/features', function () {
    return Inertia::render('features');
})->name('features');

Route::get('/pricing', function () {
    return Inertia::render('Pricing');
})->name('pricing');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/buynow', function () {
    return Inertia::render('Buynow');
})->name('buynow');

// Test route for navigation (temporary)
Route::get('/test-nav', function() {
    return Inertia::render('welcome');
})->name('test.nav');

// Admin routes - only for admin users
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('dashboard', function () {
        $stats = [
            'total_users' => (int) \App\Models\User::count(),
            'total_orders' => (int) \App\Models\Order::count(),
            'total_payments' => (int) \App\Models\UserPayment::count(),
            'total_revenue' => (float) \App\Models\Order::where('payment_status', 'Paid')->sum('total_amount'),
            'pending_orders' => (int) \App\Models\Order::where('status', 'Pending')->count(),
            'completed_orders' => (int) \App\Models\Order::where('status', 'Completed')->count(),
            'completed_payments' => (int) \App\Models\UserPayment::where('status', 'Completed')->count(),
            'total_collected' => (float) \App\Models\UserPayment::where('status', 'Completed')->sum('amount'),
        ];
        
        return Inertia::render('dashboard', compact('stats'));
    })->name('dashboard');
    
    // Users routes
    Route::resource('users', UserController::class);
    
    // Orders routes
    Route::resource('orders', OrderController::class);
    Route::get('orders/user/{userId}', [OrderController::class, 'userOrders'])->name('orders.user');
    Route::get('orders/statistics', [OrderController::class, 'statistics'])->name('orders.statistics');
    Route::get('orders/{id}/invoice', [OrderController::class, 'downloadInvoice'])->name('orders.invoice'); 
    
    // Payments routes
    Route::resource('payments', UserPaymentController::class);
    Route::get('payments/user/{userId}', [UserPaymentController::class, 'userPayments'])->name('payments.user');
    Route::get('payments/statistics', [UserPaymentController::class, 'statistics'])->name('payments.statistics');
    Route::get('payments/{id}/invoice', [UserPaymentController::class, 'downloadInvoice'])->name('payments.invoice');
    
    // Test route for PDF generation
    Route::get('test-pdf', function() {
        try {
            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadHTML('<h1>Test PDF</h1><p>This is a test PDF to verify DomPDF is working.</p>');
            return $pdf->stream('test.pdf');
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    })->name('test.pdf');
    
    // Domains routes
    Route::get('domains/modify', [BackendDomainController::class, 'index'])->name('domains.modify');
    Route::get('domains/create', [BackendDomainController::class, 'create'])->name('domains.create');
    Route::post('domains', [BackendDomainController::class, 'store'])->name('domains.store');
    Route::get('domains/{id}', [BackendDomainController::class, 'show'])->name('domains.show');
    Route::get('domains/{id}/edit', [BackendDomainController::class, 'edit'])->name('domains.edit');
    Route::put('domains/{id}', [BackendDomainController::class, 'update'])->name('domains.update');
    Route::delete('domains/{id}', [BackendDomainController::class, 'destroy'])->name('domains.destroy');
    Route::post('domains/{id}/copy', [BackendDomainController::class, 'copy'])->name('domains.copy');
    Route::post('domains/{id}/pause', [BackendDomainController::class, 'pause'])->name('domains.pause');
    Route::post('domains/{id}/broadcast', [BackendDomainController::class, 'broadcast'])->name('domains.broadcast');
    Route::post('domains/{id}/refresh', [BackendDomainController::class, 'refresh'])->name('domains.refresh');

    Route::get('domains/integration', [BackendDomainController::class, 'index'])->name('domains.integration');
    Route::get('domains/import-export', [BackendDomainController::class, 'index'])->name('domains.import-export');
    
    // Admin YouTube routes - MUST come before regular YouTube routes
    Route::resource('admin/youtube', AdminYouTubeController::class)->names([
        'index' => 'admin.youtube.index',
        'create' => 'admin.youtube.create',
        'store' => 'admin.youtube.store',
        'show' => 'admin.youtube.show',
        'edit' => 'admin.youtube.edit',
        'update' => 'admin.youtube.update',
        'destroy' => 'admin.youtube.destroy',
    ]);
    Route::post('admin/youtube/bulk-delete', [AdminYouTubeController::class, 'bulkDelete'])->name('admin.youtube.bulk-delete');
    Route::post('admin/youtube/bulk-update-status', [AdminYouTubeController::class, 'bulkUpdateStatus'])->name('admin.youtube.bulk-update-status');
    Route::post('admin/youtube/{youtube}/toggle-status', [AdminYouTubeController::class, 'toggleStatus'])->name('admin.youtube.toggle-status');
    
    // YouTube routes
    Route::resource('youtube', YouTubeController::class);
    Route::post('youtube/{youtube}/toggle-status', [YouTubeController::class, 'toggleStatus'])->name('youtube.toggle-status');

    // LP Links routes
    Route::resource('lplinks', LPLinkController::class);
    
    // Campaigns routes
    Route::resource('campaigns', CampaignController::class);
    
    
    // automation routes
    Route::resource('automation', AutomationController::class);
    
    // Welcome Push routes
    Route::resource('welcomepush', WelcomePushController::class);
    
    // YouTube Push routes
    Route::resource('youtubpush', YouTubePushController::class);
    
    // Segmentation routes
    Route::resource('segmentation', SegmentationController::class);
    Route::post('segmentation/bulk-delete', [SegmentationController::class, 'bulkDelete'])->name('segmentation.bulk-delete');
    
    // User Sites routes (Admin)
    Route::resource('admin/user-sites', AdminUserSiteController::class)->names([
        'index' => 'admin.user-sites.index',
        'create' => 'admin.user-sites.create',
        'store' => 'admin.user-sites.store',
        'show' => 'admin.user-sites.show',
        'edit' => 'admin.user-sites.edit',
        'update' => 'admin.user-sites.update',
        'destroy' => 'admin.user-sites.destroy',
    ]);
    Route::post('admin/user-sites/bulk-delete', [AdminUserSiteController::class, 'bulkDelete'])->name('admin.user-sites.bulk-delete');
    Route::post('admin/user-sites/bulk-update-status', [AdminUserSiteController::class, 'bulkUpdateStatus'])->name('admin.user-sites.bulk-update-status');
    Route::get('admin/user-sites/statistics', [AdminUserSiteController::class, 'statistics'])->name('admin.user-sites.statistics');
    
    Route::get('statistics', function() {
        return Inertia::render('statistics/index');
    })->name('statistics');

    Route::get('serverStates', function() {
        return Inertia::render('serverStates/index');
    })->name('serverStates');


    // Test page route
    Route::get('test-pdf-page', function() {
        return Inertia::render('test-pdf');
    })->name('test.pdf.page');
});

// User routes - for regular users
Route::middleware(['auth', 'verified', 'user'])->group(function () {
    Route::get('user-dashboard', function () {
        try {
            $user = Auth::user();
            $sites = $user->sites()->latest()->get();
            
            \Log::info('User dashboard loaded:', [
                'user_id' => $user->id,
                'sites_count' => $sites->count(),
                'sites' => $sites->toArray()
            ]);
            
            return Inertia::render('user/Dashboard', [
                'sites' => $sites
            ]);
        } catch (\Exception $e) {
            \Log::error('User dashboard error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return Inertia::render('user/Dashboard', [
                'sites' => [],
                'error' => $e->getMessage()
            ]);
        }
    })->name('user.dashboard');
    
    // User sites routes
    Route::resource('user-sites', UserSiteController::class);
    Route::post('user-sites/{site}/toggle-connection', [UserSiteController::class, 'toggleConnection'])->name('user-sites.toggle-connection');
    Route::post('user-sites/{site}/verify', [SiteVerificationController::class, 'verify'])->name('user-sites.verify');
    Route::post('user-sites/upload-image', [UserSiteController::class, 'uploadImage'])->name('user-sites.upload-image');
    
    // User YouTube routes - users can manage their own channels
    Route::get('user/youtube', [YouTubeController::class, 'userIndex'])->name('user.youtube.index');
    Route::get('user/youtube/create', [YouTubeController::class, 'userCreate'])->name('user.youtube.create');
    Route::post('user/youtube', [YouTubeController::class, 'userStore'])->name('user.youtube.store');
    Route::get('user/youtube/{youtube}', [YouTubeController::class, 'userShow'])->name('user.youtube.show');
    Route::get('user/youtube/{youtube}/edit', [YouTubeController::class, 'userEdit'])->name('user.youtube.edit');
    Route::patch('user/youtube/{youtube}', [YouTubeController::class, 'userUpdate'])->name('user.youtube.update');
    Route::delete('user/youtube/{youtube}', [YouTubeController::class, 'userDestroy'])->name('user.youtube.destroy');
    Route::post('user/youtube/{youtube}/toggle-status', [YouTubeController::class, 'userToggleStatus'])->name('user.youtube.toggle-status');
    
    // User Profile
    Route::get('user/profile', function () {
        return Inertia::render('user/profile');
    })->name('user.profile');
    Route::patch('user/profile', [UserProfileController::class, 'update'])->name('user.profile.update');
    
    // User packages
    Route::get('user/packages', function () {
        return Inertia::render('user/packages');
    })->name('user.packages');

    // User affiliate
    Route::get('user/affiliate', function () {
        return Inertia::render('user/Affiliate');
    })->name('user.affiliate');
    // User billing
    Route::get('user/billing', function () {
        return Inertia::render('user/billing');
    })->name('user.billing');
    // User billing
    Route::get('user/subscription', function () {
        return Inertia::render('user/subscription');
    })->name('user.subscription');
    // User billing
    Route::get('user/support', function () {
        return Inertia::render('user/support');
    })->name('user.support');

 
    /////////app dashboard me route 

    
    
    // User Settings
    Route::get('user/settings', function () {
        return Inertia::render('user/settings');
    })->name('user.settings');

    //user app deshboard me setting

    Route::get('appdashboard/defaults', function () {
        return Inertia::render('appdashboard/setting/defaults');
    })->name('appdashboard/defaults');
    

    //user app deshboard me setting

    Route::get('appdashboard/site-config', function () {
        return Inertia::render('appdashboard/setting/site-config');
    })->name('appdashboard/site-config');
    
    Route::get('appdashboard/setup', function () {
        return Inertia::render('appdashboard/setting/setup');
    })->name('appdashboard/setup');

    
    
    
    // User can view their own orders and payments
    Route::get('my-orders', [OrderController::class, 'userOrders'])->name('my.orders');
    Route::get('my-payments', [UserPaymentController::class, 'userPayments'])->name('my.payments');
    ////////// app dashboard route
    Route::get('appdashboard/dashboard', [DashboardController::class, 'index'])->name('appdashboard.dashboard');
    // Segmentation routes
    Route::resource('appdashboard/engagements', EngagementController::class); // includes POST /appdashboard/engagements for store
    Route::resource('appdashboard/autoresponder', AutoresponderController::class);
    Route::resource('appdashboard/template', TemplateController::class);
    Route::get('appdashboard/subscriber', [SubscriberController::class, 'index'])->name('appdashboard.subscriber');
    Route::get('appdashboard/segment', [SegmentController::class, 'index'])->name('appdashboard.segment');
    Route::resource('appdashboard/audience', AudienceController::class);
    Route::resource('appdashboard/attribute', AttributeController::class);
    Route::resource('appdashboard/overview', AnalytiOverviewController::class);
    Route::resource('appdashboard/subscription', AnalytiSubscriptionController::class);

    // Push notification subscription routes
    Route::post('push-subscriptions/subscribe', [\App\Http\Controllers\PushSubscriptionController::class, 'subscribe'])->name('push.subscribe');
    Route::post('push-subscriptions/unsubscribe', [\App\Http\Controllers\PushSubscriptionController::class, 'unsubscribe'])->name('push.unsubscribe');
    Route::get('push-subscriptions/vapid-public-key', [\App\Http\Controllers\PushSubscriptionController::class, 'getPublicKey'])->name('push.vapid-key');

});

// Agent routes - for agent users
Route::middleware(['auth', 'verified', 'agent'])->group(function () {
    Route::get('agent-dashboard', function () {
        return Inertia::render('agent-dashboard');
    })->name('agent.dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
