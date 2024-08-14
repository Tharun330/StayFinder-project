
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

console.log("aaa");
console.log(locationDetails.geometry.coordinates);
console.log("aaa");
mapboxgl.accessToken = map_accessToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: locationDetails.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});


const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<h4>${locationDetails.location}</h4> <p>This is the place you'll be staying</p>` 
    
);
const el = document.createElement('div');
el.id = 'marker';
    // Create a default Marker and add it to the map.
    const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(locationDetails.geometry.coordinates)
        .setPopup(popup)    
        .addTo(map);


        

        
       
