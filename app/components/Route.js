import { useEffect, useState } from 'react';
import styles from '../css/route.module.css';
import { getAuth } from "firebase/auth";

export default function Route() {
    const [Trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true); //สถานะการ load
    const [error, setError] = useState(null);
    useEffect(() => {
        //functionดึงข้อมูลจากAPI
        const fetchDataTrips = async () => {
            try {
                // กำหนด Token ที่จะส่งใน header
                const auth = getAuth();
                const user = auth.currentUser;

                if (!user) throw new Error("User is not logged in");

                const idToken = await user.getIdToken();
                console.log("JWT Token:", idToken);

                const res = await fetch('http://192.168.3.246:8080/api/trips', {
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
                setTrips(data);  // อัพเดตข้อมูลที่ดึงมา
            } catch (error) {
                setError(error.message);  // จับ error และแสดง
            } finally {
                setLoading(false);  // ปิดสถานะ loading
            }
        };

        fetchDataTrips();
    }, []);

    return (
        <div>
            <div className="relative h-screen flex flex-col overflow-y-scroll">
                <div className="flex  items-center gap-2">
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

                {Trips && Trips.map((Trip) => 
                    <div  key={Trip.id} className={`${styles.card} flex-col flex w-full p-4 max-w-sm sm:max-w-md lg:max-w-lg rounded-lg bg-white shadow-sm border border-slate-200 my-3 hover:bg-gray-100`}>
                        <div className="flex items-center gap-4 text-slate-800">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                            </svg> */}

                            <div className="flex w-full flex-col">
                                <div className="flex items-center justify-between">
                                    <h5 className="">
                                        {Trip.dataTime}
                                    </h5>
                                </div>
                                <p className="text-xs uppercase font-bold text-slate-500 mt-0.5">
                                    {Trip.types}                                                                                                                                                            
                                </p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}