import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Map from '../components/Map';
import { useState } from 'react';

const Layout = () => {
    const [selectedMenu, setSelectedMenu] = useState('Route');

    const handleSelectMenu = (menuName) => {
        setSelectedMenu(menuName);
    };
    return (
        <div>
            <div >
                <div >
                    <Navbar onSelectMenu={handleSelectMenu} />
                </div>
                <Map />
                <div >
                    <Sidebar selectedMenu={selectedMenu} />
                </div>
            </div>
        </div>
    );
};

export default Layout;