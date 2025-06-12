import { useState } from 'react';
import { axiosInstance } from '../api/axiosConfig';


const Signup = ({ onSignupSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post(`/auth/register`, {
                email,
                password,
            });
            onSignupSuccess?.();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" onSubmit={handleSignup}>
            <legend className="fieldset-legend">Sign Up</legend>

            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit" className="btn btn-neutral mt-4">Sign Up</button>
        </form>
    );
};

export default Signup;
