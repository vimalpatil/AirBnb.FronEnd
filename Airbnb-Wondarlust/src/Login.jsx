import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
export function Login() {
  const [error, setError] = useState("");
  const [userData, setuserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const usernameRef = useRef();
  const passwordRef = useRef();

  // Add more parameters as needed

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      return setError("All Fields are manadatory.");
    }
    setError("");

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    //const queryString = new URLSearchParams(params).toString();
    // const API_URL = `https://localhost:7065/api/User/${username}/${password}`;
    try {
      const url = new URL("https://localhost:7065/api/User/getUserDetails");
      url.searchParams.append("username", username);
      url.searchParams.append("password", password);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.user_id);

        if (data.user_id == 0) {
          usernameRef.current.value = "";
          passwordRef.current.value = "";
          toast.error("Invalid Username or Password");
          // return setError("Invalid Username or Password");
        } else {
          dispatch(
            login({
              name: data.username,
              userid: data.user_id,
              loggedIn: true,
              user_type: data.user_type,
              loginfrom: "loginform",
            })
          );
          toast.success("Welcome back to wanderlust!");
          return navigate("/", { state: { prevUrl: location.pathname } });
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (err) {
      console.log("Data fetching error:", err);
    }
  };
  return (
    <>
      <div class="row mt-3">
        <h1 class="col-6 offset-3">Login</h1>
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
            action="/login"
            method="post"
            class="needs-validation"
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
                class="form-control"
                ref={usernameRef}
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                class="form-control"
                ref={passwordRef}
                required
              />
            </div>
            <button class="btn btn-success">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}
