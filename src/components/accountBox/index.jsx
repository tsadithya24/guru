import React, { useState , Image } from "react";
import styled from "styled-components";
import { LoginForm } from "./LoginForm";
import { motion } from "framer-motion";
import { SignupForm } from "./signupForm";
import { AccountContext } from "./accountContext";
import { ForgotPass } from "./forgotPassword";
import Header_image from "../Assets/header-bg.jpg";
import Login_image from "../Assets/login-remove.png";
import "./styles.css";

const Page = styled.div`
height: 100vh;
width: 100%;
display: flex;
justify-content: right;
align-items: center;
padding-right: 5%;
padding-left: 1%;
background-color: #f9ebd4;

`;
const BoxContainer = styled.div`
width: 380px;
min-height: 550px;
display: flex;
flex-direction: column;
border-radius: 20px;
background-color: #fff;
box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
position: relative;
overflow: hidden;
margin: 5px 0;

`;

const TopContainer = styled.div`
width: 100%;
height: 260px;
display: flex;
flex-direction: column;
justify-content: flex-end;
padding: 0 1.8em;
padding-bottom: 7em;
`;


const BackDrop = styled(motion.div)`
width: 160%;
height: 550px;
position: absolute;
display: flex;
flex-direction: column;
border-radius: 50%;
transform: rotate(60deg);
top: -290px;
left: -70px;
background: rgb(241, 196, 15);
background: linear-gradient(
  58deg,
  rgba(241, 196, 15, 1) 20%,
  rgba(243, 172, 18, 1) 100%
);`


const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 2em;
`;

const HeaderText = styled.h1`
  font-size: 30px;
  font-weight: 700;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h2`
  color: #000;
  font-weight: 600;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.5em;
  margin-bottom: 10px;
`;

const backdropVariants = {
    expanded: {
      width: "233%",
      height: "1050px",
      borderRadius: "20%",
      transform: "rotate(60deg)",
    },
    collapsed: {
      width: "160%",
      height: "520px",
      borderRadius: "50%",
      transform: "rotate(60deg)",
    },
  };
  
  const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
  };

export function AccountBox(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState("signin");

    const playExpandingAnimation = () => {
      setExpanded(true);
      setTimeout(() => {
        setExpanded(false);
      }, expandingTransition.duration * 1000 - 1500);
    };
  
    const switchToSignup = () => {
      playExpandingAnimation();
      setTimeout(() => {
        setActive("signup");
      }, 400);
    };
  
    const switchToSignin = () => {
      playExpandingAnimation();
      setTimeout(() => {
        setActive("signin");
      }, 400);
    };

    const switchToForgotpass = () => {
        playExpandingAnimation();
        setTimeout(() => {
          setActive("ForgotPass");
        }, 400);
      };
  
    const contextValue = { switchToSignup, switchToSignin , switchToForgotpass};

    return (
        <AccountContext.Provider value={contextValue}>
        <Page>
        <div>
            <img src={Login_image} className="loginimg" alt=""/>
        </div>
        <div>
            <img src={Header_image} className="headerimg" alt=""/>
        </div>
          <BoxContainer>
            <TopContainer>
              <BackDrop
                initial={false}
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={backdropVariants}
                transition={expandingTransition}
              />
              {active === "signin" && (
                <HeaderContainer>
                  <HeaderText>Welcome</HeaderText>
                  <HeaderText>Back</HeaderText>
                  <SmallText>Please Login to continue!</SmallText>
                </HeaderContainer>
              )}
              {active === "signup" && (
                <HeaderContainer>
                  <HeaderText>Create</HeaderText>
                  <HeaderText>Account</HeaderText>
                  <SmallText>Please sign-up to continue!</SmallText>
                </HeaderContainer>
              )}
              {active === "ForgotPass" && (
                <HeaderContainer>
                  <HeaderText>Please Enter your Email Address</HeaderText>
                  <SmallText>We will send a Password Reset Link </SmallText>
                </HeaderContainer>
              )}
            </TopContainer>
            <InnerContainer>
              {active === "signin" && <LoginForm />}
              {active === "signup" && <SignupForm />}
              {active === "ForgotPass" && <ForgotPass/>}
            </InnerContainer>           
          </BoxContainer>
         </Page>
        </AccountContext.Provider>
     );
}

