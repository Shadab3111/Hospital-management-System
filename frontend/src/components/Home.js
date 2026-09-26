import React, { useState, useEffect } from 'react';
import {
  Calendar, Clipboard, Cog, DollarSign, HeartPulse,
  Hospital, Shield, User, Users, Clock, ChartBar,
  Globe, ArrowRight, Activity, ShieldCheck, Zap,
  Menu, X, MousePointer2, Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavButton = ({ children, primary, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 ${
      primary
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300'
        : 'bg-white/10 backdrop-blur-md text-slate-700 border border-slate-200 hover:bg-slate-50'
    }`}
  >
    {children}
  </button>
);

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${color}`}></div>
    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-white mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}>
      <Icon size={30} />
    </div>
    <h3 className="text-xl font-black text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed mb-6">{description}</p>
    <div className="flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
      Discover More <ArrowRight size={16} />
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'py-4 bg-white/80 backdrop-blur-2xl shadow-sm border-b border-slate-100' : 'py-8 bg-transparent'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
              <Hospital className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase">
              Core<span className="text-indigo-600">Health</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <button className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">About</button>
            <button className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Solutions</button>
            <button className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Network</button>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <NavButton onClick={() => navigate('/login')}>Login</NavButton>
            <NavButton primary onClick={() => navigate('/signup')}>Join Core</NavButton>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-slate-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            <NavButton onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}>Login</NavButton>
            <NavButton primary onClick={() => { navigate('/signup'); setIsMobileMenuOpen(false); }}>Sign Up</NavButton>
          </div>
        )}
      </header>
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-40 pb-20 lg:pt-56 lg:pb-32 px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left space-y-8 animate-in slide-in-from-left duration-700">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-indigo-100 shadow-sm">
                  <Zap size={14} /> Next-Gen Hospital Operating System
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  Revolutionizing<br/>
                  <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent italic">Care Intelligence.</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  The world's most advanced cloud platform for optimizing patient outcomes,
                  doctor productivity, and hospital management efficiency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 active:scale-95 group"
                  >
                    DEPLOY SOLUTIONS
                    <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="bg-white text-slate-800 border-2 border-slate-100 px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    <MousePointer2 size={22} />
                    LIVE DEMO
                  </button>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
                  <div><p className="text-2xl font-black text-slate-800">10k+</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hospitals</p></div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <div><p className="text-2xl font-black text-slate-800">2M+</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patients</p></div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <div><p className="text-2xl font-black text-slate-800">99.9%</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</p></div>
                </div>
              </div>

              <div className="relative animate-in zoom-in duration-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 rounded-[3rem] blur-3xl"></div>
                <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-8 border-white group">
                  <img src="home-1.jpeg" alt="Dashboard" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute bottom-8 left-8 right-8 bg-white/20 backdrop-blur-xl p-6 rounded-[2rem] border border-white/30 text-white">
                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">Live Intelligence</p>
                    <p className="text-lg font-bold">Real-time resource allocation active</p>
                  </div>
                </div>
                {/* Floating UI Elements */}
                <div className="absolute -top-10 -right-10 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-50 animate-bounce hidden md:block" style={{animationDuration: '5s'}}>
                   <div className="flex items-center gap-4 text-emerald-500"><Activity size={32} /><div className="text-slate-800 font-black text-xl">Pulse High</div></div>
                </div>
                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-50 animate-pulse hidden md:block" style={{animationDuration: '4s'}}>
                   <div className="flex items-center gap-4 text-blue-500"><ShieldCheck size={32} /><div className="text-slate-800 font-black text-lg">Encrypted</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
              <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em]">Core Capabilities</h2>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Precision management for modern healthcare.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={User}
                title="Patient Dynamics"
                description="Holistic patient management featuring smart medical records, history tracking, and predictive health analytics."
                color="bg-blue-600"
              />
              <FeatureCard
                icon={Hospital}
                title="Staff Intelligence"
                description="AI-driven doctor assignments and scheduling that maximizes hospital bandwidth while reducing staff burnout."
                color="bg-indigo-600"
              />
              <FeatureCard
                icon={Calendar}
                title="Smart Scheduling"
                description="Zero-friction appointment ecosystem with automated queue management and instant digital notifications."
                color="bg-violet-600"
              />
            </div>
          </div>
        </section>

        {/* Stats / Banner Section */}
        <section className="py-20 px-6 overflow-hidden">
          <div className="container mx-auto">
            <div className="bg-slate-900 rounded-[3.5rem] p-12 lg:p-24 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-8">
                  <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                    Integrated Security.<br/><span className="text-indigo-400 italic">Total Privacy.</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium">
                    Our military-grade encryption ensures that sensitive patient data remains protected 24/7.
                    Fully HIPAA compliant and ISO certified infrastructure.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                      <ShieldCheck className="text-indigo-400 mb-4" size={32} />
                      <p className="text-white font-black">ISO 27001</p>
                      <p className="text-xs text-slate-500 font-bold uppercase mt-1">Certified</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                      <Globe className="text-blue-400 mb-4" size={32} />
                      <p className="text-white font-black">Global Access</p>
                      <p className="text-xs text-slate-500 font-bold uppercase mt-1">Zero Downtime</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-4 border border-white/20 transform lg:rotate-6 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                    <img src="home-2.jpeg" alt="Global Network" className="rounded-[2.5rem] w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { icon: Clipboard, title: "Efficiency", text: "Automate administrative protocols to focus on what matters most: saving lives." },
                 { icon: Users, title: "Collaborative", text: "Multi-departmental data sync that removes information silos across the hospital." },
                 { icon: DollarSign, title: "Cost Control", text: "Advanced analytics that identify resource leaks and optimize operation budgets." },
                 { icon: HeartPulse, title: "Better Outcomes", text: "Improve patient recovery rates with AI-powered monitoring and alerts." },
                 { icon: Shield, title: "Root Access", text: "Role-based permission architecture for absolute security at every level." },
                 { icon: Cog, title: "Modular", text: "Fully customizable components that adapt to your specific medical workflow." }
               ].map((item, idx) => (
                 <div key={idx} className="flex gap-6 items-start group">
                   <div className="bg-white p-4 rounded-2xl shadow-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                     <item.icon size={28} />
                   </div>
                   <div>
                     <h4 className="text-lg font-black text-slate-800 mb-2">{item.title}</h4>
                     <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.text}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px]"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/40">
                  <Hospital className="text-white" size={24} />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase">CORE<span className="text-indigo-400">HEALTH</span></span>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed">
                The world's leading infrastructure for modern healthcare management. Built for precision, security, and global scale.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"><Globe size={18}/></div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer"><Heart size={18}/></div>
              </div>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-widest text-xs mb-8 text-indigo-400">Ecosystem</h5>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Doctor Portal</li>
                <li className="hover:text-white transition-colors cursor-pointer">Patient Dashboard</li>
                <li className="hover:text-white transition-colors cursor-pointer">Admin Command Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Pharmacy Sync</li>
              </ul>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-widest text-xs mb-8 text-indigo-400">Resources</h5>
              <ul className="space-y-4 text-slate-400 font-bold text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
                <li className="hover:text-white transition-colors cursor-pointer">API Protocols</li>
                <li className="hover:text-white transition-colors cursor-pointer">Security Whitepaper</li>
                <li className="hover:text-white transition-colors cursor-pointer">Global Compliance</li>
              </ul>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-widest text-xs mb-8 text-indigo-400">Newsletter</h5>
              <p className="text-slate-400 text-sm font-medium mb-6">Stay updated with our latest medical AI updates.</p>
              <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10 focus-within:border-indigo-500/50 transition-all">
                <input placeholder="Email Address" className="bg-transparent border-none outline-none px-4 py-2 flex-1 text-sm font-medium" />
                <button className="bg-indigo-600 p-2 rounded-xl hover:bg-indigo-700 transition-all"><ArrowRight size={20}/></button>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">© 2026 CORE HEALTH SYSTEM • ALL PROTOCOLS RESERVED</p>
            <div className="flex gap-8 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
