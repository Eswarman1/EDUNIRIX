import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Shield,
  Calendar,
  ArrowRight,
  Sparkles,
  UserCheck,
  Building
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    department: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        department: formData.department || undefined
      });

      if (result.success) {
        // Navigate based on user role from server response
        if (result.user.role === 'admin' || result.user.role === 'faculty') {
          navigate('/admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Use background-dark for default, light mode handled by global index.css
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-4 transition-colors"> {/* Changed background start color */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-gold-accent-500 to-gold-accent-light rounded-xl"> {/* Changed gradient color to gold */}
              {/* EDUNIRIX Logo - Updated path */}
              {/* Consider a gold version of the logo for dark mode */}
              <img src="/EdunirixLogo.png" alt="EDUNIRIX Logo" className="w-8 h-8 rounded-full filter invert dark:filter-none" /> {/* Assuming logo is in public folder */}
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gold-accent-500 to-gold-accent-light bg-clip-text text-transparent"> {/* Changed gradient color to gold */}
              EDUNIRIX
            </h1>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-gold-accent-500" /> {/* Use gold accent */}
            <span className="text-sm text-text-muted dark:text-gray-600 light:text-gray-600">Admin Registration</span> {/* Adjusted text color */}
          </div>
          <h2 className="text-3xl font-bold text-text-light dark:text-gray-900 light:text-gray-900">Create Admin Account</h2> {/* Adjusted text color */}
        </div>

        {/* Registration Form */}
        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 light:bg-white light:border-gray-200"> {/* Updated background/border */}
          {error && (
            <div className="p-3 bg-danger-900/20 border border-danger-800 rounded-lg text-danger-300 text-sm light:bg-danger-50 light:border-danger-200 light:text-danger-600"> {/* Adjusted colors */}
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange('name')}
                className="w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 transition-all duration-300 bg-gray-700 border-gray-600 text-white placeholder-gray-400 light:bg-gray-50 light:border-gray-300 light:text-gray-900 light:placeholder-gray-500" // Updated colors and focus ring
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange('email')}
                className="w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 transition-all duration-300 bg-gray-700 border-gray-600 text-white placeholder-gray-400 light:bg-gray-50 light:border-gray-300 light:text-gray-900 light:placeholder-gray-500" // Updated colors and focus ring
                required
              />
            </div>

            <div className="relative">
              <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Institution/Department (Optional)"
                value={formData.department}
                onChange={handleInputChange('department')}
                className="w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 transition-all duration-300 bg-gray-700 border-gray-600 text-white placeholder-gray-400 light:bg-gray-50 light:border-gray-300 light:text-gray-900 light:placeholder-gray-500" // Updated colors and focus ring
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange('password')}
                className="w-full pl-12 pr-12 py-3 rounded-lg border placeholder-gray-500 focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 transition-all duration-300 bg-gray-700 border-gray-600 text-white light:bg-gray-50 light:border-gray-300 light:text-gray-900 light:placeholder-gray-500" // Updated colors and focus ring
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 light:hover:text-gray-600"
              >
                {showPassword ? '🙈' : '👁️'}
                </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                className="w-full pl-12 pr-12 py-3 rounded-lg border placeholder-gray-500 focus:ring-2 focus:ring-gold-accent-500 focus:border-gold-accent-500 transition-all duration-300 bg-gray-700 border-gray-600 text-white light:bg-gray-50 light:border-gray-300 light:text-gray-900 light:placeholder-gray-500" // Updated colors and focus ring
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 light:hover:text-gray-600"
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gold-accent-500 text-black rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold-accent-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2" // Updated button colors and shadow
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div> {/* Adjusted spinner color */}
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Registration Info - Added specific info */}
          <div className="mt-6 p-4 bg-gray-700 rounded-lg light:bg-gray-50"> {/* Adjusted background */}
            <h4 className="text-sm font-medium text-text-light dark:text-gray-700 light:text-gray-700 mb-2">Admin Account Creation:</h4> {/* Adjusted text color */}
            <div className="space-y-1 text-xs text-text-muted dark:text-gray-600 light:text-gray-600"> {/* Adjusted text color */}
              <p>• Password must be at least 6 characters long</p>
              <p>• Admin accounts have full system access</p>
              <p>• You can create teacher and student accounts from the dashboard</p>
              <p>• Department field is optional but recommended</p>
            </div>
             {/* Added phone number */}
             <p className="text-xs text-text-muted dark:text-gray-600 light:text-gray-500 mt-2"> {/* Adjusted text color */}
                For assistance, contact support at <span className="font-semibold text-gold-accent-400 light:text-primary-600">6281888439</span>. {/* Use gold accent */}
              </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-text-muted dark:text-gray-600 light:text-gray-600"> {/* Adjusted text color */}
            Already have an admin account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-gold-accent-400 hover:text-gold-accent-300 font-medium light:text-primary-600 light:hover:text-primary-700" // Use gold accent for link
            >
              Sign in here
            </button>
          </p>
          <p className="text-sm text-text-muted dark:text-gray-600 light:text-gray-600 mt-2"> {/* Adjusted text color */}
            <button
              onClick={() => navigate('/')}
              className="text-text-muted hover:text-gold-accent-400 light:text-gray-500 light:hover:text-gray-700" // Adjusted text color and hover
            >
              ← Back to landing page
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;