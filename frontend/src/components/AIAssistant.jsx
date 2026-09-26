import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { Send, Bot, User, X, Sparkles, Minus, MessageSquare, Loader2 } from 'lucide-react';

const AIAssistant = () => {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Namaste! Main aapka Smart Hospital Assistant hu. Main appointments, reports aur hospital services mein aapki madad kar sakta hu. Puchiye kya pucho hai?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        
        const userMsg = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // Using axios with the skip header to avoid Ngrok warning page
            const response = await axios.post(`${API_BASE_URL}/api/ai/chat`,
                { message: input },
                { headers: { 'ngrok-skip-browser-warning': 'true' } }
            );
            setMessages(prev => [...prev, { sender: 'ai', text: response.data.reply }]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            const serverError = error.response?.data?.error || error.message;
            setMessages(prev => [...prev, { sender: 'ai', text: `Maaf kijiye, kuch technical error aa gaya hai: ${serverError}` }]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.4)] hover:scale-110 hover:-translate-y-2 transition-all active:scale-95 group"
            >
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                <Sparkles className="group-hover:rotate-12 transition-transform" size={28} />
            </button>
        );
    }

    return (
        <div className={`fixed bottom-6 right-6 z-[9999] transition-all duration-500 ease-out ${isMinimized ? 'h-16 w-64' : 'h-[550px] w-[380px]'} max-w-[calc(100vw-48px)]`}>
            <div className="bg-white h-full w-full rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.25)] flex flex-col border border-slate-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-500/20 p-2 rounded-xl">
                            <Bot className="text-indigo-400" size={24} />
                        </div>
                        <div>
                            <p className="text-white font-black text-sm tracking-tight">HOSPITAL AI</p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Online Now</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 text-slate-400 hover:text-white transition-colors">
                            <Minus size={20} />
                        </button>
                        <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-rose-400 transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {!isMinimized && (
                    <>
                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50 custom-scrollbar">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2 duration-300`}>
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                        msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white shadow-sm text-slate-600 border border-slate-100'
                                    }`}>
                                        {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed ${
                                        msg.sender === 'user'
                                            ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/20 font-medium'
                                            : 'bg-white text-slate-700 rounded-tl-none shadow-sm border border-slate-100'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
                                        <Loader2 className="text-indigo-500 animate-spin" size={16} />
                                    </div>
                                    <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-[2rem] border border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
                                <input
                                    className="bg-transparent px-4 py-2 flex-1 text-sm outline-none font-medium text-slate-700"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    placeholder="Type your medical query..."
                                />
                                <button
                                    disabled={!input.trim() || loading}
                                    onClick={sendMessage}
                                    className="bg-indigo-600 text-white p-3 rounded-full shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none transition-all active:scale-90"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="text-[10px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest">Powered by Gemini AI 1.5</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AIAssistant;
