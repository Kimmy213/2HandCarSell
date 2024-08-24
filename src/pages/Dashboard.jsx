import React, { useState } from 'react';
import carJson from "../dataRod/taladrod-cars.min.json";
import { Container, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PieChart from '../components/pie_Chart.jsx';
import StackedBarChart from '../components/StackedBarChart.jsx';
import '../components/Table.css';

const Dashboard = () => {
  const carsArray = carJson.Cars; // Access the array of cars from the "Cars" key

  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Process the data to group by brand and model
  const brandData = carsArray.reduce((acc, car) => {
    const brand = car.NameMMT.split(' ')[0]; // Get the brand name (e.g., "HONDA")
    const model = car.Model;

    if (!acc[brand]) {
      acc[brand] = { count: 0, totalValue: 0, models: {} };
    }

    if (!acc[brand].models[model]) {
      acc[brand].models[model] = { count: 0, totalValue: 0 };
    }

    // Convert price to number, remove commas if present
    const price = parseInt(car.Prc.replace(/,/g, ''));

    acc[brand].count += 1;
    acc[brand].totalValue += price;
    acc[brand].models[model].count += 1;
    acc[brand].models[model].totalValue += price;

    return acc;
  }, {});

  const filteredBrandData = Object.keys(brandData).reduce((acc, brand) => {
    if (brand.toLowerCase().includes(searchTerm.toLowerCase())) {
      acc[brand] = brandData[brand];
    }
    return acc;
  }, {});

  return (
    <Container>
      <h1 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '10px', fontSize: '5rem', fontWeight: 'bold', color: '#333' }}>
        Total Car Statistics
      </h1> 
      {/* Subheading for the pie chart */}
      <PieChart />
      <StackedBarChart />
      <Form.Group className="mb-3" controlId="search">
        <Form.Control
          type="text"
          placeholder="Search by brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Brand / Model</th>
              <th>Number of Cars</th>
              <th>Total Value (Baht)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(filteredBrandData).map((brand) => (
              <React.Fragment key={brand}>
                <tr>
                  <td>
                    <strong>{brand}</strong>
                  </td>
                  <td>{filteredBrandData[brand].count}</td>
                  <td>{filteredBrandData[brand].totalValue.toLocaleString()}</td>
                </tr>
                {Object.keys(filteredBrandData[brand].models).map((model) => (
                  <tr key={model}>
                    <td style={{ paddingLeft: "20px" }}>
                      {brand} / {model}
                    </td>
                    <td>{filteredBrandData[brand].models[model].count}</td>
                    <td>
                      {filteredBrandData[brand].models[model].totalValue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Dashboard;
