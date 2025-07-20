import React, { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useFormik } from "formik";
import * as Yup from "yup";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

import {
  Card,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { SubmitBtn } from "../components/ui/submitBtn";
import InputField from "../components/ui/InputField";
import http from "../http";




import {ToStorage} from "../library"
import { useDispatch } from "react-redux";
import { setUser } from "../store";



const Login = () => {



  console.log("I am inside login page")


  const dispatch = useDispatch();


  const navigate = useNavigate();



  
  const [open, setOpened] = useState(false);

  const [openBrandItem, setopenBrandItem] = useState(false);

  const handleClicked = () => {
    setOpened(!open);
  };

  const handleClickedForBrandItem = () => {
    setopenBrandItem(!openBrandItem);
  };



  // console.log(remember)



  

  const [remember, setRemember] = useState(false);


  console.log(remember)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
   
    }),

    onSubmit: (data, { setSubmitting }) => {
      // console.log("Hello");


    




      console.log(data);

      async function PostData() {
        console.log("I am insidce post data call");

        try {
          const response = await http.post("/api/users/login", data);

          console.log(response.data);


          ToStorage("customerPartToken", response.data.token, remember)


          dispatch(setUser(response.data));


          navigate("/");

        
          // response.data.token);

          // if(response){
          //   navigate("/login")
          // }
        } catch ({ response }) {
          formik.setFieldError("email", response?.data?.message);
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
      //   .post("/api/users/r", data)
      //   .then(({ data }) => navigate("/login"))
      //   .catch(({ response }) => {
      //     console.log(response);

      //     BackendvalidationError(formik, response);
      //   })
      //   .finally(() => setSubmitting(false));
    },
  });

  return (
    <div>
      <main className="flex justify-center py-10 px-2">
        <Card className="w-full max-w-xl px-4">
          <h1>Login</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {/* Label With SVG Icon Container */}

                <InputField
                  formik={formik}
                  label="Email"
                  icon="fa-solid fa-envelope"
                  type="text"
                  name="email"
                />
              </div>
              <div className="grid gap-2">
                <InputField
                  formik={formik}
                  label="Password"
                  icon="fa-solid fa-key"
                  type="password"
                  name="password"
                />
              </div>

    
                {/* <InputField formik={formik} label="Password" icon="fa-solid fa-key" type="password" name="password"/> */}

                {/* <Label>Rememberm me</Label> */}

                <div className="flex bg-red-400 items-center gap-2">
                  <input type="checkbox" id="rememberme" onChange={()=> setRemember(!remember)}/>   
                  <label htmlFor="rememberme">Remeber Me</label>
                </div>
     

              <SubmitBtn formik={formik} label="Login" />
            </div>
          </form>

          {/* <Button type="submit" classNameName="w-full">
              Login
            </Button> */}
        </Card>
      </main>
    </div>
  );
};

export default Login;
