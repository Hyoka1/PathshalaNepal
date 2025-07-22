import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./ContactUs.css";

const ContactUs = () => {
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

  const itemVariants = {
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

  return (
    <div className="contact-wrapper">
      <motion.div
        className="contact-box"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 className="contact-title" variants={itemVariants}>
          Contact Us
        </motion.h2>

        <div className="contact-info">
          <motion.div variants={itemVariants}>
            <span className="label">📞 Phone:</span>
            <p>+977 9745358527</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <span className="label">📧 Email:</span>
            <p>PathsalaNepal@gmail.com</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <span className="label">📍 Address:</span>
            <p>Kathmandu, Nepal</p>
          </motion.div>

          <motion.div className="social-icons" variants={itemVariants}>
            <a
              href="https://www.facebook.com/avinav.baral.2025"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/avinav_baral/m"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/avinav-baral-6252a1266/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
