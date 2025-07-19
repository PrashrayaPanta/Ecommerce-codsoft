import { Button } from "@/components/ui/button";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

import InputField from "../components/ui/InputField.jsx";

import { useFormik } from "formik";
import * as Yup from "yup";
import { SubmitBtn } from "../components/ui/submitBtn.jsx";
import http from "../http";
// import { BackendvalidationError } from "../library/index.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string()
        .password()
        .minUppercase(1)
        .minSymbols(1)
        .required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      // console.log("Hello");

      console.log(data);

      async function PostData() {
        console.log("I am insidce post data call");

        try {
          const response = await http.post("/api/users/register", data);

          if (response) {
            navigate("/login");
          }
        } catch ({ response }) {
          formik.setFieldError("username", response?.data?.message);
        } finally {
          setSubmitting(false);
        }
      }

      PostData();

      //   setTimeout(() => setSubmitting(false), 2000);
      // console.log(setSubmitting);
      //api request
      // https://mern-130.nru.com.np/ is common route in all so make it in other file and call it
      // console.log(response);

      // http
      //   .post("/api/users/register", data)
      //   .then(({ data }) => navigate("/login"))
      //   .catch(({ response }) => {
      //     // console.log(response);

      //     formik.setFieldError("username", response?.data?.message)

      //     // BackendvalidationError(formik, response);
      //   })
      //   .finally(() => setSubmitting(false));
    },
  });

  return (
    <div>
      <main className="flex justify-center">
        <Card class="w-full max-w-sm">
          <h1>Register</h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-2">
              <InputField
                formik={formik}
                label="Username"
                icon="fas fa-user"
                name="username"
              />
              {/* <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-red-500"
                    height="18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 6v12"></path>
                    <path d="M17.196 9 6.804 15"></path>
                    <path d="m6.804 9 10.392 6"></path>
                  </svg> */}

              <div className="grid gap-2">
                <InputField
                  formik={formik}
                  label="Email"
                  icon="fa-solid fa-envelope"
                  name="email"
                />
                {/* <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-red-500"
                      height="18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 6v12"></path>
                      <path d="M17.196 9 6.804 15"></path>
                      <path d="m6.804 9 10.392 6"></path>
                    </svg> */}
              </div>
              <div className="grid gap-2">
                <InputField
                  formik={formik}
                  label="Password"
                  icon="fas fa-key"
                  name="password"
                />

                {/* <input
                    type="password"
                    className="border-2 focus:outline-none focus rounded-sm px-2 h-10 focus:border-blue-400 focus:invalid:border-red-400 required:border-pink-400"
                    placeholder="Enter Your password"
                  /> */}
              </div>
            </div>
            <div className="mt-2 mb-2">
              <SubmitBtn formik={formik} label="Register" />
            </div>
          </form>
        </Card>
      </main>

      <footer class="bg-gray-900 text-white pt-12 pb-6">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div class="text-center sm:text-left">
              <a
                href="index.html"
                class="text-2xl font-righteous text-gray-300 hover:text-white"
              >
                E-Commerce
              </a>
              <address class="mt-4 text-gray-400">
                221B Baker Street
                <br />
                London, England
              </address>
              <div class="mt-4 space-x-4">
                <a href="#" class="text-gray-400 hover:text-white">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <i class="fab fa-pinterest-p"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <i class="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            <div class="lg:col-span-2">
              <h4 class="text-lg font-semibold mb-4">Who are we?</h4>
              <p class="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                imperdiet vel ligula vel sodales. Aenean vel ullamcorper purus,
                ac pharetra arcu. Nam enim velit, ultricies eu orci nec, aliquam
                efficitur sem. Quisque in sapien a sem vestibulum volutpat at eu
                nibh.
              </p>
            </div>

            <div>
              <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
              <ul class="space-y-2">
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 class="text-lg font-semibold mb-4">Newsletter</h4>
              <form>
                <input
                  type="email"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded mb-4 text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
                  placeholder="Enter your email..."
                  required
                />
                <button class="w-full py-2 border border-white text-white hover:bg-white hover:text-gray-900 transition-colors rounded">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;
