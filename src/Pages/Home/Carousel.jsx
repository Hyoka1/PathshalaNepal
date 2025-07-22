import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import "./Carousel.css";

function Carouselimg() {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1000&auto=format&fit=crop",
      title: "Discover Your Next Favorite Book",
      description:
        "Explore our vast collection of books from classic literature to contemporary bestsellers.",
      buttonText: "Browse Collection",
      buttonLink: "/books",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop",
      title: "Special Offers",
      description: "Get up to 50% off on selected books. Limited time offer!",
      buttonText: "View Offers",
      buttonLink: "/books",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
      title: "New Arrivals",
      description:
        "Check out our latest collection of books from renowned authors.",
      buttonText: "Explore New Books",
      buttonLink: "/new-arrivals",
    },
  ];

  return (
    <div className="hero-carousel">
      <Carousel fade indicators={false} controls={true}>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id} interval={3000}>
            <div className="carousel-image-container">
              <img
                className="carousel-image"
                src={slide.image}
                alt={slide.title}
              />
              <div className="carousel-overlay" />
            </div>
            <Carousel.Caption className="carousel-caption">
              <div className="caption-content">
                <h2 className="caption-title">{slide.title}</h2>
                <p className="caption-description">{slide.description}</p>
                <Button
                  variant="light"
                  className="caption-button"
                  onClick={() => (window.location.href = slide.buttonLink)}
                >
                  {slide.buttonText}
                  <FaArrowRight className="ms-2" />
                </Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Carouselimg;
