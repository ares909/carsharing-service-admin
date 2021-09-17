/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef } from "react";

function useSlider(slides) {
    function getWidth() {
        if (window.innerWidth >= 1440) {
            return 688;
        }
        if (window.innerWidth >= 1024 && window.innerWidth <= 1439) {
            return 410;
        }

        return 600;
    }
    const firstSlide = slides[0];
    const secondSlide = slides[1];
    const lastSlide = slides[slides.length - 1];

    const [state, setState] = useState({
        activeSlide: 0,
        translate: getWidth(),
        transition: 0.45,
        transitioning: false,
        _slides: [lastSlide, firstSlide, secondSlide],
    });

    const { activeSlide, translate, _slides, transition, transitioning } = state;

    const autoPlayRef = useRef();
    const transitionRef = useRef();
    const resizeRef = useRef();
    // const sliderRef = useRef();
    // const throttleRef = useRef();

    useEffect(() => {
        // const slider = sliderRef.current;

        const smooth = (e) => {
            if (e.target.className.includes("slider__content")) {
                transitionRef.current();
            }
        };

        const resize = () => {
            resizeRef.current();
        };

        // const throttle = (e) => {
        //     if (e.target.className.includes("SliderContent")) {
        //         throttleRef.current();
        //     }
        // };

        // const transitionStart = window.addEventListener("transitionstart", throttle);
        const transitionEnd = window.addEventListener("transitionend", smooth);
        const onResize = window.addEventListener("resize", resize);

        return () => {
            // window.removeEventListener("transitionend", transitionStart);
            window.removeEventListener("transitionend", transitionEnd);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    useEffect(() => {
        if (transition === 0) setState({ ...state, transition: 0.45, transitioning: false });
    }, [transition]);

    // const throttleArrows = () => {
    //     setState({ ...state, transitioning: true });
    // };

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
            _slides: slidesArray,
            transition: 0,
            translate: getWidth(),
        });
    };

    useEffect(() => {
        autoPlayRef.current = nextSlide;
        transitionRef.current = smoothTransition;
        resizeRef.current = handleResize;
        // throttleRef.current = throttleArrows;
    });

    return { translate, transition, getWidth, activeSlide, nextSlide, prevSlide, _slides };
}

export default useSlider;
