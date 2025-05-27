import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LandingContainer,
  WelcomeTitle,
  Tagline,
  AuthContainer,
  TabsContainer,
  Tab,
  Form,
  Input,
  Button,
  SwitchLink,
  SuccessMessage,
  PrivacyText,
  AdminIndicator,
  ErrorMessage
} from './LandingStyles';

const LandingPage = () => {
  const navigate = useNavigate();
  const { register, login, error: authError } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: ''
    });
    setError('');
    setShowSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isAdmin && activeTab === 'signup') {
        // Validate input
        if (!formData.username || !formData.email || !formData.password) {
          throw new Error('Please fill in all fields');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }

        // Handle user signup using AuthContext
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });

        // Show success message and switch to login
        setShowSuccess(true);
        setActiveTab('login');
        setFormData({
          ...formData,
          username: '',
          password: ''
        });
      } else {
        // Validate input
        if (!formData.email || !formData.password) {
          throw new Error('Please fill in all fields');
        }

        // Handle login using AuthContext
        const userData = await login({
          email: formData.email,
          password: formData.password
        });

        console.log('User data:', userData);
        // Redirect based on user role
        if (userData.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (userData.role === 'user') {
          navigate('/user/dashboard');
        } else if (userData.role === 'banned') {
          throw new Error('Your account has been banned. Please contact support.');

        } else {
          throw new Error('Invalid user role');
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    setActiveTab('login'); // Force login tab when switching to admin
    resetForm();
  };

  return (
    <LandingContainer>
      <WelcomeTitle>Welcome to ComicZone!</WelcomeTitle>
      <Tagline>Explore. Create. Read. Your comics, your world.</Tagline>

      <AuthContainer>
        {isAdmin && (
          <AdminIndicator>Admin Login</AdminIndicator>
        )}

        {/* Only show tabs for non-admin mode */}
        {!isAdmin && (
          <TabsContainer>
            <Tab
              active={activeTab === 'signup'}
              onClick={() => {
                setActiveTab('signup');
                setShowSuccess(false);
                setError('');
              }}
            >
              Sign Up
            </Tab>
            <Tab
              active={activeTab === 'login'}
              onClick={() => {
                setActiveTab('login');
                setShowSuccess(false);
                setError('');
              }}
            >
              Login
            </Tab>
          </TabsContainer>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Only show username field for user signup */}
          {!isAdmin && activeTab === 'signup' && (
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
          )}

          <Input
            type="email"
            name="email"
            placeholder={isAdmin ? "Admin Email" : "Email"}
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          {(error || authError) && (
            <ErrorMessage>{error || authError}</ErrorMessage>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : (
              isAdmin ? 'Login as Admin' : (activeTab === 'signup' ? 'Sign Up' : 'Login')
            )}
          </Button>

          {!isAdmin && activeTab === 'signup' && (
            <PrivacyText>
              By signing up, you agree to our privacy and policy law
            </PrivacyText>
          )}

          {showSuccess && (
            <SuccessMessage>
              Signed up successfully! Please login to continue.
            </SuccessMessage>
          )}
        </Form>

        <SwitchLink>
          <a onClick={toggleAdmin}>
            {isAdmin ? 'Switch to User' : 'Switch to Admin'}
          </a>
        </SwitchLink>
      </AuthContainer>
    </LandingContainer>
  );
};

export default LandingPage; 