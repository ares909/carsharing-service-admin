/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from "react";
import { Map, Placemark, Clusterer } from "react-yandex-maps";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { formAction } from "../../../../store/slices/formSlice";
import placemark from "../../../../images/map/placemark.svg";
import styles from "./Map.module.scss";

const YaMap = () => {
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const cityData = useSelector((state) => state.form.geodata.city);
    const pointData = useSelector((state) => state.form.geodata.point);
    const points = useSelector((state) => state.form.points);
    const geodataPoints = useSelector((state) => state.form.geodata.points);
    const city = useSelector((state) => state.form.city);
    const chosenPoint = useSelector((state) => state.form.point);
    const defaultState = {
        center: ["54.314192", "48.403132"],
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
        if (cityData && pointData && mapRef.current) {
            mapRef.current.setCenter(pointData, 16);
        } else if (cityData && mapRef.current && !pointData) {
            mapRef.current.setCenter(cityData, defaultState.zoom);
        } else if (!mapRef.current && cityData && pointData) {
            setMapState({ ...mapState, center: pointData, zoom: 16 });
        }
    }, [pointData, cityData, mapRef.current]);

    const handleClick = (e) => {
        setPoint(points.data.filter((item) => item.address === e.originalEvent.target.properties._data.hintContent));
    };

    useEffect(() => {
        if (point) {
            dispatch(
                formAction({
                    point: { name: point[0].address, id: point[0].id },
                }),
            );
        }
    }, [point]);

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
                {geodataPoints
                    ? geodataPoints.map((coordinates, index) => (
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
                              modules={["objectManager.addon.objectsHint"]}
                              properties={{
                                  hintContent: `${coordinates.metaDataProperty.GeocoderResponseMetaData.request
                                      .split(", ")
                                      .slice(1)
                                      .join(", ")}`,
                              }}
                          />
                      ))
                    : ""}
            </Clusterer>
        </Map>
    );
};

export default YaMap;
