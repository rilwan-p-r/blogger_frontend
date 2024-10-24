import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { InboxOutlined, CloseOutlined } from '@ant-design/icons';
import { X } from 'lucide-react';

interface BlogPostData {
  title: string;
  content: string;
  coverImage: UploadFile | null;
}

interface BlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const { Dragger } = Upload;

const BlogPostModal: React.FC<BlogPostModalProps> = ({ isOpen, onClose }) => {
  const [blogData, setBlogData] = useState<BlogPostData>({
    title: '',
    content: '',
    coverImage: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Blog post data:', blogData);
    onClose();
    setBlogData({ title: '', content: '', coverImage: null });
  };

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

  const uploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        setBlogData(prev => ({
          ...prev,
          coverImage: {
            uid: '-1',
            name: file.name,
            status: 'done',
            url: reader.result as string,
          },
        }));
      };
      reader.readAsDataURL(file);
      return false;
    },
    onRemove: () => {
      setBlogData(prev => ({ ...prev, coverImage: null }));
    },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create New Blog Post</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={blogData.title}
                onChange={(e) => setBlogData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              {blogData.coverImage ? (
                <div className="relative">
                  <img
                    src={blogData.coverImage.url}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setBlogData(prev => ({ ...prev, coverImage: null }))}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <CloseOutlined />
                  </button>
                </div>
              ) : (
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single image upload. Please upload an image file only.
                  </p>
                </Dragger>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <div className="h-64">
                <ReactQuill
                  theme="snow"
                  value={blogData.content}
                  onChange={(content) => setBlogData(prev => ({ ...prev, content }))}
                  modules={modules}
                  className="h-48"
                />
              </div>
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPostModal;