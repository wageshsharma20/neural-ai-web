import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import './LoginTerminal.css';

const AUTH_LOG = [
  { delay: 0,    text: '',                                          type: 'blank'   },
  { delay: 250,  text: 'Authenticating...',                        type: 'muted'   },
  { delay: 750,  text: '\x1b[32m●\x1b[0m  Credentials verified',  type: 'ok'      },
  { delay: 500,  text: '\x1b[32m●\x1b[0m  Session token issued',  type: 'ok'      },
  { delay: 400,  text: '2FA challenge dispatched to device',       type: 'muted'   },
  { delay: 700,  text: '\x1b[32m●\x1b[0m  Redirecting...',        type: 'ok'      },
];

function pause(ms) { return new Promise(r => setTimeout(r, ms)); }

export default function LoginPage() {
  const navigate = useNavigate();
  const [phase, setPhase]       = useState('email');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [runLines, setRunLines] = useState([]);
  const [blink, setBlink]       = useState(true);
  const screenRef   = useRef(null);
  const emailRef    = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const s = screenRef.current;
    if (s) s.scrollTop = s.scrollHeight;
  });

  useEffect(() => {
    if (phase === 'email')    setTimeout(() => emailRef.current?.focus(), 60);
    if (phase === 'password') setTimeout(() => passwordRef.current?.focus(), 60);
  }, [phase]);

  const submitEmail = (e) => {
    e.preventDefault();
    if (email.trim()) setPhase('password');
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    setPhase('running');
    for (const log of AUTH_LOG) {
      await pause(log.delay);
      setRunLines(prev => [...prev, log]);
    }
    await pause(400);
    navigate('/2fa');
  };

  return (
    <PageLayout>
      <div className="trm-page">
        <div className="trm-window fade-in">

          {/* ── Toolbar ── */}
          <div className="trm-bar">
            <div className="trm-lights">
              <span className="trm-light trm-light--r" />
              <span className="trm-light trm-light--y" />
              <span className="trm-light trm-light--g" />
            </div>
            <span className="trm-bar-title">neural-auth — zsh</span>
            <div style={{ width: 56 }} />
          </div>

          {/* ── Shell screen ── */}
          <div className="trm-screen" ref={screenRef}>

            {/* Static header */}
            <p className="trm-header-line">
              <span className="sh-dim">Last login: {new Date().toDateString()} on ttys001</span>
            </p>
            <p className="trm-header-line trm-header-line--gap">
              <span className="sh-dim">neural-ai-portal</span>
              <span className="sh-sep"> · </span>
              <span className="sh-dim">secure auth shell v2.4</span>
            </p>

            {/* Email prompt */}
            {phase === 'email' && (
              <form onSubmit={submitEmail} className="trm-row">
                <Ps1 />
                <span className="sh-cmd">login</span>
                <span className="sh-flag"> --user</span>
                <span className="sh-op">=</span>
                <input
                  ref={emailRef}
                  className="trm-input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="you@dtu.ac.in"
                />
                <span className={`trm-cur ${blink ? 'trm-cur--on' : ''}`} />
              </form>
            )}

            {/* Locked email */}
            {(phase === 'password' || phase === 'running') && (
              <div className="trm-row trm-row--done">
                <Ps1 />
                <span className="sh-cmd">login</span>
                <span className="sh-flag"> --user</span>
                <span className="sh-op">=</span>
                <span className="sh-str">{email}</span>
              </div>
            )}

            {/* Password prompt */}
            {phase === 'password' && (
              <form onSubmit={submitPassword} className="trm-row">
                <Ps1 />
                <span className="sh-cmd">login</span>
                <span className="sh-flag"> --password</span>
                <span className="sh-op">=</span>
                <input
                  ref={passwordRef}
                  className="trm-input trm-input--pw"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="enter password"
                />
                <span className={`trm-cur ${blink ? 'trm-cur--on' : ''}`} />
                <button type="submit" hidden />
              </form>
            )}

            {/* Locked password */}
            {phase === 'running' && (
              <div className="trm-row trm-row--done">
                <Ps1 />
                <span className="sh-cmd">login</span>
                <span className="sh-flag"> --password</span>
                <span className="sh-op">=</span>
                <span className="sh-masked">{'*'.repeat(Math.max(password.length, 8))}</span>
              </div>
            )}

            {/* Auth log */}
            {runLines.map((l, i) => (
              <div key={i} className={`trm-log-line trm-log-line--${l.type}`}>
                {l.text || '\u00A0'}
              </div>
            ))}

          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function Ps1() {
  return (
    <span className="ps1">
      <span className="ps1-user">neural</span>
      <span className="ps1-at">@</span>
      <span className="ps1-host">dtu</span>
      <span className="ps1-sep"> </span>
      <span className="ps1-dir">~/portal</span>
      <span className="ps1-pct"> % </span>
    </span>
  );
}
