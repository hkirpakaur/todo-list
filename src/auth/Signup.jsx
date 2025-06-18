import { useState } from 'react';
import { signupUser } from '../api/todoApi';
import { useMutation } from '@tanstack/react-query'


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupMutation = useMutation({
        mutationFn: signupUser,
        onSuccess: () => {
            toast.success("Signed up!");
            onLoginSuccess();
        },
        onError: (err) => {
            console.error(err);
            toast.error(err?.response?.data?.message || "Signup failed");
        },
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        signupMutation.mutate({ email, password });
    };

    return (
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" onSubmit={handleSignup}>
            <legend className="fieldset-legend">Sign Up</legend>

            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={signupMutation.isLoading} />

            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={signupMutation.isLoading} />

            <button type="submit" className="btn btn-neutral mt-4" disabled={signupMutation.isLoading}>{signupMutation.isLoading ? "Signing up..." : "Sign up"}</button>
        </form>
    );
};

export default Signup;
