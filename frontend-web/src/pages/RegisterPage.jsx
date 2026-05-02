import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, IdCard, GraduationCap, Calendar, Mail, Upload, Lock } from 'lucide-react';
import '../styles/RegisterPage.css';
import api from '../api/axios';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await api.post('/accounts/register/', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role: "student"
      });

      console.log('Registration successful', response.data);
      navigate('/success', { state: { firstName, lastName } });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during registration.');
      }
    }
  };

  return (
    <main className="register-page-container">
      <div className="register-bg-image">
        <div className="register-bg-overlay"></div>
      </div>

      <section className="register-card">
        <section className="register-left-panel">

          <img 
            src="/regquest-icon.png" 
            alt="RegQuest Icon" 
            style={{ width: '80px', height: 'auto', marginBottom: '2rem', zIndex: 10, position: 'relative', alignSelf: 'center' }} 
          />

          <h2 className="register-welcome-title">
            WELCOME to<br />RegQuest
          </h2>
          <p className="register-welcome-subtitle">
            Fill up the information
          </p>
        </section>

        <section className="register-right-panel">
          <header className="register-form-header">
            <h3 className="register-form-title">Create Account</h3>
            <p className="register-step-indicator">
              Step {step} of 2 &nbsp; {step === 1 ? 'Personal Details' : 'Account Details'}
            </p>
          </header>

          <form className="register-form" onSubmit={handleRegister}>

            {step === 1 && (
              <>
                <div className="input-group">
                  <label className="input-label">First Name</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <User className="icon-svg" />
                    </div>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Provide your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Last Name</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <User className="icon-svg" />
                    </div>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Provide your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Student ID</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <IdCard className="icon-svg" />
                    </div>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Provide your student ID" 
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Program / Course</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <GraduationCap className="icon-svg" />
                    </div>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Provide course/program" 
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Year Level</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Calendar className="icon-svg" />
                    </div>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Provide your year level" 
                    />
                  </div>
                </div>

                <div className="register-buttons">
                  <button onClick={nextStep} className="register-btn-next">Next Step</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Mail className="icon-svg" />
                    </div>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="Enter your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Upload School ID</label>
                  <label className="file-upload-label">
                    <Upload className="h-8 w-5" />
                    Upload File (.png, .jpg, .jpeg)
                    <input type="file" className="hidden" style={{ display: 'none' }} />
                  </label>
                </div>

                <div className="input-group">
                  <label className="input-label">Password</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Lock className="icon-svg" />
                    </div>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Confirm Password</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <Lock className="icon-svg" />
                    </div>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="Re-enter your password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}

                <div className="register-buttons">
                  <button onClick={prevStep} className="register-btn-back">Back</button>
                  <button onClick={handleRegister} className="btn-register">Register</button>
                </div>
              </>
            )}

            <footer className="form-footer">
              <p className="register-text">
                Already have an account?{' '}
                <Link to="/" className="register-link">
                  Login here
                </Link>
              </p>
            </footer>

          </form>
        </section>
      </section>
    </main>
  );
};
export default RegisterPage;