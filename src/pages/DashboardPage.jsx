import React, { useState, useMemo } from 'react';
import carJson from '../data/taladrod-cars.json';
import { Container, Table, Form } from 'react-bootstrap';
import PieChart from '../components/PieChart.jsx';
import StackedBarChart from '../components/BarChart.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Table.css';

const Dashboard = () => {
  const carsArray = carJson.Cars;

  const [searchTerm, setSearchTerm] = useState('');

  const aggregatedData = useMemo(() => {
    return carsArray.reduce((acc, car) => {
      const [brand] = car.NameMMT.split(' ');
      const model = car.Model;
      const price = parseInt(car.Prc.replace(/,/g, ''));

      if (!acc[brand]) {
        acc[brand] = { count: 0, totalValue: 0, models: {} };
      }

      if (!acc[brand].models[model]) {
        acc[brand].models[model] = { count: 0, totalValue: 0 };
      }

      acc[brand].count += 1;
      acc[brand].totalValue += price;
      acc[brand].models[model].count += 1;
      acc[brand].models[model].totalValue += price;

      return acc;
    }, {});
  }, [carsArray]);

  const filteredData = useMemo(() => {
    return Object.keys(aggregatedData)
      .filter((brand) => brand.toLowerCase().includes(searchTerm.toLowerCase()))
      .reduce((acc, brand) => {
        acc[brand] = aggregatedData[brand];
        return acc;
      }, {});
  }, [aggregatedData, searchTerm]);

  return (
    <Container>
      <h1
        style={{
          textAlign: 'center',
          marginTop: '30px',
          marginBottom: '10px',
          fontSize: '5rem',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Total Car Statistics
      </h1>

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
            {Object.entries(filteredData).map(([brand, data]) => (
              <React.Fragment key={brand}>
                <tr>
                  <td>
                    <strong>{brand}</strong>
                  </td>
                  <td>{data.count}</td>
                  <td>{data.totalValue.toLocaleString()}</td>
                </tr>
                {Object.entries(data.models).map(([model, modelData]) => (
                  <tr key={model}>
                    <td style={{ paddingLeft: '20px' }}>
                      {brand} / {model}
                    </td>
                    <td>{modelData.count}</td>
                    <td>{modelData.totalValue.toLocaleString()}</td>
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
