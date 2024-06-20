import React from 'react';
import './styles/login.css';
import './styles/styles.css'
import './styles/footer.css'
import './styles/dashboard.css'
import Header from './Header';
import SignUpForm from './SighUpForm'
import LandingPage from './LandingPage';
import Footer from './Footer';
import { AuthProvider, useAuth } from './AuthContext';
import SignUp from './SighUpForm';
import LogIn from './LoginForm'
import Dashbord from './Dashboard';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const HomePage = () => {
  // const { logout } = useAuth();
  // <button onClick={logout}>Logout</button>

  return (
    <div>
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
};

const App = () => {
  const { authenticated } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/dashboard',
      element: authenticated ? <Dashbord /> : <HomePage />,
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
      path: '/dashboard',
      element: <Dashbord />
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
