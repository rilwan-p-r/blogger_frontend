import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { PlusCircle } from 'lucide-react';
import Hero from '../components/Hero';
import BlogPostModal from '../components/BlogPostModal';
import { useState } from 'react';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Header />
      {/* Hero Section with Description---------- */}
      <Hero />
      {/* Blog Cards Grid--------------------- */}
      <div className="container mx-auto p-6 flex-grow">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>

      {/* Fixed Post Blog Button--------------- */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusCircle size={24} />
        <span className="font-medium">Post Blog</span>
      </button>

      <BlogPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* footer--------------- */}
      <Footer />
    </>
  );
};

export default Home;