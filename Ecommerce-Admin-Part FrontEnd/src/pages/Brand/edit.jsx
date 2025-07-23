import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
// import YupPassword from "yup-password";
import http from "../../http";
import { useNavigate, useParams } from "react-router-dom";
import { BackendvalidationError, imgURL } from "../../library";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components";

// YupPassword(Yup); // extend yup

const Edit = () => {
  // console.log("I ma in edit pagfe");

  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(false);

  const [brand, setBrand] = useState({});

  const { id } = useParams();

  console.log(brands);

  // console.log(id);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      slogan: "",
      image: [],
    },
    // validationSchema: Yup.object({
    //   name: Yup.string().required(),
    //   description: Yup.string().required(),
    //   summary: Yup.string().required(),

    //   price: Yup.number().required(),
    //   discountedPrice: Yup.number().required(),
    //   categoryId: Yup.string().required("Category Name is required"),
    //   brandId: Yup.string().required("Brand Name is required"),
    //   status: Yup.boolean().required(),
    //   featured: Yup.boolean().required(),
    //   images: Yup.mixed()
    //     .nullable()
    //     .test("type", "select valid image files", (files) => {
    //       for (let image of files) {
    //         if (!image.type.startsWith("image")) {
    //           return false;
    //         }
    //       }
    //       return true;
    //     }),
    // }),
    onSubmit: (data, { setSubmitting }) => {
      // console.log(data);
      // console.log("Hello");

      const fd = new FormData();

      // console.log("Form data object is cretaed");

      // console.log(form dat);

      for (let k in data) {
        if (k == "image") {
          for (let files of data[k]) {
            fd.append(k, files);
          }
        } else {
          fd.append(k, data[k]);
        }
      }

      http
        .put(`/api/admin/brands/${id}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => navigate("/brand"))
        .catch(({ response }) => BackendvalidationError(formik, response))
        .finally(() => setSubmitting(false));
    },
  });

  useEffect(() => {
    setLoading(true);
    http
      .get("/api/cms/admin/brands")
      .then(({ data }) => {
        setBrands(data.brands);
        return http.get(`/api/admin/brands/${id}`);
      })
      .then(({ data }) => setBrand(data.brand))
      .catch()
      .finally(() => setLoading(false));
  }, []);

  console.log(brands, brand);

  useEffect(() => {
    if (Object.keys(brand).length > 0) {
      for (let k in formik.values) {
        if (k != "image") {
          formik.setFieldValue(k, brand[k]);
        }
      }
    }
    // console.log(staff);
  }, [brand]);

  const handleDelete = (id, public_id) => {
    console.log(id);

    console.log(public_id);

    // console.log(logo);

    // console.log(id);

    // console.log(filename[1]);

    setLoading(true);
    http
      .delete(`/api/admin/brands/${id}/${public_id}}`)
      .then(() => http.get(`/api/admin/brands/${id}`))
      .then(({ data }) => setBrand(data.brand))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Container className="bg-white">
        <Row>
          <Col
            sm="12"
            className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto"
          >
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <Row>
                  <Col className="text-center">
                    <h1>Edit Brand</h1>
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

                      <InputField
                        type="text"
                        label="Slogan"
                        name="slogan"
                        formik={formik}
                        as="textarea"
                      />

                      <div className="mb-2">
                        <Form.Label htmlFor="images">Image</Form.Label>
                        <Form.Control
                          type="file"
                          name="image"
                          id="image"
                          accept="image/*"
                          multiple
                          isValid={
                            formik.values.image.length > 0 &&
                            !formik.errors.image
                          }
                          isInvalid={
                            formik.touched.image && formik.errors.image
                          }
                          onChange={({ target }) =>
                            formik.setFieldValue(
                              "image",
                              Array.from(target.files)
                            )
                          }
                          onBlur={formik.handleBlur}
                        ></Form.Control>
                        {formik.touched.image && formik.errors.image && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.image}
                          </Form.Control.Feedback>
                        )}

                        {formik.values.image.length > 0 && (
                          <Row>
                            {formik.values.image.map((file, i) => (
                              <Col xs="4" className="mt-3" key={i}>
                                <img
                                  src={URL.createObjectURL(file)}
                                  className="img-fluid"
                                  alt=""
                                  srcset=""
                                />
                              </Col>
                            ))}
                          </Row>
                        )}

                        <Row>
                          <Col xs="3" className="mt-3">
                            <Row>
                              <Col>
                                <img
                                  src={imgURL(brand.logo?.public_id)}
                                  className="img-fluid"
                                  alt=""
                                  srcset=""
                                />
                              </Col>
                            </Row>

                            {brand.logo === null ? null : (
                              <Row className="">
                                <Col className="mt-3 text-center">
                                  <Button
                                    onClick={() =>
                                      handleDelete(
                                        brand._id,
                                        brand.logo?.public_id
                                      )
                                    }
                                    variant="danger"
                                    size="sm"
                                    type="button"
                                  >
                                    <i className="fa-solid fa-times me-2"></i>
                                    delete
                                  </Button>
                                </Col>
                              </Row>
                            )}

                            {/* {brand.logo === null ? (
                           
                            ) : null} */}
                          </Col>
                          {/* ))} */}
                        </Row>
                      </div>

                      <SubmitBtn formik={formik} label="Edit" />
                    </Form>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Edit;
