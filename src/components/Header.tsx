import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, User } from "lucide-react";
import AuthSlider from "./AuthSlider";
import { RootState } from "../redux/store/store";
import { removeUserInfo } from "../redux/userSlice/userSlice";

const Header = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const handleAuthClick = (type: 'signin' | 'signup') => {
    setAuthType(type);
    setIsAuthOpen(true);
  };

  const handleLogout = () => {
    dispatch(removeUserInfo());
  };

  return (
    <>
      <header className="bg-white shadow-sm top-0 fixed left-0 right-0 z-50">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-black hover:text-gray-600 transition-colors">
                BLOGGER
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {userInfo ? (
                <>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{userInfo?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="px-4 py-2 text-black hover:text-gray-600 transition-colors"
                    onClick={() => handleAuthClick('signup')}
                  >
                    Sign up
                  </button>
                  <button
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={() => handleAuthClick('signin')}
                  >
                    Sign in
                  </button>
                </>
              )}
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
  );
};

export default Header;