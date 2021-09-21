import { useState } from "react";

const useModal = () => {
    const [isOpened, setIsOpened] = useState(false);
    const toggle = () => setIsOpened(!isOpened);

    return [isOpened, toggle];
};

export default useModal;
