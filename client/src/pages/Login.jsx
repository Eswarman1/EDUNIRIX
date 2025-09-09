import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the backend returns user info and a token
        localStorage.setItem('token', data.token); // Store the token
        login(data.user, data.token); // Update auth context

        // Redirect based on role or first-time login status from backend
        if (data.user.mustChangePassword || data.user.isFirstLogin) {
           navigate('/change-password'); // Redirect to password change for first login or mandatory change
        } else if (data.user.role === 'admin' || data.user.role === 'faculty') {
          navigate('/admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }

      } else {
        // Handle specific backend errors
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Use background-dark for default, light mode handled by global index.css
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-4 transition-colors">
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
            <span className="text-sm text-text-muted dark:text-gray-600 light:text-gray-600">Admin/Faculty/Student Login</span> {/* Adjusted text color */}
          </div>
          <h2 className="text-3xl font-bold text-text-light dark:text-gray-900 light:text-gray-900">Sign In</h2> {/* Adjusted text color */}
        </div>

        {/* Login Form */}
        <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8 light:bg-white light:border-gray-200"> {/* Updated background/border */}
          {error && (
            <div className="p-3 bg-danger-900/20 border border-danger-800 rounded-lg text-danger-300 text-sm light:bg-danger-50 light:border-danger-200 light:text-danger-600"> {/* Adjusted colors */}
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gold-accent-500 text-black rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold-accent-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2" // Updated button colors and shadow
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div> {/* Adjusted spinner color */}
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Registration Info - Added specific info */}
          <div className="mt-6 p-4 bg-gray-700 rounded-lg light:bg-gray-50"> {/* Adjusted background */}
            <h4 className="text-sm font-medium text-text-light dark:text-gray-700 light:text-gray-700 mb-2">New User Information:</h4> {/* Adjusted text color */}
            <div className="space-y-1 text-xs text-text-muted dark:text-gray-600 light:text-gray-600"> {/* Adjusted text color */}
              <p>• If you are a teacher or student, your account is created by the administrator.</p>
              <p>• Use the email and password provided by your administrator.</p>
              <p>• You may be asked to set a new password on your first login.</p>
            </div>
             {/* Added phone number */}
             <p className="text-xs text-text-muted dark:text-gray-600 light:text-gray-500 mt-2"> {/* Adjusted text color */}
                For assistance, contact support at <span className="font-semibold text-gold-accent-400 dark:text-primary-600 light:text-primary-600">6281888439</span>. {/* Use gold accent */}
              </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-text-muted dark:text-gray-600 light:text-gray-600"> {/* Adjusted text color */}
            Are you an administrator?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-gold-accent-400 hover:text-gold-accent-300 font-medium light:text-primary-600 light:hover:text-primary-700" // Use gold accent for link
            >
              Register here
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

export default Login;