# Overview

This is a LaraPush Pro Panel application - a web push notification management system built with Laravel (PHP backend) and React (TypeScript frontend). The application allows users to manage push notifications, campaigns, audiences, domains, and subscriptions through a modern dashboard interface. It uses Inertia.js for seamless server-side/client-side integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 19 with TypeScript, using Inertia.js for SPA-like experience without building a separate API.

**UI Components**: Built with Radix UI primitives and styled with Tailwind CSS v4. Uses shadcn/ui component patterns for consistent design system implementation with customizable variants.

**State Management**: Relies on Inertia.js for server-driven state. Uses React hooks (useState, useEffect) for local component state. Form data is managed through Inertia's form helper.

**Routing**: Server-side routing through Laravel with Inertia.js middleware. Client-side navigation uses Inertia's Link component and router for smooth transitions.

**Build System**: Vite for fast development and optimized production builds. Configured for Replit environment with specific HMR settings for hot module replacement over websockets.

**Component Structure**:
- **Layouts**: Nested layout system with `app-layout`, `user-layout`, and `auth-layout` for different sections
- **Pages**: Organized by feature (settings, campaigns, domains, etc.) in `resources/js/pages/`
- **Components**: Reusable UI components in `resources/js/components/` with subdirectories for settings, UI primitives

**Design System**: Custom CSS variables for theming with light/dark mode support. Uses Tailwind's color system with semantic naming (primary, secondary, accent, destructive, etc.).

## Backend Architecture

**Framework**: Laravel 12 (latest) with PHP 8.2+ requirement.

**Authentication**: Laravel's built-in authentication with Inertia middleware for protected routes. Password reset and confirmation flows included.

**Session Management**: Laravel sessions with Inertia shared data for passing authentication state to frontend.

**API Approach**: No REST API - uses Inertia.js for direct controller-to-component data flow. Forms submit to Laravel routes which return Inertia responses.

**Business Logic**: Push notification system with web push protocol support via `laravel-notification-channels/webpush` package. PDF generation capability through `dompdf` integration. File upload system for site icons using Laravel's Storage facade with public disk access.

**Push Notification System**:
- VAPID authentication with keys stored in .env (VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT)
- User model with `updatePushSubscription()` method for managing push subscriptions
- PushSubscriptionController handles subscribe/unsubscribe/vapid-public-key endpoints
- Routes exempt from CSRF verification (`push-subscriptions/*`) to support service worker requests
- Session-based authentication for push subscription management
- Note: Current implementation uses session-based auth; for production with long-lived service workers, consider implementing token-based auth (Sanctum) for reliable subscription rotation when sessions expire

## Data Layer

**Note**: The repository shows configuration for potential database integration but no specific database schema files were provided. The application architecture suggests it will use:
- Eloquent ORM for database interactions
- Migrations for schema management
- Likely PostgreSQL or MySQL (common Laravel choices)

Key data entities based on UI:
- Users (authentication, profiles)
- Campaigns (notification campaigns)
- Domains (managed domains for push notifications)
- Audiences (subscriber segmentation)
- Subscriptions (user subscription tracking)
- Push notifications (sent/scheduled notifications)

## External Dependencies

**Package Management**:
- **Composer** (PHP): Laravel framework, Inertia, DomPDF, WebPush notification channel
- **NPM** (JavaScript): React, Radix UI components, Chart.js, Lucide icons

**Key Third-Party Services & Libraries**:

1. **Web Push Notifications**:
   - `laravel-notification-channels/webpush`: Server-side push notification handling with VAPID
   - Service Worker (`public/sw.js`): Handles push events, notification display, and subscription rotation
   - Browser Push API integration via `resources/js/services/pushNotifications.ts`
   - React component (`resources/js/components/PushNotificationToggle.tsx`): UI for enabling/disabling push notifications
   - Automatic service worker registration and subscription management
   - Support for notification click handlers and subscription rotation events

2. **PDF Generation**:
   - `barryvdh/laravel-dompdf`: Server-side PDF generation for reports/exports

3. **UI Framework**:
   - Radix UI: Accessible component primitives (dialogs, dropdowns, selects, sliders, etc.)
   - Tailwind CSS v4: Utility-first styling with custom theme
   - Lucide React: Icon library (475+ icons)
   - Chart.js with react-chartjs-2: Data visualization

4. **Development Tools**:
   - Vite: Build tool and dev server
   - TypeScript: Type safety for frontend
   - ESLint + Prettier: Code quality and formatting
   - Laravel Pint: PHP code styling
   - Pest: PHP testing framework

5. **Routing Helper**:
   - Ziggy: Brings Laravel routes to JavaScript for type-safe client-side routing

**Deployment Environment**: Configured for Replit with custom Vite settings for development server, CORS, and HMR over secure websockets.