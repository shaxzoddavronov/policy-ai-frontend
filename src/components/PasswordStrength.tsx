import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  // Simple strength indicator based on length only
  const getStrength = (password: string) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    const length = password.length;
    
    if (length < 3) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (length < 6) return { score: 2, label: 'Fair', color: 'bg-yellow-500' };
    if (length < 10) return { score: 3, label: 'Good', color: 'bg-blue-500' };
    return { score: 4, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = getStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
        <span>Password strength:</span>
        <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${strength.color}`}>
          {strength.label}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${(strength.score / 4) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrength; 