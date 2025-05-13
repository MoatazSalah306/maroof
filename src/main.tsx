
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { AuthProvider } from './lib/auth.context.tsx'
import { useEffect, useState } from 'react'

// ThemeProvider component to apply theme
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Get theme from localStorage or default to system preference
    const storedPreferences = localStorage.getItem('user-preferences');
    let theme = 'system';
    
    if (storedPreferences) {
      const preferences = JSON.parse(storedPreferences);
      theme = preferences.theme || 'system';
    }
    
    // Apply the theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    setMounted(true);
  }, []);
  
  // Avoid flash of unstyled content
  if (!mounted) {
    return null;
  }
  
  return <>{children}</>;
};

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
