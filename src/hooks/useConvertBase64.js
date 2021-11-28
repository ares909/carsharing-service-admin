const useConbertToBase64 = () => {
    const convertToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    return convertToBase64;
};

export default useConbertToBase64;
