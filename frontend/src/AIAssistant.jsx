import React, { useState } from 'react';
import axios from 'axios';

const AIAssistant = () => {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Hello! Main aapka Hospital AI Assistant hu. Main aapki kya madad kar sakta hu?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Chat window ko kholne/band karne ke liye

    const sendMessage = async () => {
        if (!input.trim()) return;
        
        const userMsg = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            // Humne jo backend mein route banaya tha, usko hit kar rahe hain
            const response = await axios.post('http://localhost:5000/api/ai/chat', { message: input });
            setMessages(prev => [...prev, { sender: 'ai', text: response.data.reply }]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, abhi server se connect nahi ho paa raha hu.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 font-sans">
            {/* Floating Chat Button */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all text-lg"
                >
                    💬 Ask AI
                </button>
            )}

            {/* Actual Chat Window */}
            {isOpen && (
                <div className="bg-white shadow-2xl rounded-xl w-80 h-96 flex flex-col border border-gray-200 overflow-hidden transition-all">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-3 flex justify-between items-center font-bold">
                        <span>Hospital AI Assistant</span>
                        <button onClick={() => setIsOpen(false)} className="hover:text-gray-200 text-lg font-bold">✕</button>
                    </div>

                    {/* Chat Messages Display Area */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] p-2 rounded-lg text-sm ${
                                    msg.sender === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white text-gray-800 border rounded-tl-none shadow-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && <div className="text-xs text-gray-500 italic animate-pulse">AI soch raha hai...</div>}
                    </div>

                    {/* Input Field and Send Button */}
                    <div className="p-2 border-t bg-white flex gap-2">
                        <input 
                            className="border rounded-lg px-2 py-1 flex-1 text-sm focus:outline-none focus:border-blue-500" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type a message..."
                        />
                        <button 
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-blue-700" 
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAssistant;