import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
import { ShieldAlert, Mail, Lock, UserCheck, KeyRound, ArrowRight } from 'lucide-react';

const AdminSignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        secretKey: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');

        if (formData.secretKey !== 'HOSPITAL_ADMIN_2026') {
            setError("Unauthorized: Invalid Administrative Key!");
            return;
        }

        if (formData.password !== formData.confirmPassword) { setError("Security Error: Passwords do not match!"); return; }

        setIsProcessing(true);
        try {
            const data = { ...formData, role: 'admin' };
            await axios.post(`${API_BASE_URL}/api/signup`, data);
            setMessage('Administrative Privileges Granted!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Access Initialization Failed');
        } finally {
            setIsProcessing(false);
        }
    };

    const inputClass = "w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 transition-all outline-none text-gray-800 shadow-inner font-medium";
    const labelClass = "block text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-2";

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-xl bg-white rounded-[40px] shadow-[0_20px_50px_rgba(220,38,38,0.15)] overflow-hidden">
                <div className="bg-[#dc2626] p-12 text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 rounded-full -mr-32 -mt-32"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 ring-4 ring-white/20">
                            <ShieldAlert size={44} />
                        </div>
                        <h1 className="text-4xl font-black tracking-tight mb-2 text-center uppercase">Root Access</h1>
                        <p className="text-red-100 font-medium opacity-80 text-center max-w-xs">Initialize administrative protocols for hospital management</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-12">
                    {message && <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl mb-8 text-center font-bold border-2 border-emerald-100 animate-bounce">{message}</div>}
                    {error && <div className="bg-rose-50 text-rose-700 p-4 rounded-2xl mb-8 text-center font-bold border-2 border-rose-100 flex items-center justify-center gap-2">
                        <ShieldAlert size={20} />
                        {error}
                    </div>}

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className={labelClass}>First Name</label>
                            <div className="relative">
                                <UserCheck className="absolute left-4 top-4 text-gray-400" size={20} />
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className={inputClass} placeholder="ADMIN" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Last Name</label>
                            <div className="relative">
                                <UserCheck className="absolute left-4 top-4 text-gray-400" size={20} />
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className={inputClass} placeholder="USER" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className={labelClass}>Corporate Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="admin@hospital.org" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className={labelClass}>Master Security Key</label>
                        <div className="relative">
                            <KeyRound className="absolute left-4 top-4 text-red-500" size={20} />
                            <input type="password" name="secretKey" value={formData.secretKey} onChange={handleChange} required className={`${inputClass} border-red-100 focus:border-red-600`} placeholder="••••••••••••" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-10">
                        <div>
                            <label className={labelClass}>Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required className={inputClass} placeholder="••••" />
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Verify</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className={inputClass} placeholder="••••" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={isProcessing} className="w-full bg-[#0f172a] text-white py-5 rounded-[24px] text-xl font-black uppercase tracking-widest shadow-2xl hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                        {isProcessing ? "Authenticating..." : "INITIALIZE ROOT"}
                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </button>

                    <div className="mt-10 text-center">
                        <Link to="/login" className="text-gray-400 font-bold hover:text-red-600 transition-colors flex items-center justify-center gap-2">
                            Return to Secure Login
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSignUp;
