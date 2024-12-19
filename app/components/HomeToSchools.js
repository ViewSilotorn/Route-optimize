"use client"
import { useEffect, useState } from "react";
import styles from '../css/HomeToSchools.module.css';

export default function HomeToSchools() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

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

    useEffect(() => {
        //functionดึงข้อมูลจากAPI
        const fetchData = async () => {
            try {
                // กำหนด Token ที่จะส่งใน header
                const token = process.env.NEXT_PUBLIC_TOKEN;  // แทนที่ด้วย token ที่ถูกต้อง

                const res = await fetch('http://localhost:3000/api/students', {
                    method: 'GET',  // วิธีการเรียก API
                    headers: {
                        'Authorization': `Bearer ${token}`,  // ส่ง token ใน header
                    },
                });

                console.log('Response Status:', res.status);

                if (!res.ok) {
                    throw new Error('Failed to fetch students');
                }

                const data = await res.json();
                console.log(data)
                setStudents(data);  // อัพเดตข้อมูลที่ดึงมา
            } catch (error) {
                setError(error.message);  // จับ error และแสดง
            } finally {
                setLoading(false);  // ปิดสถานะ loading
            }
        };

        fetchData();
    }, []);

    return (
        <div >
            <div className="relative  h-screen flex flex-col overflow-y-auto">
                <div className="fixed">

                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <label htmlFor="Search" className="sr-only"> Search </label>
                        <input
                            type="text"
                            id="Search"
                            placeholder="Search..."
                            className={`${styles.input_search} bg-white  py-2 px-10 border border-gray-400 rounded shado`}
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
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white mt-5">
                    <thead className={`${styles.header} ltr:text-left rtl:text-right`}>
                        <tr>
                            <th className="ltr:text-left rtl:text-right whitespace-nowrap px-4 py-2">Firstname</th>
                            <th className="whitespace-nowrap px-4 py-2">Home Address</th>
                        </tr>
                    </thead>

                    <tbody className={`${styles.text_student} divide-y divide-gray-200`}>
                        {currentStudents.map((student) => (
                            <tr key={student.id}>
                                <td className="whitespace-nowrap px-4 py-2 ">{student.first_name} </td>
                                <td className="whitespace-nowrap px-4 py-2 ">{student.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* button next page */}
                <ol className="flex justify-center gap-1 text-xs font-medium mt-10">
                    <li>
                        <a
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Prev Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-7"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index + 1} className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
                            <button
                                onClick={() => handlePageChange(index + 1)}
                                className={`block size-8 rounded border ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'border-gray-100 bg-white text-gray-900'}`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li>
                        <a
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === totalPages}
                        >
                            <span className="sr-only">Next Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-7"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </li>
                </ol>
            </div>

            <div className="sticky bottom-3 left-0 right-0 shadow-md">
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition">
                    View route directions
                </button>
            </div>

        </div>
    );
}