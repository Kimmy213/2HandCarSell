import React, { useEffect, useState } from "react";
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
import carData from "../dataRod/taladrod-cars.json";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    setCars(carData.Cars);
    // Load highlighted cars from localStorage on component mount
    const storedHighlightedCars =
      JSON.parse(localStorage.getItem("highlightedCars")) || [];
    setHighlightedCars(storedHighlightedCars);
  }, []);

  // Extract unique brands from the car data
  const brands = [
    "All",
    ...new Set(cars.map((car) => car.NameMMT.split(" ")[0])),
  ];

  const filterCars = () => {
    let filteredCars = cars;

    if (selectedBrand !== "All") {
      filteredCars = filteredCars.filter(
        (car) => car.NameMMT.split(" ")[0] === selectedBrand
      );
    }

    if (searchQuery) {
      filteredCars = filteredCars.filter((car) =>
        car.NameMMT.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredCars;
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const toggleHighlight = (car) => {
    if (highlightedCars.some((c) => c.Cid === car.Cid)) {
      // Remove car from highlighted cars
      const updatedHighlightedCars = highlightedCars.filter(
        (highlightedCar) => highlightedCar.Cid !== car.Cid
      );
      setHighlightedCars(updatedHighlightedCars);
      localStorage.setItem(
        "highlightedCars",
        JSON.stringify(updatedHighlightedCars)
      );
    } else {
      // Add car to highlighted cars
      setHighlightedCars([...highlightedCars, car]);
      localStorage.setItem(
        "highlightedCars",
        JSON.stringify([...highlightedCars, car])
      );
    }
  };

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

  return (
    <Container className="mt-4">
    <Row className="align-items-center mb-4">
        <Col
          xs={12}
          md={6}
          className="d-flex justify-content-md-end justify-content-center"
        >
          <InputGroup className="w-100">
            <Form.Control
              type="text"
              placeholder="Search cars..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="dark" onClick={handleSearch}>
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
      {/* Button group for selecting brands */}
      <ButtonGroup className="mb-4 d-flex flex-wrap">
        {brands.map((brand) => (
          <Button
            key={brand}
            variant={selectedBrand === brand ? "dark" : "outline-dark"}
            onClick={() => setSelectedBrand(brand)}
            className="mb-2"
          >
            {brand}
          </Button>
        ))}
      </ButtonGroup>

      {/* Display the list of cars */}
      <Row>
        {filterCars().map((car) => (
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
                  variant={
                    highlightedCars.some((c) => c.Cid === car.Cid)
                      ? "warning"
                      : "success"
                  }
                  onClick={() => {
                    toggleHighlight(car);
                  }}
                >
                  {highlightedCars.some((c) => c.Cid === car.Cid)
                    ? "Unpin"
                    : "Pin"}
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