import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar, Clock, FileText, User, Users, ChevronDown,
  Home, UserCircle, Eye, EyeOff, Hospital, Stethoscope,
  Activity, DollarSign, UserPlus, ShieldCheck, Camera,
  LayoutDashboard, LogOut, Settings, Bell, Search,
  TrendingUp, TrendingDown, Menu, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

// Utility for formatting numbers
const formatNumber = (num) => new Intl.NumberFormat().format(num);

export default function AdminDashboard() {
  const [showDoctors, setShowDoctors] = useState(false);
  const [showPatients, setShowPatients] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [editedInfo, setEditedInfo] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [doctorData, setDoctorData] = useState({
    firstName: '', lastName: '', email: '', specialty: '',
    licenseNumber: '', phoneNumber: '', password: ''
  });
  const [adminData, setAdminData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
  });

  const [showDoctorPassword, setShowDoctorPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [doctorOverview, setDoctorOverview] = useState([]);
  const [patientOverview, setPatientOverview] = useState([]);
  const [hospitalCapacity] = useState(10000);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminProfile();
    fetchTotalDoctors();
    fetchTotalPatients();
    fetchDoctorOverview();
    fetchPatientOverview();
  }, []);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'ngrok-skip-browser-warning': 'true'
  });

  const fetchAdminProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/profile`, { headers: getHeaders() });
      if (response.ok) {
        const data = await response.json();
        setAdminInfo(data);
        setEditedInfo(data);
      } else if (response.status === 401) navigate('/login');
    } catch (error) { console.error('Error:', error); }
  };

  const fetchTotalDoctors = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/total-doctors`, { headers: getHeaders() });
      if (response.ok) {
        const data = await response.json();
        setTotalDoctors(data.totalDoctors);
      }
    } catch (error) { console.error('Error:', error); }
  };

  const fetchTotalPatients = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/total-patients`, { headers: getHeaders() });
      if (response.ok) {
        const data = await response.json();
        setTotalPatients(data.totalPatients);
      }
    } catch (error) { console.error('Error:', error); }
  };

  const fetchDoctorOverview = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/doctor-overview`, { headers: getHeaders() });
      if (response.ok) setDoctorOverview(await response.json());
    } catch (error) { console.error('Error:', error); }
  };

  const fetchPatientOverview = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/patient-overview`, { headers: getHeaders() });
      if (response.ok) setPatientOverview(await response.json());
    } catch (error) { console.error('Error:', error); }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedInfo(prev => ({ ...prev, profileImage: reader.result }));
        // If not in editing mode, trigger immediate update
        if (!isEditing) updateProfile({ ...adminInfo, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfile = async (info) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/profile`, {
        method: 'PUT',
        headers: { ...getHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
      });
      if (response.ok) {
        const res = await response.json();
        setAdminInfo(res.admin);
        setIsEditing(false);
      }
    } catch (error) { alert('Error updating profile'); }
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const StatCard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-white/50 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative">
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 ${color}`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-black text-slate-800">{value}</h3>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${color} text-white shadow-lg shadow-opacity-20`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    const occupancyRate = ((totalPatients / hospitalCapacity) * 100).toFixed(1);
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Doctors" value={totalDoctors} icon={Stethoscope} color="bg-indigo-500" trend="up" trendValue="+2 this week" />
          <StatCard title="Total Patients" value={totalPatients} icon={Users} color="bg-blue-500" trend="up" trendValue="+14% increase" />
          <StatCard title="Bed Occupancy" value={`${occupancyRate}%`} icon={Activity} color="bg-rose-500" trend="down" trendValue="-3% from yesterday" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Doctor List Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white/50 shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Stethoscope className="text-indigo-500" />
                Medical Staff
              </h3>
              <button onClick={() => navigate('/admin')} className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {doctorOverview.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-black">
                      {doc.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{doc.name}</p>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">{doc.specialty}</p>
                    </div>
                  </div>
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-black">
                    {doc.patients} Patients
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Overview Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white/50 shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Users className="text-blue-500" />
                Patient Flow
              </h3>
              <button className="text-blue-600 font-bold text-sm hover:underline">Analytics</button>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {patientOverview.map((pat, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black">
                      {pat.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{pat.name}</p>
                      <p className="text-xs text-slate-500 font-medium">Last checkup: Today</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-700">{pat.appointments}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Visits</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    if (!adminInfo) return <div className="text-white font-bold animate-pulse">Establishing Secure Session...</div>;
    return (
      <div className="max-w-4xl mx-auto animate-in zoom-in duration-500">
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-2xl overflow-hidden">
          {/* Cover Area */}
          <div className="h-48 bg-gradient-to-r from-slate-800 to-slate-900 relative">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}}></div>
          </div>

          <div className="px-10 pb-10">
            <div className="relative -mt-24 mb-8 flex flex-col items-center">
              <div className="relative group">
                <div className="w-40 h-40 rounded-[2.5rem] bg-white p-2 shadow-2xl ring-8 ring-white/20">
                  {editedInfo?.profileImage ? (
                    <img src={editedInfo.profileImage} alt="Admin" className="w-full h-full rounded-[2rem] object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-400">
                      <User size={64} />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-4 rounded-2xl shadow-xl hover:bg-indigo-700 transition-all scale-90 group-hover:scale-100"
                >
                  <Camera size={20} />
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mt-6">{adminInfo.firstName} {adminInfo.lastName}</h2>
              <span className="bg-indigo-100 text-indigo-700 px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mt-2 border border-indigo-200">System Administrator</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Legal First Name</label>
                <input
                  value={isEditing ? editedInfo.firstName : adminInfo.firstName}
                  onChange={(e) => setEditedInfo({...editedInfo, firstName: e.target.value})}
                  readOnly={!isEditing}
                  className={`w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none font-bold ${isEditing ? 'bg-white border-indigo-500 text-slate-800' : 'bg-slate-50 border-transparent text-slate-500'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Legal Last Name</label>
                <input
                  value={isEditing ? editedInfo.lastName : adminInfo.lastName}
                  onChange={(e) => setEditedInfo({...editedInfo, lastName: e.target.value})}
                  readOnly={!isEditing}
                  className={`w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none font-bold ${isEditing ? 'bg-white border-indigo-500 text-slate-800' : 'bg-slate-50 border-transparent text-slate-500'}`}
                />
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Corporate Identity Email</label>
              <input
                value={isEditing ? editedInfo.email : adminInfo.email}
                onChange={(e) => setEditedInfo({...editedInfo, email: e.target.value})}
                readOnly={!isEditing}
                className={`w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none font-bold ${isEditing ? 'bg-white border-indigo-500 text-slate-800' : 'bg-slate-50 border-transparent text-slate-500'}`}
              />
            </div>

            <div className="mt-12 flex justify-center gap-4">
              {isEditing ? (
                <>
                  <button onClick={() => updateProfile(editedInfo)} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-indigo-700 transition-all active:scale-95">SAVE PROTOCOL</button>
                  <button onClick={() => setIsEditing(false)} className="bg-slate-100 text-slate-600 px-10 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all">ABORT</button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition-all flex items-center gap-3 uppercase tracking-widest">
                  <Settings size={20} />
                  Configure Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-wider ${
        activeTab === id
          ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/40 translate-x-2'
          : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#e0e7ff_0%,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#f0f9ff_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'}}></div>
      </div>

      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/40">
              <Hospital className="text-white" size={28} />
            </div>
            <h1 className="text-xl font-black text-slate-800 leading-none">CORE<br/><span className="text-indigo-600">ADMIN</span></h1>
            <button className="lg:hidden ml-auto" onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
          </div>

          <div className="flex-1 space-y-2">
            <SidebarItem id="Dashboard" icon={LayoutDashboard} label="Dashboard" />
            <SidebarItem id="Profile" icon={UserCircle} label="Identity" />
            <SidebarItem id="Add Doctor" icon={UserPlus} label="Staff Recruitment" />
            <SidebarItem id="Add Admin" icon={ShieldCheck} label="Access Control" />
          </div>

          <div className="mt-auto border-t border-slate-100 pt-8">
            <div className="bg-slate-50 p-4 rounded-2xl mb-4 flex items-center gap-3 border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-indigo-600">
                {adminInfo?.firstName?.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-slate-800 truncate">{adminInfo?.firstName}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Root Level Access</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-500 font-black text-sm uppercase hover:bg-rose-50 transition-all active:scale-95"
            >
              <LogOut size={20} />
              Terminate Session
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10 p-6 lg:p-12 custom-scrollbar">
        {/* Header - Top Bar */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-white rounded-2xl shadow-sm border border-slate-100"><Menu size={20} /></button>
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                {activeTab === 'Dashboard' ? 'Hospital Pulse' : activeTab}
              </h2>
              <p className="text-slate-400 font-medium">August 22, 2026 • Monitoring Active</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm">
              <Search size={18} className="text-slate-400" />
              <input placeholder="Search protocols..." className="bg-transparent border-none outline-none px-3 font-medium text-sm w-48" />
            </div>
            <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-400 relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="pb-12">
          {activeTab === 'Dashboard' && renderDashboard()}
          {activeTab === 'Profile' && renderProfile()}
          {activeTab === 'Add Doctor' && <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><AddDoctorForm getHeaders={getHeaders} /></div>}
          {activeTab === 'Add Admin' && <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><AddAdminForm getHeaders={getHeaders} /></div>}
        </div>
      </main>
    </div>
  );
}

// Sub-components for cleaner structure
const AddDoctorForm = ({ getHeaders }) => {
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', specialty: '', licenseNumber: '', phoneNumber: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/add-doctor`, {
        method: 'POST',
        headers: { ...getHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) alert('Doctor successfully recruited');
      else alert('Recruitment failed');
    } catch (err) { alert('Network Error'); }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[3rem] border border-white shadow-2xl p-10 max-w-3xl mx-auto">
      <h3 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-widest text-center">Recruitment Portal</h3>
      <form onSubmit={submit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <input placeholder="First Name" onChange={e => setData({...data, firstName: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold" required />
          <input placeholder="Last Name" onChange={e => setData({...data, lastName: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold" required />
        </div>
        <input type="email" placeholder="Official Email Address" onChange={e => setData({...data, email: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold" required />
        <div className="grid grid-cols-2 gap-6">
          <select onChange={e => setData({...data, specialty: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold appearance-none">
            <option value="">Choose Specialization</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General Medicine">General Medicine</option>
          </select>
          <input placeholder="Medical License ID" onChange={e => setData({...data, licenseNumber: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold" required />
        </div>
        <div className="relative">
          <input type={showPass ? "text" : "password"} placeholder="System Access Password" onChange={e => setData({...data, password: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold" required />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-5 text-slate-400">{showPass ? <EyeOff size={20} /> : <Eye size={20} />}</button>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-[1.01] active:scale-95 transition-all">VALIDATE & ADD DOCTOR</button>
      </form>
    </div>
  );
};

const AddAdminForm = ({ getHeaders }) => {
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });

  const submit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) return alert('Security Mismatch: Passwords do not match');
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/add-admin`, {
        method: 'POST',
        headers: { ...getHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) alert('Administrative Privileges Granted');
      else alert('Permission Denied');
    } catch (err) { alert('Network Failure'); }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[3rem] border border-white shadow-2xl p-10 max-w-3xl mx-auto">
      <h3 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-widest text-center">Root Access Delegation</h3>
      <form onSubmit={submit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <input placeholder="Protocol First Name" onChange={e => setData({...data, firstName: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 outline-none font-bold" required />
          <input placeholder="Protocol Last Name" onChange={e => setData({...data, lastName: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 outline-none font-bold" required />
        </div>
        <input type="email" placeholder="Restricted Email ID" onChange={e => setData({...data, email: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 outline-none font-bold" required />
        <div className="grid grid-cols-2 gap-6">
          <input type="password" placeholder="System Key" onChange={e => setData({...data, password: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 outline-none font-bold" required />
          <input type="password" placeholder="Verify Key" onChange={e => setData({...data, confirmPassword: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-red-500 outline-none font-bold" required />
        </div>
        <button type="submit" className="w-full bg-[#0f172a] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-black active:scale-95 transition-all">INITIALIZE ACCESS</button>
      </form>
    </div>
  );
};
