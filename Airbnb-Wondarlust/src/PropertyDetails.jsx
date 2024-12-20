import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
export function PropertyDetails() {
  const { id } = useParams();
  const user = useSelector(selectUser);
  let ShowEditnDelete;
  const API_URL = `https://localhost:7065/api/Property/${id}`;
  const [homeData, sethomeData] = useState({});
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
  console.log(user.userid);
  console.log(user.user_type);
  if (user) {
    if ((user.user_type = "o") && (user.userid = id)) {
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
        return navigate("/", { state: { prevUrl: navLocation.pathname } });
      }
    } catch (err) {
      console.log("Data fetching error:", err);
    }
    // }
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
        </div>
      </div>
    </>
  );
}
