/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef } from "react";

const useSlider = (slides) => {
    const getWidth = () => {
        if (window.innerWidth >= 1440) {
            return 688;
        }

        if (window.innerWidth >= 1201 && window.innerWidth <= 1439) {
            return 608;
        }

        if (window.innerWidth >= 1024 && window.innerWidth <= 1200) {
            return 410;
        }

        return 600;
    };
    const firstSlide = slides[0];
    const secondSlide = slides[1];
    const lastSlide = slides[slides.length - 1];

    const [state, setState] = useState({
        activeSlide: 0,
        translate: getWidth(),
        transition: 0.45,
        transitioning: false,
        slidesToRender: [lastSlide, firstSlide, secondSlide],
    });

    const { activeSlide, translate, slidesToRender, transition, transitioning } = state;

    const transitionRef = useRef();
    const resizeRef = useRef();

    useEffect(() => {
        const smooth = (e) => {
            if (e.target.className.includes("Slider")) {
                transitionRef.current();
            }
        };

        const resize = () => {
            resizeRef.current();
        };

        const transitionEnd = window.addEventListener("transitionend", smooth);
        const onResize = window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("transitionend", transitionEnd);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    useEffect(() => {
        if (transition === 0) setState({ ...state, transition: 0.45, transitioning: false });
    }, [transition]);

    const handleResize = () => {
        setState({ ...state, translate: getWidth(), transition: 0 });
    };

    const nextSlide = () => {
        if (transitioning) return;

        setState({
            ...state,
            translate: translate + getWidth(),
            activeSlide: activeSlide === slides.length - 1 ? 0 : activeSlide + 1,
        });
    };

    const prevSlide = () => {
        if (transitioning) return;

        setState({
            ...state,
            translate: 0,
            activeSlide: activeSlide === 0 ? slides.length - 1 : activeSlide - 1,
        });
    };

    const smoothTransition = () => {
        let slidesArray = [];

        if (activeSlide === slides.length - 1) slidesArray = [slides[slides.length - 2], lastSlide, firstSlide];
        else if (activeSlide === 0) slidesArray = [lastSlide, firstSlide, secondSlide];
        else slidesArray = slides.slice(activeSlide - 1, activeSlide + 2);

        setState({
            ...state,
            slidesToRender: slidesArray,
            transition: 0,
            translate: getWidth(),
        });
    };

    useEffect(() => {
        transitionRef.current = smoothTransition;
        resizeRef.current = handleResize;
    });

    return { translate, transition, getWidth, activeSlide, nextSlide, prevSlide, slidesToRender };
};

export default useSlider;
