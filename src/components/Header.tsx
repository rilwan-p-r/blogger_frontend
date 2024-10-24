import { useState } from "react";
import AuthSlider from "./AuthSlider";

const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');

  const handleAuthClick = (type: 'signin' | 'signup') => {
    setAuthType(type);
    setIsAuthOpen(true);
  };
  return (
    <>
      <header className="bg-white shadow-sm top-0 fixed left-0 right-0 z-50">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-black hover:text-gray-600 transition-colors">BLOGGER</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="px-4 py-2 text-black hover:text-gray-600 transition-colors"
                onClick={() => handleAuthClick('signup')}
              >
                Sign up
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded-lg"
                onClick={() => handleAuthClick('signin')}
              >
                Sign in
              </button>
            </div>
          </div>
        </nav>
      </header>
      <AuthSlider
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultTab={authType}
      />
    </>
  )
}

export default Header
