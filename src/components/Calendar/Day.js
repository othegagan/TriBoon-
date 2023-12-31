import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";


export default function Day({ day, rowIdx }) {
    const [dayEvents, setDayEvents] = useState([]);
    const {
        setDaySelected,
        setShowEventModal,
        filteredEvents,
        setSelectedEvent,
    } = useContext(GlobalContext);

    useEffect(() => {
        const events = filteredEvents.filter(
            (evt) =>
                dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events);
    }, [filteredEvents, day]);

    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "p-2 rounded-lg text-white bg-purple-600 "
            : "";
    }
    return (
        <div className="border border-gray-200 dark:border-gray-600 flex flex-col">
            <div className="flex flex-col items-center">
                <p className={`text-sm p-1 my-1 dark:text-gray-50 text-center  ${getCurrentDayClass()}`}>
                    {day.format("DD")}
                </p>
            </div>
            <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModal(true);
                }}
            >
                {dayEvents.map((evt, idx) => (

                    <div>
                        {evt.label === 'red' &&
                            <div key={idx}
                                onClick={() => setSelectedEvent(evt)}
                                className={"bg-red-400 p-1 mx-2 mb-2  text-sm rounded truncate"}
                            >
                                <p className="font-semibold capitalize   dark:text-gray-800 ">{evt.title} - {evt.timings}</p>
                            </div>
                        }

                        {evt.label === 'gray' &&
                            <div key={idx}
                                onClick={() => setSelectedEvent(evt)}
                                className={"bg-gray-400 p-1 mx-2 mb-2  text-sm rounded truncate"}
                            >
                                <p className="font-semibold capitalize   dark:text-gray-800 ">{evt.title} - {evt.timings}</p>
                            </div>
                        }

                        {evt.label === 'indigo' &&
                            <div key={idx}
                                onClick={() => setSelectedEvent(evt)}
                                className={"bg-indigo-400 p-1 mx-2 mb-2  text-sm rounded truncate"}
                            >
                                <p className="font-semibold capitalize   dark:text-gray-800 ">{evt.title} - {evt.timings}</p>
                            </div>
                        }

                        {evt.label === 'green' &&
                            <div key={idx}
                                onClick={() => setSelectedEvent(evt)}
                                className={"bg-green-400 p-1 mx-2 mb-2  text-sm rounded truncate"}
                            >
                                <p className="font-semibold capitalize   dark:text-gray-800 ">{evt.title} - {evt.timings}</p>
                            </div>
                        }

                        {evt.label === 'blue' &&
                            <div key={idx}
                                onClick={() => setSelectedEvent(evt)}
                                className={"bg-blue-400 p-1 mx-2 mb-2  text-sm rounded truncate"}
                            >
                                <p className="font-semibold capitalize   dark:text-gray-800 ">{evt.title} - {evt.timings}</p>
                            </div>
                        }

                        {evt.label === 'purple' &&
                            <div key={idx}
                                onClick={() => setSelectedEvent(evt)}
                                className={"bg-purple-400 p-1 mx-2 mb-2  text-sm rounded truncate"}
                            >
                                <p className="font-semibold capitalize   dark:text-gray-800 ">{evt.title} - {evt.timings}</p>
                            </div>
                        }

                    </div>
                ))}
            </div>
        </div>
    );
}
