import { useState } from "react";
import { useParams } from "react-router-dom";

export function PropertyDetails() {
  const { id } = useParams();
  const API_URL = `https://localhost:7065/api/Property/${id}`;
  const [homeData, sethomeData] = useState({});
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
                {/* <i>
                        <%= listing.owner.username %>
                    </i> */}
              </p>
              <p className="card-text">{homeData.description}</p>
              {/* <p className="card-text"> &#8377; <%= listing.price.toLocaleString("en-IN") %> */}
              <p className="card-text"> &#8377; {homeData.price}</p>
              <p className="card-text">{homeData.location}</p>
              <p className="card-text">{homeData.country}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
