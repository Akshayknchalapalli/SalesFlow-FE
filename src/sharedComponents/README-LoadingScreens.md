# SalesFlow CRM Loading Screens

This directory contains various loading screens and indicators used throughout the SalesFlow CRM application.

## Components

### 1. LoadingScreen

The main application loading screen that appears when the app is first loaded. It provides a professional and engaging experience while the application initializes.

**Features:**
- Animated logo with pulse effect
- Staggered text animation for the SalesFlow brand name
- Progress indicator showing loading percentage
- Rotating loading messages
- Subtle background pattern

**Usage:**
```tsx
// In App.tsx or similar root component
import LoadingScreen from "./sharedComponents/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Logic to determine when app is ready
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <LoadingScreen /> : <AppContent />}
    </>
  );
}
```

### 2. LoadingSpinner

A reusable spinner component that can be used for various loading states throughout the application.

**Features:**
- Customizable size
- Customizable thickness
- Customizable color
- Smooth circular animation

**Usage:**
```tsx
import LoadingSpinner from "./sharedComponents/LoadingSpinner";

// Basic usage
<LoadingSpinner />

// Custom implementation
<LoadingSpinner 
  size={60} 
  thickness={3} 
  color="#3B82F6" 
/>
```

### 3. PageLoadingIndicator

A subtle loading indicator used when navigating between pages or sections of the application.

**Features:**
- Minimal linear progress indicator
- Gradient color animation
- Positioned at the top of the viewport
- Non-intrusive design

**Usage:**
```tsx
import PageLoadingIndicator from "./sharedComponents/PageLoadingIndicator";

// In a layout component
function AppLayout() {
  const [pageLoading, setPageLoading] = useState(true);
  
  // Logic to determine when page is loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoadingIndicator isLoading={pageLoading} />
      {/* Rest of layout */}
    </>
  );
}
```

## Implementation Notes

1. All loading components use the application theme for consistent styling
2. Animations are optimized for performance
3. Components are designed to be accessible
4. Loading states should be controlled by parent components

## Best Practices

- Use the `LoadingScreen` component only for initial application load
- Use the `PageLoadingIndicator` for navigation between major sections
- Use the `LoadingSpinner` for localized content loading (e.g., fetching data for a specific component)
- For data fetching, consider using skeleton loaders for a better user experience