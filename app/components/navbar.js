'use client'
import Link from 'next/link';
import Form from 'next/form';
import styles from '../css/nav.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import popup from '../css/success.module.css';
import style from '../css/forgotpass.module.css';
import Image from 'next/image';
import Logo from '../Image/LogoHeader.png'
import Modal from "../components/Modal";

export default function Navbar({ onSelectMenu }) {
    const menus = [
        { name: 'Route', href: '/Route' },
        { name: 'Home To Schools', href: '/Home To Schools' },
        { name: 'Bus Stop To Schools', href: '/Bus Stop To Schools' },
        { name: 'Students', href: '/Students' }
    ];
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupReset, setShowPopupReset] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const handleResetSubmit = () => {
        // e.preventDefault();
        setShowPopupReset(false);
        setShowPopup(true);
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const toggleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    return (
        <header className={styles.navbar}>
            <div className="mx-auto flex h-16 max-w-screen items-center gap-8 px-4 sm:px-6 lg:px-8">
                <a className="block text-teal-600" href="#">
                    <span className="sr-only">Home</span>
                    <Image
                        src={Logo}
                        width={100}
                        height={100}
                        alt="Picture of the author"
                    />
                </a>
                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            {menus.map((menu, index) => (
                                <div key={index} className="flex space-x-6 ml-5">
                                    <Link href={menu.href} onClick={(e) => { e.preventDefault(); onSelectMenu(menu.name) }} className={styles.text}>{menu.name}</Link>
                                </div>
                            ))}
                        </ul>
                    </nav>

                    <button
                        onClick={toggleMenu}
                        className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                    >
                        <span className="sr-only">Toggle menu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <button onClick={toggleDropdown} className='flex justify-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#00000029" className="size-10">
                                    <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* dropdown profile */}
            {isOpen && (
                <div className='absolute right-1 mt-2 w-64 h-56 bg-white border rounded shadow-lg'>
                    <div className='py-1 flex flex-col items-center justify-center p-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#00000029" className="size-20">
                            <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z" clipRule="evenodd" />
                        </svg>
                        <div className='mt-2'>
                            name
                        </div>
                        <div className='mt-2'>
                            email@gmail.com
                        </div>
                        <ul className='mt-2'>
                            <li onClick={() => setShowPopupReset(true)} className='flex mr-7'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#707070" className="size-5 mr-2">
                                <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                            </svg>
                                <span>Reset password</span> </li>
                            <li onClick={() => router.push('/')} className='flex mr-7 mt-1'><svg className="size-5 mr-2 mt-0.5" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" >  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>Log out</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Popup Reset */}
            {showPopupReset && (
                <div className={`${styles.root_login} fixed inset-0  bg-black bg-opacity-50 z-50`}>
                    <main className={style.card}>
                        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className={style.title}>
                                    Reset password
                                </h2>
                                <div className={style.p}>
                                    Reset password with your email
                                </div>
                            </div>
                            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                                <Form action="#" className="space-y-6">
                                    <div className={style.text_email}>
                                        <label htmlFor="email">
                                            Email
                                        </label>
                                        <div className={style.input_placeholder_email}>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                required
                                                autoComplete="email"
                                                className={style.input_email}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={openModal} className={style.btn}>Submit</button>
                                    </div>
                                </Form>
                                <Modal isOpen={isModalOpen} onClose={closeModal}>
                                </Modal>
                                <div className='mt-24'>
                                    <Link href="#" onClick={() => setShowPopupReset(false)} className={styles.link}>
                                        <div className='flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                            </svg>
                                            <div className='ml-2'>
                                                Back to log in
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main >
                </div>
            )}

            {/* mobile-menu-navbar */}
            <div
                className={`sm:hidden transform transition-all duration-300 ${isOpenMenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                id="mobile-menu"
            >
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {menus.map((menu, index) => (
                        <div
                            key={index}
                            className="text-gray-700 hover:bg-gray-200 rounded px-4 py-2 transition"
                        >
                            <Link
                                href={menu.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSelectMenu(menu.name);
                                    setIsOpenMenu(false); // ปิดเมนูเมื่อเลือกแล้ว
                                }}
                                className={styles.text}
                            >
                                {menu.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    )
}

