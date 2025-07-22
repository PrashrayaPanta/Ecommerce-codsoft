import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import http from "../../http";
import { LoadingComponent } from "../../components";
import { dtFormat } from "../../library";

const List = () => {
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setLoading(true);

    http
      .get("/api/orders")
      .then(({ data }) => setOrders(data.orders))
      .catch()
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = (id, status) => {
    console.log(id);
    console.log(status);

    setLoading(true);

    http
      .put(`/api/orders/${id}`, { status })
      .then(() => http.get("/api/orders"))
      .then(({ data }) => setOrders(data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  console.log(orders);

  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          {loading ? (
            <LoadingComponent />
          ) : (
            <React.Fragment>
              <Row>
                <Col>
                  <h1>Order List</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  {orders.length > 0 ? (
                    <Table bordered hover size="sm">
                      <thead className="table-dark">
                        <tr>
                          <th>Order By Name</th>
                          <th>Order By Email</th>

                          <th>Order Product Name</th>
                          <th>Quantity</th>
                          <th>Total Price</th>

        
                   
                   
                          <th>status</th>

                          <th>Created at</th>
                          <th>Updated at</th>

                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.map((order, index) => (
                          <tr>

                            {/* Order Usernamne */}
                            <td>{order.user_id?.username}</td>
                            {/* {Order Email} */}
                            <td>{order.user_id?.email}</td>

                            {/* {Order Product Name} */}

                            <td>
                              {order.items?.map(
                                (item) => item.product_id.name
                              )}
                            </td>

                            {/* Order Quantity */}
                            <td>
                              {order.items.map(
                                (detail) => detail.quantity
                              )}
                            </td>

                            {/* Order Price */}

                            <td>
                              {order.items.map(
                                (detail) => detail.quantity * detail.product_id.initialPrice
                              )}
                            </td>

                            {/* <td>{order.status}</td> */}

                        
                            {/* <td>
                              <ul>
                                {order?.details?.map((detail) => (
                                  <li key={detail._id}>
                                    {detail.qty} x {detail?.product?.name}
                                    @Rs {detail?.price} = Rs . {detail.total}
                                  </li>
                                ))}
                              </ul>
                            </td> */}
                            <td>
                              <Form.Select
                                value={order?.status}
                                onChange={({ target }) =>
                                  handleUpdate(order._id, target.value)
                                }
                              >
                                <option value="processing">processing</option>
                                <option value="confirmed">confirmed</option>
                                <option value="shipping">Shipping</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </Form.Select>
                            </td>

                            <td>{dtFormat(order.createdAt)}</td>
                            <td>{dtFormat(order.updatedAt)}</td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(order._id)}
                              >
                                <i className="fa-solid fa-trash me-2"></i>Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <h4 className="text-muted">No orders</h4>
                  )}
                </Col>
              </Row>
            </React.Fragment>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default List;
