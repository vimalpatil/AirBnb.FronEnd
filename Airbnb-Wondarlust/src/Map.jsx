import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export function Map() {
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg";

  //   const [viewport, setViewport] = useState({
  //     width: "100vw",
  //     height: "100vh",
  //     latitude: 37.7749,
  //     longitude: -122.4194,
  //     zoom: 10,
  //   });
  //   mapboxgl.accessToken = MAPBOX_TOKEN;
  //   let coordinates;
  //   coordinates = "28.7041, 77.1025";
  //   let cordi = [];
  //   cordi = coordinates.split(",");
  //   //cordi[1] = coordinates[1];
  //   //console.log(cordi[0]);
  //   //console.log(cordi[1]);
  //   const map = new mapboxgl.Map({
  //     container: "map", // container ID
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: cordi, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  //     zoom: 7, // starting zoom
  //   });

  //   const marker = new mapboxgl.Marker({ color: "red" })
  //     .setLngLat(cordi) //Listing.geometry.coordinates
  //     .setPopup(
  //       new mapboxgl.Popup({ offset: 25 }).setHTML(
  //         `<h3>${title}</h3><p>Exact loction provided after booking!</p>`
  //       )
  //     )
  //     .addTo(map);
  //     marker();
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const INITIAL_CENTER = [-74.0242, 40.6941];
  const INITIAL_ZOOM = 10.12;

  const [center, setCenter] = useState(INITIAL_CENTER);
  // const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.1025);
  const [lat, setLat] = useState(28.7041);
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    if (map.current); // initialize map only once
    mapboxgl.accessToken = MAPBOX_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>Title</h3><p>Exact loction provided after booking!</p>`
        )
      )
      .addTo(map.current);
    return () => map.current.remove();
  }, [lat, lng, zoom]);

  //   useEffect(() => {
  //     if (!map.current) return; // wait for map to initialize

  //     new mapboxgl.Marker({ color: "red" })
  //       .setLngLat([lng, lat])
  //       .setPopup(
  //         new mapboxgl.Popup({ offset: 25 }).setHTML(
  //           `<h3>Title</h3><p>Exact loction provided after booking!</p>`
  //         )
  //       )
  //       .addTo(map.current);
  //   }, []);

  return (
    // <MapGL
    //   {...viewport}
    //   mapStyle="mapbox://styles/mapbox/streets-v11"
    //   onViewportChange={(newViewport) => setViewport(newViewport)}
    //   mapboxApiAccessToken={MAPBOX_TOKEN}
    // >
    //   <Marker latitude={37.7749} longitude={-122.4194}>
    //     <div>
    //       <img src="path/to/marker-icon.png" alt="Marker" />
    //     </div>
    //   </Marker>
    // </MapGL>
    <div ref={mapContainer} style={{ width: "500px", height: "450px" }} />
  );
}
