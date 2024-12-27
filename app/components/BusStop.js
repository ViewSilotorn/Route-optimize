import { useState } from 'react';
import styles from '../css/BusStop.module.css';

export default function BusStop() {

    const [value, setValue] = useState(0);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue === "" || (!isNaN(inputValue) && Number(inputValue) >= 0)) {
            setValue(inputValue); // อัปเดตค่าใหม่ (รวมถึงกรณีช่องว่าง)
        }
    };

    const handleIncrement = () => {
        setValue((preValue) => (preValue === "" ? 1 : Number(preValue) + 1));
    };

    const handleDecrement = () => {
        if (value > 0) setValue(value - 1)
    };
    return (
        <div >
            <div className="relative h-screen flex flex-col overflow-y-auto">
                <div className="flex  items-center gap-2">
                    <div className="relative">
                        <label htmlFor="Search" className="sr-only"> Search </label>
                        <input
                            type="text"
                            id="Search"
                            placeholder="Search..."
                            className={`${styles.input_search} bg-white  py-2 px-10 border border-gray-400 rounded shadow`}
                        />
                        <span className="absolute inset-y-0 start-0 grid w-12 place-content-center">
                            <button type="button">
                                <span className="sr-only">Search</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00000029" className="size-6">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </span>
                    </div>
                    <div>
                        <button className={`${styles.btn_filter}`}>
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00000029" className="size-6">
                                    <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
                <div className='mt-10'>
                    <span className={styles.stop_point}>Stopping Point</span>
                </div>
                <div className={styles.input_text_stp}>
                    <input
                        type="text"
                        placeholder="Enter Stopping Point"
                        className={styles.input_stp}
                    />
                </div>
                <div className="flex flex-col items-start space-y-1 mt-8">
                    <span className={styles.number}>Number of cars (Up to 4)</span>
                    <div className="flex items-center">
                        <input
                            className={`${styles.number_input} mt-2 text-center`}
                            value={value}
                            onChange={handleInputChange}
                            min="0" 
                        />
                        <div className={`${styles.number_btn} p-1 mt-2 flex flex-col items-center`}>
                            <button
                                onClick={handleIncrement}
                                className="disabled:opacity-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={handleDecrement}
                               className="disabled:opacity-50"
                                disabled={value <= 0}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <span className={styles.busStop}>Bus Stop</span>
                </div>
                <div className={styles.input_text_busStop}>
                    <input
                        type="text"
                        placeholder="Bus Stop Station 1"
                        className={styles.input_busStop}
                    />
                </div>
                <div className='mt-3 flex items-center'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#007BFF" className="size-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className={`${styles.text_add} ml-2`}>
                        <span>Add other bus stop</span>
                    </div>
                </div>

                {/* <div className="mt-7">
                    <span>Students</span>
                </div> */}
                {/* <div className="flex items-center border p-2 rounded mt-1">
                    <input
                        type="text"
                        placeholder="Students Number 1"
                        className="flex-grow outline-none" />
                </div> */}
            </div>

            <div className="sticky bottom-3 left-0 right-0 shadow-md">
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition">
                    View route directions
                </button>
            </div>

        </div>

    );
}