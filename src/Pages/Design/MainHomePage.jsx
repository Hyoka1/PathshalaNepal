import React, { useState, useEffect } from "react";

const HomePage = () => {
  // For fade-in animations on scroll
  const [isVisible, setIsVisible] = useState({
    header: false,
    about: false,
    features: false,
    stats: false,
  });

  // Books showcase animation
  const books = [
    { title: "Nepali Literature", color: "#3b82f6" },
    { title: "Science & Math", color: "#10b981" },
    { title: "History of Nepal", color: "#f59e0b" },
    { title: "Arts & Culture", color: "#8b5cf6" },
    { title: "Digital Technology", color: "#ec4899" },
  ];

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjCOE3Ybkv2n1fbGiX6Pw3Q6y05ZUbqtI8Tw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3OgbAh08_TOcWe1Dxczum-lOjcAlQOlV81A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3aq4eVZO1eHlYltvEdSPIpBM2SgdH8PjVcQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Ti5K_9rKltUXibFrwgFLEUSA04ilgqahsw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXUVTIvJM2G0jOlxds8WajcTh9YEMngld2Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQMfo2UBe4MHq1z9aZILj6YDPRQiAXiqF16g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_kQ0nvXjFIgWgeJD2xsLhjPbRWCRUMdUiyg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjg-Fryv62hGZYWJjT_P-j5Cx_QXQD0qrXuQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDBo3sOmwN2AJuvhGNWc_6o17PZb7RAYXUpw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ziY6KBEOM9ZsflL5rbhrZN8JZ_GwICl21Q&s",
  ];

  // Parallax effect
  const [offset, setOffset] = useState(0);

  // Student success statistics with counter animation
  const [counters, setCounters] = useState({
    students: 0,
    books: 0,
    courses: 0,
  });

  const targetCounts = {
    students: 25000,
    books: 12500,
    courses: 750,
  };

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);

      // Check if elements are in viewport to trigger animations
      const sections = ["header", "about", "features", "stats"];
      const newVisibility = { ...isVisible };

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const position = element.getBoundingClientRect();
          if (position.top < window.innerHeight * 0.75) {
            newVisibility[section] = true;
          }
        }
      });

      setIsVisible(newVisibility);
    };

    // Start animations for elements in initial viewport
    setTimeout(() => {
      setIsVisible((prev) => ({ ...prev, header: true }));
      handleScroll();
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Counter animation
  useEffect(() => {
    if (isVisible.stats) {
      const interval = setInterval(() => {
        setCounters((prev) => {
          const newCounters = { ...prev };
          let allCompleted = true;

          Object.keys(targetCounts).forEach((key) => {
            if (prev[key] < targetCounts[key]) {
              const increment = Math.ceil(targetCounts[key] / 100);
              newCounters[key] = Math.min(
                prev[key] + increment,
                targetCounts[key]
              );
              if (newCounters[key] < targetCounts[key]) allCompleted = false;
            }
          });

          if (allCompleted) clearInterval(interval);
          return newCounters;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isVisible.stats]);

  return (
    <div className="home-container">
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <header
        id="header"
        className={`home-header ${isVisible.header ? "visible" : ""}`}
        style={{ backgroundPositionY: offset * 0.5 }}
      >
        <div
          style={{
            backgroundImage: 'url("https://tinyurl.com/ykd6xxev")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "10rem 10rem",
            borderRadius: "10px",
          }}
        >
          <div className="header-content">
            <h1 className="title-animate">PathsalaNepal</h1>
            <p className="tagline">Padna Pani, Badhna Pani</p>
            <div className="cta-container">
              <a href="/" className="cta-button">
                Explore Now
                <span className="cta-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="image-carousel">
        <div className="carousel-wrapper">
          {images.map((img, index) => (
            <div key={index} className="carousel-item">
              <img
                src={img}
                alt={`slide-${index}`}
                className="carousel-image"
              />
            </div>
          ))}
          {/* Duplicate images for infinite scroll effect */}
          {images.map((img, index) => (
            <div key={`dup-${index}`} className="carousel-item">
              <img
                src={img}
                alt={`slide-dup-${index}`}
                className="carousel-image"
              />
            </div>
          ))}
        </div>
      </section>

      <section
        id="about"
        className={`about ${isVisible.about ? "visible" : ""}`}
      >
        <h2>Discover a World of Knowledge</h2>
        <p>
          PathsalaNepal connects learners, teachers, and book lovers across
          Nepal. Dive into a library of digital resources, discover new ideas,
          and grow with every page you turn.
        </p>

        <div className="book-showcase">
          {books.map((book, index) => (
            <div
              key={index}
              className="book"
              style={{
                backgroundColor: book.color,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <div className="book-spine"></div>
              <div className="book-cover">
                <span>{book.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="features"
        className={`features ${isVisible.features ? "visible" : ""}`}
      >
        <h2>Why Choose PathsalaNepal?</h2>
        <div className="features-grid">
          {[
            {
              icon: "📚",
              title: "Extensive Library",
              desc: "Access thousands of books and learning materials",
            },
            {
              icon: "👩‍🏫",
              title: "Expert Teachers",
              desc: "Learn from Nepal's best educators",
            },
            {
              icon: "🌐",
              title: "Learn Anywhere",
              desc: "Study at your own pace, on any device",
            },
            {
              icon: "🏆",
              title: "Track Progress",
              desc: "Monitor your learning journey with detailed analytics",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="stats"
        className={`stats-section ${isVisible.stats ? "visible" : ""}`}
      >
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">
              {counters.students.toLocaleString()}+
            </div>
            <div className="stat-label">Happy Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {counters.books.toLocaleString()}+
            </div>
            <div className="stat-label">Digital Books</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {counters.courses.toLocaleString()}+
            </div>
            <div className="stat-label">Online Courses</div>
          </div>
        </div>
      </section>

      {/* <footer className="footer">
        <p>© 2025 PathsalaNepal - Transforming Education in Nepal</p>
        <div className="footer-links">
          <a href="#" className="footer-link">
            About Us
          </a>
          <a href="#" className="footer-link">
            Contact
          </a>
          <a href="#" className="footer-link">
            Blog
          </a>
          <a href="#" className="footer-link">
            Privacy Policy
          </a>
        </div>
      </footer> */}

      <style jsx>{`
        .home-container {
          font-family: "Poppins", sans-serif;
          text-align: center;
          background: linear-gradient(to bottom right, #e0f2fe, #f0fdf4);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        /* Particles background */
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          top: -10px;
          animation: fall linear infinite;
        }

        @keyframes fall {
          0% {
            transform: translateY(-10px) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateY(10vh) scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) scale(0.5);
            opacity: 0;
          }
        }

        /* Header with parallax and animations */
        .home-header {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          position: relative;
          overflow: hidden;
          background-size: 80% 80%;
          background-position: 0% 0%;
          z-index: 1;
          opacity: 0;
          transform: translateY(20px);
          transition: transform 1s ease, opacity 1s ease;
        }

        .home-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .home-header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("/api/placeholder/1200/400") center/cover;
          opacity: 0.1;
          z-index: -1;
        }

        .header-content {
          position: relative;
          z-index: 2;
        }

        .title-animate {
          font-size: 4rem;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #a5f3fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 3s linear infinite;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        .tagline {
          font-size: 1.5rem;
          margin-bottom: 2.5rem;
          opacity: 0;
          animation: fadeIn 1s ease 1.5s forwards;
        }

        .cta-container {
          opacity: 0;
          animation: fadeIn 1s ease 1s forwards;
        }

        .cta-button {
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border: none;
          border-radius: 10px;
          background: #38bdf8;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }

        .cta-button:hover {
          background: #0284c7;
          transform: translateY(-3px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
        }

        .cta-arrow {
          margin-left: 8px;
          transition: transform 0.3s ease;
        }

        .cta-button:hover .cta-arrow {
          transform: translateX(5px);
        }

        /* Enhanced carousel */
        .image-carousel {
          margin: 3rem auto;
          overflow: hidden;
          padding: 1rem;
          position: relative;
        }

        .image-carousel::before,
        .image-carousel::after {
          content: "";
          position: absolute;
          top: 0;
          width: 100px;
          height: 100%;
          z-index: 2;
        }

        .image-carousel::before {
          left: 0;
          background: linear-gradient(
            90deg,
            rgba(224, 242, 254, 1),
            rgba(224, 242, 254, 0)
          );
        }

        .image-carousel::after {
          right: 0;
          background: linear-gradient(
            270deg,
            rgba(240, 253, 244, 1),
            rgba(240, 253, 244, 0)
          );
        }

        .carousel-wrapper {
          display: flex;
          gap: 1.5rem;
          animation: scroll 40s linear infinite;
          will-change: transform;
        }

        .carousel-wrapper:hover {
          animation-play-state: paused;
        }

        .carousel-item {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          flex-shrink: 0;
          transform: scale(0.95);
          transition: transform 0.3s ease;
        }

        .carousel-item:hover {
          transform: scale(1);
          z-index: 1;
        }

        .carousel-image {
          height: 220px;
          width: auto;
          border-radius: 10px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* About section with animated books */
        .about {
          padding: 5rem 2rem;
          background: #f9fafb;
          opacity: 0;
          transform: translateY(30px);
          transition: transform 1s ease, opacity 1s ease;
        }

        .about.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .about h2 {
          font-size: 2.5rem;
          color: #1e3a8a;
          margin-bottom: 1.5rem;
        }

        .about p {
          font-size: 1.2rem;
          color: #4b5563;
          max-width: 800px;
          margin: 0 auto 3rem;
          line-height: 1.6;
        }

        .book-showcase {
          display: flex;
          justify-content: center;
          gap: 15px;
          perspective: 1000px;
          margin-top: 3rem;
        }

        .book {
          height: 200px;
          width: 40px;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateY(-30deg);
          transition: all 0.5s ease;
          opacity: 0;
          animation: bookAppear 0.5s ease forwards;
        }

        @keyframes bookAppear {
          to {
            opacity: 1;
            transform: rotateY(0);
          }
        }

        .book:hover {
          transform: rotateY(-15deg) rotateX(10deg) translateY(-10px);
          z-index: 1;
        }

        .book-spine {
          position: absolute;
          width: 40px;
          height: 100%;
          left: 0;
          top: 0;
          transform-origin: left;
          transform: rotateY(0deg) translateZ(0);
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px 0 0 4px;
        }

        .book-cover {
          position: absolute;
          width: 150px;
          height: 100%;
          left: 20px;
          top: 0;
          transform-origin: left;
          transform: rotateY(90deg);
          background: inherit;
          border-radius: 0 4px 4px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
        }

        .book-cover span {
          font-weight: bold;
          color: white;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        }

        /* Features section */
        .features {
          padding: 5rem 2rem;
          background: linear-gradient(135deg, #dbeafe, #eff6ff);
          opacity: 0;
          transform: translateY(30px);
          transition: transform 1s ease, opacity 1s ease;
        }

        .features.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .features h2 {
          font-size: 2.5rem;
          color: #1e3a8a;
          margin-bottom: 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.5s ease;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.5s ease forwards;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.4rem;
          color: #1e3a8a;
          margin-bottom: 0.5rem;
        }

        .feature-card p {
          color: #6b7280;
          font-size: 1rem;
        }

        /* Stats section with counter animation */
        .stats-section {
          padding: 5rem 2rem;
          background: #1e3a8a;
          color: white;
          opacity: 0;
          transform: translateY(30px);
          transition: transform 1s ease, opacity 1s ease;
        }

        .stats-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stats-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stat-card {
          text-align: center;
          min-width: 200px;
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          background: linear-gradient(90deg, #fff, #a5f3fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .stat-label {
          font-size: 1.2rem;
          color: #cbd5e1;
        }

        /* Footer */
        .footer {
          background: #0f172a;
          color: white;
          padding: 3rem 2rem;
        }

        .footer p {
          margin-bottom: 1.5rem;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .footer-link {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #38bdf8;
        }

        /* Animation keyframes */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .title-animate {
            font-size: 2.5rem;
          }

          .tagline {
            font-size: 1.2rem;
          }

          .book-showcase {
            flex-wrap: wrap;
          }

          .book {
            margin-bottom: 20px;
          }

          .stats-container {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
