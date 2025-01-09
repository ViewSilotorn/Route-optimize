"use client"
import { useEffect, useState } from "react";
import styles from '../css/HomeToSchools.module.css';
import { getAuth } from "firebase/auth";

export default function HomeToSchools() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page
    // const [query, setQuery] = useState("");


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
    // const handleSearch = async () => {
    //     if (!query.trim()) return;

    //     setLoading(true);
    //     try {
    //         const response = await fetch(`'http://192.168.3.246:8080/api/students/search?query=${query}`);
    //         const data = await response.json();

    //         if (response.ok) {
    //             setStudents(data);
    //         } else {
    //             console.error("Error:", data.error);
    //             setStudents([]);
    //         }
    //     } catch (error) {
    //         console.error("Failed to fetch search results:", error);
    //         setStudents([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // Calculate total pages
    const totalPages = Math.ceil(students.length / itemsPerPage);

    // Get current page's students
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentStudents = students.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const [currentPageHome, setCurrentPageHome] = useState('Home To Schools');
    // useEffect(() => {
    //     //functionดึงข้อมูลจากAPI
    //     const fetchData = async () => {
    //         try {
    //             // กำหนด Token ที่จะส่งใน header
    //             const auth = getAuth();
    //             const user = auth.currentUser;

    //             if (!user) throw new Error("User is not logged in");

    //             const idToken = await user.getIdToken();
    //             console.log("JWT Token:", idToken);

    //             const res = await fetch('http://192.168.3.246:8080/api/students', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': `Bearer ${idToken}`,
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             console.log('Response Status:', res.status);

    //             if (!res.ok) {
    //                 throw new Error('Failed to fetch students');
    //             }

    //             const data = await res.json();
    //             console.log(data)
    //             setStudents(data);  // อัพเดตข้อมูลที่ดึงมา

    //         } catch (error) {
    //             setError(error.message);  // จับ error และแสดง
    //         } finally {
    //             setLoading(false);  // ปิดสถานะ loading
    //         }
    //     };

    //     fetchData();
    // }, []);

    // return (
    //   <div className="h-screen flex flex-col">
    //     {/* Top Section: Search Bar */}
    //     <div className="flex-none bg-white p-4 shadow-md">
    //       <div className="flex items-center space-x-2">
    //         <input
    //           type="text"
    //           placeholder="Search..."
    //           className="flex-grow border border-gray-300 rounded-md p-2"
    //         />
    //         <button className="p-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth={1.5}
    //             stroke="currentColor"
    //             className="w-5 h-5 text-gray-600"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M3.75 3.75h16.5v16.5H3.75V3.75z"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //     </div>

    //     {/* Middle Section: Scrollable List */}
    //     <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
    //       <table className="w-full table-auto border-collapse">
    //         <thead>
    //           <tr>
    //             <th className="border-b py-2 text-left font-medium">Firstname</th>
    //             <th className="border-b py-2 text-left font-medium">Home Address</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {Array.from({ length: 20 }).map((_, index) => (
    //             <tr key={index}>
    //               <td className="border-b py-2">John {index + 1}</td>
    //               <td className="border-b py-2">123 Main St, City {index + 1}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>

    //     {/* Bottom Section: Fixed Button */}
    //     <div className="flex-none bg-white p-4 shadow-md">
    //       <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
    //         View route directions
    //       </button>
    //     </div>
    //   </div>
    // );
    const Data = [
        { id: 1, name: "John Doe", address: "123 Main St, Springfield" },
        { id: 2, name: "Jane Smith", address: "456 Elm St, Rivertown" },
        { id: 3, name: "Alice Johnson", address: "789 Oak Ave, Lakeview" },
        { id: 4, name: "Bob Brown", address: "321 Maple St, Cedarville" },
        { id: 5, name: "Carol White", address: "654 Pine Rd, Greenwood" },
        { id: 6, name: "David Black", address: "987 Birch Ln, Oakwood" },
        { id: 7, name: "Emma Green", address: "111 Ash Ct, Willowtown" },
        { id: 8, name: "Frank Gray", address: "222 Cherry Dr, Riverbend" },
        { id: 9, name: "Grace Blue", address: "333 Walnut St, Meadowlake" },
        { id: 10, name: "Henry Yellow", address: "444 Poplar Ave, Sunnyvale" },
    ]

    return (
        <div >
            {currentPageHome === 'Home To Schools' && (
                <div>
                    <div className="relative h-screen flex flex-col overflow-y-scroll">
                        <div className="flex flex-col items-start space-y-1 ">
                            <span className={styles.text_date}>Tuesday, January 2025</span>
                            <div className="flex items-center">
                                {/*                                 
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
                                </div> */}
                                <form className="max-w-sm mx-auto mt-3">
                                    <label htmlFor="number-input" className={`${styles.number} block`}>Number of cars:</label>
                                    <input type="number" id="number-input" min="0" className={`${styles.number_input} mt-2 `} required />
                                </form>
                            </div>
                        </div>
                        <div className="mt-5">
                            <span className={styles.text_student}>Students</span>
                        </div>
                        <div className="flex mt-2 mb-3 items-center gap-2">
                            <div className="relative">
                                <label htmlFor="Search" className="sr-only"> Search </label>
                                <input
                                    type="text"
                                    id="Search"
                                    placeholder="Name or ID"
                                    className={`${styles.input_search} bg-white  py-2 px-10 border border-gray-400 rounded shado`}
                                />
                                <span className="absolute inset-y-0 start-0 grid w-12 place-content-center">
                                    <button type="button">
                                        <span className="sr-only">Search</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00000029" className="size-6 b">
                                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                            {/* <div>
                                <button className={`${styles.btn_filter}`}>
                                    <div className="flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00000029" className="size-6">
                                            <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </button>
                            </div> */}
                        </div>

                        {Data.map((item) => (
                            <div key={item.id} className={`${styles.card} flex w-full my-1 p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200 hover:bg-gray-100`}>
                                <div className="flex items-center gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#265CB3" className="size-10">
                                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                    </svg>

                                    <div className="flex w-full flex-col">
                                        <div className="flex items-center justify-between">
                                            <h5 className={styles.text_name}>
                                                {item.name}
                                            </h5>
                                        </div>
                                        <p className={styles.text_adress}>
                                            {item.address}
                                        </p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-5 sticky bottom-0 left-0 right-0 flex justify-center ">
                        <button className={`${styles.btn} w-full justify-center`} onClick={() => setCurrentPageHome('Routes')}>
                            Optimize Route
                        </button>
                    </div>

                </div>
            )}

            {currentPageHome === 'Routes' && (
                <div>
                    <div className="flex items-center p-2 space-x-48">
                        <svg onClick={() => setCurrentPageHome('Home To Schools')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>

                        <h1 className={`${styles.title} `}>Routes</h1>
                    </div>
                    <hr></hr>
                    <div className={`${styles.card1} flex w-full p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200 my-6 hover:bg-gray-100`} onClick={() => setCurrentPageHome('RoutesNumber')}>
                        <div className="flex items-center gap-4 py-2">
                            <div className="flex w-full flex-col">
                                <div className="flex items-center">
                                    <div className={`w-10 h-10 bg-orange-300 rounded`}></div>
                                    <h5 className={`${styles.text_card} px-5`}>
                                        Routes1
                                    </h5>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            )}

            {currentPageHome === 'RoutesNumber' && (
                <div>
                    <div className="flex items-center p-2 space-x-36">
                        <svg onClick={() => setCurrentPageHome('Routes')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        <div className="flex items-center p-2 space-x-2">
                            <div className={`w-8 h-8 bg-orange-300 rounded`}></div>
                            <h1 className={`${styles.title}`}>Routes</h1>
                        </div>
                    </div>
                    <hr className="mb-5"></hr>
                    {Data.map((item) => (
                        <div key={item.id} className={`${styles.card} flex w-full my-2 p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200 hover:bg-gray-100`}>
                            <div className="flex items-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="#265CB3" className="size-10">
                                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                </svg>

                                <div className="flex w-full flex-col">
                                    <div className="flex items-center justify-between">
                                        <h5 className={styles.text_name}>
                                            {item.name}
                                        </h5>
                                    </div>
                                    <p className={styles.text_adress}>
                                        {item.address}
                                    </p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}