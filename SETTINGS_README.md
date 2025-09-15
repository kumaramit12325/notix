# LaraPush Pro Panel - Settings System

This document describes the new comprehensive settings system implemented for the LaraPush Pro Panel.

## Overview

The settings system provides a unified interface for managing all panel configurations through a tabbed navigation system. Users can easily switch between different settings categories without losing their place.

## Features

### 🎯 **Tabbed Navigation**
- **General**: Core panel settings like audience selection, sending speed, and integrations
- **Profile**: User profile management and password changes
- **Language & Region**: Localization and timezone settings
- **Backup**: System backup management and automation
- **Advanced**: Technical configurations and performance tuning
- **Update**: System version management and updates

### 🎨 **Modern UI Design**
- Clean, responsive design matching the LaraPush Pro Panel aesthetic
- Consistent styling across all settings pages
- Interactive elements with proper hover states and transitions
- Form validation and error handling

### ⚡ **Interactive Components**
- Toggle switches for boolean settings
- Sliders for numeric ranges (e.g., sending speed, worker count)
- Radio buttons for exclusive choices
- Dropdown selects for predefined options
- Password fields with show/hide functionality

## File Structure

```
resources/js/
├── pages/settings/
│   ├── index.tsx          # Main settings landing page
│   ├── general.tsx        # General settings
│   ├── profile.tsx        # Profile management
│   ├── language.tsx       # Language & region settings
│   ├── backup.tsx         # Backup management
│   ├── advanced.tsx       # Advanced configurations
│   └── update.tsx         # System updates
├── components/settings/
│   └── settings-tabs.tsx  # Reusable tab navigation
└── components/ui/
    ├── slider.tsx         # Slider component
    ├── switch.tsx         # Toggle switch component
    └── radio-group.tsx    # Radio button group component
```

## Routes

The following routes are available for the settings system:

- `GET /settings` - Main settings page
- `GET /settings/general` - General settings
- `GET /settings/profile` - Profile settings
- `GET /settings/language` - Language & region settings
- `GET /settings/backup` - Backup settings
- `GET /settings/advanced` - Advanced settings
- `GET /settings/update` - Update settings

## Usage

### Accessing Settings
Users can access the settings through:
1. **User Menu**: Click on the user avatar → Settings
2. **Direct URL**: Navigate to `/settings`

### Navigation
- Use the horizontal tab bar to switch between settings categories
- Each tab maintains its own state and form data
- Breadcrumb navigation shows current location

### Saving Changes
- Each settings page has its own save button
- Form validation prevents invalid submissions
- Success messages confirm saved changes

## Components

### SettingsTabs
A reusable component that provides consistent navigation between all settings sections.

```tsx
import SettingsTabs from '@/components/settings/settings-tabs';

<SettingsTabs activeTab="general" />
```

### Form Components
The system uses shadcn/ui components for consistent form elements:

- `Input` - Text and password inputs
- `Select` - Dropdown selections
- `Switch` - Toggle switches
- `Slider` - Range sliders
- `RadioGroup` - Radio button groups
- `Button` - Action buttons

## Styling

The settings system uses Tailwind CSS with:
- Consistent color scheme matching the panel design
- Responsive grid layouts
- Proper spacing and typography
- Hover and focus states
- Alert components for warnings and information

## Demo Server Warning

All settings pages display a prominent warning banner indicating this is a demo server, as shown in the design mockups.

## Future Enhancements

- **Real-time Updates**: Live preview of setting changes
- **Import/Export**: Settings backup and restore functionality
- **User Permissions**: Role-based access to different settings
- **Audit Log**: Track changes to critical settings
- **API Integration**: RESTful API for programmatic settings management

## Dependencies

The settings system requires the following packages:
- `@radix-ui/react-slider`
- `@radix-ui/react-switch`
- `@radix-ui/react-radio-group`
- `lucide-react` (for icons)

## Browser Support

- Modern browsers with ES6+ support
- Responsive design for mobile and desktop
- Progressive enhancement for older browsers

---

For technical support or questions about the settings system, please refer to the development team or create an issue in the project repository.
