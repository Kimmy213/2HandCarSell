import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedHighlightedCars =
      JSON.parse(localStorage.getItem("highlightedCars")) || [];
    setHighlightedCars(storedHighlightedCars);
  }, []);

  // Remove car from highlight
  const removeHighlightedCar = (car) => {
    const updatedHighlightedCars = highlightedCars.filter(
      (highlightedCar) => highlightedCar.Cid !== car.Cid
    );
    setHighlightedCars(updatedHighlightedCars);
    localStorage.setItem(
      "highlightedCars",
      JSON.stringify(updatedHighlightedCars)
    );
  };

  // Function to add a car to the highlighted list
  const addHighlightedCar = (car) => {
    const updatedHighlightedCars = [...highlightedCars, car];
    setHighlightedCars(updatedHighlightedCars);
    localStorage.setItem(
      "highlightedCars",
      JSON.stringify(updatedHighlightedCars)
    );
  };

  // Clear all highlighted cars
  const clearAllHighlightedCars = () => {
    setHighlightedCars([]);
    localStorage.removeItem("highlightedCars");
    setShowModal(false);
  };

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  return (
    <Container className="mt-4">
      {/* Title positioned at the top */}
      <div
        className="highlighted-cars-header"
        style={{
          padding: "10px 0",
          backgroundColor: "#f8f9fa",
          marginBottom: "20px",
          textAlign: "left", // Make sure it's left-aligned
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "2rem", margin: 0 }}>
          Highlighted Cars
        </h2>
      </div>

      {/* Display highlighted cars */}
      <Row className="mb-4">
        {highlightedCars.length === 0 ? (
          <Col>
            <p style={{ textAlign: "center" }}>No highlighted cars yet.</p>
          </Col>
        ) : (
          highlightedCars.map((car) => (
            <Col xs={12} sm={6} md={4} lg={3} key={car.Cid} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img variant="top" src={car.Img300} alt={car.Model} />
                <Card.Body>
                  <Card.Title>{car.NameMMT}</Card.Title>
                  <Card.Text>
                    Price: {car.Prc} <br />
                    Year: {car.Yr} <br />
                    Province: {car.Province} <br />
                    Views: {car.PageViews}
                  </Card.Text>
                  <Button
                    variant="danger"
                    className="w-100"
                    onClick={() => removeHighlightedCar(car)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Clear all button */}
      {highlightedCars.length > 0 && (
        <Button
          variant="danger"
          className="w-100"
          onClick={handleShowModal}
        >
          Clear All
        </Button>
      )}

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={handleHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Clear All Highlighted Cars</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to clear all highlighted cars?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={clearAllHighlightedCars}>
            Clear All
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HighlightedCars;