import React, { useState, useEffect } from "react";
import './style.css';

type Poi = { key: string, location: google.maps.LatLngLiteral };

export const FormComponent = ({ locations, setLocations,formData,setFormData }) => {
    // const [formData, setFormData] = useState({
    //     latitude: '',
    //     longitude: '',
    //     radius: '',
    // });

    const [triggerFetch, setTriggerFetch] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const url = `http://localhost:8070/nearby-search-history-api/nearby-search-history-feign/lat/${formData.latitude}/lng/${formData.longitude}/radius/${formData.radius}`;
                const response = await fetch(url);
                console.log(response);
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const responseJson = await response.json();
                console.log(responseJson);
                const locations: Poi[] = responseJson.map((r: any) => ({
                    key: r.place_id,
                    location: {
                        lat: r.geometry.location.lat,
                        lng: r.geometry.location.lng,
                    },
                }));
                setLocations(locations);
            } catch (error) {
                console.error(error);
            }
        };

        if (formData.latitude && formData.longitude && formData.radius) {
            fetchLocations();
        }
    }, [triggerFetch, formData, setLocations]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        //setFormData({ ...formData, [event.target.name]: event.target.value });
        event.preventDefault();
        console.log(formData);
        setTriggerFetch(!triggerFetch);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <label htmlFor="latitude">Latitude:</label>
                <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                />
                <label htmlFor="longitude">Longitude:</label>
                <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                />
                <label htmlFor="radius">Radius:</label>
                <input
                    type="text"
                    id="radius"
                    name="radius"
                    value={formData.radius}
                    onChange={handleChange}
                />
                {/* <button type="submit" >Submit</button> */}
            </div>
        </form>
    );
};
