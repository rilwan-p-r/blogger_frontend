import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Formik, FormikHelpers } from 'formik';
import { signup } from '../api/auth';
import { SignInFormValues } from '../interface/signInFormValues.interface';
import { SignUpFormValues } from '../interface/signUpFormValues.interface';
import { signInSchema, signUpSchema } from '../schemas/auth';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/userSlice/userSlice';
import { signin } from '../api/auth';

interface AuthSliderProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

const AuthSlider: React.FC<AuthSliderProps> = ({ 
  isOpen, 
  onClose,
  defaultTab = 'signin'
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(defaultTab);
  const dispatch = useDispatch();

  // Initial values for sign in form
  const signInInitialValues: SignInFormValues = {
    email: '',
    password: ''
  };

  // Initial values for sign up form
  const signUpInitialValues: SignUpFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleSignIn = async (values: SignInFormValues, { setSubmitting }: FormikHelpers<SignInFormValues>) => {
    try {
        const response = await signin(values);
        if (response.success && response.status === 201) {
            dispatch(setUserInfo(response.data));
            message.success('Logged in successfully');
            onClose();
        } else {
            message.error(response.error || 'Something went wrong, please try again');
        }
    } catch (error) {
        console.error('Sign in error:', error);
        message.error('Failed to sign in');
    } finally {
        setSubmitting(false);
    }
};


  const handleSignUp = async (values: SignUpFormValues, { setSubmitting }: FormikHelpers<SignUpFormValues>) => {
    try {
      const signupData = {
        name: values.name,
        email: values.email,
        password: values.password
      };
      
      const response = await signup(signupData);
      if(response.status === 201) {
        dispatch(setUserInfo(response.data));
        message.success('Account created successfully');
        onClose();
      } else {
        message.error(response.error ||'Something went wrong, please try again');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      message.error('Failed to create account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold">Welcome</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex border-b">
        <button
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'signin'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('signin')}
        >
          Sign In
        </button>
        <button
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'signup'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'signin' ? (
          <Formik
            initialValues={signInInitialValues}
            validationSchema={signInSchema}
            onSubmit={handleSignIn}
            enableReinitialize={false}
          >
            {({ errors, touched, handleSubmit, handleChange, handleBlur, values, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Enter your email"
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Enter your password"
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  Sign In
                </button>
              </form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={signUpInitialValues}
            validationSchema={signUpSchema}
            onSubmit={handleSignUp}
            enableReinitialize={false}
          >
            {({ errors, touched, handleSubmit, handleChange, handleBlur, values, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Enter your name"
                  />
                  {touched.name && errors.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Enter your email"
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Enter your password"
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Confirm your password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  Sign Up
                </button>
              </form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default AuthSlider;