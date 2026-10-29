import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_CREDENTIALS } from '../services/auth';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotNote, setShowForgotNote] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Already signed in? Skip the login screen.
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = location.state?.from?.pathname || '/admin';
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, location.state, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    const fieldErrors = validate({ email, password });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    const { error } = await login({ email, password, remember });

    if (error) {
      setSubmitting(false);
      setErrors({ form: error.message });
      return;
    }

    const redirectTo = location.state?.from?.pathname || '/admin';
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bone-200 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-11 w-11 items-center justify-center border border-brass-500 font-display text-xl text-brass-600">
            K
          </div>
          <p className="mt-3 font-display text-2xl text-ink-800">Kemzy Boutique</p>
          <p className="text-[11px] uppercase tracking-widest2 text-ink-300">
            Boutique Admin
          </p>
        </div>

        {/* Card */}
        <div className="border border-ink-100 bg-white px-6 py-8 sm:px-8">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl text-ink-800">Admin Portal</h1>
            <p className="mt-1 text-sm text-ink-400">
              Sign in to manage your store.
            </p>
          </div>

          {errors.form && (
            <div className="mb-5 flex items-start gap-2.5 border border-wine-500/30 bg-wine-50 px-3.5 py-3 text-sm text-wine-600">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <p>{errors.form}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email || errors.form) {
                    setErrors((prev) => ({ ...prev, email: undefined, form: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full border bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none ${
                  errors.email
                    ? 'border-wine-500 focus:border-wine-500'
                    : 'border-ink-100 focus:border-brass-500'
                }`}
                placeholder="you@kemzyboutique.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-wine-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-ink-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotNote((v) => !v)}
                  className="text-xs font-medium text-brass-600 hover:text-brass-700"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password || errors.form) {
                      setErrors((prev) => ({ ...prev, password: undefined, form: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={`w-full border bg-white px-3.5 py-2.5 pr-11 text-sm text-ink-800 placeholder:text-ink-300 focus:outline-none ${
                    errors.password
                      ? 'border-wine-500 focus:border-wine-500'
                      : 'border-ink-100 focus:border-brass-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-ink-300 hover:text-ink-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-xs text-wine-600">
                  {errors.password}
                </p>
              )}
              {showForgotNote && (
                <p className="mt-1.5 text-xs text-ink-400">
                  Password resets aren't available yet — contact your store administrator.
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 accent-[#AD8A4E]"
              />
              <label htmlFor="remember" className="text-sm text-ink-600">
                Remember me on this device
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 bg-ink-800 py-2.5 text-sm font-medium text-bone-100 transition-colors hover:bg-ink-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-ink-300">
          Demo credentials — {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
        </p>
      </div>
    </div>
  );
}
