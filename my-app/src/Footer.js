import React from 'react';
import profile from './images/profile.jpg'
import linkdin from './images/linkdin.png'

function Footer() {
    return (
        <div className="footer-dark">
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Services</h3>
                            <ul>
                                <li><a href="/test">Typing Test</a></li>
                                <li><a href="/dashboard">Dashboard</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>About</h3>
                            <ul>
                                <li><a href="/">Company</a></li>
                                <li><a href="https://github.com/rekebuba">Team</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>CacheKeys</h3>
                            <p>A typing practice app that showcases my expertise in web development, including Python, React, HTML, CSS, and JavaScript. You can find the code on GitHub or explore more of my work on my personal website.</p>
                        </div>
                        <div className="col item social">
                            <a href="https://github.com/rekebuba"><i className="icon ion-social-github"></i></a>
                            <a href="https://x.com/rekebuba"><i className="icon ion-social-twitter"></i></a>
                            <a href="https://linkedin.com/in/abubeker-abdullahi"><i className="icon ion-social-linkedin"></i></a>
                        </div>
                    </div>
                    <p className="copyright">CacheKeys © 2024</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
