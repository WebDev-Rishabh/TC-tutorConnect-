import React from "react";
import "../styles/homepage.css";
import homePage from "../assets/images/homepage.jpg";
import { Typewriter } from "react-simple-typewriter";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="homePage">
      {/* ✅ Navbar */}
      

      {/* ✅ Hero Section */}
      <div className="getStarted">
        <div className="left">
          <h6>“Trusted learning platform for students & teachers”</h6>
          <h2>Connect with Expert Tutors Anytime, Anywhere.</h2>
          <h3>
            Find the right teacher for your goals. Flexible schedules, affordable pricing, 
            and personalized lessons designed to help you succeed.
          </h3>
          <div className="btns">
            <button type="button" onClick={() => navigate("/signup")}>
              Get Started
            </button>
            <button type="button" onClick={() => navigate("/tutor/signup")}>
              Become Tutor
            </button>
          </div>
        </div>
        <div className="right">
          <img src={homePage} alt="TutorConnect" height="313px" width="529px" />
        </div>
      </div>

      {/* ✅ Why Choose Section */}
      <div className="whyChoose">
        <h2>Why Choose TutorConnect?</h2>
        <h3>We make it easy for students to learn and teachers to earn.</h3>

        <div className="cards">
          <div className="tutors">
            <span className="material-symbols-outlined">verified_user</span>
            <h3>Verified Tutors</h3>
            <h4>
              Every tutor is carefully screened to ensure you learn from trusted,
              qualified, and skilled professionals.
            </h4>
          </div>

          <div className="scheduling">
            <span className="material-symbols-outlined">calendar_month</span>
            <h3>Flexible Scheduling</h3>
            <h4>
              Book lessons at times that suit your lifestyle. Learn at your own pace,
              whenever and wherever you want.
            </h4>
          </div>

          <div className="pricing">
            <span className="material-symbols-outlined">payments</span>
            <h3>Affordable Pricing</h3>
            <h4>
              Pay only for the sessions you choose. Transparent and flexible pricing
              designed to fit every budget.
            </h4>
          </div>

          <div className="learning">
            <span className="material-symbols-outlined">target</span>
            <h3>Personal Learning</h3>
            <h4>
              Get lessons tailored to your academic needs and goals for a truly
              customized learning experience.
            </h4>
          </div>
        </div>
      </div>

      {/* ✅ How it Works */}
      <div className="tcWorks">
        <h2>How TutorConnect Works</h2>
        <h3 className="tcWorksH3">Getting started is simple — just follow 3 easy steps.</h3>
        <div className="tcwork-card">
          <div className="signUp">
            <span className="material-symbols-outlined">person_add</span>
            <h3>Step 1: Sign Up</h3>
            <h4>Create your free account in minutes and set up your learning profile.</h4>
          </div>
          <div className="findTutor">
            <span className="material-symbols-outlined">search</span>
            <h3>Step 2: Find Your Tutor</h3>
            <h4>
              Browse verified tutors by subject, experience, and availability to match
              your needs.
            </h4>
          </div>
          <div className="startLearning">
            <span className="material-symbols-outlined">school</span>
            <h3>Step 3: Start Learning</h3>
            <h4>
              Book a session, connect instantly, and begin your personalized learning
              journey.
            </h4>
          </div>
        </div>
      </div>

      {/* ✅ Meet Tutors */}
      <div className="meetTutors">
        <h2 className="meetTutorsH2">Meet Our Tutors</h2>
        <h3 className="meetTutorsH3">
          Experienced and verified educators ready to help you succeed.
        </h3>
        <div className="tutor-card">
          <div className="avatar">
            <span className="material-symbols-outlined">account_circle</span>
          </div>

          <h3 className="tutor-name">Dr. Ananya Sharma</h3>
          <p className="subject">
            Subject: <span>Mathematics & Physics</span>
          </p>
          <p className="experience">
            10+ years of experience in teaching high school and college students.
          </p>

          <p className="rating">
            <span className="material-symbols-outlined star">star</span> 4.8{" "}
            <span className="reviews">(98 reviews)</span>
          </p>

          <button
            type="button"
            className="profile-btn"
            onClick={() => navigate("/tutors/1")}
          >
            View Profile
          </button>
        </div>
      </div>

      {/* ✅ Student Reviews */}
      <div className="studentReviews">
        <h2 className="studentReviewsH2">What Our Students Say</h2>
        <h3 className="studentReviewsH3">
          Thousands of learners trust TutorConnect to achieve their goals.
        </h3>

        <div className="reviews-container">
          {[
            {
              name: "Riya S. – Grade 10 Student",
              text: "TutorConnect made learning math enjoyable. My tutor explained concepts step by step and helped me score 92% in my finals.",
            },
            {
              name: "Aarav K. – IELTS Student",
              text: "I loved the flexible scheduling! Even with my full-time job, I could prepare for IELTS. Thanks to my tutor, I achieved Band 7.5 in just 2 months.",
            },
            {
              name: "Meera T. – B.Sc. Physics",
              text: "I was struggling with quantum mechanics, but TutorConnect matched me with the perfect mentor. Now I understand the concepts and feel confident for my exams.",
            },
          ].map((review, i) => (
            <div className="reviewCard" key={i}>
              <div className="review-avatar">
                <span className="material-symbols-outlined">account_circle</span>
              </div>
              <h3 className="reviewer-name">{review.name}</h3>
              <p className="review-content">{review.text}</p>
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined star">
                    star
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Sign Up Section */}
      <section className="signUp">
        <div className="cardStart">
          <h2 className="startlearning">
            <Typewriter
              words={["Start Learning Smarter Today"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={60}
              delaySpeed={1500}
            />
          </h2>

          <p className="subtext">
            Join thousands of students already learning with TutorConnect.
          </p>
          <button
            type="button"
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up Now
          </button>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="footer">
        <div className="footer-left">
          <h2 className="logo">TutorConnect</h2>
          <p>Connecting students with trusted tutors, anytime, anywhere.</p>
        </div>

        <div className="footer-center">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a onClick={() => navigate("/")}>Home</a></li>
              <li><a onClick={() => navigate("/about")}>About</a></li>
              <li><a onClick={() => navigate("/tutors")}>Tutor</a></li>
              <li><a onClick={() => navigate("/contact")}>Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a onClick={() => navigate("/faqs")}>FAQs</a></li>
              <li><a onClick={() => navigate("/help")}>Help Center</a></li>
              <li><a onClick={() => navigate("/terms")}>Terms & Conditions</a></li>
              <li><a onClick={() => navigate("/privacy")}>Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-right">
          <h3>Stay Connected</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button type="button">Subscribe</button>
          </div>
        </div>
      </footer>

      <div className="end-footer">
        <p>© 2025 TutorConnect. All rights reserved.</p>
      </div>
    </div>
  );
}
