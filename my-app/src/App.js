import React from 'react';
import './styles/login.css';
import './styles/styles.css'
import './styles/footer.css'
import './styles/dashboard.css'
import './styles/typing.css'
import './styles/timer.css'
import './styles/testTime.css'
import './styles/header.css';
import Header from './Header';
import Footer from './Footer';
import LandingPage from './LandingPage';
import { AuthProvider, useAuth } from './AuthContext';
import SignUp from './SighUpForm';
import LogIn from './LoginForm'
import Dashboard from './Dashboard';
import TypingPage from './Typing';
import TestTime from './TestTime';
import Result from './Result';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// const HomePage = () => {
//   return (
//     <div>
//       <Header />
//       <LandingPage />
//       <Footer />
//     </div>
//   );
// };

const App = () => {
  const { authenticated } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/dashboard',
      element: authenticated ? <Dashboard /> : <Dashboard />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/login',
      element: <LogIn />
    },
    {
      path: '/typing',
      element: <TypingPage />
    },
    {
      path: '/test',
      element: <TestTime />
    },
    {
      path: '/result',
      element: <div className='typing-result-body'>
        <Result />
      </div>
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};


const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Root;
