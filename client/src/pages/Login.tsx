import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import type{ RootState, AppDispatch } from '../app/store';
import { loginSchema, type LoginFormData } from '../lib/validation';
import Spinner from '../components/Spinner';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = ({ onSwitch }: { onSwitch: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, message } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // This useEffect now only handles showing errors.
  useEffect(() => {
    if (isError) {
      toast.error(message || 'Login failed!');
    }
    dispatch(reset());
  }, [isError, message, dispatch]);

  // The onSubmit handler is now much simpler.
  // It only dispatches the login action.
  const onSubmit = (data: LoginFormData) => {
    dispatch(login(data));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 shadow-2xl backdrop-blur-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h1>
        <p className="text-center text-slate-400 mb-8">Sign in to continue</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register('email')}
              type="email"
              className={`w-full p-3 bg-slate-700 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-600'} focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <input
              {...register('password')}
              type="password"
              className={`w-full p-3 bg-slate-700 rounded-lg border ${errors.password ? 'border-red-500' : 'border-slate-600'} focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white`}
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="mb-6">
            <button type="submit" className="w-full p-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-colors duration-300 flex items-center justify-center disabled:bg-slate-600" disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-center text-slate-400">
          Don't have an account?{' '}
          <button onClick={onSwitch} className="text-cyan-400 hover:underline font-semibold">
            Register
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;