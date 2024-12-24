import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { toast } from "react-toastify";
import "./css/rating.css";
import { useNavigate, useLocation } from "react-router-dom";
export function PropertyDetails() {
  const { id } = useParams();
  const [selectedValue, setSelectedValue] = useState("");
  const user = useSelector(selectUser);
  // const [error, setError] = useState("");
  let ShowEditnDelete;
  const API_URL = `https://localhost:7065/api/Property/${id}`;
  const [homeData, sethomeData] = useState({});
  const [reviewData, setreviewData] = useState({});
  const [textAreaValue, setTextAreaValue] = useState("");
  const navigate = useNavigate();
  const navLocation = useLocation();
  useEffect(() => {
    let getHomedetails = async () => {
      try {
        let getResponse = await fetch(API_URL);
        let jsonResponse = await getResponse.json();
        console.log(jsonResponse);
        sethomeData(jsonResponse);
      } catch (err) {
        console.log("Error in fetching data", err);
      }
    };
    getHomedetails();
  }, []);
  // console.log(user.userid);
  // console.log(user.user_type);
  useEffect(() => {
    let getReviewDetails = async () => {
      try {
        let res = await fetch(`https://localhost:7065/api/Review/${id}`);
        let data = await res.json();
        setreviewData(data);
      } catch (err) {
        console.log("Error in fetching data", err);
      }
    };
    getReviewDetails();
  }, []);
  if (user) {
    if ((user.user_type = "o") && (user.userid = homeData.user_id)) {
      ShowEditnDelete = true;
    } else {
      ShowEditnDelete = false;
    }
  }

  // console.log(ShowEditnDelete);
  const onDelete = async (id) => {
    console.log(id);
    let isConfirm;
    // isConfirm = window.confirm("Do you want to delete property?");
    // console.log(isConfirm);
    // if ((isConfirm = true)) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const res = await fetch(
        `https://localhost:7065/api/Property/${id}`,
        requestOptions
      );
      console.log(res.ok);
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      } else {
        toast.success("Property deleted succesfully.");
        commentref.current.value = "";
        return navigate("/", { state: { prevUrl: navLocation.pathname } });
      }
    } catch (err) {
      console.log("Data fetching error:", err);
    }

    // }
  };
  //Add Review

  const handleInputChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const addReview = async (e) => {
    e.preventDefault();
    if (textAreaValue === "") {
      //return setError("All Fields are manadatory.");
      toast.error("Comments are manadatory.");
    }
    //  setError("");
    const today = new Date();
    try {
      const postReviewData = {
        rating: selectedValue,
        comment: textAreaValue,
        user_id: user.userid,
        p_id: id,
        review_date: today,
      };
      console.log(postReviewData);

      const res = await fetch("https://localhost:7065/api/Review", {
        method: "post",
        redirect: "follow",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postReviewData),
      });
      console.log(res.json);
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      } else {
        setTextAreaValue("");
        toast.success("New Review Created!");
        return navigate(`/HomeDetails/${id}`);
      }
    } catch (err) {
      console.log("Data fetching error:", err);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8 offset-3 mt-3">
            <h3>{homeData.title}</h3>
          </div>
          <div className="card col-6 offset-3 show-card listing-card">
            <img
              src={`/images/${homeData.image_name}`}
              class="card-img-top show-img"
              alt="Home_image"
            />
            <div className="card-body">
              <p class="card-text">
                Owned by
                <i>&nbsp; {homeData.username}</i>
              </p>
              <p className="card-text">{homeData.description}</p>
              {/* <p className="card-text"> &#8377; <%= listing.price.toLocaleString("en-IN") %> */}
              <p className="card-text"> &#8377; {homeData.price}</p>
              <p className="card-text">{homeData.location}</p>
              <p className="card-text">{homeData.country}</p>
            </div>
          </div>
          <br />
          {ShowEditnDelete ? (
            <div class="btns">
              <a
                href={`/EditHome/${id}`}
                class="btn btn-dark col-1 offset-3 edit-btn"
              >
                Edit
              </a>
              <div>
                <button
                  class="btn btn-dark offset-5"
                  onClick={() => onDelete(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          <div class="col-8 offset-3 mb-3">
            {user ? (
              <div>
                <hr />
                <h4>Leave a Review</h4>
                <form
                  class="needs-validation"
                  novalidate
                  onSubmit={(e) => addReview(e)}
                >
                  {/* <div class="mb-3 mt-3">
                      <label class="form-label" for="rating">Rating</label>
                      <input type="range" min="1" max="5" id="rating" name="review[rating]"
                          class="form-range" />
                  </div> */}
                  <div class="mb-3 mt-3">
                    <label class="form-label" for="rating">
                      Rating
                    </label>
                    <fieldset class="starability-slot">
                      <input
                        type="radio"
                        id="no-rate"
                        class="input-no-rate"
                        name="rating"
                        value="0"
                        checked
                        aria-label="No rating."
                        onChange={(e) => setSelectedValue(e.target.value)}
                      />
                      <input
                        type="radio"
                        id="first-rate1"
                        name="rating"
                        value="1"
                        onChange={(e) => setSelectedValue(e.target.value)}
                      />
                      <label for="first-rate1" title="Terrible">
                        1 star
                      </label>
                      <input
                        type="radio"
                        id="first-rate2"
                        name="rating"
                        value="2"
                        onChange={(e) => setSelectedValue(e.target.value)}
                      />
                      <label for="first-rate2" title="Not good">
                        2 stars
                      </label>
                      <input
                        type="radio"
                        id="first-rate3"
                        name="rating"
                        value="3"
                        onChange={(e) => setSelectedValue(e.target.value)}
                      />
                      <label for="first-rate3" title="Average">
                        3 stars
                      </label>
                      <input
                        type="radio"
                        id="first-rate4"
                        name="rating"
                        value="4"
                        onChange={(e) => setSelectedValue(e.target.value)}
                      />
                      <label for="first-rate4" title="Very good">
                        4 stars
                      </label>
                      <input
                        type="radio"
                        id="first-rate5"
                        name="rating"
                        value="5"
                        onChange={(e) => setSelectedValue(e.target.value)}
                      />
                      <label for="first-rate5" title="Amazing">
                        5 stars
                      </label>
                    </fieldset>
                  </div>
                  <div class="mb-3 mt-3">
                    <label class="form-label" for="comment">
                      Comment
                    </label>
                    <textarea
                      name="comment"
                      id="comment"
                      cols="30"
                      rows="5"
                      class="form-control"
                      required
                      value={textAreaValue}
                      onChange={handleInputChange}
                    ></textarea>
                    <div class="invalid-feedback">
                      Please Add some comment for review
                    </div>
                  </div>
                  <button class="btn btn-outline-dark">Submit</button>
                </form>
                <hr />
                <div>
                  <div class="row">
                    <p> All Reviews</p>
                    {reviewData.map((reviewList, i) => (
                      <div class="card col-5 ms-3 mb-3">
                        <div class="card-body  mb-3">
                          <h5 class="card-title">username</h5>
                          <p
                            class="starability-result card-text"
                            data-rating="<%=review.rating%>"
                          ></p>
                          <p class="card-text">comment</p>
                        </div>

                        <form
                          class="mb-3"
                          method="post"
                          action="/listings/<%= listing._id%>/reviews/<%= review._id%>?_method=DELETE"
                        >
                          <button class="btn btn-sm btn-dark">Delete</button>
                        </form>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
