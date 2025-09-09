import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Eye, EyeOff, ArrowRight, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const FirstTimePasswordChange = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Redirect if user doesn't need to change password
    if (!user?.mustChangePassword && !user?.isFirstLogin) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }
    return errors;
  };

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

    // Validate passwords
    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) {
      setErrors({ newPassword: passwordErrors.join('. ') });
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/first-time-password-change', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Update user state to reflect password change
        updateUser({
          ...user,
          mustChangePassword: false,
          isFirstLogin: false
        });

        // Show success message
        alert('Password changed successfully! You can now access all features.');

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setErrors({ general: data.message || 'Failed to change password' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    const validations = [
      password.length >= 6,
      /(?=.*[a-z])/.test(password),
      /(?=.*[A-Z])/.test(password),
      /(?=.*\d)/.test(password),
      /(?=.*[@$!%*?&])/.test(password)
    ];

    const strength = validations.filter(Boolean).length;

    if (strength <= 2) return { level: 'weak', color: 'text-danger-500', width: '33%' };
    if (strength <= 3) return { level: 'medium', color: 'text-warning-500', width: '66%' };
    return { level: 'strong', color: 'text-success-500', width: '100%' };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

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
            Set Your Password for EDUNIRIX
          </h2>
          {/* Text - Dark Gray */}
          <p className="mt-2 text-center text-sm text-text-dark dark:text-gray-400">
            {user?.isFirstLogin
              ? 'Welcome to EDUNIRIX! Please set a secure password to continue.'
              : 'For security reasons, you must change your password.'
            }
          </p>
        </div>

        {/* Password Change Form - Card with subtle background/border */}
        <form className="mt-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-200 p-8 dark:bg-gray-800 dark:border-gray-700" onSubmit={handleSubmit}>
          {errors.general && (
             <div className="p-3 bg-danger-900/20 border border-danger-800 text-danger-300 dark:bg-danger-900/20 dark:border-danger-800 light:bg-danger-50 light:border-danger-200 light:text-danger-600"> {/* Adjusted colors */}
              {errors.general}
            </div>
          )}

          <div className="space-y-4">
            <div>
              {/* Label - Secondary Dark Gray */}
              <label htmlFor="newPassword" className="block text-sm font-medium text-text-secondary dark:text-gray-300">
                New Password
              </label>
              <div className="mt-1 relative">
                 {/* Input styled by index.css + focus ring */}
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              {formData.newPassword && (
                <div className="mt-2">
                  <div className="flex justify-between items-center text-sm">
                    {/* Text - Secondary Dark Gray */}
                    <span className="text-text-secondary dark:text-gray-300">Password strength:</span>
                    <span className={passwordStrength.color}>
                      {passwordStrength.level}
                    </span>
                  </div>
                   {/* Progress bar background - Gray */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1 dark:bg-gray-700">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.level === 'weak' ? 'bg-danger-500' :
                        passwordStrength.level === 'medium' ? 'bg-warning-500' : 'bg-success-500'
                      }`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                </div>
              )}

              {errors.newPassword && (
                <p className="mt-1 text-sm text-danger-400 dark:text-danger-400">{errors.newPassword}</p> {/* Use danger */}
              )}
            </div>

            <div>
              {/* Label - Secondary Dark Gray */}
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary dark:text-gray-300">
                Confirm Password
              </label>
               {/* Input styled by index.css + focus ring */}
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border placeholder-gray-500 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Confirm your new password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-danger-400 dark:text-danger-400">{errors.confirmPassword}</p> {/* Use danger */}
              )}
            </div>
          </div>

          {/* Password Requirements - Card with subtle background/border (using Primary colors for info) */}
          <div className="bg-primary-900/20 border border-primary-800 rounded-md p-4 dark:bg-primary-900/20 dark:border-primary-800 light:bg-primary-50 light:border-primary-200"> {/* Adjusted background/border */}
             {/* Heading - Primary Text */}
            <h4 className="text-sm font-medium text-primary-100 dark:text-primary-800 light:text-primary-800 mb-2">Password Requirements:</h4> {/* Adjusted text color */}
             {/* Text - Primary Text */}
            <ul className="text-sm text-primary-300 dark:text-primary-700 light:text-primary-700 space-y-1"> {/* Adjusted text color */}
              {/* Checkmark icons - Success Green */}
              <li className={formData.newPassword.length >= 6 ? 'text-success-400 light:text-success-600' : ''}>
                &check; At least 6 characters long
              </li>
              <li className={/(?=.*[a-z])/.test(formData.newPassword) ? 'text-success-400 light:text-success-600' : ''}>
                &check; One lowercase letter
              </li>
              <li className={/(?=.*[A-Z])/.test(formData.newPassword) ? 'text-success-400 light:text-success-600' : ''}>
                &check; One uppercase letter
              </li>
              <li className={/(?=.*\d)/.test(formData.newPassword) ? 'text-success-400 light:text-success-600' : ''}>
                &check; One number
              </li>
              <li className={/(?=.*[@$!%*?&])/.test(formData.newPassword) ? 'text-success-400 light:text-success-600' : ''}>
                &check; One special character (@$!%*?&)<br />
              </li>
            </ul>
          </div>
          {/* Added Contact Number - Text in Secondary Dark Gray with Accent Color for Number */}
           <p className="mt-2 text-xs text-text-secondary dark:text-gray-400 text-center"> {/* Adjusted text color */}
                For assistance, contact support at <span className="font-semibold text-accent dark:text-primary-400">6281888439</span>. {/* Use accent */}
            </p>
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
                  Changing Password...
                </div>
              ) : (
                <>
                   Change Password
                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FirstTimePasswordChange;