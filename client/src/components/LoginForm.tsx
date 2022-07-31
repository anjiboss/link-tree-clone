import axios, { AxiosError } from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import { toasti } from "../ultis/_visual";

const LoginForm: React.FC = () => {
  const { setLogged } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
      data: {
        email,
        password,
      },
    })
      .then(({ data, status }) => {
        console.log(data);
        if (status === 200) {
          window.localStorage.setItem("accessToken", data.accessToken);
          window.localStorage.setItem("refreshToken", data.refreshToken);
          toasti("Log in success");
          setLogged(true);
          navigate("/");
        }
      })
      .catch((e: AxiosError) => {
        if (e.response) {
          console.log(e.response.data);
        }
      });
  };

  return (
    <>
      <form onSubmit={loginHandler}>
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

export default LoginForm;
