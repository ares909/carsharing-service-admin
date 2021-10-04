/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useState, useRef } from "react";

import { YMaps, Map, Placemark, Clusterer, SearchControl } from "react-yandex-maps";
import { useSelector, useDispatch } from "react-redux";
import { set } from "react-hook-form";
import { getGeoData } from "../../../api/api";
import { fetchGeoDataPoints } from "../../../store/slices/geodataPointsSlice";
import { formAction } from "../../../store/slices/formSlice";
import placemark from "../../../images/map/placemark.svg";

const MyPlacemark = () => {
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const cityData = useSelector((state) => state.geodata.geodata);
    const points = useSelector((state) => state.point.points);
    const geodataPoints = useSelector((state) => state.geodataPoints.geodataPoints);
    const chosenPoint = useSelector((state) => state.singlePoint.point);
    const defaultState = {
        center: ["55.751574", "37.573856"],
        zoom: 12,
        controls: ["zoomControl"],
        checkZoomRange: true,
    };

    const [mapState, setMapState] = useState(defaultState);
    const [geoPoints, setGeoPoints] = useState([]);
    const [point, setPoint] = useState();

    useEffect(() => {
        if (cityData && points && mapRef.current) {
            mapRef.current.setCenter(cityData, 12);
        } else if (!cityData && mapRef.current) {
            mapRef.current.setCenter(defaultState.center, defaultState.zoom);
        } else if (!mapRef.current && cityData) {
            setMapState({ ...mapState, center: cityData, zoom: 12 });
        } else {
            setMapState({ ...mapState, center: defaultState.center, zoom: defaultState.zoom });
        }
    }, [cityData]);

    useEffect(() => {
        if (cityData && chosenPoint && mapRef.current) {
            mapRef.current.setCenter(cityData, 16);
        } else if (cityData && mapRef.current && !chosenPoint) {
            mapRef.current.setCenter(cityData, defaultState.zoom);
        } else if (!mapRef.current && cityData && chosenPoint) {
            setMapState({ ...mapState, center: cityData, zoom: 16 });
        }
    }, [chosenPoint, cityData]);

    const handleClick = (e) => {
        // mapRef.current.setCenter(e.originalEvent.target.geometry._coordinates, 16);

        setPoint(
            points.filter((item) => item.address === e.originalEvent.target.properties._data.balloonContentHeader),
        );
        dispatch(formAction({ point: e.originalEvent.target.properties._data.balloonContentHeader }));
    };
    return (
        <Map
            style={{ width: "1000px", height: "500px" }}
            state={{ center: mapState.center, zoom: mapState.zoom, controls: ["zoomControl"] }}
            // options={{ autoFitToViewport: "always" }}
            instanceRef={(ref) => {
                mapRef.current = ref;
            }}
        >
            <Clusterer
                options={{
                    preset: "islands#invertedDarkGreenClusterIcons",
                    groupByCoordinates: false,
                }}
            >
                {geodataPoints.map((coordinates, index) => (
                    <Placemark
                        key={coordinates.featureMember[0].GeoObject.name}
                        geometry={coordinates.featureMember[0].GeoObject.Point.pos.split(" ").reverse()}
                        options={{
                            // preset: "islands#darkGreenCircleIcon",
                            iconLayout: "default#image",
                            iconImageHref: placemark,
                            iconImageSize: [18, 18],
                            iconImageOffset: [-18, -18],
                        }}
                        onClick={handleClick}
                        modules={[
                            // чтобы видеть хинты и балуны подключаем данные модули
                            "objectManager.addon.objectsBalloon",
                            "objectManager.addon.objectsHint",
                        ]}
                        properties={{
                            balloonContentHeader: `${coordinates.metaDataProperty.GeocoderResponseMetaData.request
                                .split(", ")
                                .slice(1)
                                .join(", ")}`,
                            balloonContent: `<p style='color: black'><strong>${
                                point ? point[0].name : ""
                            }</strong></p>`,
                        }}
                    />
                ))}
            </Clusterer>
        </Map>
    );
};

export default MyPlacemark;
