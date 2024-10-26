import * as Yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const blogValidationSchema = (isEditing: boolean) =>
  Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must not exceed 100 characters'),
    
    content: Yup.string()
      .required('Content is required')
      .min(50, 'Content must be at least 50 characters'),
    
    coverImage: Yup.mixed()
      .nullable()
      .test('file-required', 'Cover image is required', (value) => {
        // Ensure `true` if editing or if value exists for new posts
        return isEditing || Boolean(value);
      })
      .test('is-image', 'Please upload a valid image file', (value) => {
        // Optional if updating; otherwise, validate file type
        return !value || (value instanceof File && SUPPORTED_IMAGE_FORMATS.includes(value.type));
      })
      .test('file-size', 'File is too large. Max size is 5MB', (value) => {
        // Optional if updating; otherwise, validate file size
        return !value || (value instanceof File && value.size <= MAX_FILE_SIZE);
      }),

    authorId: Yup.string().required('Author ID is required'),
  });
