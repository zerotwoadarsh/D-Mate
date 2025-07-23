import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import type { RootState, AppDispatch } from '../app/store';
import { setTheme } from '../features/theme/themeSlice';

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentTheme } = useSelector((state: RootState) => state.theme);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(setTheme('default')); // Reset theme on logout
  };

  return (
    <header className="bg-slate-900/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-10 border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className={`text-2xl font-bold text-white`}>
            <span className={currentTheme.colors.primary}>AI</span>Partner
          </div>
          <nav>
            <ul className="flex items-center space-x-4">
              {user ? (
                <>
                  <li className="text-slate-300 hidden sm:block">{user.email}</li>
                  <li>
                    <button onClick={onLogout} className={`${currentTheme.colors.accent} ${currentTheme.colors.accentHover} text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300`}>
                      Logout
                    </button>
                  </li>
                </>
              ) : null}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;