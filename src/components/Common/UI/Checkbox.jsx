import React from "react";

const Checkbox = (props) => {
    const { name, value, children, toggle, checked, onChange, ...rest } = props;
    const handleChange = () => {
        props.onChange(props.value);
    };
    return (
        <div>
            <input checked={props.checked === props.value} type="radio" onChange={handleChange} {...rest}></input>

            <label>{props.name}</label>
        </div>
    );
};

export default Checkbox;
