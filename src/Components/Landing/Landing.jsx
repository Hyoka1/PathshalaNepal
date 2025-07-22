import React, { useEffect, useState } from "react";
// import Homepage from "../../Pages/Home/Homepage";
import Bookcard from "../Card/Bookcard";
import Carouselimg from "../../Pages/Home/Carousel";
import { bookService } from "../../api/bookService";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "react-bootstrap";

const Landing = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = await bookService.getAll({ pageSize: 5 });
        setBooks(data);
      } catch (err) {
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="container mt-4">
      <Carouselimg />
      <div className="row mt-4 align-items-stretch">
        {loading && <div>Loading...</div>}
        {error && <div className="text-danger">{error}</div>}
        {!loading &&
          !error &&
          books.map((book) => (
            <div key={book.id} className="col-md-4 mb-4 d-flex">
              <Bookcard book={book} />
            </div>
          ))}
        {/* Show more books arrow */}
        {!loading && !error && (
          <div className="col-md-4 mb-4 d-flex align-items-center justify-content-center">
            <Button
              variant="outline-primary"
              className="show-more-btn d-flex align-items-center justify-content-center"
              onClick={() => (window.location.href = "/books")}
            >
              <span>Show more books</span>
              <FaArrowRight className="ms-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
