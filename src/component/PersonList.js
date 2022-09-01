import React from "react";

export default ({ people = []}) =>
    <ul>
        {
            people.map(
                (person, i) =>
                    <li key={i}>
                        {person.firstName}
                        {person.lastName}
                    </li>
                )
        }
    </ul>