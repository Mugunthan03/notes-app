import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import signup from '../assets/signup.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword } from './Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmailAndPassword(email, password);
      navigate('/home')
      toast.success('Registered success')
    } catch (error) {
      setErrorMessage( error.message);    
      // alert('Error signing up: ' + error.message);
    }
  };

  return (
    <div className='h-full'>
      <Navbar />
      <div className='flex justify-center items-center pt-10 '>
        <div className='border-2 flex flex-col w-full mx-10 md:w-2/5 lg:w-1/4 p-5 shadow-lg z-50'>
          <h1 className='text-2xl font-mono font-bold text-center'>Signup Form</h1>
          <div className='flex justify-center'>
            <img src={signup} alt='profile' className='w-32 ' />
          </div>
          
          <form onSubmit={handleSignup}>
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
                autoComplete='new-password'
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
              className='mt-5 p-3 border-2 rounded-xl bg-[#36BFA7] text-xl font-mono font-bold w-full cursor-pointer'
            >
              Signup
            </button>
          </form>
          <Link to='/login' className='mt-3 text-center font-bold'>
            Already have an Account? <span className='text-blue-600'>Login</span>
          </Link>
        </div>
      </div>
      <svg className='absolute bottom-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#36BFA7" fillOpacity="1" d="M0,0L80,48C160,96,320,192,480,234.7C640,277,800,267,960,240C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
      </svg>
    </div>
  );
}

export default Signup;
