import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../http";
import { LoadingComponent } from "../../components";
import { dtFormat, imgURL, imgURLForProduct } from "../../library";

import "./List.css";

export const List = () => {
  useEffect(() => {
    document.title = "Product";
  }, []);

  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);





  useEffect(() => {
    setIsLoading(true);
    http
      .get("/api/admin/products")
      .then(({ data }) => setProducts(data.products))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  function handleDelete(index) {
    setIsLoading(true);

    http
      .delete(`/api/admin/products/${index}`)
      .then(() => http.get("/api/admin/products"))
      .then(({ data }) => setProducts(data.products))
      .catch()
      .finally(() => setIsLoading(false));
  }


  console.log(products);
  

  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <>
              <Row className="">
                <Col>
                  <h1>Products</h1>
                </Col>

                <Col xs="auto">
                  <Link
                    className="btn btn-dark btn-sm me-2"
                    to="/product/create"
                  >
                    <i className="fa-solid fa-plus me-2"></i>
                    Add Products
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col>
                  {products.length > 0 ? (
                    <Table bordered hover size="sm">
                      <thead className="table-dark">
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Images</th>
                          <th>Category</th>
                          <th>Brand</th>
                          <th>Price</th>
                          <th>Discounted Price</th>
                          <th>Created at</th>
                          <th>Updated at</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>
                              <a 
                                href={imgURLForProduct(product.images[0]?.public_id)}
                               
                              >
                                <img
                                  src={imgURLForProduct(product.images[0]?.public_id)}
                                  className="img-sm"
                                  alt=""
                                  srcset=""
                                />
                              </a>
                      
                            </td>
                            <td>{product?.brandName}</td>
                            <td>{product?.categoryName}</td>
                            <td>{`Rs ${product.initialPrice}`}</td>
                            <td>{product.discountedPrice}</td>
                            <td>{dtFormat(product.updatedAt)}</td>
                            <td>{dtFormat(product.updatedAt)}</td>
                            <td>
                              <Link
                                className="btn btn-dark btn-sm me-2"
                                to={`/product/edit/${product._id}`}
                              >
                                <i className="fa-solid fa-edit me-2"></i>Edit
                              </Link>

                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(product._id)}
                              >
                                <i className="fa-solid fa-trash me-2"></i>Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <h4 className="text-muted">No products</h4>
                  )}
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
