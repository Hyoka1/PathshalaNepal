import React from "react";
import { motion } from "framer-motion";
import "./AboutUs.css";

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const offerItems = [
    { icon: "📝", text: "Interactive Courses & Study Materials" },
    { icon: "🎥", text: "Video Lessons, Live Classes & Webinars" },
    { icon: "📚", text: "Digital Library & Research Resources" },
    { icon: "🤝", text: "Student Community & Chat Support" },
    { icon: "📈", text: "Progress Tracking and Reporting Tools" },
  ];

  const valueItems = [
    { icon: "🔑", text: "Accessibility" },
    { icon: "🎯", text: "Quality" },
    { icon: "🤝", text: "Inclusiveness" },
    { icon: "🌱", text: "Innovation" },
    { icon: "💡", text: "Empowerment" },
  ];

  return (
    <div className="about-wrapper">
      <motion.div
        className="about-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="about-title" variants={sectionVariants}>
          About PathsalaNepal
        </motion.h1>

        <motion.section className="about-section" variants={sectionVariants}>
          <h2>Who We Are</h2>
          <p>
            PathsalaNepal is an innovative online learning platform that aims to
            revolutionize education in Nepal and beyond. We provide a digital
            space where students, educators, and institutions come together to
            share, grow, and build futures with knowledge.
          </p>
        </motion.section>

        <motion.section className="about-section" variants={sectionVariants}>
          <h2>Our Mission</h2>
          <p>
            To make quality education accessible and inclusive for every
            student, regardless of geography or background. We are committed to
            building a platform that empowers lifelong learners and enhances
            academic success through digital tools.
          </p>
        </motion.section>

        <motion.section className="about-section" variants={sectionVariants}>
          <h2>Our Vision</h2>
          <p>
            To become Nepal's leading digital learning platform, bridging the
            gap between traditional education and modern digital possibilities
            while nurturing curiosity, creativity, and career readiness in
            students.
          </p>
        </motion.section>

        <motion.section className="about-section" variants={sectionVariants}>
          <h2>What We Offer</h2>
          <ul>
            {offerItems.map((item, index) => (
              <li key={index} data-icon={item.icon}>
                {item.text}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section className="about-section" variants={sectionVariants}>
          <h2>Our Core Values</h2>
          <ul>
            {valueItems.map((item, index) => (
              <li key={index} data-icon={item.icon}>
                {item.text}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section className="about-section" variants={sectionVariants}>
          <h2>Why Choose PathsalaNepal?</h2>
          <p>
            We are more than a website — we are a community of learners and
            changemakers. With user-friendly design, real-time support, and
            locally contextualized content, PathsalaNepal is where education
            meets opportunity.
          </p>
        </motion.section>

        <motion.section className="about-section" variants={sectionVariants}>
          <h2>Get in Touch</h2>
          <p>
            We'd love to hear from you! Whether you're a student, teacher, or
            partner — reach out and help us make education better together.
          </p>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default AboutUs;
