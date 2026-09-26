import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import { Eye, EyeOff, User, Mail, Phone, Lock, ChevronRight } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";
    if (!formData.email) newErrors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Required";
    if (!formData.password) newErrors.password = "Required";
    else if (formData.password.length < 6) newErrors.password = "Min 6 chars";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Match failed";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    try {
      const response = await axios.post(`${API_BASE_URL}/api/signup`, {
        ...formData,
        role: 'patient'
      });

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup Error Detail:', error);
      const msg = error.response?.data?.message || error.message || "Registration failed";
      setErrors({ submit: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
          <div className="inline-block p-3 bg-white/10 rounded-full mb-4">
            <User size={32} />
          </div>
          <h2 className="text-3xl font-bold">Patient Registration</h2>
          <p className="text-blue-100 mt-2">Join our healthcare community today</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-sm font-semibold text-gray-600 ml-1">First Name</label>
                <input 
                  name="firstName" value={formData.firstName} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none mt-1"
                  placeholder="John"
                />
                {errors.firstName && <span className="text-red-500 text-xs ml-1">{errors.firstName}</span>}
              </div>
              <div className="relative">
                <label className="text-sm font-semibold text-gray-600 ml-1">Last Name</label>
                <input 
                  name="lastName" value={formData.lastName} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none mt-1"
                  placeholder="Doe"
                />
                {errors.lastName && <span className="text-red-500 text-xs ml-1">{errors.lastName}</span>}
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email}</span>}
            </div>

            <div className="relative">
              <label className="text-sm font-semibold text-gray-600 ml-1">Phone Number</label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
              {errors.phoneNumber && <span className="text-red-500 text-xs ml-1">{errors.phoneNumber}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-sm font-semibold text-gray-600 ml-1">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="text-red-500 text-xs ml-1">{errors.password}</span>}
              </div>
              <div className="relative">
                <label className="text-sm font-semibold text-gray-600 ml-1">Confirm</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <span className="text-red-500 text-xs ml-1">{errors.confirmPassword}</span>}
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
                {errors.submit}
              </div>
            )}

            <button
              type="submit" disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              <ChevronRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center space-y-3">
            <p className="text-gray-500 text-sm">
              Already have an account?
              <button onClick={() => navigate('/login')} className="text-blue-600 font-bold ml-1 hover:underline">Log in</button>
            </p>
            <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
              <span className="h-px w-8 bg-gray-200"></span>
              <span>OR REGISTER AS</span>
              <span className="h-px w-8 bg-gray-200"></span>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => navigate('/doctor/signup')} className="text-blue-600 font-semibold border border-blue-200 px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors">Doctor</button>
              <button onClick={() => navigate('/admin/signup')} className="text-indigo-600 font-semibold border border-indigo-200 px-4 py-1.5 rounded-full hover:bg-indigo-50 transition-colors">Admin</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
