import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import profile from '../assets/profile.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { logInWithEmailAndPassword } from './Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logInWithEmailAndPassword(email, password);
      navigate('/home');
      toast.success('Login success')
    } catch (error) {
      setErrorMessage('Check Email and Password');      
      // alert("Error occurred while logging in: " + error.message);
    }
  };

  return (
    <div className='h-full'>
      <Navbar />
      <div className='flex justify-center items-center pt-16'>
        <div className='border-2 flex flex-col w-full mx-10 md:w-2/5 lg:w-1/4 p-5 shadow-lg z-50'>
          <h1 className='text-2xl font-mono font-bold text-center'>Login Form</h1>
          <div className='flex justify-center'>
            <img src={profile} alt='profile' className='w-24 ' />
          </div>
         
          <form onSubmit={handleLogin}>
            <input
              type='email'
              placeholder='Enter Email 📩'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border-2 mt-5 p-2 rounded-lg outline-none w-full'
              required
              autoComplete='email'
            />
            <div className='relative mt-2'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='Password 🔑'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border-2 p-2 rounded-lg outline-none w-full'
                required
                autoComplete='current-password'
              />
              <div className='absolute inset-y-0 cursor-pointer flex items-center pr-3 right-0' onClick={togglePassword}>
                {passwordVisible ? (<AiOutlineEyeInvisible size={24} />) : (<AiOutlineEye size={24} />)}
              </div>
            </div>
            {errorMessage && (
            <div className='text-red-500 text-center mt-2'>
              {errorMessage}
            </div>
          )}
            <button
              type="submit"
              className='mt-5 p-3 border-2 rounded-xl bg-blue-400 text-xl font-mono font-bold w-full'
            >
              Login
            </button>
          </form>
          <Link to='/signup' className='mt-2 text-center font-bold'>
            Not registered yet? <span className='text-[#36BFA7]'>Signup</span>
          </Link>
        </div>
      </div>
      <svg className='absolute bottom-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#0099ff" fillOpacity="1" d="M0,128L60,122.7C120,117,240,107,360,117.3C480,128,600,160,720,192C840,224,960,256,1080,250.7C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
      </svg>
    </div>
  );
};

export default Login;
