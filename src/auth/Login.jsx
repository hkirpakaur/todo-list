import { useState } from 'react';
import Signup from './Signup'
import { useLogin } from '../hooks/useTodos';


const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignup, setShowSignup] = useState(false);

    const { mutate: login, isPending } = useLogin();


    const handleLogin = async (e) => {
        e.preventDefault();
        login({ email, password });
    };

    if (showSignup) {
        return <Signup onSignupSuccess={onLoginSuccess} />
    }

    return (
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" onSubmit={handleLogin}>
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} disabled={isPending} required />

            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} disabled={isPending} required />

            <button type="submit" className="btn btn-neutral mt-4" disabled={isPending}>{isPending ? "Logging in..." : "Log in"}</button>
            <p> Don't have an account yet? </p>
            <button type="button" className="btn btn-link" onClick={() => setShowSignup(true)} >Sign up</button>
        </form>
    );
};

export default Login;
