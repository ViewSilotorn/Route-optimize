"use client"
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from '../css/nav.module.css';
import style from '../css/side.module.css';
import stEdit from '../css/edit.module.css';
import stAddList from '../css/addListStudent.module.css'
import St from '../css/student.module.css';
import Link from 'next/link';
import HomeToSchools from "./HomeToSchools";
import BusStop from "./BusStop";
import Route from "./Route";
import { getAuth } from "firebase/auth";
import ModalDelete from "./ModalDelete";
import app from "../../config";
import HandleDelete from "../services/HandleDelete";

export default function Sidebar({ selectedMenu }) {
    const [students, setStudents] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [error, setError] = useState(null);
    const [addStudent, setAddStudent] = useState(false);
    const [addListStudent, setAddListStudent] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isEdit, setisEdit] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const openModalDelete = (id) => {
        setSelectedUserId(id);
        setIsModalDeleteOpen(true);
      };
    
      const closeModalDelete = () => {
        setIsModalDeleteOpen(false);
        setSelectedUserId(null);
      };
    
      const confirmDelete = async () => {
        if (selectedUserId !== null) {
          await HandleDelete(selectedUserId);
          setStudents((prevStudents) => prevStudents.filter((student) => student.id !== selectedUserId));
          closeModalDelete();
        }
      };
    // Calculate total pages
    const totalPages = Math.ceil(students.length / itemsPerPage);

    // Get current page's students
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const Students = students.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    //ปุ่มเปิด-ปิด sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen); //เปลี่ยนสถานะเมื่อกดปุ่ม
    }

    //button popup add student
    const toggleAddStudent = () => {
        setAddStudent(!addStudent);
    }

    //button popup add list student
    const toggleAddListStudent = () => {
        setAddListStudent(true);
    }

    const toggleEditPage = () => {
        setisEdit(true)
    }

    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectedAll(isChecked);
        if (isChecked) {
            setSelectedRows(Students.map((student) => student.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowSelect = (id) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((rowId) => rowId !== id)
                : [...prevSelected, id]
        );
    };

    // // ลบแถวที่เลือก
    // const deleteUser = async (id) => {
    //     await HandleDelete(id)
    //         setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id))
    // };

    // // แก้ไขข้อมูลที่เลือก
    // const handleEdit = () => {
    //     alert("Edit selected rows: " + selectedRows.join(", "));
    // };

    useEffect(() => {
        //functionดึงข้อมูลจากAPI
        const fetchDataStudent = async () => {
            try {
                // กำหนด Token ที่จะส่งใน header
                const auth = getAuth();
                const user = auth.currentUser;

                if (!user) throw new Error("User is not logged in");

                const idToken = await user.getIdToken();
                console.log("JWT Token:", idToken);

                const res = await fetch(`http://192.168.3.124:8080/api/students`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'application/json',
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
            } 
        };

        fetchDataStudent();
    }, []);

    //show on sidebar
    const getMenuContent = (menu) => {
        switch (menu) {
            case 'Route':
                return (
                    <Route />
                );
            case 'Home To Schools':
                return (
                    <HomeToSchools />
                );
            case 'Bus Stop To Schools':
                return (
                    <BusStop />
                );
            case 'Students':
                return (
                    <div className="overflow-x-auto">
                        <header className="bg-white">
                            <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                                <div className="flex flex-col gap-28 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h1 className={St.text}>Students</h1>

                                        <p className={`${St.p} mt-1.5`}>
                                            This page provides a detailed list of all students in your account.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="relative">
                                            <label htmlFor="Search" className="sr-only"> Search </label>
                                            <input
                                                type="text"
                                                id="Search"
                                                placeholder="Search..."
                                                className={`${St.input_search} bg-white  py-2 px-10 border border-gray-400 rounded shadow`}
                                            />
                                            <span className="absolute inset-y-0 start-0 grid w-12 place-content-center">
                                                <button type="button">
                                                    <span className="sr-only">Search</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </span>
                                        </div>
                                        <div>
                                            {/* <button className={`${St.btn_filter} bg-white py-2 px-5 border border-gray-400 rounded shadow`}>
                                                <div className="flex justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#707070" className="size-6">
                                                        <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                                    </svg>
                                                    <div className="mt-1 ml-2">
                                                        Filter
                                                    </div>
                                                </div>
                                            </button> */}
                                            <div className="relative">

                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#707070" className="absolute top-1/2 -translate-y-1/2 left-2 z-50 size-6">
                                                    <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                                </svg>

                                                <select id="Offer"
                                                    className={`${St.btn_filter} pl-9 block w-full px-5 appearance-none`}>
                                                    <option value="">Filter by</option>
                                                    <option value="">By First name</option>
                                                    <option value="">By Last name</option>
                                                    <option value="">By Age</option>
                                                    <option value="">By Home address</option>
                                                    <option value="">By Latitude</option>
                                                    <option value="">By Longitude</option>
                                                </select>
                                                <svg className="absolute top-1/2 -translate-y-1/3 right-1 z-50" width="16" height="16"
                                                    viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609" stroke="#111827" strokeWidth="1.6"
                                                        strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => toggleAddStudent()} className={St.btn_add}>
                                                Add Student
                                            </button>


                                        </div>
                                        <div >
                                            <button onClick={() => toggleAddListStudent()} className={St.btn_addList}>
                                                Add a List of Student
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div className="overflow-x-auto">
                            <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                                {/* Dropdown เมื่อเลือก Checkbox */}
                                {selectedRows.length > 0 && (
                                    <div className="fixed top-52 left-10 z-10 bg-white border border-gray-300 rounded shadow-md p-4">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
                                                onClick={handleEdit}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                </svg>
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                className="flex items-center space-x-2 text-red-500 hover:text-red-700"
                                                onClick={HandleDelete}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" />
                                                </svg>
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <table className="min-w-full divide-y-2 divide-gray-200 bg-white">
                                    <thead className={`${St.Header} ltr:text-left rtl:text-right`}>
                                        <tr>
                                            <th className="sticky inset-y-0 start-0 bg-white px-4 py-2">
                                                <label htmlFor="SelectAll" className="sr-only">Select All</label>

                                                <input type="checkbox" id="SelectAll" className="size-5 mt-1.5 rounded border-gray-300" onChange={handleSelectAll} checked={selectedAll} />
                                            </th>
                                            <th className={`${St.Header_FN} whitespace-nowrap px-4 py-2`}>Firstname</th>
                                            <th className={`${St.Header_LN} whitespace-nowrap px-4 py-2`}>Lastname</th>
                                            <th className={`${St.Header_Age} whitespace-nowrap px-4 py-2`}>Age</th>
                                            <th className={`${St.Header_GD} whitespace-nowrap px-4 py-2`}>Gender</th>
                                            <th className={`${St.Header_HAdress} whitespace-nowrap px-4 py-2`}>Home Address</th>
                                            <th className={`${St.Header_Lat} whitespace-nowrap px-4 py-2`}>Latitude</th>
                                            <th className={`${St.Header_Lng} whitespace-nowrap px-4 py-2`}>Longitude</th>
                                            <th className={`${St.Header_Status} whitespace-nowrap px-4 py-2`}>Status</th>
                                            <th className="whitespace-nowrap px-4 py-2 text-gray-900">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className={`${St.text_Student} divide-y divide-gray-200`}>
                                        {Students.map((student) => (
                                            <tr key={student.id}>
                                                <th className="sticky inset-y-0 start-0 bg-white px-4 py-2">
                                                    <label htmlFor="SelectAll" className="sr-only">Select All</label>

                                                    <input type="checkbox" id="SelectAll" className="size-5 mt-1.5 rounded border-gray-300" checked={selectedRows.includes(student.id)} onChange={() => handleRowSelect(student.id)} />
                                                </th>
                                                <td className="whitespace-nowrap px-4 py-2">{student.first_name} </td>
                                                <td className="whitespace-nowrap px-4 py-2">{student.last_name}</td>
                                                <td className={`${St.detail_Age} whitespace-nowrap px-4 py-2`}>{student.age}</td>
                                                <td className="whitespace-nowrap px-4 py-2">{student.gender}</td>
                                                <td className="whitespace-nowrap px-4 py-2">{student.address}</td>
                                                <td className={`${St.detail_Lat} whitespace-nowrap px-4 py-2`}>{student.latitude}</td>
                                                <td className={`${St.detail_Lng} whitespace-nowrap px-4 py-2`}>{student.longitude}</td>
                                                <td className={`${St.detail_status} whitespace-nowrap px-4 py-2`}>{student.status}</td>
                                                <td className="whitespace-nowrap px-4 py-2">
                                                    <div className="flex space-x-3 ml-5">
                                                        <button onClick={toggleEditPage}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#007BFF" className="size-6">
                                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                            </svg>
                                                        </button>
                                                        <button onClick={() => openModalDelete(student.id)} >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc2626" className="size-6">
                                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* button page change */}
                        <ol className="flex justify-end gap-1 text-xs font-medium mt-10">
                            <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className={`${St.text_showing} px-10`}>
                                        Showing
                                        <span className="px-2">{currentPage}</span>
                                        to
                                        <span className="px-2">{totalPages}</span>
                                    </p>
                                </div>
                            </div>
                            <li>
                                <button
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
                                </button>
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
                                <button
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
                                </button>
                            </li>
                        </ol>
                    </div>
                );
        }
    }

    return (
        <div className="relative">
            <div className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                } w-auto`}>
                {/* <div className="overflow-y-scroll ml-5 mt-28 mr-5"> */}
                <div className="ml-5 mt-20 mr-5 ">
                    <div>
                        {getMenuContent(selectedMenu)}
                    </div>
                    <div>
                    </div>
                </div>
            </div>

            <button
                onClick={toggleSidebar}
                className={`fixed top-1/2 -translate-y-1/2 left-0 z-50 bg-white border border-gray-300 shadow-md p-3 rounded-full transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-0"
                    }`}
            >
                {isOpen ? (
                    <FaChevronLeft className="text-gray-700" />) : (
                    <FaChevronRight />
                )}
            </button>

            {addStudent && (
                <div className={`${styles.root_login}`}>
                    <main className={style.card}>
                        <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-8 lg:py-12">
                            <Link href="" onClick={() => setAddStudent(false)} className={style.link}>
                                <div className='flex px-10'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                    <div className='ml-2'>
                                        Back to Student
                                    </div>
                                </div>
                            </Link>
                            <div className="py-10 px-24">
                                <h2 className={style.title}>
                                    Add Student
                                </h2>
                                <div className={style.p}>
                                    Fill out the form below to add a new student to the system.
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-center"
                            >
                                <form action="#" className="grid grid-cols-6 gap-6">
                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="FirstName" >
                                            First Name
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="FirstName"
                                                name="first_name"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="FirstName" >
                                            Last Name
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="LastName"
                                                name="LastName"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="Age" >
                                            Age
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="Age"
                                                name="Age"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="Gender" >
                                            Gender
                                        </label>
                                        <select id="countries" className={`${style.select} block`}>
                                            <option value="">Select gender</option>
                                            <option value="">male</option>
                                            <option value="">Female</option>
                                        </select>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="HomeAddress" >
                                            Home Address
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="HomeAddress"
                                                name="HomeAddress"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="Status" >
                                            Status
                                        </label>
                                        <select id="countries" className={`${style.select} block`}>
                                            <option value="">Select status</option>
                                            <option value="">1</option>
                                            <option value="">2</option>
                                        </select>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="Latitude" >
                                            Latitude
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="Latitude"
                                                name="Latitude"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="Longitude" >
                                            Longitude
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="Longitude"
                                                name="Longitude"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-6 justify-end sm:flex sm:items-center sm:gap-4">
                                        <button
                                            className={style.btn_add}
                                        >
                                            Add Student
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main >
                </div>
            )}

            {addListStudent && (
                <div className={styles.root_login}>
                    <main className={stAddList.card}>
                        <div className="mt-5">
                            <Link href="" onClick={() => setAddListStudent(false)} className={style.link}>
                                <div className='flex px-10 py-4 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                    <div className='ml-2'>
                                        Back to Student
                                    </div>
                                </div>
                            </Link>
                            <div className="py-5 px-24">
                                <h2 className={stAddList.title}>
                                    Add List of Student
                                </h2>
                                <div className={stAddList.p}>
                                    Easily add student details to assign routes and manage pickup schedules.
                                </div>
                            </div>
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                            </div>

                            <div className={stAddList.card_input}>
                                <div className={stAddList.input_file}>
                                    <label htmlFor="dropzone-file" >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {/* <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#265CB3" className={stAddList.icon}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                            </svg>

                                            <p className={stAddList.text_file}>Drag and drop file here</p>
                                            <div className={stAddList.text_filesup}>
                                                <p>
                                                    <span >Files supported: XLS,XLSX,CSV</span>
                                                </p>
                                                <p>Size limit: 1 MB</p>
                                            </div>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-4 mt-10">
                            <button className={stAddList.btn_add}>Add Student</button>
                            <button className={stAddList.btn_cancel} onClick={() => setAddListStudent(false)}>Cancel</button>
                        </div>
                    </main >
                </div>
            )}

            <ModalDelete isOpen={isModalDeleteOpen} onClose={closeModalDelete} onConfirm={confirmDelete}>
            </ModalDelete>

            {isEdit && (
                <div className={`${styles.root_login}`}>
                    <main className={style.card}>
                        <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-8 lg:py-12">
                            <Link href="" onClick={() => setisEdit(false)} className={style.link}>
                                <div className='flex px-10'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                    <div className='ml-2'>
                                        Back to Student
                                    </div>
                                </div>
                            </Link>
                            <div className="py-10 px-24">
                                <h2 className={style.title}>
                                   Edit
                                </h2>
                                <div className={style.p}>
                                    Edit the student's details, including name and home address
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-center"
                            >
                                <form action="#" className="grid grid-cols-6 gap-6">
                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="FirstName" >
                                            First Name
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="FirstName"
                                                name="first_name"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="FirstName" >
                                            Last Name
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="LastName"
                                                name="LastName"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="Age" >
                                            Age
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="Age"
                                                name="Age"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="Gender" >
                                            Gender
                                        </label>
                                        <select id="countries" className={`${style.select} block`}>
                                            <option selected>Select gender</option>
                                            <option value="">male</option>
                                            <option value="">Female</option>
                                        </select>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="HomeAddress" >
                                            Home Address
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="HomeAddress"
                                                name="HomeAddress"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="Status" >
                                            Status
                                        </label>
                                        <select id="countries" className={`${style.select} block`}>
                                            <option value="">Select status</option>
                                            <option value="">1</option>
                                            <option value="">2</option>
                                        </select>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="Latitude" >
                                            Latitude
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="Latitude"
                                                name="Latitude"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className={`${style.text_email} col-span-6 sm:col-span-3`}>
                                        <label htmlFor="Longitude" >
                                            Longitude
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                type="text"
                                                id="Longitude"
                                                name="Longitude"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-6 justify-end sm:flex sm:items-center sm:gap-4">
                                        <button
                                            className={style.btn_add}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main >
                </div>
            )}
        </div >
    );
}
