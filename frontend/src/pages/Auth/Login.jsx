import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { AuthLayout } from '../../components/layouts';
import useAuthStore from '../../context/authStore';
import styles from './Auth.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock login - replace with actual API call
      setUser({
        id: 1,
        email,
        name: 'Admin User',
        role: 'admin',
      });
      
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Welcome back</h1>
          <p className={styles.formSubtitle}>
            Sign in to your account to continue
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.errorAlert}>
              {error}
            </div>
          )}

          <Input
            type="email"
            label="Email address"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail size={18} />}
            required
          />

          <div className={styles.passwordField}>
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={18} />}
              rightIcon={
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              required
            />
          </div>

          <div className={styles.formOptions}>
            <label className={styles.rememberMe}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            leftIcon={<LogIn size={18} />}
          >
            Sign in
          </Button>
        </form>

        <div className={styles.formFooter}>
          <p>
            Don't have an account?{' '}
            <Link to="/register" className={styles.authLink}>
              Create one
            </Link>
          </p>
        </div>

        <div className={styles.demoCredentials}>
          <p className={styles.demoTitle}>Demo Credentials</p>
          <p className={styles.demoText}>Email: admin@smartwaste.com</p>
          <p className={styles.demoText}>Password: demo123</p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
