import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from 'lucide-react';
import { Button, Input } from '../../components/ui';
import { AuthLayout } from '../../components/layouts';
import styles from './Auth.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Navigate to login after successful registration
      navigate('/login', { state: { message: 'Account created successfully. Please sign in.' } });
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Create an account</h1>
          <p className={styles.formSubtitle}>
            Join our smart waste management platform
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.errorAlert}>
              {error}
            </div>
          )}

          <Input
            type="text"
            name="name"
            label="Full name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            leftIcon={<User size={18} />}
            required
          />

          <Input
            type="email"
            name="email"
            label="Email address"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            leftIcon={<Mail size={18} />}
            required
          />

          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
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
            helperText="Must be at least 8 characters"
            required
          />

          <Input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            label="Confirm password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            leftIcon={<Lock size={18} />}
            required
          />

          <div className={styles.termsCheck}>
            <label className={styles.rememberMe}>
              <input type="checkbox" className={styles.checkbox} required />
              <span>
                I agree to the{' '}
                <Link to="/terms" className={styles.termsLink}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className={styles.termsLink}>
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            leftIcon={<UserPlus size={18} />}
          >
            Create account
          </Button>
        </form>

        <div className={styles.formFooter}>
          <p>
            Already have an account?{' '}
            <Link to="/login" className={styles.authLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
