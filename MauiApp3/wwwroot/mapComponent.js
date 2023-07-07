import 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js';
import 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
import 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiamFuaXRocmFtbyIsImEiOiJjbGpkeHYyZ2QwM2o3M2ZtcHgzdHY5M3dkIn0.Hp_k7bdZzNsEKac31qCYZQ';

export function addMapToElement(element) {
    return new mapboxgl.Map({
        container: element,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9
    });
}
export function navigation(element) {

    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );
}

export function setMapCenter(map, latitude, longitude) {
    map.setCenter([longitude, latitude]);
}