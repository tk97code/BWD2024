    // Your Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc2t0YW41NDM2IiwiYSI6ImNrZTJ3a3locDBkbHMyc21hd2theDV3bTgifQ.RuFY4aHJauzWd_Ea516HhA';

    // Initialize the map
    const map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v12', // stylesheet location
        center: [108.253148, 15.975071], // starting position [lng, lat]
        zoom: 15, // starting zoom
        // pitch: 60, // pitch in degrees
        // bearing: -17.6, // bearing in degrees
        antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );

    new mapboxgl.Marker({
        draggable: false,
        color: red,
        offset: [0, -15]
    }).setLngLat([108.253148, 15.975071]).addTo(map);

    // Wait for the map to load
    map.on('load', () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        let labelLayerId;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        // Add 3D buildings layer
        map.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

                // Use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in.
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        }, labelLayerId);
    });

    
