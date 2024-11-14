import { useState } from "react";

export function Propertylisting() {
  const API_URL = "https://localhost:7065/api/Property";
  const [Plist, setPlist] = useState([]);

  let getPropertyList = async () => {
    try {
      let response = await fetch(API_URL);

      let jsonResponse = await response.json();
      setPlist(jsonResponse);
    } catch (err) {
      console.log("Data fetching error:", err);
    }
  };

  getPropertyList();

  return (
    <>
      <div className="container">
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3">
          {Plist.map((propList, i) => (
            <a href={`/HomeDetails/${propList.p_id}`} class="listing-link">
              <div className="card col listing-card">
                <img
                  src={`/images/${propList.image_name}`}
                  className="card-img-top"
                  alt="listing_image"
                  style={{ height: "20rem" }}
                />

                <div className="card-body">
                  <p className="card-text" key={i}>
                    <b>{propList.title}</b>
                    <br />
                    &#8377; {propList.price}
                    <i className="tax-info">&nbsp;&nbsp;+18% GST</i>
                  </p>
                </div>
              </div>
            </a>
          ))}

          {/* <div class="card col listing-card">
            <img
              src="/images/photo-1552733407-5d5c46c3bb3b.jpg"
              className="card-img-top"
              alt="listing_image"
              style={{ height: "20rem" }}
            />

            <div class="card-body">
              <p class="card-text">
                <b>Cozy Beachfront Cottage</b>
                <br />
                &#8377; 1200/ night
                <i class="tax-info">&nbsp;&nbsp;+18% GST</i>
              </p>
            </div>
          </div>

          <div class="card col listing-card">
            <img
              src="/images/photo-1552733407-5d5c46c3bb3b.jpg"
              className="card-img-top"
              alt="listing_image"
              style={{ height: "20rem" }}
            />

            <div class="card-body">
              <p class="card-text">
                <b>Cozy Beachfront Cottage</b>
                <br />
                &#8377; 1200/ night
                <i class="tax-info">&nbsp;&nbsp;+18% GST</i>
              </p>
            </div>
          </div> */}
          {/* 
          <div class="card col listing-card">
            <img
              src="/images/photo-1552733407-5d5c46c3bb3b.jpg"
              className="card-img-top"
              alt="listing_image"
              style={{ height: "20rem" }}
            />

            <div class="card-body">
              <p class="card-text">
                <b>Cozy Beachfront Cottage</b>
                <br />
                &#8377; 1200/ night
                <i class="tax-info">&nbsp;&nbsp;+18% GST</i>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
