import React, { useEffect } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    reveals.forEach(el => observer.observe(el));
  }, []);

  return (
    <div className="landingPageContainer">
      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="brandName">Apna Video Call</h2>

        <div className="navlist">
          <button className="textBtn" onClick={() => navigate("/aljk23")}>
            Join as Guest
          </button>
          <button className="textBtn" onClick={() => navigate("/auth")}>
            Register
          </button>
          <button className="primaryBtn" onClick={() => navigate("/auth")}>
            Login
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="heroSection">
        <div className="heroInner">
          <div className="heroContent reveal">
            <h1 className="heroTitle">
              <span className="highlight">Connect</span> with your <br />
              loved ones
            </h1>

            <p className="heroSubtitle">
              Secure, high-quality video calls with end-to-end encryption.
              Anytime, anywhere.
            </p>

            <Link to="/auth" className="mainCtaBtn">
              Get Started
            </Link>
          </div>

          <div className="heroImage reveal">
            <img src="/mobile.png" alt="Video call preview" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="featuresSection">
        <div className="sectionInner">
          <h2 className="sectionTitle reveal">Why choose Apna Video Call?</h2>

          <div className="featuresGrid">
            <div className="featureCard reveal">
              <h3>Secure Calls</h3>
              <p>End-to-end encryption keeps conversations private.</p>
            </div>

            <div className="featureCard reveal">
              <h3>High Quality</h3>
              <p>Crystal-clear video and audio even on low bandwidth.</p>
            </div>

            <div className="featureCard reveal">
              <h3>Connect Anywhere</h3>
              <p>Works smoothly on mobile, tablet, and desktop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="howItWorksSection">
        <div className="sectionInner">
          <h2 className="sectionTitle reveal">How it works</h2>

          <div className="stepsContainer">
            <div className="stepCard reveal">
              <span className="stepNumber">1</span>
              <h4>Create an account</h4>
              <p>Quick and simple registration.</p>
            </div>

            <div className="stepCard reveal">
              <span className="stepNumber">2</span>
              <h4>Start or join a call</h4>
              <p>Create a room or join instantly.</p>
            </div>

            <div className="stepCard reveal">
              <span className="stepNumber">3</span>
              <h4>Connect and talk</h4>
              <p>Enjoy smooth, real-time communication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* CTA */}
<section className="ctaSection">
  <div className="sectionInner reveal">
    <h2 className="ctaTitle">
      Ready to start your first call?
    </h2>

    <p className="ctaSubtitle">
      Join a fast, secure, and reliable video calling experience built for
      everyday conversations.
    </p>

    {/* MINI FEATURES */}
    <div className="ctaFeatures">
      <div className="ctaFeature">
        <span className="dot" />
        No downloads required
      </div>
      <div className="ctaFeature">
        <span className="dot" />
        End-to-end encrypted calls
      </div>
      <div className="ctaFeature">
        <span className="dot" />
        Works on any device
      </div>
    </div>

    {/* CTA BUTTONS */}
    <div className="ctaButtons">
      <button
        className="primaryBtn largeBtn"
        onClick={() => navigate("/auth")}
      >
        Start Your First Call
      </button>

      <button
        className="secondaryCtaBtn"
        onClick={() => navigate("/aljk23")}
      >
        Join as Guest
      </button>
    </div>

    {/* TRUST LINE */}
    <p className="ctaTrust">
      Trusted by users for secure and smooth communication
    </p>
  </div>
</section>


      {/* FOOTER */}
      <footer className="footer">
        <div className="footerInner">
          <div>
            <h3>Apna Video Call</h3>
            <p>Simple, secure, and reliable communication.</p>
          </div>

          <div>
            <h4>Product</h4>
            <Link to="/features">Features</Link>
            <Link to="/security">Security</Link>
            <Link to="/pricing">Pricing</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>

        <div className="footerBottom">
          © {new Date().getFullYear()} Apna Video Call. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
