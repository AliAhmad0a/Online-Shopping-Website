import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import usersData from '../data/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for remembered user
    const storedUser = localStorage.getItem('shopsphere-user');
    const rememberMe = localStorage.getItem('shopsphere-remember');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('shopsphere-user');
      }
    }
    setLoading(false);
  }, []);

  const persistUser = useCallback((userData, remember = false) => {
    setUser(userData);
    localStorage.setItem('shopsphere-user', JSON.stringify(userData));
    if (remember) {
      localStorage.setItem('shopsphere-remember', 'true');
    }
  }, []);

  const login = (email, password, rememberMe = false) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = usersData.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (foundUser) {
          const userWithoutPassword = { ...foundUser };
          delete userWithoutPassword.password;
          // Ensure addresses array exists
          if (!userWithoutPassword.addresses) {
            userWithoutPassword.addresses = userWithoutPassword.address 
              ? [{ id: 1, label: 'Home', isDefault: true, ...userWithoutPassword.address }] 
              : [];
          }
          persistUser(userWithoutPassword, rememberMe);
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopsphere-user');
    localStorage.removeItem('shopsphere-remember');
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if email already exists
        const exists = usersData.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (exists) {
          reject(new Error('An account with this email already exists'));
          return;
        }
        const newUser = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          role: 'user',
          avatar: '',
          phone: userData.phone || '',
          addresses: [],
          joinedAt: new Date().toISOString().split('T')[0],
          totalOrders: 0,
          totalSpent: 0
        };
        persistUser(newUser);
        resolve(newUser);
      }, 800);
    });
  };

  const updateProfile = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...user, ...data };
        persistUser(updatedUser);
        resolve(updatedUser);
      }, 500);
    });
  };

  const resetPassword = (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = usersData.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (foundUser) {
          // Simulate sending OTP
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          localStorage.setItem('shopsphere-reset-otp', otp);
          localStorage.setItem('shopsphere-reset-email', email);
          console.log('OTP for password reset:', otp); // For demo purposes
          resolve({ message: 'OTP sent successfully', otp }); // Return OTP for demo
        } else {
          reject(new Error('No account found with this email'));
        }
      }, 800);
    });
  };

  const verifyOTP = (email, otp) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const storedOTP = localStorage.getItem('shopsphere-reset-otp');
        const storedEmail = localStorage.getItem('shopsphere-reset-email');
        if (storedOTP === otp && storedEmail === email) {
          localStorage.removeItem('shopsphere-reset-otp');
          localStorage.removeItem('shopsphere-reset-email');
          resolve({ message: 'OTP verified successfully' });
        } else {
          reject(new Error('Invalid OTP'));
        }
      }, 500);
    });
  };

  // Address management
  const addAddress = (address) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAddress = {
          id: Date.now(),
          ...address,
          isDefault: user.addresses?.length === 0
        };
        const updatedAddresses = [...(user.addresses || []), newAddress];
        const updatedUser = { ...user, addresses: updatedAddresses };
        persistUser(updatedUser);
        resolve(updatedUser);
      }, 500);
    });
  };

  const updateAddress = (addressId, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedAddresses = (user.addresses || []).map(addr =>
          addr.id === addressId ? { ...addr, ...data } : addr
        );
        const updatedUser = { ...user, addresses: updatedAddresses };
        persistUser(updatedUser);
        resolve(updatedUser);
      }, 500);
    });
  };

  const deleteAddress = (addressId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedAddresses = (user.addresses || []).filter(addr => addr.id !== addressId);
        // If deleted was default and there are others, set first as default
        if (updatedAddresses.length > 0 && !updatedAddresses.some(a => a.isDefault)) {
          updatedAddresses[0].isDefault = true;
        }
        const updatedUser = { ...user, addresses: updatedAddresses };
        persistUser(updatedUser);
        resolve(updatedUser);
      }, 500);
    });
  };

  const setDefaultAddress = (addressId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedAddresses = (user.addresses || []).map(addr => ({
          ...addr,
          isDefault: addr.id === addressId
        }));
        const updatedUser = { ...user, addresses: updatedAddresses };
        persistUser(updatedUser);
        resolve(updatedUser);
      }, 500);
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
    login,
    logout,
    register,
    updateProfile,
    resetPassword,
    verifyOTP,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
