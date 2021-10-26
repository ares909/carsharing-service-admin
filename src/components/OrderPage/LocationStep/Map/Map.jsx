/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from "react";
import { Map, Placemark, Clusterer } from "react-yandex-maps";
import { useSelector, useDispatch } from "react-redux";
import { formAction } from "../../../../store/slices/formSlice";
import placemark from "../../../../images/map/placemark.svg";
import styles from "./Map.module.scss";

const YaMap = () => {
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const apiData = useSelector((state) => state.api);
    const defaultState = {
        center: ["54.314192", "48.403132"],
        zoom: 12,
        controls: ["zoomControl"],
        checkZoomRange: true,
    };

    const [mapState, setMapState] = useState(defaultState);
    const [point, setPoint] = useState();

    useEffect(() => {
        if (apiData.geodata.city && apiData.points.data && mapRef.current) {
            mapRef.current.setCenter(apiData.geodata.city, window.innerWidth >= 768 ? 12 : 10);
        } else if (!apiData.geodata.city && mapRef.current) {
            mapRef.current.setCenter(defaultState.center, defaultState.zoom);
        } else if (!mapRef.current && apiData.geodata.city) {
            setMapState({ ...mapState, center: apiData.geodata.city, zoom: 12 });
        } else {
            setMapState({ ...mapState, center: defaultState.center, zoom: defaultState.zoom });
        }
    }, [apiData.geodata.city, mapRef.current]);

    useEffect(() => {
        if (apiData.geodata.city && apiData.geodata.point && mapRef.current) {
            mapRef.current.setCenter(apiData.geodata.point, 16);
        } else if (apiData.geodata.city && mapRef.current && !apiData.geodata.point) {
            mapRef.current.setCenter(apiData.geodata.city, defaultState.zoom);
        } else if (!mapRef.current && apiData.geodata.city && apiData.geodata.point) {
            setMapState({ ...mapState, center: apiData.geodata.point, zoom: 16 });
        }
    }, [apiData.geodata.point, apiData.geodata.city, mapRef.current]);

    const handleClick = (e) => {
        setPoint(
            apiData.points.data.filter((item) => item.address === e.originalEvent.target.properties._data.hintContent),
        );
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
                {apiData.geodata.points
                    ? apiData.geodata.points.map((coordinates, index) => (
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
