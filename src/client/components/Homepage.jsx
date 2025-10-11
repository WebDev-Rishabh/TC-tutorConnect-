import React from "react"
import "../styles/homepage.css"
import homePage from "../assets/images/homepage.jpg" 
import { Typewriter } from "react-simple-typewriter";

export default function Homepage() {
  return (
    <div className="homePage">
    <div className="getStarted">
      <div className="left">
        <h6>“Trusted learning platform for students & teachers”</h6>
        <h2>Connect with Expert Tutors Anytime, Anywhere.</h2>
        <h3>Find the right teacher for your goals. Flexible schedules, affordable pricing, and personalized lessons designed to help you succeed.</h3>
      <div className="btns">
        <button type="submit" href="#">Get Started</button>
        <button type="submit" href="#">Became Tutor</button>
      </div>
      </div>
      <div className="right">
        <img src={homePage} alt="" height="313px" width="529px"/>
      </div>
    </div>
    <div className="whyChoose">
  <h2>Why Choose TutorConnect?</h2>
  <h3>We make it easy for students to learn and teachers to earn.</h3>

  <div className="cards">
    <div className="tutors">
      <span className="material-symbols-outlined">verified_user</span>
      <h3>Verified Tutors</h3>
      <h4>Every tutor is carefully screened to ensure you learn from trusted, qualified, and skilled professionals.</h4>
    </div>

    <div className="scheduling">
      <span className="material-symbols-outlined">calendar_month</span>
      <h3>Flexible Scheduling</h3>
      <h4>Book lessons at times that suit your lifestyle. Learn at your own pace, whenever and wherever you want.</h4>
    </div>

    <div className="pricing">
      <span className="material-symbols-outlined">payments</span>
      <h3>Affordable Pricing</h3>
      <h4>Pay only for the sessions you choose. Transparent and flexible pricing designed to fit every budget.</h4>
    </div>

    <div className="learning">
      <span className="material-symbols-outlined">target</span>
      <h3>Personal learning</h3>
      <h4>Get lessons tailored to your academic needs and goals for a truly customized learning experience.</h4>
    </div>
  </div>
</div>

<div className="tcWorks">
<h2>How TutorConnect Works</h2>
<h3 className="tcWorksH3">Getting started is simple — just follow 3 easy steps.</h3>
<div className="tcwork-card">
<div className="signUp">
<span class="material-symbols-outlined">
verified_user
</span>
  <h3>Step 1: Sign Up</h3>
  
  <h4>Create your free account in minutes and set up your learning profile.</h4>
</div>
<div className="findTutor">
<span class="material-symbols-outlined">
verified_user
</span>
  <h3>Step 2: Find Your Tutor</h3>
  <h4>Browse verified tutors by subject, experience, and availability to match your needs.</h4>
</div>
<div className="startLearning">
<span class="material-symbols-outlined">
verified_user
</span>
  <h3>Step 3: Start Learning</h3>
  <h4> Book a session, connect instantly, and begin your personalized learning journey.</h4>
</div>
</div>
</div>
<div className="meetTutors">
  <h2 className="meetTutorsH2">Meet Our Tutors</h2>
  <h3 className="meetTutorsH3">Experienced and verified educators ready to help you succeed.</h3>
<div className="tutor-card">
  <div className="avatar">
    <span className="material-symbols-outlined">account_circle</span>
  </div>
  
  <h3 className="tutor-name">Dr. Ananya Sharma</h3>
  <p className="subject">Subject: <span>Mathematics & Physics</span></p>
  <p className="experience">10+ years of experience in teaching high school and college students.</p>
  
  <p className="rating">
    <span className="material-symbols-outlined star">star</span>
    4.8 <span className="reviews">(98 reviews)</span>
  </p>

  <button type="submit" className="profile-btn" href="google.com">View Profile</button>
</div>
</div>

<div className="studentReviews">
  <h2 className="studentReviewsH2">What Our Students Say</h2>
  <h3 className="studentReviewsH3">
    Thousands of learners trust TutorConnect to achieve their goals.
  </h3>

  <div className="reviews-container">
    {/* Review Card 1 */}
    <div className="reviewCard">
      <div className="review-avatar">
        <span className="material-symbols-outlined">account_circle</span>
      </div>
      <h3 className="reviewer-name">Riya S. – Grade 10 Student</h3>
      <p className="review-content">
        TutorConnect made learning math enjoyable. My tutor explained concepts
        step by step and helped me score 92% in my finals.
      </p>
      <div className="review-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="material-symbols-outlined star">
            star
          </span>
        ))}
      </div>
    </div>

    {/* Review Card 2 */}
    <div className="reviewCard">
      <div className="review-avatar">
        <span className="material-symbols-outlined">account_circle</span>
      </div>
      <h3 className="reviewer-name">Aarav K. – IELTS Student</h3>
      <p className="review-content">
        I loved the flexible scheduling! Even with my full-time job, I could
        prepare for IELTS. Thanks to my tutor, I achieved Band 7.5 in just 2
        months.
      </p>
      <div className="review-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="material-symbols-outlined star">
            star
          </span>
        ))}
      </div>
    </div>

    {/* Review Card 3 */}
    <div className="reviewCard">
      <div className="review-avatar">
        <span className="material-symbols-outlined">account_circle</span>
      </div>
      <h3 className="reviewer-name">Meera T. – B.Sc. Physics</h3>
      <p className="review-content">
        I was struggling with quantum mechanics, but TutorConnect matched me
        with the perfect mentor. Now I understand the concepts and feel
        confident for my exams.
      </p>
      <div className="review-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="material-symbols-outlined star">
            star
          </span>
        ))}
      </div>
    </div>
  </div>
</div>
<section className="signUp">
  <div className="cardStart">
      <h2 className="startlearning">
        <Typewriter
          words={["Start Learning Smarter Today"]}
          loop={0} // infinite
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
      <button type="button" className="signup-btn">
        Sign Up Now
      </button>
      </div>
    </section>

    <footer class="footer">
  <div class="footer-left">
    <h2 class="logo">TutorConnect</h2>
    <p>Connecting students with trusted tutors, anytime, anywhere.</p>
  </div>

  <div class="footer-center">
    <div class="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Tutor</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Support</h3>
      <ul>
        <li><a href="#">FAQs</a></li>
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Terms & Conditions</a></li>
        <li><a href="#">Privacy Policy</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-right">
    <h3>Stay Connected</h3>
    <div class="social-icons">
      <a href="#"><i class="fab fa-facebook-f"></i></a>
      <a href="#"><i class="fab fa-twitter"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
      <a href="#"><i class="fab fa-linkedin-in"></i></a>
    </div>
    <div class="newsletter">
      <input type="email" placeholder="Enter your email" />
      <button type="button">Subscribe</button>
    </div>
  </div>
</footer>
<div class="end-footer">
  <p>© 2025 TutorConnect. All rights reserved.</p>
</div>
    </div>
    
  )
}
