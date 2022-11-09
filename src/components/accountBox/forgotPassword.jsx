import React, { useContext } from "react";
import {Marginer} from "../marginer";
import { AccountContext } from "./accountContext";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    SubmitButton,
    
} from "./common";

import { useFormik } from "formik";
import * as Yup from 'yup';

export function ForgotPass(props) {


    const formik = useFormik ({
        initialValues: {
           email: "",
         },
         validationSchema: Yup.object({
             email: Yup.string().email().required("Please enter your email"),      
         }),
         onSubmit: (values, action) => {
            console.log(values);
            action.resetForm();
        },
    })

    const {switchToSignin} = useContext(AccountContext);

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
        </FormContainer>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit"
          disabled={!formik.isValid}
          onSubmit={formik.handleSubmit}>Submit</SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <BoldLink href="#" onClick={switchToSignin}>
          Return to Login
        </BoldLink>

      </BoxContainer>
    );
}