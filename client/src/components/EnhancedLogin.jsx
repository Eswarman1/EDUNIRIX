import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const EnhancedLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Check if user needs to change password
      if (user.mustChangePassword || user.isFirstLogin) {
        navigate('/change-password');
      } else {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from);
      }
    }
  }, [user, navigate, location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Basic validation
    if (!formData.email || !formData.password) {
      setErrors({ general: 'Please fill in all fields' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        localStorage.setItem('token', data.token);

        // Update auth context
        login(data.user, data.token);

        // Check if user needs to change password
        if (data.user.mustChangePassword || data.user.isFirstLogin) {
          // Show welcome message for first-time users
          if (data.user.isFirstLogin) {
            setErrors({
              info: `Welcome ${data.user.name}! For security, please set a new password to continue.`
            });
          } else {
            setErrors({
              info: 'For security reasons, you must change your password before continuing.'
            });
          }

          // Small delay to show the message, then redirect
          setTimeout(() => {
            navigate('/change-password');
          }, 2000);
        } else {
          // Normal login - redirect to intended destination
          const from = location.state?.from?.pathname || '/dashboard';
          navigate(from);
        }
      } else {
        // Handle specific error messages
        if (data.message) {
          setErrors({ general: data.message });
        } else {
          setErrors({ general: 'Login failed. Please try again.' });
        }
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
     {/* Apply Light Gray background (muted) as the base */}
    <div className="min-h-screen flex items-center justify-center bg-muted py-12 px-4 sm:px-6 lg:px-8 transition-colors dark:bg-background-dark">
      <div className="max-w-md w-full space-y-8">
        <div>
           {/* EDUNIRIX Logo - Updated path */}
           {/* Assuming logo should be visible on both backgrounds */}
          <img src="/EdunirixLogo.png" alt="EDUNIRIX Logo" className="mx-auto h-12 w-auto mb-4 filter invert dark:filter-none" /> {/* Use invert filter for dark background logo */}
          {/* Heading - Coral */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-accent dark:text-white">
            Sign in to EDUNIRIX
          </h2>
          {/* Text - Dark Gray */}
          <p className="mt-2 text-center text-sm text-text-dark dark:text-gray-400">
            Welcome back!
          </p>
        </div>

        {/* Login Form - Card with subtle background/border */}
        <form className="mt-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-200 p-8 dark:bg-gray-800 dark:border-gray-700" onSubmit={handleSubmit}>
          {errors.general && (
             <div className="p-3 bg-danger-900/20 border border-danger-800 text-danger-300 dark:bg-danger-900/20 dark:border-danger-800 light:bg-danger-50 light:border-danger-200 light:text-danger-600"> {/* Adjusted colors */}
              {errors.general}
            </div>
          )}

          {errors.info && (
             <div className="p-3 bg-primary-900/20 border border-primary-800 text-primary-300 dark:bg-primary-900/20 dark:border-primary-800 light:bg-primary-50 light:border-primary-200 light:text-primary-800"> {/* Using primary for info/welcome */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                   <Sparkles className="w-5 h-5 text-primary dark:text-primary-600" /> {/* Use primary for icon */}
                </div>
                <div className="ml-3 text-primary-300 dark:text-primary-600"> {/* Use primary for text */}
                  {errors.info}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              {/* Label - Secondary Dark Gray */}
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary dark:text-gray-300">
                Email Address
              </label>
              {/* Input fields styled by index.css base styles and focus rings */}
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                 className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm" // Inputs styled by index.css + focus ring
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-danger-400 dark:text-danger-400"> {/* Use danger */}
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              {/* Label - Secondary Dark Gray */}
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                 {/* Input styled by index.css + focus ring */}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-danger-400 dark:text-danger-400">{errors.password}</p> {/* Use danger */}
              )}
            </div>
          </div>

          {/* Information for new users - Card with subtle background/border */}
          <div className="bg-gray-100 border border-gray-200 rounded-md p-4 dark:bg-gray-700 dark:border-gray-600"> {/* Updated background/border */}
            {/* Heading - Dark Gray */}
            <h4 className="text-sm font-medium text-text-dark dark:text-gray-200 mb-2">First time logging in?</h4> {/* Adjusted text color */}
             {/* Text - Secondary Dark Gray */}
            <ul className="text-sm text-text-secondary dark:text-gray-400 space-y-1"> {/* Adjusted text color */}
              <li>&bull; Use the email and password sent to your email address</li>
              <li>&bull; You'll be asked to set a new password for security</li>
              <li>&bull; Contact your administrator if you haven't received your credentials</li>
            </ul>
            {/* Added Phone Number - Text in Secondary Dark Gray with Accent Color for Number */}
             <p className="mt-2 text-xs text-text-secondary dark:text-gray-400"> {/* Adjusted text color */}
                For assistance, contact support at <span className="font-semibold text-accent dark:text-primary-400">6281888439</span>. {/* Use accent */}
            </p>
          </div>

          <div>
             {/* Button - Accent Background with White Text */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 dark:bg-primary dark:hover:bg-primary-dark dark:text-black" // Updated button colors
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2 dark:border-white dark:border-t-transparent"></div> {/* Adjusted spinner color */}
                  Signing in...
                </div>
              ) : (
                <>
                  Sign in
                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Footer Text - Secondary Dark Gray */}
          <div className="text-center text-text-secondary dark:text-gray-400">
            <p className="text-sm">
              Need help with EDUNIRIX? Contact your system administrator.
            </p>
             {/* Link - Secondary Dark Gray with Accent Hover */}
             <p className="text-sm mt-2">
                <a href="/" className="text-text-secondary hover:text-accent dark:text-gray-500 dark:hover:text-gray-400">← Back to landing page</a> {/* Use text-secondary and accent hover */}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnhancedLogin;