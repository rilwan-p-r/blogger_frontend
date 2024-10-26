import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllBlogs } from "../api/getBlogs";
import { Blog } from "../interface/Blog.interface";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { Dropdown, Modal, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import BlogPostModal from "./BlogPostModal";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteBlog } from "../api/deleteBlog";

const { confirm } = Modal;

const BlogCard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userInfo?._id);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs();
      if (response.status === 200 && response.data) {
        setBlogs(response.data as Blog[]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  const handleModalSuccess = () => {
    fetchBlogs();  // Refresh blogs after successful creation/update
  };
  const handleReadMore = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  const showDeleteConfirm = (blogId: string) => {
    confirm({
      title: 'Are you sure you want to delete this blog post?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, keep it',
      async onOk() {
        try {

          const response = await deleteBlog(blogId);
          if (response.status === 200) {
          message.success('Blog post deleted successfully');
          fetchBlogs();
          }
        } catch (error) {
          console.log('Failed to delete blog post',error);
        }
      },
    });
  };

  const handleEditClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedBlog(null);
  };

  const getDropdownItems = (blog: Blog) => ({
    items: [
      {
        key: 'edit',
        label: 'Edit',
        onClick: () => handleEditClick(blog)
      },
      {
        key: 'delete',
        label: 'Delete',
        onClick: () => showDeleteConfirm(blog._id)
      }
    ]
  });

  return (
    <>
      {blogs.map((blog) => (
        <article
          key={blog._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:-translate-y-1 max-w-sm mb-6"
        >
          {/* Card Image - Clickable */}
          <Link to={`/blog/${blog._id}`}>
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={blog.coverImageUrl}
                alt="Blog post thumbnail"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </Link>

          {/* Card Content */}
          <div className="p-6">
            {/* Header with Title and Actions */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex font-semibold items-center gap-2">
                    <span>{blog.authorId.name}</span>
                  </div>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </div>
              
              {/* Show dropdown menu only if the user is the author */}
              {userId === blog.authorId._id && (
                <Dropdown
                  menu={getDropdownItems(blog)}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreOutlined className="text-xl text-gray-600" />
                  </button>
                </Dropdown>
              )}
            </div>

            {/* Title - Clickable */}
            <Link to={`/blog/${blog._id}`}>
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                {blog.title}
              </h2>
            </Link>

            {/* Excerpt */}
            <div
              className="text-gray-600 mb-4 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>

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
              <button 
                onClick={() => handleReadMore(blog._id)}
                className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
              >
                Read More →
              </button>
            </div>
          </div>
        </article>
      ))}

      {/* Edit Modal */}
      {editModalOpen && selectedBlog && (
        <BlogPostModal
          isOpen={editModalOpen}
          onClose={handleEditModalClose}
          userId={userId || ''}
          initialValues={selectedBlog}
          isEditing={true}
          onSuccess={handleModalSuccess}
        />
      )}
    </>
  );
};

export default BlogCard;