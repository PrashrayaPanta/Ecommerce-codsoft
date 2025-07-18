import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../http";
import { LoadingComponent } from "../../components";

const Edit = () => {
  // console.log("category edit is running");

  const [category, setCategory] = useState({});

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),
    onSubmit: (data, { setSubmitting }) => {
      // console.log(data);
      http
        .put(`/api/admin/categories/${id}`, data)
        .then(({ data }) => {
          
          
          setCategory(data.categoryDocumentAfterUpdation)
        
          navigate("/category")

        }
        
        )
        .catch()
        .finally(() => setSubmitting(false));
    },
  });

  useEffect(() => {
    setLoading(true);
    http
      .get(`/api/categories/${id}`)
      .then(({ data }) => setCategory(data.category))
      .catch()
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (Object.keys(category).length > 0) {
      for (let k in formik.values) {
        formik.setFieldValue(k, category[k]);
      }
    }
    // console.log(staff);
  }, [category]);

  //   console.log(category);

  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <Row>
                <Col>
                  <h1>Edit Page</h1>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form onSubmit={formik.handleSubmit}>
                    <InputField
                      label="Name"
                      name="name"
                      formik={formik}
                      type="text"
                    />

                    <SubmitBtn formik={formik} label="Update" />
                  </Form>
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Edit;
