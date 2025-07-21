import React, { useState, useEffect } from 'react';

// Context & Components
import AppContext from './context/AppContext';
import OnboardingScreen from './screens/OnboardingScreen';
import BrandVoiceScreen from './screens/BrandVoiceScreen';
import ProductInputScreen from './screens/ProductInputScreen';
import Workspace from './screens/Workspace';
import Notification from './components/Notification';

function App() {
   const [page, setPage] = useState('onboarding'); // 'onboarding', 'brand', 'products', 'workspace'
    const [brandVoice, setBrandVoice] = useState('');
    const [products, setProducts] = useState([]);
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // Check for existing user data in localStorage
        const savedBrandVoice = localStorage.getItem('brandVoice');
        const savedProducts = localStorage.getItem('products');
        if (savedBrandVoice && savedProducts && JSON.parse(savedProducts).length > 0) {
            setIsExistingUser(true);
            setBrandVoice(savedBrandVoice);
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const handleNewUser = () => {
        localStorage.clear();
        setBrandVoice('');
        setProducts([]);
        setPage('brand');
    };

    const handleExistingUser = () => {
        setPage('workspace');
    };
    
    const contextValue = {
        page, setPage,
        brandVoice, setBrandVoice,
        products, setProducts,
        showNotification
    };

    const renderPage = () => {
        switch (page) {
            case 'onboarding':
                return <OnboardingScreen onNewUser={handleNewUser} onExistingUser={handleExistingUser} isExistingUser={isExistingUser} />;
            case 'brand':
                return <BrandVoiceScreen />;
            case 'products':
                return <ProductInputScreen />;
            case 'workspace':
                return <Workspace />;
            default:
                return <OnboardingScreen onNewUser={handleNewUser} onExistingUser={handleExistingUser} isExistingUser={isExistingUser} />;
        }
    };


  return (
    <>
      <AppContext.Provider value={contextValue}>
            <div className="bg-slate-50 min-h-screen font-sans text-slate-800 selection:bg-indigo-100">
                <div className="container mx-auto p-4 sm:p-6 md:p-8">
                    {renderPage()}
                </div>
                {notification && <Notification message={notification} onDismiss={() => setNotification(null)} />}
            </div>
        </AppContext.Provider>
    </>
  )
}

export default App
