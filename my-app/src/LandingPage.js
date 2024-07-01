import React from 'react';
import { useNavigate } from 'react-router-dom'
import image from './images/image.png'
import timer from './images/timer.png'
import keys from './images/keys.png'
import Header from './Header';
import Footer from './Footer';


function LandingPage() {
    const navigate = useNavigate();

    const loginPage = () => {
        navigate('/login');
    };

    const signUpPage = () => {
        navigate('/signup');
    };

    return (
        <>
            <Header />
            <div className='landingPage-body'>
                <main>
                    <section className="hero">
                        <h1>Welcome to CacheKeys</h1>
                        <p>Welcome to CacheKeys, the ultimate platform for improving your typing speed and accuracy. Whether
                            you're a beginner looking to develop your typing skills or a seasoned typist aiming to break records,
                            CacheKeys has the tools you need to succeed. Dive in and start your journey to becoming a typing pro today!
                        </p>
                    </section>
                    <section className="content">
                        <div className="text">
                            <h2>Practice Your Typing Skills</h2>
                            <p>At CacheKeys, we offer a variety of typing exercises designed to enhance your speed and precision.
                                Our interactive practice sessions adapt to your skill level, ensuring you always have the right
                                challenge to keep improving. Practice regularly and watch your typing skills soar!</p>
                        </div>
                        <div className="image">
                            <img src={image} />
                        </div>
                    </section>
                    <section className="content reverse">
                        <div className="text">
                            <h2>Test Your Typing Speed</h2>
                            <p>Ready to see how fast you can type? Take our typing speed test to find out! Our comprehensive test
                                measures your words per minute (WPM) and accuracy, giving you detailed feedback on your performance.
                                Compete with friends or challenge yourself to beat your personal best!</p>
                        </div>
                        <div className="image">
                            <img src={timer} />
                        </div>
                    </section>
                    <section className="content">
                        <div className="text">
                            <h2>Get Started Today!</h2>
                            <p>Ready to take your typing skills to the next level? Sign up for CacheKeys today and start your
                                journey towards faster, more accurate typing. It's easy to get started, and our platform is designed
                                to help you achieve your goals, no matter your starting point. Let's type our way to success
                                together!</p>
                            <div className='section-button'>
                                <button className="sign-up" onClick={loginPage}>Log In</button>
                                <button className="sign-up" onClick={signUpPage}>Sign Up</button>

                            </div>
                        </div>
                        <div className="image">
                            <img src={keys} />
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default LandingPage;
