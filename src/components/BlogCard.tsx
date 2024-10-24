const BlogCard = () => {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:-translate-y-1 max-w-sm">
      {/* Card Image */}
      <div className="relative h-48 w-full">
        <img
          src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJsb2d8ZW58MHx8MHx8fDA%3D"
          alt="Blog post thumbnail"
          className="w-full h-full object-cover"
        />

      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            <span>John Doe</span>
          </div>
          <span>•</span>
          <span>5 min read</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600">
          Getting Started with Web Development: A Comprehensive Guide
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          Learn the fundamental concepts of web development, including HTML, CSS, and JavaScript. 
          This guide will help you understand the basics and set you on the path to becoming a developer.
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              #webdev
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              #coding
            </span>
          </div>
          <button className="text-blue-500 hover:text-blue-700 font-medium">
            Read More →
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;