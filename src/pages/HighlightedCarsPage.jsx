import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storedCars = localStorage.getItem("highlightedCars");
    if (storedCars) {
      setHighlightedCars(JSON.parse(storedCars));
    }
  }, []);

  const removeCar = (carId) => {
    const updatedCars = highlightedCars.filter((car) => car.Cid !== carId);
    setHighlightedCars(updatedCars);
    localStorage.setItem("highlightedCars", JSON.stringify(updatedCars));
  };

  const clearAllCars = () => {
    setHighlightedCars([]);
    localStorage.removeItem("highlightedCars");
    setModalVisible(false);
  };

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <Container className="mt-4">
      <div className="header" style={{ padding: "15px 0", backgroundColor: "#f8f9fa", marginBottom: "30px", textAlign: "left" }}>
        <h2 style={{ fontWeight: "700", fontSize: "2.2rem", color: "#343a40", margin: 0 }}>
          Highlighted Cars
        </h2>
      </div>

      <Row className="mb-4">
        {highlightedCars.length === 0 ? (
          <Col>
            <p style={{ textAlign: "center", color: "#6c757d" }}>No highlighted cars yet.</p>
          </Col>
        ) : (
          highlightedCars.map((car) => (
            <Col xs={12} sm={6} md={4} lg={3} key={car.Cid} className="mb-4">
              <Card
                className="shadow-lg h-100"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.15)";
                }}
              >
                <Card.Img
                  variant="top"
                  src={car.Img300}
                  alt={car.Model}
                  style={{
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    objectFit: "cover",
                    height: "200px",
                  }}
                />
                <Card.Body>
                  <Card.Title>{car.NameMMT}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> {car.Prc} <br />
                    <strong>Year:</strong> {car.Yr} <br />
                    <strong>Province:</strong> {car.Province} <br />
                    <strong>Views:</strong> {car.PageViews}
                  </Card.Text>
                  <Button
                    variant="danger"
                    style={{
                      borderRadius: "30px",
                      fontWeight: "bold",
                      padding: "12px 24px", // Increase padding for a larger button
                      marginTop: "10px",
                      display: "block",
                      width: "100%", // Make button full-width
                    }}
                    onClick={() => removeCar(car.Cid)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {highlightedCars.length > 0 && (
        <Button
          variant="danger"
          onClick={toggleModal}
          style={{
            borderRadius: "30px",
            padding: "12px",
            fontWeight: "bold",
            fontSize: "1rem",
            width: "100%",
          }}
        >
          Clear All
        </Button>
      )}

      <Modal show={modalVisible} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Clear All Highlighted Cars</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to clear all highlighted cars?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={clearAllCars}>
            Clear All
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HighlightedCars;
