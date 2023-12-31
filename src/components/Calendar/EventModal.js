import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Button } from '@windmill/react-ui'

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
];

export default function EventModal() {
    const {
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );

    const [timings, setTimings] = useState(
        selectedEvent ? selectedEvent.timings : ""
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );

    const [error, setError] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
            title,
            description,
            timings,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (calendarEvent.title === "") {
            setError("Give an title");
            console.log("give a title");
        } else {
            if (selectedEvent) {
                dispatchCalEvent({ type: "update", payload: calendarEvent });
            } else {
                dispatchCalEvent({ type: "push", payload: calendarEvent });
            }
            setShowEventModal(false);
            setError();
        }
    }
    return (
        <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center ">
            <div
                className="w-full px-6 pt-6 pb-8 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl "
                role="dialog"
            >
                <form>
                    <header className="flex justify-between mb-3">
                        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-100">
                            Add Event  <br className="lg:hidden md:hidden xs:block" /><span className="text-base"> on {daySelected.format("dddd, MMMM DD")}</span>
                        </p>

                        <button
                            onClick={() => setShowEventModal(false)}
                            className="inline-flex items-center justify-center w-6 h-6 text-gray-500 dark:text-gray-100 transition-colors duration-150 rounded dark:hover:text-gray-200 hover: hover:text-gray-700"
                            aria-label="close"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                role="img"
                                aria-hidden="true"
                            >
                                <path
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </header>

                    <div className="flex flex-col ">

                        <label className="block text-sm font-medium text-gray-700  dark:text-white">
                            <span className="material-icons-outlined text-gray-400 dark:text-gray-100 mr-4">T</span>
                            Title
                        </label>
                        <input
                            name="title"
                            placeholder="Add title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className="  base:block w-full text-sm focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1 bg-gray-50 mb-5"
                        />

                        <label className="block text-sm font-medium text-gray-700  dark:text-white">
                            <span className="material-icons-outlined text-gray-400 mr-4">segment</span>
                            Description
                        </label>
                        <textarea
                            type="text"
                            name="description"
                            placeholder="Type a message"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            className="  base:block w-full text-sm focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1 bg-gray-50 mb-5"
                        />


                        <label className="block text-sm font-medium text-gray-700  dark:text-white">
                            <span className="material-icons-outlined text-gray-400 mr-4">schedule</span>
                            Timings
                        </label>
                        <input
                            type="text"
                            name="timings"
                            placeholder="Add timings"
                            value={timings}
                            required
                            onChange={(e) => setTimings(e.target.value)}
                            className="  base:block w-full text-sm focus:outline-none  form-input leading-5 active:focus:border-purple-400 dark:border-gray-600 dark:text-white focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1 bg-gray-50 mb-5"
                        />


                        <div className="flex flex-row">
                        <label className="block text-sm font-medium text-gray-700  dark:text-white">
                            <span className="material-icons-outlined text-gray-400 mr-4">bookmark_border</span>
                            Filter
                        </label>
                            <div className="flex gap-x-2 ml-5">
                                {labelsClasses.map((lblClass, i) => (
                                    <span
                                        key={i}
                                        onClick={() => setSelectedLabel(lblClass)}
                                        className="w-6 h-6 mr-2 rounded-full flex items-center justify-center cursor-pointer"
                                        style={{"backgroundColor":`${lblClass}`}}
                                    >
                                        {selectedLabel === lblClass && (
                                            <span className="material-icons-outlined text-white text-sm">
                                                check
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="text-red-600 text-base">{error}</div>

                    {selectedEvent && (
                        <footer className="flex justify-between items-center mt-5 ">

                            <div className="flex flex-row text-base text-red-600 cursor-pointer"
                                onClick={() => {
                                    dispatchCalEvent({
                                        type: "delete",
                                        payload: selectedEvent,
                                    });
                                    setShowEventModal(false);
                                }}>
                                <span className="material-icons-outlined text-red-600 cursor-pointer mr-3">delete
                                </span>Delete
                            </div>


                            <div className="flex flex-row">
                                <Button layout="outline" className="mr-4" onClick={() => setShowEventModal(false)}>Cancel</Button>
                                <Button type="submit" onClick={handleSubmit}>Save</Button>
                            </div>
                        </footer>)}

                    {!selectedEvent &&
                        (<footer className="flex justify-end items-center mt-5 ">
                            <Button layout="outline" className="mr-4" onClick={() => setShowEventModal(false)}>Cancel</Button>

                            <Button type="submit" onClick={handleSubmit}>Save</Button>z
                        </footer>
                        )}
                </form>
            </div>
        </div >
    );
}
