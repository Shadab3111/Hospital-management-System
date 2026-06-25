import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const DoctorSignUp = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); setError('');
        if (formData.password !== formData.confirmPassword) { setError("Passwords do not match!"); return; }
        try {
            const data = { ...formData, role: 'doctor' };
            await axios.post('http://localhost:5000/api/signup', data);
            setMessage('Doctor Account Created Successfully!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) { setError(err.response?.data?.message || 'Registration Failed'); }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ width: '450px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#2e7d32', color: '#fff', padding: '25px', textAlign: 'center' }}>
                    <h2 style={{ margin: 0 }}>Sign Up as a Doctor</h2>
                    <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Join our medical team to manage patients</p>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: '25px' }}>
                    {message && <div style={{ color: 'green', backgroundColor: '#e8f5e9', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>{message}</div>}
                    {error && <div style={{ color: 'red', backgroundColor: '#ffebee', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>{error}</div>}
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        <div style={{ flex: 1 }}><label>First Name</label><input type="text" name="firstName" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} /></div>
                        <div style={{ flex: 1 }}><label>Last Name</label><input type="text" name="lastName" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} /></div>
                    </div>
                    <div style={{ marginBottom: '15px' }}><label>Email</label><input type="email" name="email" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} /></div>
                    <div style={{ marginBottom: '15px' }}><label>Password</label><input type="password" name="password" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} /></div>
                    <div style={{ marginBottom: '25px' }}><label>Confirm Password</label><input type="password" name="confirmPassword" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} /></div>
                    <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Create Doctor Account</button>
                    <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>Are you a <Link to="/signup" style={{ color: '#2e7d32', fontWeight: 'bold', textDecoration: 'none' }}>Patient</Link> or <Link to="/admin/signup" style={{ color: '#2e7d32', fontWeight: 'bold', textDecoration: 'none' }}>Admin</Link>?</p>
                </form>
            </div>
        </div>
    );
};
export default DoctorSignUp;