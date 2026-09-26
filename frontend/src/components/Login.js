import React, { useState } from 'react';
import { Shield, User, Stethoscope, Eye, EyeOff, Lock, Mail, ChevronRight, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 'admin', label: 'Admin', icon: Shield, color: 'hover:bg-red-500', active: 'bg-red-600' },
    { id: 'patient', label: 'Patient', icon: User, color: 'hover:bg-blue-500', active: 'bg-blue-600' },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'hover:bg-green-500', active: 'bg-green-600' },
  ];

  const currentRole = roles.find(r => r.id === selectedRole);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
        role: selectedRole
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userEmail', email);

        const paths = { admin: '/admin', doctor: '/doctor', patient: '/patient' };
        navigate(paths[data.role] || '/');
      }
    } catch (err) {
      console.error('Login Error Detail:', err);
      const msg = err.response?.data?.error || err.message || 'Connection failed';
      if (err.message === 'Network Error') {
        setError(`Network Error: Cannot reach ${API_BASE_URL}. Check if your Laptop and Phone are on same WiFi.`);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[1000px] bg-white rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Side - Visual */}
        <div className={`hidden md:flex md:w-1/2 p-12 flex-col justify-between transition-colors duration-500 ${currentRole.active}`}>
          <div className="text-white">
            <h1 className="text-5xl font-black mb-6 leading-tight uppercase tracking-tighter">
              Health<br/>Care<br/>Portal
            </h1>
            <p className="text-white/80 text-lg font-medium max-w-xs">
              Securely access your medical dashboard and manage healthcare services.
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <currentRole.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase opacity-60">Logging in as</p>
                <p className="text-xl font-bold">{currentRole.label}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-800 mb-2">Welcome Back</h2>
            <p className="text-slate-400 font-medium">Please enter your credentials below</p>
          </div>

          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl mb-8">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 font-bold text-sm ${
                  selectedRole === role.id
                    ? `${role.active} text-white shadow-lg`
                    : 'text-slate-500 hover:bg-slate-200'
                }`}
              >
                <role.icon size={16} />
                <span className="hidden sm:inline">{role.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="text-xs font-black text-slate-400 uppercase ml-4 mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-slate-200 transition-all outline-none font-medium"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-black text-slate-400 uppercase ml-4 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-slate-200 transition-all outline-none font-medium"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="flex items-center gap-1.5 text-sm font-bold text-indigo-500 hover:text-indigo-700 transition-all hover:underline"
                >
                  <HelpCircle size={14} />
                  Forgot Password?
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className={`w-full py-5 rounded-2xl text-white font-black text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 ${currentRole.active} hover:brightness-110 hover:shadow-2xl`}
            >
              {loading ? "AUTHENTICATING..." : `LOGIN AS ${selectedRole.toUpperCase()}`}
              <ChevronRight size={24} />
            </button>
          </form>

          <div className="mt-10 text-center border-t border-slate-100 pt-8">
            <p className="text-slate-400 font-bold text-sm">
              New to HealthCare?{' '}
              <button onClick={() => navigate('/signup')} className="text-blue-600 hover:underline decoration-2 underline-offset-4">
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
