import React from 'react'
import './styles/login.css'
import './styles/styles.css'
import Header from './Header';
import SignUpForm from './SighUpForm'
import LandingPage from './LandingPage';
import Footer from './Footer'
import { AuthProvider, useAuth } from './AuthContext';
import SignUp from './SighUpForm';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const App = () => {
  const { authenticated } = useAuth();

  return (
    <div className="App">
      {authenticated ? <Dashboard /> : <SignUp />}
    </div>
  );
};
  // return (
  //   <>
  //     <Router>
  //       <Routes>
  //         <Route
  //           path='/' element={
  //             <React.Fragment>
  //               <div>
  //                 <Header />
  //                 <LandingPage />
  //                 <Footer />
  //               </div>
  //             </React.Fragment>
  //           } />
  //         <Route path='/signin' element={<SignUpForm />} />
  //         <Route path='/home' element={<LandingPage />} />
  //       </Routes>
  //     </Router>
  //   </>
  // );


const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Root;
