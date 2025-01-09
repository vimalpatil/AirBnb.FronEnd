import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { toast } from "react-toastify";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./css/rating.css";
// import "./js/map.js";
import { useNavigate, useLocation } from "react-router-dom";
export function PropertyDetails() {
  const { id } = useParams();
  const [selectedValue, setSelectedValue] = useState("");
  const user = useSelector(selectUser);
  // const [error, setError] = useState("");
  let ShowEditnDelete;
  const API_URL = `https://localhost:7065/api/Property/${id}`;
  const [homeData, sethomeData] = useState({});
  const [reviewData, setreviewData] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const navigate = useNavigate();
  const navLocation = useLocation();
  let coordinates;
  const mapContainer = useRef(null);
  const map = useRef(null);
  let cordi = [];
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg";

  const [lng, setLng] = useState(77.1025);
  const [lat, setLat] = useState(28.7041);

  useEffect(() => {
    let getHomedetails = async () => {
      try {
        let getResponse = await fetch(API_URL);
        let jsonResponse = await getResponse.json();
        // console.log(jsonResponse);
        sethomeData(jsonResponse);
        coordinates = jsonResponse.geometry_coordinate;
        //console.log(homeData.geometry_coordinate);

        cordi = coordinates.split(",");
        setLat(cordi[0]);
        setLng(cordi[1]);
      } catch (err) {
        console.log("Error in fetching data", err);
      }
      //console.log(coordinates);
    };
    getHomedetails();
  }, [homeData]);
  // console.log(homeData.geometry_coordinate);
  //show map on page
  //coordinates = `${homeData.geometry_coordinate}`;
  //console.log(cordi[0]);

  useEffect(() => {
    if (map.current); // initialize map only once
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 7,
    });

    new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${homeData.title}</h3><p>Exact loction will provided after booking!</p>`
        )
      )
      .addTo(map.current);
    return () => map.current.remove();
  }, [lat, lng, 7]);

  // console.log(user.userid);
  // console.log(user.user_type);
  //Review details
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
  //console.log(reviewData);
  if (user) {
    // console.log(user.userid);
    // console.log(homeData.user_id);
    // console.log((user.user_type = "o"));
    // console.log(user.userid === homeData.user_id);
    if ((user.user_type = "o" && user.userid === homeData.user_id)) {
      // if (user.userid = homeData.user_id) {
      ShowEditnDelete = true;
      //}
    } else {
      ShowEditnDelete = false;
    }
  }
  //console.log(ShowEditnDelete);

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
  const onReviewDelete = async (rid) => {
    console.log(rid);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    try {
      const res = await fetch(
        `https://localhost:7065/api/Review/${rid}`,
        requestOptions
      );
      console.log(res.ok);
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      } else {
        toast.success("Review deleted succesfully.");
        //return navigate(`/HomeDetails/${id}`);
        window.location.href = `/HomeDetails/${id}`;
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
                          <h5 class="card-title">{reviewList.username}</h5>
                          <p
                            class="starability-result card-text"
                            data-rating={reviewList.rating}
                          ></p>
                          <p class="card-text">{reviewList.comment}</p>
                        </div>

                        {user.name == reviewList.username ? (
                          <button
                            class="btn btn-sm btn-dark"
                            onClick={() => onReviewDelete(reviewList.review_id)}
                          >
                            Delete
                          </button>
                        ) : (
                          ""
                        )}
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
        <div class="col-8 offset-3 mb-3">
          <h3>Where you'll be</h3>
          <div ref={mapContainer} style={{ width: "500px", height: "450px" }} />
        </div>
      </div>
    </>
  );
}
