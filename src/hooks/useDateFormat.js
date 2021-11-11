const useDateFormat = () => {
    const convertDateToSeconds = (date) => {
        return date.getTime();
    };

    const secondsToDhms = (time) => {
        const seconds = Number(time) / 1000;
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);

        const dDisplay = d > 0 ? `${d}д ` : "";
        const hDisplay = h > 0 && h < 24 ? `${h}ч ` : "";
        const mDisplay = m > 0 && m < 60 ? `${m}м` : "";

        return dDisplay + hDisplay + mDisplay;
    };

    const secondsToMinutes = (time) => {
        const seconds = Number(time) / 1000;
        const m = Math.round(seconds / 60);

        return m;
    };

    const secondsToHours = (time) => {
        const seconds = Number(time) / 1000;
        const h = Math.ceil(seconds / 3600);

        return h;
    };

    const secondsToDays = (time) => {
        const seconds = Number(time) / 1000;
        const d = Math.ceil(seconds / (3600 * 24));
        return d;
    };

    const stringToLocale = (time) => {
        return time.toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    return [convertDateToSeconds, secondsToDhms, secondsToMinutes, secondsToHours, stringToLocale, secondsToDays];
};

export default useDateFormat;
