import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigationbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contentType, setContentType] = useState('all'); // Setting content type for fillter 

  const handleSearchClick = () => {
    // Pass the search term and selected content type to the parent
    onSearch({ searchTerm, contentType });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Advanced Search</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex flex-column">
            {/* Basic Search Input */}
            <Form.Control
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2 mb-2"
              aria-label="Search"
            />
            
            {/* Content Type Selection */}
            <Form.Select
              className="me-2 mb-2"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              aria-label="Content Type"
            >
              <option value="all">All</option>
              <option value="youtube">YouTube Videos</option>
              <option value="articles">Articles</option>
              <option value="papers">Academic Papers</option>
            </Form.Select>

            <Button variant="outline-success" onClick={handleSearchClick}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
