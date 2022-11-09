import React, { useContext, useState } from "react";
import {Marginer} from "../marginer";
import { AccountContext } from "./accountContext";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles.css";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,  
} from "./common";
import { useFormik } from "formik";
import * as Yup from 'yup';


export function LoginForm(props) {

    const [verified , setVerified ] = useState(false);

    const formik = useFormik ({
        initialValues: {
           email: "",
           password: "",   
         },
         validationSchema: Yup.object({
             email: Yup.string().email().required("Please enter your email"),
             password: Yup.string().min(6).required("Please enter your password"),       
         }),
         onSubmit: (values, action) => {
            console.log(values);
            action.resetForm();
        },
    })

    const { switchToSignup } = useContext(AccountContext);
    const {switchToForgotpass} = useContext(AccountContext);


    function onChange(value) {
        console.log("Captcha value:", value);
        setVerified(true);
      }
    

    return (
      <BoxContainer>
        <FormContainer>
          <Input type="email"
                 name="email"
                 id="email"
                 placeholder="Email Address"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.email}
                  />
                  {
                      formik.touched.email && formik.errors.email ? <div className="error_msg">{formik.errors.email}</div> : null
                  }
          <Input type="password"
                         name="password"
                         id="password"
                         placeholder="Password" 
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         value={formik.values.password}
                  />
                  {
                      formik.touched.password && formik.errors.password ? <div className="error_msg">{formik.errors.password}</div> : null
                  }

        </FormContainer>
        <Marginer direction="vertical" margin="1.6em" />
        <span className="span_msg">
            By Proceeding I agree to the <a href="#">Terms of Service and Privacy Policy.</a>
        </span>

    <Marginer direction="vertical" margin="1.6em" />
   <ReCAPTCHA
    sitekey="6LeeeO8iAAAAAEvU3QUmjHjTqoGxF9bA2clLTUOu"
    onChange={onChange}
     />
        <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit"
            disabled={!formik.isValid || !verified}
            onSubmit={formik.handleSubmit}>
                Login
        </SubmitButton>

        <Marginer direction="vertical" margin="1em" />
        <BoldLink href="#" onClick={switchToForgotpass}>
            Forget your password?
            </BoldLink>
        <Marginer direction="vertical" margin="1.6em" />

        <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
        </MutedLink>
      </BoxContainer>
    );
}