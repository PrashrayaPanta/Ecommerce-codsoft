import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
// import YupPassword from "yup-password";
import http from "../../http";
import { useNavigate, useParams } from "react-router-dom";
import {
  BackendvalidationError,
  imgURL,
  imgURLForProduct,
} from "../../library";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components";

// YupPassword(Yup); // extend yup

export const Edit = () => {
  // console.log("I ma in edit pagfe");

  const [categories, setCategories] = useState([]);

  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({});

  const { id } = useParams();

  console.log(id);

  console.log(product);

  console.log(brands);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      summary: "",
      initialPrice: "",
      discountedPrice: "",
      categoryId: "",
      brandId: "",
      images: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      description: Yup.string().required(),
      initialPrice: Yup.number().required(),
      categoryId: Yup.string().required("Category Name is required"),
      brandId: Yup.string().required("Brand Name is required"),
      images: Yup.mixed()
        .nullable()
        .test("type", "select valid image files", (files) => {
          for (let image of files) {
            if (!image.type.startsWith("image")) {
              return false;
            }
          }
          return true;
        }),
    }),
    onSubmit: (data, { setSubmitting }) => {
      // console.log(data);
      // console.log("Hello");

      const fd = new FormData();

      // console.log("Form data object is cretaed");

      // console.log(form dat);

      for (let k in data) {
        console.log(k);
        
        if (k == "images") {
          for (let files of data[k]) {
            console.log(files);
            fd.append(k, files);
          }
        } else {
          fd.append(k, data[k]);
        }
      }


      console.log(data);
      

      http
        .put(`/api/admin/products/${id}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => navigate("/product"))
        .catch(({ response }) => BackendvalidationError(formik, response))
        .finally(() => setSubmitting(false));
    },
  });

  useEffect(() => {
    setLoading(true);
    http
      .get("/api/admin/categories")
      .then(({ data }) => {
        setCategories(data.Categories);
        return http.get("/api/cms/admin/brands");
      })
      .then(({ data }) => {
        setBrands(data.brands);
        return http.get(`/api/admin/products/${id}`);
      })
      .then(({ data }) => setProduct(data.product))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  console.log(product);

  useEffect(() => {
    if (Object.keys(product).length > 0) {
      for (let k in formik.values) {
        if (k != "images") {
          formik.setFieldValue(k, product[k]);
        }
      }
    }
    // console.log(staff);
  }, [product]);


  // console.log(images);
  


  

  const handleDelete = (filename) => {
    console.log(filename);

    setLoading(true);
    http
      .delete(`/api/admin/products/${id}/${filename}`)
      .then(() => http.get(`/api/admin/products/${id}`))
      .then(({ data }) => setProduct(data.product))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  // console.log(product);

  // console.log(categories);

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
                    <h1>Edit Products</h1>
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
                        label="Description"
                        name="description"
                        formik={formik}
                        as="textarea"
                      />
                      <InputField
                        type="text"
                        label="Summary"
                        name="summary"
                        formik={formik}
                        as="textarea"
                      />
                      <div className="mb-2">
                        <Form.Label htmlFor="categoryId">Category</Form.Label>
                        <Form.Select
                          name="categoryId"
                          id="categoryId"
                          value={formik.values.categoryId}
                          isValid={
                            formik.values.categoryId &&
                            !formik.errors.categoryId
                          }
                          isInvalid={
                            formik.touched.categoryId &&
                            formik.errors.categoryId
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option>Select Category</option>
                          {categories.map((category, index) => (
                            <option value={category._id} key={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </Form.Select>
                        {formik.errors.categoryId && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.categoryId}
                          </Form.Control.Feedback>
                        )}
                      </div>
                      <div className="mb-2">
                        <Form.Label htmlFor="brandId">Brand</Form.Label>
                        <Form.Select
                          name="brandId"
                          id="brandId"
                          value={formik.values.brandId}
                          isValid={
                            formik.values.brandId && !formik.errors.brandId
                          }
                          isInvalid={
                            formik.touched.brandId && formik.errors.brandId
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option>Select Brand</option>
                          {brands?.map((brand, index) => (
                            <option value={brand._id} key={brand._id}>
                              {brand.name}
                            </option>
                          ))}
                        </Form.Select>
                        {formik.errors.brandId && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.brandId}
                          </Form.Control.Feedback>
                        )}
                      </div>
                      <div className="mb-2">
                        <Form.Label htmlFor="images">Images</Form.Label>
                        <Form.Control
                          type="file"
                          name="images"
                          id="images"
                          accept="image/*"
                          multiple
                          isValid={
                            formik.values.images.length > 0 &&
                            !formik.errors.images
                          }
                          isInvalid={
                            formik.touched.images && formik.errors.images
                          }
                          onChange={({ target }) =>
                            formik.setFieldValue(
                              "images",
                              Array.from(target.files)
                            )
                          }
                          onBlur={formik.handleBlur}
                        ></Form.Control>
                        {formik.touched.images && formik.errors.images && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.images}
                          </Form.Control.Feedback>
                        )}

                        {formik.values.images.length > 0 && (
                          <Row>
                            {formik.values.images.map((file, i) => (
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
                          {product.images?.map((image, i) => (
                            <Col xs="3" className="mt-3">
                              <Row>
                                <Col>
                                  <img
                                    src={imgURLForProduct(image?.public_id)}
                                    className="img-fluid"
                                    alt=""
                                    srcset=""
                                  />
                                </Col>
                              </Row>
                              <Row className="">
                                <Col className="mt-3 text-center">
                                  <Button
                                    onClick={() =>
                                      handleDelete(image?.public_id)
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
                            </Col>
                          ))}
                        </Row>
                      </div>
                      <InputField
                        type="text"
                        label="Initial Price"
                        name="initialPrice"
                        formik={formik}
                      />
                      <InputField
                        type="text"
                        label="Discounted Price"
                        name="discountedPrice"
                        formik={formik}
                      />

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
