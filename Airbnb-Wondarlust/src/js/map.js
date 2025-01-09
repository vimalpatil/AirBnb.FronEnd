mapboxgl.accessToken =
  "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg";

let coordinates;
coordinates = "28.7041, 77.1025";
console.log(coordinates);
let cordi = [];
cordi = coordinates.split(",");
//cordi[1] = coordinates[1];
//console.log(cordi[0]);
//console.log(cordi[1]);

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: cordi, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 7, // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(cordi) //Listing.geometry.coordinates
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${title}</h3><p>Exact loction provided after booking!</p>`
    )
  )
  .addTo(map);

// map.on('load', () => {
//     // Load an image from an external URL.
//     map.loadImage(
//         'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
//         (error, image) => {
//             if (error) throw error;

//             // Add the image to the map style.
//             map.addImage('cat', image);

//             // Add a data source containing one point feature.
//             map.addSource('point', {
//                 'type': 'geojson',
//                 'data': {
//                     'type': 'FeatureCollection',
//                     'features': [
//                         {
//                             'type': 'Feature',
//                             'geometry': {
//                                 'type': 'Point',
//                                 'coordinates': cordi
//                             }
//                         }
//                     ]
//                 }
//             });

//             // Add a layer to use the image to represent the data.
//             map.addLayer({
//                 'id': 'points',
//                 'type': 'symbol',
//                 'source': 'point', // reference the data source
//                 'layout': {
//                     'icon-image': 'cat', // reference the image
//                     'icon-size': 0.25
//                 }
//             });
//         }
//     );
// });

//console.log(coordinates);

//console.log(coordinates);
// console.log(setLngLat(coordinates));
// const marker = new mapboxgl.Marker({color: "red"})
// setLngLat(coordinates)
//addTo(map);
