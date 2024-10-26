import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PlusCircle } from 'lucide-react';
import { RootState } from '../redux/store/store';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BlogPostModal from '../components/BlogPostModal';
import AuthSlider from '../components/AuthSlider';

const Home = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAuthSliderOpen, setIsAuthSliderOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const handlePostButtonClick = () => {
    if (userInfo) {
      setIsPostModalOpen(true);
    } else {
      setIsAuthSliderOpen(true);
    }
  };

  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };

  const handleCloseAuthSlider = () => {
    setIsAuthSliderOpen(false);
  };

  return (
    <>
      <Header />
      {/* Hero Section with Description */}
      <Hero />
      
      {/* Blog Cards Grid */}
      <div className="container mx-auto p-6 flex-grow">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <BlogCard />
        </div>
      </div>

      {/* Fixed Post Blog Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-colors"
        onClick={handlePostButtonClick}
      >
        <PlusCircle size={24} />
        <span className="font-medium">Post Blog</span>
      </button>

      {/* Conditional Rendering of Modals */}
      {userInfo && (
        <BlogPostModal 
          isOpen={isPostModalOpen} 
          onClose={handleClosePostModal}
          userId={userInfo._id} 
        />
      )}
      
      {!userInfo && (
        <AuthSlider 
          isOpen={isAuthSliderOpen}
          onClose={handleCloseAuthSlider}
          defaultTab="signin"
        />
      )}
      
      <Footer />
    </>
  );
};

export default Home;