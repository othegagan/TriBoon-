import React from 'react'

const FormatDate = () => {

    function formatDate() {
        const months = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "June",
            6: "July",
            7: "Aug",
            8: "Sept",
            9: "Oct",
            10: "Nov",
            11: "Dec"
        };
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const d = new Date();
        const year = d.getFullYear();
        const date = d.getDate();
        const monthName = months[d.getMonth()];
        const dayName = days[d.getDay()]; // Thu

        const formatted = `${dayName}, ${date} ${monthName} ${year}`;
        return formatted.toString();
    }


    return (
        <>{formatDate()}</>
    )
}

export default FormatDate