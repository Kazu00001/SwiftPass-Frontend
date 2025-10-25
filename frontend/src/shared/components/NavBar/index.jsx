import React from 'react';
import Styles from './NavBar.module.css';
import TeacherSearchModal from '../TeacherSearchModal';

const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleSearchClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <header className={Styles['navbar_container']}>
                <h3>Swift Pass</h3>
                <nav className={Styles['navbar_links']}>
                    <ul>
                        <li><a href="#search" onClick={handleSearchClick}>Búsqueda</a></li>
                        <li><a href="#reports">Reportes</a></li>
                        <li><a href="#calendar">Calendario</a></li>
                    </ul>
                </nav>
            </header>
            <TeacherSearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default NavBar;