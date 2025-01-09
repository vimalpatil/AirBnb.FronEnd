import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";

export function Map_reactgl() {
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg";
  const [newPlace, setNewPlace] = useState(null);
  const [viewPort, setViewport] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 10,
  });

  function handleClick(e) {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  }
  console.log(newPlace);
  return (
    <div style={{ width: "500px", height: "500px", zIndex: 999 }}>
      <ReactMapGl
        {...viewPort}
        mapboxAccessToken={MAPBOX_TOKEN}
        transitionDuration="100"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewPort) => setViewport(viewPort)}
        onDblClick={handleClick}
      >
        {newPlace ? (
          <>
            <Marker
              latitude={newPlace?.lat}
              longitude={newPlace?.long}
              offsetLeft={-3.5 * viewPort.zoom}
              offsetTop={-7 * viewPort.zoom}
            >
              <img
                src="/icons8-location-48.png"
                width={"48px"}
                height={"48px"}
              ></img>
              <Room
                style={{
                  fontSize: 7 * viewPort.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              ></Room>
            </Marker>
          </>
        ) : null}
      </ReactMapGl>
    </div>
  );
}
