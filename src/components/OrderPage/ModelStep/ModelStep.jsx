import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const ModelStep = () => {
    const { handleSubmit, errors, register } = useForm({
        // defaultValues: stateForm,
    });
    const { push } = useHistory();
    const location = {
        pathname: "/order/additional",
        state: { complete: true },
    };

    const onSubmit = (data) => {
        // dispatch(formAction(data));
        push(location);
        console.log(data);
        // console.log(cityId);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <button type="submit">123</button>
        </form>
    );
};

export default ModelStep;
