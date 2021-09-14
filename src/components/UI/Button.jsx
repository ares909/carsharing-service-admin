import React from "react";

function Button(props) {
    const { name, children, ...rest } = props;
    return <button {...rest}>{props.name || props.children}</button>;
}

export default Button;
