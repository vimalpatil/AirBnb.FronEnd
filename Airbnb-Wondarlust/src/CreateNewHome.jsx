import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

export function CreateNewHome() {
  const [error, setError] = useState("");
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const userType = "o";
  const user = useSelector(selectUser);
  let ownerSignup;

  if (user) {
    if (user.user_type == "g") {
      ownerSignup = false;
    } else if (user.user_type == "o") {
      ownerSignup = true;
    }
  } else {
    ownerSignup = false;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      {!ownerSignup ? (
        <div class="row mt-3">
          <h1 class="col-6 offset-3">SignUp As a Owner</h1>
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
      ) : (
        <div class="row mt-3">
          <div class="col-8 offset-2">
            <br />
            <br />
            <h3>Create New Home</h3>
            <form
              class="needs-validation"
              method="POST"
              action="/listings"
              novalidate
              enctype="multipart/form-data"
            >
              <div class="mb-3">
                <label for="title" class="form-label">
                  Title
                </label>
                <input
                  name="listing[title]"
                  placeholder="Add a catchy title"
                  type="text"
                  class="form-control"
                  required
                />
                <div class="valid-feedback">Title looks good!</div>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">
                  Description
                </label>
                <textarea
                  name="listing[description]"
                  type="text"
                  class="form-control"
                  required
                ></textarea>
                <div class="invalid-feedback">
                  Please Enter Short Description.
                </div>
              </div>
              {/* <!-- <div class="mb-3">
                    <label for="image" class="form-label">Image Link</label>
                    <input name="listing[image]" placeholder="enter image URL/Links" type="text" class="form-control" />
                </div> --> */}
              <div class="mb-3">
                <label for="image" class="form-label">
                  Upload Listing Image
                </label>
                <input
                  name="listing[image]"
                  type="file"
                  class="form-control"
                  required
                />
              </div>
              <div class="row">
                <div class="mb-3 col-md-4">
                  <label for="price" class="form-label">
                    Price
                  </label>
                  <input
                    name="listing[price]"
                    placeholder="1200"
                    class="form-control"
                    required
                  />
                  <div class="invalid-feedback">Price should be valid.</div>
                </div>
                <div class="mb-3 col-md-8">
                  <label for="country" class="form-label">
                    Country
                  </label>
                  <input
                    name="listing[country]"
                    placeholder="India"
                    type="text"
                    class="form-control"
                    required
                  />
                  <div class="invalid-feedback">
                    Country Name should be valid.
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="location" class="form-label">
                  Location
                </label>
                <input
                  name="listing[location]"
                  placeholder="Jaipur,Rajastan"
                  type="text"
                  class="form-control"
                  required
                />
                <div class="invalid-feedback">Location should be valid.</div>
              </div>

              <button class="btn btn-dark add-btn mt-3">Add</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
