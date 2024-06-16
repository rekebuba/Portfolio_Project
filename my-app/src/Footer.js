import React from 'react';
import linkdin from './images/linkdin.png'
import logo from './images/logo.png';

function Footer() {
    return (
            <footer>
                <div className="fotter logo">
                    <img src={logo} className="site-name" />
                </div>
                <div className="about">
                    <div className="profile"></div>
                    <div className="links">
                        <h2>Abubeker Abdullahi</h2>
                        <a href="https://linkedin.com/in/abubeker-abdullahi" target="_blank">
                            <img src={linkdin} />
                        </a>
                        <a href="https://linkedin.com/in/abubeker-abdullahi" target="_blank">
                            <img src={linkdin} />
                        </a>
                        <a href="https://linkedin.com/in/abubeker-abdullahi" target="_blank">
                            <img src={linkdin} />
                        </a>
                        <a href="https://linkedin.com/in/abubeker-abdullahi" target="_blank">
                            <img src={linkdin} />
                        </a>
                    </div>
                </div>
            </footer>
    );
}

export default Footer;
