import { useSelector, useDispatch } from 'react-redux';
import { setCredentials, logout } from '../store/slices/authSlice';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, loading } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    try {
      const data = await api.post('/api/auth/login', { email, password });
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate('/dashboard');
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await api.post('/api/auth/register', userData);
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate('/dashboard');
      return data;
    } catch (error) {
      throw error;
    }
  };

  const googleLogin = async (googleToken) => {
    try {
      const data = await api.post('/api/auth/google', { token: googleToken });
      dispatch(setCredentials({ user: data.user, token: data.token }));
      navigate('/dashboard');
      return data;
    } catch (error) {
      throw error;
    }
  };

  const signout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    googleLogin,
    signout
  };
};
