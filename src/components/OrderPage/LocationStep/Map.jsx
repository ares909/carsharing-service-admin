/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from "react";
import { Map, Placemark, Clusterer } from "react-yandex-maps";
import { useSelector, useDispatch } from "react-redux";
import { formAction } from "../../../store/slices/formSlice";
import { fetchPrices } from "../../../store/slices/priceRangeSlice";
import { fetchSinglePoint } from "../../../store/slices/singlePointSlice";
import { fetchGeoData } from "../../../store/slices/geodataSlice";
import placemark from "../../../images/map/placemark.svg";
import styles from "./Map.module.scss";

const YaMap = () => {
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const cityData = useSelector((state) => state.geodata.geodata);
    const points = useSelector((state) => state.point.points);
    const geodataPoints = useSelector((state) => state.geodataPoints.geodataPoints);
    const chosenPoint = useSelector((state) => state.singlePoint.point);
    const defaultState = {
        center: ["55.7522200", "37.6155600"],
        zoom: 12,
        controls: ["zoomControl"],
        checkZoomRange: true,
    };

    const [mapState, setMapState] = useState(defaultState);
    const [point, setPoint] = useState();

    useEffect(() => {
        if (cityData && points && mapRef.current) {
            mapRef.current.setCenter(cityData, window.innerWidth >= 768 ? 12 : 10);
        } else if (!cityData && mapRef.current) {
            mapRef.current.setCenter(defaultState.center, defaultState.zoom);
        } else if (!mapRef.current && cityData) {
            setMapState({ ...mapState, center: cityData, zoom: 12 });
        } else {
            setMapState({ ...mapState, center: defaultState.center, zoom: defaultState.zoom });
        }
    }, [cityData, mapRef.current]);

    useEffect(() => {
        if (cityData && chosenPoint && mapRef.current) {
            mapRef.current.setCenter(cityData, 16);
        } else if (cityData && mapRef.current && !chosenPoint) {
            mapRef.current.setCenter(cityData, defaultState.zoom);
        } else if (!mapRef.current && cityData && chosenPoint) {
            setMapState({ ...mapState, center: cityData, zoom: 16 });
        }
    }, [chosenPoint, cityData, mapRef.current]);

    useEffect(() => {
        if (point) {
            dispatch(fetchSinglePoint(point[0].id));
            dispatch(fetchPrices({ cityId: point[0].cityId.id, pointId: point[0].id }));
            dispatch(fetchGeoData(`${point[0].cityId.name}, ${point[0].address}`));
        }
    }, [point]);

    const handleClick = (e) => {
        setPoint(
            points.filter((item) => item.address === e.originalEvent.target.properties._data.balloonContentHeader),
        );
        dispatch(formAction({ point: e.originalEvent.target.properties._data.balloonContentHeader }));
        // mapRef.current.setCenter(e.originalEvent.target.geometry._coordinates, 16);
    };
    return (
        <Map
            className={styles.map}
            state={{ center: mapState.center, zoom: mapState.zoom, controls: ["zoomControl"] }}
            options={{ autoFitToViewport: "always" }}
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

export default YaMap;
