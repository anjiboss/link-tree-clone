import { useEffect, useState } from "react";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import NavBar from "./components/NavBar";
import axios from "axios";
import GlobalContext from "./context/GlobalContext";
import { Circles } from "react-loading-icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toasti } from "./ultis/_visual";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";
import Member from "./pages/Member";
import DashBoard from "./pages/DashBoard";

function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/api/v1/auth/token/access`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then(({ data }) => {
        setIsFetching(false);
        if (data.success) {
          setLogged(true);
        }
      })
      .catch((e) => {
        setIsFetching(false);
        toasti(e?.respone?.message?.message, "error");
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ logged, setLogged }}>
      <ToastContainer />
      {isFetching ? (
        <div className="loading-container">
          <Circles fill="red" />
        </div>
      ) : (
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignIn />} />
            <Route path="/*" element={<Member />} />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </GlobalContext.Provider>
  );
}

export default App;
