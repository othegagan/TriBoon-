import React from "react";
import Day from "./Day";
export default function Month({ month }) {

    const week = ['MON', 'TUE', ' WED', 'THRU', 'FRI', 'SAT', 'SUN']
    return (
        <div className="w-full min-h-screen">
            <div className="flex flex-row justify-around  bg-purple-400">
                {week.map((day, i) => (
                    <p  key={i} className="text-sm mt-1 font-bold dark:text-purple-800 ">
                        {day.toUpperCase()}
                    </p>
                ))}
            </div>
            <div className="flex-1 grid grid-cols-7 grid-rows-5 w-auto min-h-screen">

                {month.map((row, i) => (
                    <React.Fragment key={i}>
                        {row.map((day, idx) => (
                            <Day day={day} key={idx} rowIdx={i} />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
