import {useState} from "react";
import { useNavigate } from "react-router-dom";
import companyLogo from '../assets/banner_center.png'

const LoginPage = ({setIsLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'john.doe@mclernons.ie' && password === 'password123') {
            setIsLoggedIn(true);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', 'John Doe')
            navigate('/main-menu');
        } else {
            setError('Invalid username or password');
        }
    };

   


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center mb-6">
                    <img src={companyLogo} alt="Company Logo" className="h-28 w-30"/>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-800">Sign In</h2>
                <p className="mb-6 text-gray-600">Hi there! Nice to see you again.</p>
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-2 text-smfont-bold text-gray-700" htmlFor="email">Email</label>
                        <input  type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full py-2 border-b border-slate-600 focus:outline-none "
                                placeholder="Enter your email"
                                required />
                    </div> 
                    <div className="mb-6">
                        <label className="block mt-4 mb-2 text-smfont-bold text-gray-700" htmlFor="password">Password</label>
                        <input  type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full py-2 border-b border-slate-600 focus:outline-none "
                                placeholder="Enter your password"
                                required />         
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold bg-blue-950 hover:bg-blue-900 text-white rounded-md focus:outline-none">Sign In</button>
                </form>
            </div>
        </div>
)

};

export default LoginPage;