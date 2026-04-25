import React, { useState } from 'react';
import { FiShield, FiArrowRight, FiInfo } from 'react-icons/fi';
import { HiOutlineLibrary } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from '../components/Navbar/Navbar';
const Login = () => {
  const [activeTab, setActiveTab] = useState('signin');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log('Form values:', values);
      alert('Login submitted! Check console for values.');
    },
  });

  return (
   <>
   <Navbar/>
    <div className="min-h-screen flex bg-[#f9fbfb] font-sans text-gray-900">
     
      {/* LEFT SIDE: BRANDING */}
      <div className="flex-1 flex flex-col justify-center px-[10%] bg-[radial-gradient(circle_at_10%_20%,rgba(61,99,86,0.03)_0%,transparent_50%)]">
        <div className="flex items-center gap-3 mb-6">
          <FiShield className="text-[#3d6356]" size={36} />
          <span className="font-['Outfit'] text-[42px] font-bold text-[#1a4d3e] tracking-tight">TrustLayer Escrow</span>
        </div>
        <p className="text-xl text-gray-600 max-w-[450px] leading-normal mb-12">
          Institutional-grade security for your high-value digital transactions. Experience frictionless trust.
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 text-base font-medium text-gray-700">
            <div className="w-10 h-10 bg-green-100 text-green-800 rounded-full flex items-center justify-center">
              <FiShield size={20} />
            </div>
            <span>SOC2 Type II Certified Platform</span>
          </div>
          <div className="flex items-center gap-4 text-base font-medium text-gray-700">
            <div className="w-10 h-10 bg-green-100 text-green-800 rounded-full flex items-center justify-center">
              <HiOutlineLibrary size={20} />
            </div>
            <span>FDIC-Insured Custodial Accounts</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN CARD */}
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="bg-white w-full max-w-[500px] p-12 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)]">
          <div className="flex gap-8 mb-8 border-b border-gray-200">
            <div 
              className={`pb-3 font-medium cursor-pointer relative transition-colors ${activeTab === 'signin' ? 'text-[#3d6356]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
              {activeTab === 'signin' && <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-[#3d6356]"></div>}
            </div>
            <div 
              className={`pb-3 font-medium cursor-pointer relative transition-colors ${activeTab === 'create' ? 'text-[#3d6356]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('create')}
            >
              Create Account
              {activeTab === 'create' && <div className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-[#3d6356]"></div>}
            </div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Corporate Email Address</label>
              <input 
                name="email"
                type="email" 
                className={`w-full px-4 py-3.5 bg-gray-50 border rounded-lg text-[15px] text-gray-900 outline-none focus:bg-gray-100 transition-colors ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-transparent'}`} 
                placeholder="name@company.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">Security Password</label>
                <a href="#" className="text-xs text-[#3d6356] font-semibold">Forgot password?</a>
              </div>
              <input 
                name="password"
                type="password" 
                className={`w-full px-4 py-3.5 bg-gray-50 border rounded-lg text-[15px] text-gray-900 outline-none focus:bg-gray-100 transition-colors ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-transparent'}`} 
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg flex gap-3 mb-8">
              <FiInfo className="text-gray-500 shrink-0 mt-0.5" size={18} />
              <p className="text-[13px] text-gray-600 leading-tight">
                We will require a hardware key or biometrics verification on the next step for verified accounts.
              </p>
            </div>

            <button type="submit" className="w-full py-4 bg-[#3d6356] text-white rounded-lg text-base font-semibold flex items-center justify-center gap-2 hover:bg-[#345448] transition-colors mb-8 cursor-pointer disabled:opacity-50" disabled={formik.isSubmitting}>
              Sign In <FiArrowRight />
            </button>
          </form>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">or authenticate via</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button className="w-full py-3.5 bg-white border border-gray-200 rounded-lg text-[15px] font-semibold text-gray-700 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors mb-8 cursor-pointer">
            <img 
              src="https://www.vectorlogo.zone/logos/google/google-icon.svg" 
              alt="Google" 
              width="20"
            />
            Continue with Enterprise SSO
          </button>

          <div className="text-center text-xs text-gray-400 leading-normal">
            Protected by bank-level encryption. By signing in, you agree to our <a href="#" className="text-gray-500 underline">Terms of Service</a>.
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default Login;
