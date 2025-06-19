import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  {useAuth } from '../../utils/auth'; // Adjust the path as necessary

// Define the default state to navigate to after login.
// This should match the default state in your AppRoutes.jsx file.

const Login = () => {
  const {setAuthenticated} = useAuth();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

 const handleLogin = (e) => {
  e.preventDefault();
  if (user === 'admin' && pass === '1234') {
    setAuthenticated(true);
    navigate('/home', { replace: true });
  } else {
    alert('Invalid credentials');
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Ingresa el usuario y contraseña</h2>

        <div className=" flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#003A70] text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;