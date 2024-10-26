import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBlogById } from '../api/getBlogById';
import { Blog } from '../interface/Blog.interface';
import { Calendar, Clock, ChevronLeft, Share2, BookmarkPlus } from 'lucide-react';

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id);
        if (response.status === 200 && response.data) {
          setBlog(response.data as Blog);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Blog post not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => window.history.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Blogs
      </button>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>

        {/* Author and Meta Info */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm text-gray-500">Author</p>
              <p className="font-medium text-gray-900">{blog.authorId.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">5 min read</span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8">
        <img
          src={blog.coverImageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mb-8">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">
          <Share2 className="w-4 h-4" />
          Share
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">
          <BookmarkPlus className="w-4 h-4" />
          Save
        </button>
      </div>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        <div 
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="leading-relaxed"
        />
      </article>

      {/* Tags */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            #webdev
          </span>
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            #coding
          </span>
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            #technology
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogView;