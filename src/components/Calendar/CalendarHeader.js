import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Button } from '@windmill/react-ui'


export default function CalendarHeader() {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
    }
    function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
    }
    function handleReset() {
        setMonthIndex(
            monthIndex === dayjs().month()
                ? monthIndex + Math.random()
                : dayjs().month()
        );
    }
    return (
        <header className="px-4 py-2 xs:px-1 flex items-center justify-between flex-wrap dark:text-gray-50">

            <div className=" flex-row flex items-center  ">
                <Button onClick={handleReset} size="small" className="mr-10">Today</Button>

                <div className=" flex-row flex items-center">
                    <button onClick={handlePrevMonth} className="material-icons-outlined cursor-pointer dark:text-gray-50  text-xl">
                        chevron_left
                    </button>

                    <h2 className=" md:text-xl xs:text-base dark:text-gray-50 font-bold mx-8 xs:mx-3">
                        {dayjs(new Date(dayjs().year(), monthIndex)).format(
                            "MMMM YYYY"
                        )}
                    </h2>

                    <button onClick={handleNextMonth} className="material-icons-outlined cursor-pointer dark:text-gray-50 text-xl ">chevron_right</button>
                </div>

            </div>

        </header>
    );
}
