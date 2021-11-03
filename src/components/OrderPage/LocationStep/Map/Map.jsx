/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from "react";
import { Map, Placemark, Clusterer } from "react-yandex-maps";
import { useSelector, useDispatch } from "react-redux";
import { formAction } from "../../../../store/slices/formSlice";
import { apiData, formData } from "../../../../store/selectors/selectors";
import placemark from "../../../../images/map/placemark.svg";
import styles from "./Map.module.scss";

const YaMap = () => {
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const { points, geodata } = useSelector(apiData);
    const defaultState = {
        center: ["54.314192", "48.403132"],
        zoom: 12,
        controls: ["zoomControl"],
        checkZoomRange: true,
    };

    const [mapState, setMapState] = useState(defaultState);
    const [point, setPoint] = useState();

    useEffect(() => {
        if (geodata.city && points.data && mapRef.current) {
            mapRef.current.setCenter(geodata.city, window.innerWidth >= 768 ? 12 : 10);
        } else if (!geodata.city && mapRef.current) {
            mapRef.current.setCenter(defaultState.center, defaultState.zoom);
        } else if (!mapRef.current && geodata.city) {
            setMapState({ ...mapState, center: geodata.city, zoom: 12 });
        } else {
            setMapState({ ...mapState, center: defaultState.center, zoom: defaultState.zoom });
        }
    }, [geodata.city, mapRef.current]);

    useEffect(() => {
        if (geodata.city && geodata.point && mapRef.current) {
            mapRef.current.setCenter(geodata.point, 16);
        } else if (geodata.city && mapRef.current && !geodata.point) {
            mapRef.current.setCenter(geodata.city, defaultState.zoom);
        } else if (!mapRef.current && geodata.city && geodata.point) {
            setMapState({ ...mapState, center: geodata.point, zoom: 16 });
        }
    }, [geodata.point, geodata.city, mapRef.current]);

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
                {geodata.points
                    ? geodata.points.map((coordinates, index) => (
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
