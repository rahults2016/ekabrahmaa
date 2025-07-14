# ekaBrahmaa Brand Style Guide

## Brand Colors

### Primary Colors
- **Primary Teal**: `#0d9488` (teal-600)
- **Secondary Pink**: `#ec4899` (pink-500)
- **Accent Cyan**: `#06b6d4` (cyan-500)

### Supporting Colors
- **Neutral Gray**: `#374151` (gray-700)
- **Light Teal**: `#f0fdfa` (teal-50)
- **White**: `#ffffff`

### Gradient Combinations
- **Primary Gradient**: `from-teal-600 to-teal-700`
- **Secondary Gradient**: `from-pink-600 to-pink-700`
- **Brand Gradient**: `from-teal-600 to-pink-400`

## Typography

### Font Families
- **Primary**: System font stack with serif fallback for headings
- **Secondary**: Sans-serif system font for body text
- **Logo**: Serif font family for brand name

### Font Weights
- **Regular**: 400 (inactive menu items)
- **Medium**: 500 (body text)
- **Semibold**: 600 (subheadings)
- **Bold**: 700 (active menu items, headings)

### Font Sizes
- **Logo**: 28px (desktop), 24px (mobile)
- **Navigation**: 16px with 0.5px letter-spacing
- **Minimum**: 18px for logo text
- **Body**: 16px base size

## Layout Specifications

### Header Dimensions
- **Desktop Height**: 80px
- **Mobile Height**: 60px
- **Logo Size**: 48px (desktop), 40px (mobile)
- **Padding**: 24px from screen edges

### Spacing
- **Navigation Items**: 24px spacing between items
- **Button Padding**: 16px (12px vertical, 20px horizontal)
- **Container Padding**: 24px from screen edges

## Responsive Breakpoints

### Desktop (>1024px)
- Full horizontal menu
- All navigation items visible
- Logo at full size (48px)
- Header height: 80px

### Tablet (768px-1024px)
- Condensed menu items
- Reduced spacing
- Medium logo size
- Header height: 70px

### Mobile (<768px)
- Hamburger menu with slide-out animation
- Compact logo (40px)
- Header height: 60px
- Full-width mobile menu

## Accessibility

### Contrast Ratios
- All text maintains minimum 4.5:1 contrast ratio
- Interactive elements have clear focus states
- Hover states provide visual feedback

### Interactive States
- **Hover**: Scale transform (1.05x) with color transition
- **Focus**: Ring outline with brand colors
- **Active**: Bold font weight and background color change

## Brand Integration

### Logo Usage
- SVG format preferred for scalability
- Maintains proportional scaling
- Consistent spacing around logo elements
- Tagline: "One Source. Infinite Healing."
- Tagline styling: 12px, medium weight, teal-600 color

### Call-to-Action Buttons
- Primary: Teal gradient background
- Secondary: Pink gradient background
- Outline: Teal border with transparent background

### Navigation Behavior
- Smooth transitions (300ms duration)
- Dropdown menus with backdrop blur
- Sticky header with scroll-based opacity changes

## Animation Guidelines

### Transitions
- **Duration**: 300ms for most interactions
- **Easing**: ease-in-out for smooth feel
- **Hover Effects**: Scale transforms and color changes
- **Mobile Menu**: Slide-out animation from right

### Micro-interactions
- Button hover states with scale effect
- Logo hover with shadow enhancement
- Dropdown menus with fade and slide effects
- Loading states with spinner animations

## Implementation Notes

### Performance
- Uses CSS transforms for animations (GPU accelerated)
- Backdrop blur effects for modern browsers
- Optimized for 60fps animations
- Lazy loading for dropdown content

### Browser Support
- Modern browsers with CSS Grid and Flexbox
- Fallbacks for older browsers
- Progressive enhancement approach
- Mobile-first responsive design