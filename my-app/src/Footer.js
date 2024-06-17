import React from 'react';
import profile from './images/profile.jpg'
import linkdin from './images/linkdin.png'
import logo from './images/logo.png';

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="hire-me-banner">
                    <a href="https://github.com/rekebuba" target="_blank">Hire Me</a>
                </div>
                <div className="footer-section">
                    <img src={profile} alt="Abubeker-Abdullahi" className="profile-photo" />
                    <div className="footer-text">
                        <h3>About the Developer</h3>
                        <p>This typing practice app is a testament to my programming skills and dedication
                            to creating seamless user experiences. I've built this project to showcase my expertise
                            in web development, including python, React, HTML, CSS, and JavaScript.
                            Dive into the code on <a href="https://github.com/rekebuba" target="_blank">GitHub</a> or visit my <a href="https://yourwebsite.com" target="_blank">
                            personal website</a> to explore more of my work.</p>
                        <div className="social-links">
                            <a href="https://x.com/rekebuba" target="_blank">Twitter</a>
                            <a href="https://linkedin.com/in/abubeker-abdullahi" target="_blank">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        // <footer>
        //     <div className="fotter logo">
        //         <img src={logo} className="site-name" />
        //     </div>
        //     <div className="about">
        //         <div className="profile"></div>
        //         <div className="links">
        //             <h2>Abubeker Abdullahi</h2>
        //             <a href="https://linkedin.com/in/abubeker-abdullahi" target="_blank">
        //                 <img src={linkdin} />
        //             </a>
        //             <a href="https://linkedin.com/in/abubeker-abdullahi" target="_blank">
        //                 <img src={linkdin} />
        //             </a>
        //             <a href="https://linkedin.com/in/abubeker-abdullahi" target="_blank">
        //                 <img src={linkdin} />
        //             </a>
        //             <a href="https://linkedin.com/in/abubeker-abdullahi" target="_blank">
        //                 <img src={linkdin} />
        //             </a>
        //         </div>
        //     </div>
        // </footer>
    );
}

export default Footer;
