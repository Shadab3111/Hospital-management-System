import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
import { Stethoscope, Mail, Phone, Lock, Award, FileText, UserPlus } from 'lucide-react';

const DoctorSignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        specialty: '',
        licenseNumber: '',
        phoneNumber: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        if (formData.password !== formData.confirmPassword) { setError("Passwords do not match!"); return; }

        setLoading(true);
        try {
            const data = { ...formData, role: 'doctor' };
            await axios.post(`${API_BASE_URL}/api/signup`, data);
            setMessage('Doctor Account Created Successfully!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Registration Failed');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = "w-full pl-10 pr-4 py-3 bg-white border border-green-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-gray-700";
    const labelStyle = "block text-sm font-bold text-green-800 mb-1 ml-1";

    return (
        <div className="min-h-screen bg-[#f0f9f1] flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-green-50">
                <div className="bg-gradient-to-r from-green-600 to-teal-700 p-10 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="inline-flex p-4 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                            <Stethoscope size={40} />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight">Medical Professional Portal</h2>
                        <p className="text-green-50 mt-2 text-lg">Join our network of elite healthcare providers</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-10">
                    {message && <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-center font-bold border border-green-200 animate-pulse">{message}</div>}
                    {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-center font-bold border border-red-200">{error}</div>}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="relative">
                            <label className={labelStyle}>First Name</label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3.5 text-green-500" size={18} />
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className={inputStyle} placeholder="Dr. John" />
                            </div>
                        </div>
                        <div className="relative">
                            <label className={labelStyle}>Last Name</label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3.5 text-green-500" size={18} />
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className={inputStyle} placeholder="Smith" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="relative">
                            <label className={labelStyle}>Official Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-green-500" size={18} />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} placeholder="john.smith@hospital.com" />
                            </div>
                        </div>
                        <div className="relative">
                            <label className={labelStyle}>Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 text-green-500" size={18} />
                                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className={inputStyle} placeholder="+91 98XXX XXX01" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="relative">
                            <label className={labelStyle}>Medical Specialty</label>
                            <div className="relative">
                                <Award className="absolute left-3 top-3.5 text-green-500" size={18} />
                                <select name="specialty" value={formData.specialty} onChange={handleChange} required className={`${inputStyle} appearance-none`}>
                                    <option value="">Choose Specialization</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="Orthopedics">Orthopedics</option>
                                    <option value="General Medicine">General Medicine</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative">
                            <label className={labelStyle}>License Number</label>
                            <div className="relative">
                                <Award className="absolute left-3 top-3.5 text-green-500" size={18} />
                                <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required className={inputStyle} placeholder="MCI-12345" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="relative">
                            <label className={labelStyle}>Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-green-500" size={18} />
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required className={inputStyle} placeholder="••••••••" />
                            </div>
                        </div>
                        <div className="relative">
                            <label className={labelStyle}>Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-green-500" size={18} />
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className={inputStyle} placeholder="••••••••" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-teal-700 text-white font-black py-4 rounded-2xl text-xl shadow-lg hover:shadow-green-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                        {loading ? "Verifying Credentials..." : "REGISTER AS DOCTOR"}
                        <UserPlus size={24} />
                    </button>

                    <div className="mt-8 text-center pt-6 border-t border-gray-100">
                        <p className="text-gray-500 mb-4">Are you a <Link to="/signup" className="text-green-600 font-bold hover:underline">Patient</Link> or <Link to="/admin/signup" className="text-green-600 font-bold hover:underline">Admin</Link>?</p>
                        <p className="text-gray-400 text-sm italic">Secure professional registration protected by 256-bit encryption</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorSignUp;
