import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [isShaking, setIsShaking] = useState(false);
  
  const inputRefs = useRef([]);
  const { verifyOTP, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email;
  const otpHint = location.state?.otpHint;

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password', { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    // Take only the last character if multiple are entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    
    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    
    pastedData.forEach((char, index) => {
      if (!isNaN(char) && index < 6) {
        newOtp[index] = char;
      }
    });
    
    setOtp(newOtp);
    
    // Focus appropriate input
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus();
    } else {
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      triggerShake();
      return;
    }
    
    setIsLoading(true);
    try {
      await verifyOTP(email, otpString);
      toast.success('Identity verified successfully! Please log in with your new password.');
      // In a real app, you might go to a Reset Password screen to type a new password.
      // The prompt asks to navigate to /login.
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Invalid code');
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    
    try {
      await resetPassword(email);
      toast.success('Verification code resent');
      setCooldown(60);
    } catch (err) {
      toast.error(err.message || 'Failed to resend code');
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 page-enter">
      <div className="max-w-md w-full card p-8 shadow-card dark:bg-gray-800">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Verify Your Identity</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2 text-sm">
            Enter the 6-digit code sent to <span className="font-semibold text-gray-900 dark:text-white">{email}</span>
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={`flex justify-between gap-2 mb-8 ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
              />
            ))}
          </div>
          
          <button
            type="submit"
            disabled={isLoading || otp.join('').length !== 6}
            className="btn-primary w-full py-3 text-base flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Verify'
            )}
          </button>
          
          <div className="text-center text-sm mt-4">
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0}
              className={`font-medium ${cooldown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-primary-600 hover:text-primary-700 dark:text-primary-400'}`}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code'}
            </button>
          </div>
          
          <div className="text-center mt-6">
            <Link to="/login" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 font-medium">
              &larr; Back to Login
            </Link>
          </div>
        </form>

        {otpHint && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-100 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-300 text-center">
            <p className="font-semibold">Demo OTP: {otpHint}</p>
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}} />
    </div>
  );
};

export default OTPVerificationPage;
