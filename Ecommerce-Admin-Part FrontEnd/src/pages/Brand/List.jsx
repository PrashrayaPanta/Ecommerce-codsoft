import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { LoadingComponent } from "../../components";
import { Link } from "react-router-dom";
import http from "../../http";
import { dtFormat, imgURL, imgURLForProduct } from "../../library";

import "./List.css";

const List = () => {
  const [loading, setLoading] = useState(true);

  const [brands, setbrands] = useState([]);

  useEffect(() => {
    setLoading(true);
    http
      .get("/api/cms/admin/brands")
      .then(({ data }) => setbrands(data.brands))
      .catch()
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    // console.log("clicked");

    console.log(id);

    http
      .delete(`/api/admin/brands/${id}`)
      .then(() => http.get("/api/cms/admin/brands"))
      .then(({ data }) => setbrands(data.brands))
      .catch(() => {})
      .catch();
  };

  return (
    <div>
      <Container>
        <Row>
          <Col
            xs="12"
            className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto"
          >
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <Row>
                  <Col>
                    <h1>Brand</h1>
                  </Col>
                  <Col xs="auto">
                    <Link
                      className="btn btn-dark btn-sm me-2"
                      to="/brand/create"
                    >
                      <i className="fa-solid fa-plus me-2"></i>
                      Add Brand
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {brands.length > 0 ? (
                      <Table bordered hover size="sm">
                        <thead className="table-dark">
                          <tr>
                            <th>Brand Name</th>

                            <th>Slogan</th>

                            <th>Image</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {brands.map((brand, index) => (
                            <tr key={index}>
                              <td>{brand.name}</td>
                              <td>{brand.slogan}</td>
                              <td>
                                <img
                                  src={imgURL(brand?.logo?.public_id)}
                                  className="img-sm"
                                />
                              </td>

                              <td>{dtFormat(brand.createdAt)}</td>
                              <td>{dtFormat(brand.updatedAt)}</td>
                              <td>
                                <Link
                                  className="btn btn-dark btn-sm me-2"
                                  to={`/brand/edit/${brand._id}`}
                                >
                                  <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>

                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(brand._id)}
                                >
                                  <i className="fa-solid fa-trash me-2"></i>
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <h4 className="text-muted">No categorys</h4>
                    )}
                  </Col>
                </Row>
              </>
            )}
            {/* <Row>
            <Col>
              <h1>Welcome to category</h1>
            </Col>
          </Row> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default List;
