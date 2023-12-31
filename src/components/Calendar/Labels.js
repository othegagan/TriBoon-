import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";


export default function Labels() {
    const { labels, updateLabel } = useContext(GlobalContext);
    return (
        <>

            <div className="flex flex-row items-center justify-start my-10 xs:my-5  xs:mt-10">

                <p className="text-gray-500 font-bold  mr-10 xs:mr-3">Filter</p>

                <div className=" flex flex-row flex-wrap">
                    {labels.map(({ label: lbl, checked }, idx) => (
                        <label key={idx} className="items-center block mr-5">
                            {lbl === 'red' &&
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        updateLabel({ label: lbl, checked: !checked })
                                    }
                                    className={`form-checkbox h-5 w-5 text-red-500 rounded focus:ring-0 cursor-pointer`
                                    }
                                />}
                            {lbl === 'blue' &&
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        updateLabel({ label: lbl, checked: !checked })
                                    }
                                    className={`form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-0 cursor-pointer`
                                    }
                                />}
                            {lbl === 'green' &&
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        updateLabel({ label: lbl, checked: !checked })
                                    }
                                    className={`form-checkbox h-5 w-5 text-green-500 rounded focus:ring-0 cursor-pointer`
                                    }
                                />}
                            {lbl === 'gray' &&
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        updateLabel({ label: lbl, checked: !checked })
                                    }
                                    className={`form-checkbox h-5 w-5 text-gray-500 rounded focus:ring-0 cursor-pointer`
                                    }
                                />}
                            {lbl === 'indigo' &&
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        updateLabel({ label: lbl, checked: !checked })
                                    }
                                    className={`form-checkbox h-5 w-5 text-indigo-500 rounded focus:ring-0 cursor-pointer`
                                    }
                                />}
                            {lbl === 'purple' &&
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                        updateLabel({ label: lbl, checked: !checked })
                                    }
                                    className={`form-checkbox h-5 w-5 text-purple-500 rounded focus:ring-0 cursor-pointer`
                                    }
                                />}
                            <span className="ml-2 text-gray-700 capitalize dark:text-gray-50">{lbl}</span>
                        </label>
                    ))}
                </div>
            </div>
        </>
    );
}
