import React, { useContext } from "react";
import "./styles.css"
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useFormik } from "formik";
import * as Yup from 'yup';




export function SignupForm(props) {
    
    const formik = useFormik ({
    initialValues: {
       name: "",
       email: "",
       password: "",
       confirm_password: "",
     },


     validationSchema: Yup.object({
         name:Yup.string().min(2).max(25).required("Please enter your name"),
         email: Yup.string().email().required("Please enter your email"),
         password: Yup.string().min(6).required("Please enter your password"),
         confirm_password: Yup.string()
         .required("Please enter the Password again")
         .oneOf([Yup.ref("password"),null],"Password must match"),  
     }),

     onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
    },
    })

  const { switchToSignin } = useContext(AccountContext);
  return (
    <BoxContainer>
    <FormContainer>
        <Input type="text" 
               name="name"
               id="name"
               placeholder="Full Name" 
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.name}
        />

        {
            formik.touched.name && formik.errors.name ? <div className="error_msg">{formik.errors.name}</div> : null
        }
      

       

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

       
       
        <Input type="password" 
               name="confirm_password"
               id="confirm_password"
               placeholder="Confirm Password" 
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               value={formik.values.confirm_password}
        />
        {
            formik.touched.confirm_password && formik.errors.confirm_password ? <div className="error_msg">{formik.errors.confirm_password}</div> : null
        }

     

      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit"
      disabled={!formik.isValid}
      onSubmit={formik.handleSubmit}>
        Sign up
        </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

