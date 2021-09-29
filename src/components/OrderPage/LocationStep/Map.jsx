import React, { useCallback, useEffect } from "react";

import { YMaps, Map, Placemark, Clusterer, SearchControl } from "react-yandex-maps";
import { useSelector, useDispatch } from "react-redux";
import { fetchGeoDataPoints } from "../../../store/slices/geodataPointsSlice";

const MyPlacemark = ({ mapRef }) => {
    const dispatch = useDispatch();
    const cityData = useSelector((state) => state.geodata.geodata);
    const points = useSelector((state) => state.point.points);
    const geodataPoints = useSelector((state) => state.geodataPoints.geodataPoints);

    const handlePoints = useCallback(() => {
        points.forEach((point) => {
            dispatch(fetchGeoDataPoints(`${point.cityId.name}, ${point.address}`));
        });
    }, [points]);

    const handleCityPoint = useCallback(() => {
        if (cityData && points) {
            mapRef.current.setCenter(cityData, 12, {
                checkZoomRange: true,
            });
        }
    }, [cityData, points]);

    useEffect(() => {
        handleCityPoint();
        handlePoints();
    }, [cityData]);

    // useEffect(() => {
    //     if (cityData && points) {
    //         mapRef.current.setCenter(cityData, 12, {
    //             checkZoomRange: true,
    //         });

    //         points.forEach((point) => {
    //       dispatch(fetchGeoDataPoints(`${point.cityId.name}, ${point.address}`));
    //    });
    //         console.log(cityData);
    //     }
    // }, [cityData, points]);
    return (
        <Map
            // style={{ width: "60%", height: "50%" }}
            defaultState={{ center: [55.751574, 37.573856], zoom: 12, controls: ["zoomControl"] }}
            instanceRef={(ref) => {
                mapRef.current = ref;
            }}
        >
            <Clusterer
                options={{
                    preset: "islands#invertedVioletClusterIcons",
                    groupByCoordinates: false,
                }}
            >
                {geodataPoints.map((coordinates, index) => (
                    <Placemark key={index} geometry={coordinates} />
                ))}
            </Clusterer>
        </Map>
    );
};

export default MyPlacemark;
