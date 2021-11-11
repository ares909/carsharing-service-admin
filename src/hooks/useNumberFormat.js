const useNumberFormat = () => {
    const convertNumber = (number) => {
        return new Intl.NumberFormat("ru-RU").format(number);
    };

    const convertCarNumber = (carNumber) => {
        const numberString = carNumber.split("").map((letter) => letter.toUpperCase());
        const number = `${numberString.slice(0, 1)} ${numberString.slice(1, 4).join("")} ${numberString
            .slice(4, 6)
            .join("")} ${numberString.slice(6, 10).join("")}`;
        return number;
    };

    return [convertNumber, convertCarNumber];
};

export default useNumberFormat;
