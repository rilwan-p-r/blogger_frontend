import React from 'react';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { message, Upload } from 'antd';
import { InboxOutlined, CloseOutlined } from '@ant-design/icons';
import { X } from 'lucide-react';
import { addBlog } from '../api/addBlog';
import { blogValidationSchema } from '../schemas/blogValidation';
import { BlogFormValues } from '../interface/blogFormValues';
import { Blog } from '../interface/Blog.interface';
import { updateBlog } from '../api/updateBlog';

interface BlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  initialValues?: Blog;
  isEditing?: boolean;
  onSuccess?: () => void;
}

const { Dragger } = Upload;

const BlogPostModal: React.FC<BlogPostModalProps> = ({ 
  isOpen, 
  onClose, 
  userId, 
  initialValues, 
  isEditing = false,
  onSuccess
   
}) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],  
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const handleSubmit = async (values: BlogFormValues) => {
    try {
      const formData = new FormData();
      
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('authorId', values.authorId);
      formData.append('slug', values.title.toLowerCase().replace(/\s+/g, '-'));
  
      // Append coverImage only if a new image is selected
      if (values.coverImage) {
        formData.append('coverImage', values.coverImage);
      }
  
      let response;
      if (isEditing && initialValues?._id) {
        response = await updateBlog(initialValues._id, formData);
        if (response.status === 200) {
          message.success('Blog updated successfully');
          onSuccess?.();
          onClose();
        } else {
          message.error(response.error);
        }
      } else {
        response = await addBlog(formData);
        if (response.status === 201) {
          message.success('Blog posted successfully');
          onClose();
        } else {
          message.error(response.error);
        }
      }
      formik.resetForm();
    } catch (error) {
      console.error('Error submitting blog post:', error);
      message.error('Failed to save blog post');
    }
  };
  

  const formik = useFormik<BlogFormValues>({
    initialValues: initialValues
      ? {
          title: initialValues.title,
          content: initialValues.content,
          coverImage: null,
          authorId: userId,
        }
      : {
          title: '',
          content: '',
          coverImage: null,
          authorId: userId,
        },
    validationSchema: blogValidationSchema(isEditing),
    onSubmit: handleSubmit,
  });
  

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              {formik.values.coverImage ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(formik.values.coverImage)}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => formik.setFieldValue('coverImage', null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <CloseOutlined />
                  </button>
                </div>
              ) : (
                <Dragger
                  name="coverImage"
                  multiple={false}
                  maxCount={1}
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    formik.setFieldValue('coverImage', file);
                    return false;
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single image upload (max 5MB). 
                    Accepted formats: JPG, PNG, WebP
                  </p>
                </Dragger>
              )}
              {formik.touched.coverImage && formik.errors.coverImage && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.coverImage}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <div className="h-64">
                <ReactQuill
                  theme="snow"
                  value={formik.values.content}
                  onChange={(content) => formik.setFieldValue('content', content)}
                  modules={modules}
                  className="h-48"
                />
              </div>
              {formik.touched.content && formik.errors.content && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.content}</div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {formik.isSubmitting 
                  ? (isEditing ? 'Updating...' : 'Publishing...') 
                  : (isEditing ? 'Update Post' : 'Publish Post')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPostModal;