import { useState } from "react";

const useFormComplete = () => {
    const [complete, setComplete] = useState(false);
    const toggle = () => setComplete(true);

    return [complete, toggle];
};

export default useFormComplete;
