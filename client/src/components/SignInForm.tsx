import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toasti } from "../ultis/_visual";

const SignInForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const navigate = useNavigate();

  const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
      data: {
        username: name,
        email,
        password,
        firstname,
        lastname,
      },
    })
      .then(({ data }) => {
        if (data.ok) {
          toasti("Register success");
          navigate("/login");
        } else {
          console.log(data);
        }
      })
      .catch((e: AxiosError) => {
        if (e.response && e.response.data) {
          console.log(e.response.data);
        }
      });
  };
  return (
    <>
      <form onSubmit={registerHandler}>
        <div>
          <input
            type="text"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div>
          <input
            type="text"
            value={firstname}
            placeholder="firstname"
            onChange={(e) => setFirstname(e.currentTarget.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={lastname}
            placeholder="lastname"
            onChange={(e) => setLastname(e.currentTarget.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignInForm;
