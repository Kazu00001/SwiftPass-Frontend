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
                <h3 className={Styles['navbar_logo']}>Swift Pass</h3>
                <nav className={Styles['navbar_links']}>
                    <button onClick={handleSearchClick} className={Styles['navbar_button']}>Búsqueda</button>
                    <button className={Styles['navbar_button']}>Reportes</button>
                    <button className={Styles['navbar_button']}>Calendario</button>
                </nav>
            </header>
            <TeacherSearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default NavBar;