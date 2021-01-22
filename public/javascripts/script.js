// Map set up
var mymap = L.map('worldmap',
     {
      center: [48.866667, 2.333333],
      zoom: 4
     }
     );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

// City coord
let city = Array.from(document.getElementsByClassName('city-card'));
console.log(city);
for (let i = 0 ; i < city.length ; i++) {
     let latitude = city[i].dataset.lat;
     let longitude = city[i].dataset.lon;
     // Add cities to map
     L.marker([latitude, longitude]).addTo(mymap); 
}
