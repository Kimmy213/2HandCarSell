import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  Form,
  InputGroup,
} from "react-bootstrap";
import carData from "../data/taladrod-cars.json";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    setCars(carData.Cars);

    const storedHighlightedCars = JSON.parse(localStorage.getItem("highlightedCars")) || [];
    setHighlightedCars(storedHighlightedCars);
  }, []);

  const brands = useMemo(() => {
    return ["All", ...new Set(carData.Cars.map((car) => car.NameMMT.split(" ")[0]))];
  }, [carData.Cars]);

  const filterCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesBrand = selectedBrand === "All" || car.NameMMT.split(" ")[0] === selectedBrand;
      const matchesSearch = car.NameMMT.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBrand && matchesSearch;
    });
  }, [cars, selectedBrand, searchQuery]);

  const handleSearch = () => {
    setSearchQuery(searchQuery.trim());
  };

  const toggleHighlight = (car) => {
    setHighlightedCars((prev) => {
      const isHighlighted = prev.some((c) => c.Cid === car.Cid);
      const updatedHighlightedCars = isHighlighted
        ? prev.filter((highlightedCar) => highlightedCar.Cid !== car.Cid)
        : [...prev, car];

      localStorage.setItem("highlightedCars", JSON.stringify(updatedHighlightedCars));
      return updatedHighlightedCars;
    });
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col xs={12} md={8} className="d-flex justify-content-center justify-content-md-end">
          <InputGroup className="w-100" style={{ boxShadow: "none" }}>
            <Form.Control
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRadius: "30px 0 0 30px",
                border: "1px solid #ddd",
                paddingLeft: "20px",
                outline: "none",
                boxShadow: "none",
              }}
            />
            <Button
              variant="dark"
              onClick={handleSearch}
              style={{
                borderRadius: "0 30px 30px 0",
                border: "1px solid #ddd",
                padding: "10px 20px",
                outline: "none",
                boxShadow: "none",
                backgroundColor: "#343a40",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <ButtonGroup className="mb-4 d-flex flex-wrap justify-content-center">
        {brands.map((brand) => (
          <Button
            key={brand}
            variant={selectedBrand === brand ? "dark" : "outline-secondary"}
            onClick={() => setSelectedBrand(brand)}
            style={{
              borderRadius: "20px",
              padding: "8px 16px",
              margin: "5px",
              backgroundColor: selectedBrand === brand ? "#343a40" : "#f8f9fa",
              color: selectedBrand === brand ? "#fff" : "#343a40",
              border: "1px solid #343a40",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "background-color 0.3s, color 0.3s",
              boxShadow: selectedBrand === brand ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
            }}
          >
            {brand}
          </Button>
        ))}
      </ButtonGroup>

      <Row>
        {filterCars.map((car) => (
          <Col xs={12} sm={6} md={4} lg={3} key={car.Cid} className="mb-4">
            <Card
              className="shadow-lg h-100"
              style={{
                borderRadius: "15px",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
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
                  variant={highlightedCars.some((c) => c.Cid === car.Cid) ? "warning" : "success"}
                  onClick={() => toggleHighlight(car)}
                  style={{
                    width: "100%",
                    borderRadius: "30px",
                    padding: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {highlightedCars.some((c) => c.Cid === car.Cid) ? "UnHighLight" : "HighLight"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CarList;
