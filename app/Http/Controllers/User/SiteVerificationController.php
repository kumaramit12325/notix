<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\UserSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class SiteVerificationController extends Controller
{
    /**
     * Verify if the Alertwise script is installed on the site
     */
    public function verify(Request $request, UserSite $site)
    {
        // Ensure user owns this site
        if ($site->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        try {
            // Fetch the site's homepage
            $response = Http::timeout(10)->get($site->site_url);

            if (!$response->successful()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unable to access the website. Please check if the URL is correct.',
                    'details' => 'HTTP Status: ' . $response->status()
                ]);
            }

            $html = $response->body();
            $appId = $site->id . '-' . preg_replace('/[^a-z0-9]/', '', strtolower($site->site_name));
            $alertwiseUrl = config('app.url');

            // Check if alertwise.js script is present
            $hasScript = str_contains($html, '/js/alertwise.js') || 
                        str_contains($html, 'alertwise.js');

            // Check if app ID is present
            $hasAppId = str_contains($html, $appId);

            // Check if initialization code is present
            $hasInit = str_contains($html, 'alertwise.push') && 
                      str_contains($html, "'init'");

            // Check if API URL is configured
            $hasApiUrl = str_contains($html, 'apiUrl');

            $isInstalled = $hasScript && $hasAppId && $hasInit && $hasApiUrl;

            if ($isInstalled) {
                // Mark site as connected
                $site->update(['is_connected' => true]);

                return response()->json([
                    'success' => true,
                    'message' => 'Installation verified successfully! Your site is connected.',
                    'details' => [
                        'script_loaded' => $hasScript,
                        'app_id_found' => $hasAppId,
                        'initialized' => $hasInit,
                        'api_configured' => $hasApiUrl,
                    ]
                ]);
            } else {
                $issues = [];
                if (!$hasScript) {
                    $issues[] = 'Alertwise script not found in the HTML';
                }
                if (!$hasAppId) {
                    $issues[] = 'App ID not configured correctly';
                }
                if (!$hasInit) {
                    $issues[] = 'Alertwise initialization code not found';
                }
                if (!$hasApiUrl) {
                    $issues[] = 'API URL (apiUrl) not configured in the initialization code';
                }

                return response()->json([
                    'success' => false,
                    'message' => 'Installation not detected. Please ensure you have copied the code correctly.',
                    'details' => [
                        'script_loaded' => $hasScript,
                        'app_id_found' => $hasAppId,
                        'initialized' => $hasInit,
                        'api_configured' => $hasApiUrl,
                        'issues' => $issues
                    ]
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error verifying installation: ' . $e->getMessage(),
            ], 500);
        }
    }
}
