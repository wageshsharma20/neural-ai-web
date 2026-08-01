import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import './Auth.css';

function TwoFAPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/portal');
  };

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^[0-9]*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance
    if (value !== '' && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6).split('');
    if (pasteData.every(char => /^[0-9]$/.test(char))) {
      const newCode = [...code];
      pasteData.forEach((char, i) => {
        newCode[i] = char;
      });
      setCode(newCode);
      if (pasteData.length < 6) {
        inputRefs[pasteData.length].current.focus();
      } else {
        inputRefs[5].current.focus();
      }
    }
  };

  return (
    <PageLayout>
      <div className="auth-page">
        <div className="auth-card fade-in">
          <p className="eyebrow auth-eyebrow">Two-Factor Auth</p>
          <h1 className="auth-heading">Verify Identity.</h1>
          <p className="auth-subhead">Enter the 6-digit code sent to your registered device.</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-code-container">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  className="auth-code-input"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                />
              ))}
            </div>
            
            <button type="submit" className="auth-submit">
              Verify &amp; Proceed →
            </button>
            <div className="auth-resend">
              <span>Didn't receive a code? </span>
              <button type="button" className="auth-resend-btn" onClick={() => {}}>Resend</button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}

export default TwoFAPage;
