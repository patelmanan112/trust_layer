import React, { useState, useEffect } from 'react';
import { FiShield, FiArrowRight, FiInfo } from 'react-icons/fi';
import { HiOutlineLibrary } from 'react-icons/hi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Navbar from '../components/Navbar/Navbar';
import { useAuth } from '../hooks/useAuth';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const industry = searchParams.get('industry');
  const navigate = useNavigate();
  const { login, register, googleLogin } = useAuth();
  const [serverError, setServerError] = useState('');
  
  // Map 'freelancer' from URL to 'provider' for DB
  const initialRole = type === 'freelancer' || type === 'provider' ? 'provider' : 'client';
  const [accountRole, setAccountRole] = useState(initialRole);

  useEffect(() => {
    if (type) {
      setActiveTab('create');
    }
  }, [type]);

  useEffect(() => {
    const mappedRole = type === 'freelancer' || type === 'provider' ? 'provider' : 'client';
    setAccountRole(mappedRole);
  }, [type]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      company: '',
      email: '',
      password: '',
    },
    validationSchema:
      activeTab === 'create'
        ? Yup.object({
            fullName: Yup.string().required('Full name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
              .min(8, 'Password must be at least 8 characters')
              .required('Password is required'),
          })
        : Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
              .min(8, 'Password must be at least 8 characters')
              .required('Password is required'),
          }),
    onSubmit: async (values, helpers) => {
      setServerError('');
      try {
        if (activeTab === 'create') {
          await register({
            name: values.fullName,
            company: values.company,
            email: values.email,
            password: values.password,
            role: accountRole,
            industry: industry,
          });
          toast.success('Welcome to TrustLayer!');
        } else {
          await login(values.email, values.password);
          toast.success('Signed in successfully');
        }
      } catch (e) {
        const msg = e.response?.data?.message || 'Authentication failed';
        setServerError(msg);
        toast.error(msg);
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
   <>
    <SEO title={activeTab === 'signin' ? 'Sign In' : 'Join TrustLayer'} />
    <Navbar/>
    <div className="min-h-screen flex bg-[#f9fbfb] font-sans text-gray-900">
      
      {/* LEFT SIDE: BRANDING */}
      <div className="flex-1 hidden lg:flex flex-col justify-center px-[10%] bg-[radial-gradient(circle_at_10%_20%,rgba(61,99,86,0.03)_0%,transparent_50%)]">
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
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="bg-white w-full max-w-[500px] p-8 md:p-12 rounded-[32px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)]">
          
          {type && (
            <div className="mb-6 flex items-center gap-2">
              <span className="bg-green-100 text-green-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {type === 'freelancer' || type === 'provider' ? 'Freelancer' : 'Client'} Account
              </span>
              {industry && (
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {industry} Industry
                </span>
              )}
            </div>
          )}

          <div className="flex gap-8 mb-8 border-b border-gray-50">
            <div 
              className={`pb-4 font-black uppercase text-[10px] tracking-widest cursor-pointer relative transition-colors ${activeTab === 'signin' ? 'text-[#3d6356]' : 'text-gray-300'}`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
              {activeTab === 'signin' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#3d6356] rounded-full"></div>}
            </div>
            <div 
              className={`pb-4 font-black uppercase text-[10px] tracking-widest cursor-pointer relative transition-colors ${activeTab === 'create' ? 'text-[#3d6356]' : 'text-gray-300'}`}
              onClick={() => setActiveTab('create')}
            >
              Create Account
              {activeTab === 'create' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#3d6356] rounded-full"></div>}
            </div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            {serverError ? (
              <div className="mb-6 bg-red-50 border border-red-100 text-red-700 text-[11px] font-black uppercase tracking-widest rounded-xl p-4">
                {serverError}
              </div>
            ) : null}
            
            {activeTab === 'create' && (
              <>
                <div className="mb-6">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    name="fullName"
                    type="text" 
                    className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100 transition-all ${formik.touched.fullName && formik.errors.fullName ? 'ring-2 ring-red-500' : ''}`} 
                    placeholder="Manan Patel"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                  />
                  {formik.touched.fullName && formik.errors.fullName && <div className="text-red-500 text-[10px] mt-1 font-bold">{formik.errors.fullName}</div>}
                </div>
                <div className="mb-6">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Organization</label>
                  <input 
                    name="company"
                    type="text" 
                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100 transition-all" 
                    placeholder="Company Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.company}
                  />
                </div>

                {!type && (
                  <div className="mb-6">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Account Type</label>
                    <select
                      value={accountRole}
                      onChange={(e) => setAccountRole(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100 transition-all"
                    >
                      <option value="client">Client</option>
                      <option value="provider">Freelancer</option>
                    </select>
                  </div>
                )}
              </>
            )}

            <div className="mb-6">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Corporate Email</label>
              <input 
                name="email"
                type="email" 
                className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100 transition-all ${formik.touched.email && formik.errors.email ? 'ring-2 ring-red-500' : ''}`} 
                placeholder="name@company.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && <div className="text-red-500 text-[10px] mt-1 font-bold">{formik.errors.email}</div>}
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                {activeTab === 'signin' && <a href="#" className="text-[10px] text-[#3d6356] font-black uppercase tracking-widest">Forgot?</a>}
              </div>
              <input 
                name="password"
                type="password" 
                className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:bg-gray-100 transition-all ${formik.touched.password && formik.errors.password ? 'ring-2 ring-red-500' : ''}`} 
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && <div className="text-red-500 text-[10px] mt-1 font-bold">{formik.errors.password}</div>}
            </div>

            <button type="submit" className="w-full py-5 bg-[#3d6356] text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#2a453c] transition-all shadow-xl shadow-emerald-900/10 disabled:opacity-50" disabled={formik.isSubmitting}>
              {activeTab === 'create' ? 'Create Secure Account' : 'Authenticate Session'} <FiArrowRight />
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black">
                <span className="bg-white px-4 text-gray-400">Secure Social Auth</span>
              </div>
            </div>

            <div className="flex justify-center w-full">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    await googleLogin(credentialResponse.credential);
                    toast.success('Google Authentication Successful');
                  } catch (err) {
                    const errorMsg = err.response?.data?.message || err.message || 'Backend verification failed';
                    toast.error(`Google Login: ${errorMsg}`);
                    console.error('Google Auth Error:', err);
                  }
                }}
                onError={() => {
                  toast.error('Google Login: Library initialization failed');
                }}
                useOneTap
                theme="outline"
                shape="pill"
                width={350}
              />
            </div>
          </form>

          <div className="text-center mt-8 text-[10px] text-gray-400 font-bold leading-normal uppercase tracking-tighter">
            Protected by bank-level encryption. By signing in, you agree to our <a href="#" className="text-gray-500 underline">Legal Terms</a>.
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default Login;
