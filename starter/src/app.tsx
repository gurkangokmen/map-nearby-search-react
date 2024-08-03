import React, { useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    MapCameraChangedEvent,
    Pin
} from '@vis.gl/react-google-maps';

type Poi = { key: string, location: google.maps.LatLngLiteral };

const App = () => {
    const [locations, setLocations] = useState<Poi[]>([]);
    const [formData, setFormData] = useState({
        latitude: '',
        longitude: '',
        radius: '',
    });
    const [center, setCenter] = useState({ lat: -33.860664, lng: 151.208138 });

    useEffect(() => {
        if (formData.latitude && formData.longitude) {
            setCenter({ lat: parseFloat(formData.latitude), lng: parseFloat(formData.longitude) });
        }
    }, [formData]);

    return (
        <APIProvider apiKey={'******'} onLoad={() => console.log('Maps API has loaded.')}>
     
            <br />
            <Map 
                defaultZoom={13}
                center={center}
                mapId='******'
                onCameraChanged={(ev: MapCameraChangedEvent) => console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}
            >
                <PoiMarkers pois={locations} />
            </Map>
        </APIProvider>
    );
};

const PoiMarkers = (props: { pois: Poi[] }) => {
    return (
        <>
            {props.pois.map((poi: Poi) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}>
                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            ))}
        </>
    );
};

const root = createRoot(document.getElementById('app'));
root.render(<App />);

export default App;
