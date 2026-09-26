import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import { KeyRound, Mail, Shield, User, Stethoscope, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('patient');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const roles = [
        { id: 'admin', label: 'Admin', icon: Shield, active: 'bg-red-600', text: 'text-red-600' },
        { id: 'patient', label: 'Patient', icon: User, active: 'bg-blue-600', text: 'text-blue-600' },
        { id: 'doctor', label: 'Doctor', icon: Stethoscope, active: 'bg-green-600', text: 'text-green-600' },
    ];

    const currentRole = roles.find(r => r.id === role);

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post(`${API_BASE_URL}/api/reset-password`, {
                email,
                role,
                newPassword
            });
            setMessage(response.data.message);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.error || "Reset failed. Check your email and role.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
                <div className={`p-10 text-white text-center relative transition-colors duration-500 ${currentRole.active}`}>
                    <button
                        onClick={() => navigate('/login')}
                        className="absolute left-6 top-8 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="inline-block p-4 bg-white/20 backdrop-blur-md rounded-3xl mb-4 shadow-inner">
                        <KeyRound size={36} />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">Recovery</h2>
                    <p className="text-white/80 font-medium mt-1">Reset your portal access</p>
                </div>

                <div className="p-10">
                    <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl mb-8">
                        {roles.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setRole(r.id)}
                                className={`flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all ${
                                    role === r.id ? `${r.active} text-white shadow-lg` : 'text-slate-500 hover:bg-slate-200'
                                }`}
                            >
                                <r.icon size={14} />
                                {r.label}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleReset} className="space-y-6">
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-2 block">Registered Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                <input
                                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-slate-200 outline-none transition-all font-medium"
                                    placeholder="your-email@hospital.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase ml-2 mb-2 block">New Secure Password</label>
                            <div className="relative">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                <input
                                    type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-slate-200 outline-none transition-all font-medium"
                                    placeholder="Minimum 6 characters"
                                    minLength="6"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-2 animate-shake">
                                <AlertCircle size={18} />
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-sm font-bold border border-emerald-100 flex items-center gap-2">
                                <CheckCircle2 size={18} />
                                {message}
                            </div>
                        )}

                        <button
                            type="submit" disabled={loading}
                            className={`w-full py-5 rounded-2xl text-white font-black text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 ${currentRole.active} hover:brightness-110 hover:shadow-2xl`}
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : "UPDATE PASSWORD"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
