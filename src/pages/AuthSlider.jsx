import React, { useState } from 'react';
import './AuthSlider.css';
import { Button } from '../components';


const AuthSlider = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  // Sign Up form state
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation helpers
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const isSignupValid = () =>
    signup.name.trim() &&
    validateEmail(signup.email) &&
    validatePassword(signup.password) &&
    signup.password === signup.confirmPassword &&
    signup.terms;

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignup({ ...signup, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess(false);
    if (!isSignupValid()) {
      setSignupError('Please fill all fields correctly.');
      return;
    }
    setLoading(true);
    // Simulate async registration (replace with Appwrite logic)
    setTimeout(() => {
      setSignupSuccess(true);
      setLoading(false);
      setSignup({ name: '', email: '', password: '', confirmPassword: '', terms: false });
    }, 1200);
  };

  return (
    <div>
      <div className={`container${rightPanelActive ? ' right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignupSubmit}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <span></span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={signup.name}
              onChange={handleSignupChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signup.email}
              onChange={handleSignupChange}
              required
              style={signup.email && !validateEmail(signup.email) ? { border: '1.5px solid #ff4b2b' } : {}}
            />
            {signup.email && !validateEmail(signup.email) && (
              <span style={{ color: '#ff4b2b', fontSize: 12 }}>Enter a valid email.</span>
            )}
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={signup.password}
                onChange={handleSignupChange}
                required
                style={signup.password && !validatePassword(signup.password) ? { border: '1.5px solid #ff4b2b' } : {}}
              />
              <span 
                style={{ position: 'absolute', right: 16, top: 16, cursor: 'pointer', fontSize: 13, color: '#ff4b2b' }}
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            {signup.password && !validatePassword(signup.password) && (
              <span style={{ color: '#ff4b2b', fontSize: 12 }}>Password must be at least 6 characters.</span>
            )}
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signup.confirmPassword}
              onChange={handleSignupChange}
              required
              style={signup.confirmPassword && signup.password !== signup.confirmPassword ? { border: '1.5px solid #ff4b2b' } : {}}
            />
            {signup.confirmPassword && signup.password !== signup.confirmPassword && (
              <span style={{ color: '#ff4b2b', fontSize: 12 }}>Passwords do not match.</span>
            )}

            <Button type="submit" variant="primary" loading={loading} style={{ width: '100%', marginTop: 8 }}>
              Continue
            </Button>
            {signupError && <div style={{ color: '#ff4b2b', marginTop: 8 }}>{signupError}</div>}
            {signupSuccess && <div style={{ color: 'green', marginTop: 8 }}>Registration successful!</div>}
            <div style={{ marginTop: 12, fontSize: 13 }}>
              Already have an account?{' '}
              <span
                style={{ color: '#ff4b2b', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => setRightPanelActive(false)}
              >
                Sign in
              </span>
            </div>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={e => { e.preventDefault(); /* handle sign in */ }}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <Button type="submit" variant="secondary" loading={false}>Sign In</Button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => setRightPanelActive(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={() => setRightPanelActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AuthSlider;
