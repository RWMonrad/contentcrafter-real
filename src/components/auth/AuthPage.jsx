import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import logo from '../../assets/logo.png';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <img src={logo} alt="ContentCrafter" className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">
            <span className="font-inter">Content</span>
            <span className="font-serif">Crafter</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            AI-Powered Social Media Content Generator
          </p>
        </div>

        {/* Auth forms */}
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;

