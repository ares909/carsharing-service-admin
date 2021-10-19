const useNumberFormat = () => {
    const convertNumber = (number) => {
        return new Intl.NumberFormat("ru-RU").format(number);
    };

    return { convertNumber };
};

export default useNumberFormat;
