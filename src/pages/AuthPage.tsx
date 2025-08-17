import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/utils/api';
import { validateForm, getFieldError, ValidationError } from '@/utils/validation';
import SocialIcon from '@/components/SocialIcons';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setValidationErrors([]);

    // Validate form
    const errors = validateForm(formData, isLogin);
    if (errors.length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      let data;
      if (isLogin) {
        data = await api.login(formData.email, formData.password);
      } else {
        data = await api.register({
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name
        });
      }
      login(data.access_token, {
        email: formData.email,
        name: `${formData.first_name} ${formData.last_name}`.trim()
      });
      navigate('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      setError(errorMessage);
      if (errorMessage.includes('already exists')) {
        setError('An account with this email already exists. Please try logging in instead.');
      } else if (errorMessage.includes('Incorrect email or password')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (platform: string) => {
    // Implement social authentication here
    console.log(`${platform} authentication clicked`);
  };

  // Responsive: flex-col on mobile, flex-row on md+
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Section - Promotional */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-[#2563eb] via-[#2563eb] to-[#7c3aed] text-white relative h-1/2 md:h-full overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-16 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-500"></div>
        </div>
        <div className="relative z-10 bg-white/10 backdrop-blur-sm p-8 md:p-10 rounded-3xl text-center border border-white/20 shadow-2xl max-w-xl w-full mx-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight tracking-tight">
            AI-Powered Policy Analysis
          </h1>
          <p className="text-lg md:text-2xl opacity-95 leading-relaxed font-light">
            Transform government documents into actionable insights with advanced AI analysis. 
            Get instant pros/cons, recommendations, and executive summaries.
          </p>
        </div>
        <div className="absolute bottom-20 text-center text-base md:text-lg opacity-80 w-full">
          Upload policy documents to start your analysis
        </div>
      </div>
      {/* Right Section - Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#f6faff] h-1/2 md:h-full overflow-hidden">
        <div className="w-full max-w-xl px-6 md:px-12 py-8 md:py-12 overflow-y-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              {isLogin ? 'Sign in to continue your journey' : 'Join us and start your journey'}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {!isLogin && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2563eb] focus:border-[#2563eb] text-base transition-all duration-200 ${
                        getFieldError(validationErrors, 'first_name') 
                          ? 'border-red-400 focus:ring-red-100 focus:border-red-500' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Enter your first name"
                      required={!isLogin}
                      aria-describedby={getFieldError(validationErrors, 'first_name') ? 'first_name-error' : undefined}
                      aria-label="First name"
                    />
                    {getFieldError(validationErrors, 'first_name') && (
                      <p className="mt-2 text-sm text-red-600 flex items-center" id="first_name-error">
                        <span className="mr-1">⚠️</span>
                        {getFieldError(validationErrors, 'first_name')}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2563eb] focus:border-[#2563eb] text-base transition-all duration-200 ${
                        getFieldError(validationErrors, 'last_name') 
                          ? 'border-red-400 focus:ring-red-100 focus:border-red-500' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Enter your last name"
                      required={!isLogin}
                      aria-describedby={getFieldError(validationErrors, 'last_name') ? 'last_name-error' : undefined}
                      aria-label="Last name"
                    />
                    {getFieldError(validationErrors, 'last_name') && (
                      <p className="mt-2 text-sm text-red-600 flex items-center" id="last_name-error">
                        <span className="mr-1">⚠️</span>
                        {getFieldError(validationErrors, 'last_name')}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2563eb] focus:border-[#2563eb] text-base transition-all duration-200 ${
                  getFieldError(validationErrors, 'email') 
                    ? 'border-red-400 focus:ring-red-100 focus:border-red-500' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Enter your email address"
                required
                aria-describedby={getFieldError(validationErrors, 'email') ? 'email-error' : undefined}
                aria-label="Email address"
              />
              {getFieldError(validationErrors, 'email') && (
                <p className="mt-2 text-sm text-red-600 flex items-center" id="email-error">
                  <span className="mr-1">⚠️</span>
                  {getFieldError(validationErrors, 'email')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2563eb] focus:border-[#2563eb] pr-14 text-base transition-all duration-200 ${
                    getFieldError(validationErrors, 'password') 
                      ? 'border-red-400 focus:ring-red-100 focus:border-red-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder={isLogin ? "Enter your password" : "Create your password"}
                  required
                  aria-describedby={getFieldError(validationErrors, 'password') ? 'password-error' : undefined}
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {getFieldError(validationErrors, 'password') && (
                <p className="mt-2 text-sm text-red-600 flex items-center" id="password-error">
                  <span className="mr-1">⚠️</span>
                  {getFieldError(validationErrors, 'password')}
                </p>
              )}
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 flex items-start">
                <span className="mr-2 mt-0.5">⚠️</span>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white font-semibold rounded-xl hover:from-[#1d4ed8] hover:to-[#6d28d9] transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base flex items-center justify-center shadow-md"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Processing...
                </>
              ) : (
                isLogin ? 'Sign in' : 'Create an account'
              )}
            </button>
          </form>
          <div className="text-center mt-6 md:mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#f6faff] text-gray-500 font-medium">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[#2563eb] font-semibold hover:text-[#1d4ed8] hover:underline transition-colors ml-1"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-6 md:mt-8">
            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
              <SocialIcon
                key={platform}
                platform={platform}
                onClick={() => handleSocialAuth(platform)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 