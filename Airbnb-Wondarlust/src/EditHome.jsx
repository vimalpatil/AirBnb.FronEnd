import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { toast } from "react-toastify";
export function EditHome() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg";
  // const user = useSelector(selectUser);
  const { id } = useParams();
  console.log(id);
  const API_URL = `https://localhost:7065/api/Property/${id}`;
  const [homeData, sethomeData] = useState({});
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [Coordinates, setCoordinates] = useState(null);

  const navigate = useNavigate();
  const navLocation = useLocation();

  let geometry;
  let imagename;
  useEffect(() => {
    let getHomedetails = async () => {
      try {
        let getResponse = await fetch(API_URL);
        let jsonResponse = await getResponse.json();
        //console.log(jsonResponse);
        sethomeData(jsonResponse);
      } catch (err) {
        console.log("Error in fetching data", err);
      }
    };
    getHomedetails();
  }, []);

  const titleRef = useRef();
  const desRef = useRef();
  const imageRef = useRef();
  const priceRef = useRef();
  const countryRef = useRef();
  const locationRef = useRef();

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("https://localhost:7065/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      titleRef.current.value === "" ||
      desRef.current.value === "" ||
      priceRef.current.value === "" ||
      countryRef.current.value === "" ||
      locationRef.current.value === ""
    ) {
      //return setError("All Fields are manadatory.");
      toast.error("All Fields are manadatory.");
    }
    setError("");
    if (file) {
      imagename = file.name;
      handleFileUpload;
    } else {
      imagename = homeData.image_name;
    }
    if (location) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
          {
            params: {
              access_token: mapboxgl.accessToken,
            },
          }
        );
        const { center } = response.data.features[0];
        // setCoordinates({ lat: center[1], lng: center[0] });
        setCoordinates(`${center[1]}, ${center[0]}`);
        geometry = `${center[1]}, ${center[0]}`;
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    } else {
      geometry = homeData.geometry_coordinate;
    }
    console.log(geometry);
    try {
      const EditPropertyData = {
        title: titleRef.current.value,
        description: desRef.current.value,
        image_name: imagename,
        price: Number(priceRef.current.value),
        location: locationRef.current.value,
        geometry_coordinate: geometry,
        country: countryRef.current.value,
      };
      console.log(EditPropertyData);
      const res = await fetch(`https://localhost:7065/api/Property/${id}`, {
        method: "PUT",
        redirect: "follow",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(EditPropertyData),
      });
      //const result = await res.json();
      //console.log(result);
      // console.log(res.json);
      console.log(res.ok);
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      } else {
        toast.success("Property updated succesfully!");
        return navigate("/", { state: { prevUrl: navLocation.pathname } });
      }
    } catch (err) {
      console.log("Data fetching error:", err);
    }
  };

  return (
    <div class="row mt-3">
      <div class="col-8 offset-2">
        <h3>Edit Your Listing</h3>
        <br />
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
          class="needs-validation"
          novalidate
          enctype="multipart/form-data"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div class="mb-3">
            <label for="title" class="form-label">
              Title
            </label>
            <input
              name="title"
              defaultValue={homeData.title}
              type="text"
              class="form-control"
              ref={titleRef}
              required
            />
            {/* <div clas="valid-feedback">Title looks good!</div> */}
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">
              Description
            </label>
            <textarea
              name="description"
              type="text"
              class="form-control"
              ref={desRef}
              required
              defaultValue={homeData.description}
            ></textarea>
            <div class="invalid-feedback">Please Enter Short Description.</div>
          </div>
          <div class="mb-3">
            Orignal Listing Image
            <br />
            <img
              src={`/images/${homeData.image_name}`}
              class="card-img-top show-img"
              alt="Home_image"
            />
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">
              Upload New Image
            </label>
            <input
              name="image"
              type="file"
              class="form-control"
              onChange={(e) => handleFileChange(e)}
              ref={imageRef}
            />
          </div>
          <div class="row">
            <div class="mb-3 col-md-4">
              <label for="price" class="form-label">
                Price
              </label>
              <input
                name="price"
                defaultValue={homeData.price}
                type="number"
                ref={priceRef}
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
                name="country"
                defaultValue={homeData.country}
                type="text"
                ref={countryRef}
                class="form-control"
                required
              />
              <div class="invalid-feedback">Country Name should be valid.</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="location" class="form-label">
              Location
            </label>
            <input
              name="location"
              defaultValue={homeData.location}
              ref={locationRef}
              type="text"
              class="form-control"
              onChange={handleInputChange}
              required
            />
            <div class="invalid-feedback">Location Name should be valid.</div>
          </div>

          <button class="btn btn-dark edit-btn mt-3">Edit</button>
        </form>
      </div>
    </div>
  );
}
