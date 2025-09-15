# LaraPush Frontend Components

This folder contains all the reusable frontend components for the LaraPush landing page and related pages.

## Component Structure

```
frontend/
├── Header.tsx          # Main navigation header with logo and menu
├── Footer.tsx          # Footer component with copyright
├── HeroSection.tsx     # Main hero section with headline and CTA
├── SmartphoneDemo.tsx  # Smartphone illustration with push notifications
├── FeatureCard.tsx     # Reusable feature card component
├── CTASection.tsx      # Call-to-action section component
├── index.ts            # Export file for easy importing
└── README.md           # This documentation file
```

## Usage

### Importing Components

```tsx
import { Header, Footer, HeroSection, SmartphoneDemo, FeatureCard, CTASection } from '@/components/frontend';
```

### Using Components

```tsx
// Basic page structure
<div className="min-h-screen bg-white">
    <Header />
    
    <main>
        {/* Your page content */}
    </main>
    
    <Footer />
</div>
```

## Component Details

### Header
- **Purpose**: Main navigation header with logo, menu, and authentication buttons
- **Props**: None (uses Inertia auth context)
- **Features**: Responsive navigation, logo linking to home, auth-aware buttons

### Footer
- **Purpose**: Simple footer with copyright information
- **Props**: None
- **Features**: Clean, minimal design

### HeroSection
- **Purpose**: Main marketing content section
- **Props**: None
- **Features**: Decorative dots, main headline, description, CTA button

### SmartphoneDemo
- **Purpose**: Visual demonstration of push notifications
- **Props**: None
- **Features**: Realistic iPhone design, status bar, notifications comparison

### FeatureCard
- **Purpose**: Display individual features in a grid
- **Props**: 
  - `icon`: React SVG icon
  - `title`: Feature title
  - `description`: Feature description
  - `bgColor`: Background color class
  - `iconColor`: Icon color class

### CTASection
- **Purpose**: Call-to-action section for conversions
- **Props**:
  - `title`: Section title
  - `description`: Section description
  - `buttonText`: Button text
  - `buttonLink`: Button link URL

## Styling

All components use Tailwind CSS classes and follow the LaraPush design system:
- **Primary Colors**: Blue (#2563eb), Red (#dc2626)
- **Text Colors**: Gray-900 (headings), Gray-600 (body text)
- **Background**: White, Gray-50 (subtle backgrounds)
- **Shadows**: Subtle shadows with hover effects

## Responsiveness

Components are designed to be fully responsive:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Grid layouts that adapt to screen size

## Customization

To customize components:
1. Modify the component file directly
2. Update the Tailwind classes
3. Add new props for additional flexibility
4. Ensure changes maintain the overall design consistency

## Adding New Components

When adding new components:
1. Create the component file in this folder
2. Export it from `index.ts`
3. Follow the existing naming conventions
4. Use consistent styling patterns
5. Add TypeScript interfaces for props
6. Document the component purpose and usage
