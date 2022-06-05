import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Label, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:8080";
const validateName = (name) => name !== "";
const validateEmail = (email) => {
  const reg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  return reg.test(email);
};

export const SignUp = ({ isLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();
  const onSumbit = async (event) => {
    if (
      !validateName(firstName) ||
      !validateName(lastName) ||
      !validateEmail(email)
    ) {
      alert("Wrong details please try again!");
    } else {
      try {
        const { data } = isLogin
          ? await axios.get(`${BASE_URL}/user/${email}`, {
              headers: {
                "Access-Control-Allow-Origin": BASE_URL,
              },
            })
          : await axios.post(`${BASE_URL}/user`, {
              email,
              firstName,
              lastName,
              headers: {
                "Access-Control-Allow-Origin": "http://localhost:8080/user",
              },
            });
        navigate(`/startGame/${data}`);
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <>
      <Form>
        <Form.Field>
          <Label>First Name</Label>
          <Input
            placeholder={"Enter Your First Name"}
            onInput={(event) => setFirstName(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Label>Last Name</Label>
          <Input
            placeholder={"Enter Your Last Name"}
            onInput={(event) => setLastName(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Label>Email</Label>
          <Input
            placeholder={"Enter Your Email"}
            onInput={(event) => setEmail(event.target.value)}
          />
        </Form.Field>
        {!isLogin && (
          <Button
            type="submit"
            onClick={async (event) => {
              onSumbit(event);
            }}
          >
            Submit
          </Button>
        )}
        <Button
          type="submit"
          onClick={async (event) => {
            if (isLogin) {
              onSumbit(event);
            } else {
              navigate("/login");
            }
          }}
        >
          Login
        </Button>
      </Form>
    </>
  );
};
