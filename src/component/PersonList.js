import React from "react";

export default (props) =>
    <ul>
        {
            props.people && props.people.length == 1 ? <li></li>: undefined
        }
    </ul>