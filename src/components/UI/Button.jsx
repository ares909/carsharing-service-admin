import React from "react";

function Button(props) {
    const { name, children, toggle, ...rest } = props;
    return (
        <button onClick={props.toggle} {...rest}>
            {props.name || props.children}
        </button>
    );
}

export default Button;
