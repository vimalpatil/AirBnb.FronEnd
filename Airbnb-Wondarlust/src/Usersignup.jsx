import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { useLocation } from "react-router-dom";

export function Usersignup() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const userType = "g";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(e.target.value);
    // console.log(emailRef.current.value);
    // console.log(passwordRef.current.value);
    if (
      usernameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === ""
    ) {
      return setError("All Fields are manadatory.");
    }
    setError("");
    try {
      const postUserdata = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        user_type: userType,
      };

      // dispatch(
      //   login({
      //     name: usernameRef.current.value,
      //     email: emailRef.current.value,
      //     userid: 1,
      //     loggedIn: true,
      //     user_type: userType,
      //     loginfrom: "signup",
      //   })
      // );

      //navigate((to = "/"), state ? { prevUrl: location.pathname } : "");

      //return <Navigate to="/" state={{ prevUrl: location.pathname }} />;

      //navigate("/", { prevUrl: location.pathname });

      // navigate("/", { state: { prevUrl: location.pathname } });

      const res = await fetch("https://localhost:7065/api/User", {
        method: "post",
        redirect: "follow",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postUserdata),
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      } else {
        const data = await res.json();

        console.log(data);
        if (data == 0) {
          usernameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          return setError("Username or Email Already exist!");
        } else {
          dispatch(
            login({
              name: username,
              email: email,
              userid: data,
              loggedIn: true,
              user_type: userType,
              loginfrom: "signup",
            })
          );
          return navigate("/", { state: { prevUrl: location.pathname } });
        }

        // const result = {
        //   status: res.status + "-" + res.statusText,
        //   headers: {
        //     "Content-Type": res.headers.get("Content-Type"),
        //     "Content-Length": res.headers.get("Content-Length"),
        //   },
        //   data: data,
        // };
      }
    } catch (err) {
      console.log("Data fetching error:", err);
    }
  };
  return (
    <>
      <div class="row mt-3">
        <h1 class="col-6 offset-3">SignUp on WanderLust</h1>
        <div class="col-6 offset-3">
          {error && (
            <div
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {error}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          <form
            className="needs-validation"
            onSubmit={(e) => handleSubmit(e)}
            novalidate
          >
            <div class="mb-3">
              <label for="username" class="form-label">
                Username
              </label>
              <input
                name="username"
                id="username"
                type="text"
                ref={usernameRef}
                className="form-control"
              />
              {/* <div class="valid-feedback">Looks good!</div> */}
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                ref={emailRef}
                className="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                ref={passwordRef}
                className="form-control"
              />
            </div>
            <button className="btn btn-success">SignUp</button>
          </form>
        </div>
      </div>
    </>
  );
}
