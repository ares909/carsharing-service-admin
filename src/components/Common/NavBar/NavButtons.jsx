import React from "react";

export const navButtonsAdmin = [
    {
        title: "Заказы",
        route: "/admin/orderlist",
        image: (
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.5 1H3.5C2.95 1 2.505 1.45 2.505 2L2.5 10C2.5 10.55 2.945 11 3.495 11H9.5C10.05 11 10.5 10.55 10.5 10V4L7.5 1ZM8.5 8H7V9.5H6V8H4.5V7H6V5.5H7V7H8.5V8ZM7 1.75V4.5H9.75L7 1.75Z"
                    fill="#CACEDB"
                />
            </svg>
        ),
    },
    {
        title: "Список авто",
        route: "/admin/carlist",
        image: (
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.5 3.5V4.85714H7.83333V3.5H2.5ZM7.83333 7.57142H2.5V6.21428H7.83333V7.57142ZM2.5 10.2857H7.83333V8.92857H2.5V10.2857ZM2.5 13H7.83333V11.6429H2.5V13ZM14.5 3.5H9.16663V13H14.5V3.5Z"
                    fill="#CACEDB"
                />
            </svg>
        ),
    },
    {
        title: "Список городов",
        route: "/admin/citylist",
        image: (
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.5 3.5V4.85714H7.83333V3.5H2.5ZM7.83333 7.57142H2.5V6.21428H7.83333V7.57142ZM2.5 10.2857H7.83333V8.92857H2.5V10.2857ZM2.5 13H7.83333V11.6429H2.5V13ZM14.5 3.5H9.16663V13H14.5V3.5Z"
                    fill="#CACEDB"
                />
            </svg>
        ),
    },
    {
        title: "Карточка автомобиля",
        route: "/admin/carcard",
        image: (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
                    fill="#CACEDB"
                />
            </svg>
        ),
    },
    {
        title: "Карточка города",
        route: "/admin/citycard",
        image: (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
                    fill="#CACEDB"
                />
            </svg>
        ),
    },
];

export const navButtonsFooter = [
    { title: "Главная страница", route: "/" },
    { title: "Форма заказа", route: "/order" },
];
