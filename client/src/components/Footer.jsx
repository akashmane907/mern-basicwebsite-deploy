import React from "react";
import "./Footer.css";



function Footer() {
    return (
        <section className="contact-area" id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="contact-content text-center">
                            <a href="#"><img src="https://i.ibb.co/QDy827D/ak-logo.png" alt="logo" /></a>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum </p>
                            <div className="hr"></div>
                            <h6>Mumbai,Maharashtra,India</h6>
                            <h6>+91 7400387427<span>|</span>+91 7400387427</h6>
                            <div className="contact-social">
                   {/*              <ul>
                                    <li><a className="hover-target" href=""><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a className="hover-target" href="https://www.linkedin.com/in/akash-mane-bb98a21b7/"><i className="fab fa-linkedin-in"></i></a></li>
                                    <li><a className="hover-target" href="https://github.com/akashmane907"><i className="fab fa-github"></i></a></li>
                                    <li><a className="hover-target" href=""><i className="fab fa-behance"></i></a></li>
                                    <li><a className="hover-target" href=""><i className="fab fa-pinterest-p"></i></a></li>
                                </ul> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;