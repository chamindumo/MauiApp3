import 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
import 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiamFuaXRocmFtbyIsImEiOiJjbGpkeHYyZ2QwM2o3M2ZtcHgzdHY5M3dkIn0.Hp_k7bdZzNsEKac31qCYZQ';

let searchedEndLatitude = null;
let searchedEndLongitude = null;

let previousRoutes = [];


export function addMapToElement(element) {
    const map = new mapboxgl.Map({
        container: element,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9,
    });

    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,

    });

    map.addControl(directions, 'top-left');
    map.on('load', () => {
  // Define the route coordinates or GeoJSON LineString representing the desired route
  const routeCoordinates = [
      [79.95832, 6.59760],
      [81.34281, 6.41551],
    // Add more coordinates as needed
  ];

  // Add a GeoJSON source using the route coordinates
  map.addSource('route', {
    type: 'geojson',
    data: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: routeCoordinates,
      },
    },
  });

  // Add a line layer to the map using the GeoJSON source
  map.addLayer({
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#888',
      'line-width': 8,
    },
  });

  // Implement navigation logic and user interactions
  // This can include things like displaying instructions, handling user interactions, etc.
  // You can use Mapbox GL JS events and API methods to accomplish this.

  // Example event handler for a map click
  map.on('click', 'route', (e) => {
    // Handle click on the route layer
    // You can access the clicked feature and perform custom actions
    const clickedFeature = e.features[0];
    console.log('Clicked feature:', clickedFeature);
  });
});



    return map;
}


export function setMapCenter(map, latitude, longitude) {
    map.setCenter([longitude, latitude]);
}

window.getCurrentLocation = async function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            function (error) {
                reject(error);
            }
        );
    });
};

window.shareLocation = async function () {
    const position = await getCurrentLocation();

    const apiUrl = 'https://example.com/api/locations'; // Replace with your API endpoint URL

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(position),
    };

    fetch(apiUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle successful response
        })
        .catch((error) => {
            console.error('API request error:', error);
            // Handle error
        });
};
export function addPointToMap(mapInstance, latitude, longitude) {
    const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(mapInstance);
    return marker;
}




export function setDirectionsStart(mapInstance, latitude, longitude) {
    const directionsControl = mapInstance._controls.find(control => control instanceof MapboxDirections);
    if (directionsControl) {
        directionsControl.setOrigin([longitude, latitude]);
    }
}

export function clearDirections(mapInstance) {
    const directionsControl = mapInstance._controls.find(control => control instanceof MapboxDirections);
    if (directionsControl) {
        directionsControl.removeRoutes();
    }
}

export function calculateAndDisplayDirections(mapInstance, startLatitude, startLongitude, endLatitude, endLongitude) {
    const directionsControl = mapInstance._controls.find(control => control instanceof MapboxDirections);
    if (directionsControl) {
        directionsControl.setOrigin([startLongitude, startLatitude]);
        directionsControl.setDestination([endLongitude, endLatitude]);
        directionsControl.on('route', function (e) {
            // Handle route data if needed
        });

        // Store the searched values in a dictionary
        const searchedValues = {
            startLatitude,
            startLongitude,
            endLatitude,
            endLongitude
        };

        // Pass the searched values to the Razor page
        DotNet.invokeMethodAsync('My Application', 'StoreSearchedValues', JSON.stringify(searchedValues));
    }
}


export function calculateAndDisplayDirections2(mapInstance, startLatitude, startLongitude, endLatitude, endLongitude) {
    const directionsControl = mapInstance._controls.find(control => control instanceof MapboxDirections);
    if (directionsControl) {
        directionsControl.setOrigin([startLongitude, startLatitude]);
        directionsControl.setDestination([endLongitude, endLatitude]);
        directionsControl.on('route', function (e) {
            // Handle route data if needed
        });

        // Store the searched values in a dictionary
        const searchedValues = {
            startLatitude,
            startLongitude,
            endLatitude,
            endLongitude
        };

        // Pass the searched values to the Razor page
        DotNet.invokeMethodAsync('My Application', 'StoreSearchedValues', JSON.stringify(searchedValues));
    }
}





