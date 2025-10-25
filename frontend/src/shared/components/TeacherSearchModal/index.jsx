import React from 'react';
import Styles from './TeacherSearchModal.module.css';
import DefaultSearchImage from './components/DefaultSearchImage';
import TeacherResultBox from './components/TeacherResultBox';
import TEACHERS from './Teachers';

const TeacherSearchModal = ({ isOpen, onClose }) => {
    return (
        <section className={`${Styles['modal']} ${!isOpen ? Styles['modal_close'] : ''}`}>
            <div className={`${Styles['modal_container']} ${!isOpen ? Styles['modal_container_close'] : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className={Styles['modal_content']}>
                    <div className={Styles['modal_header']}>
                        <h2>Buscar Profesor</h2>
                        <button className={Styles['close_button']} onClick={onClose}>&times;</button>
                    </div>

                    <div className={Styles['search-bar_container']}>
                        <input type="text" placeholder="Search..." className={Styles['search-input']} />
                    </div>

                    <div className={Styles['modal_results']}>
                        {TEACHERS.length > 100 ? (
                            TEACHERS.map((teacher) => (
                                <TeacherResultBox key={teacher.id} teacher={teacher} />
                            ))
                        ) : (
                            <DefaultSearchImage />
                        )}
                    </div>
                </div>
            </div>

            <div className={`${Styles['modal_overlay']} ${!isOpen ? Styles['modal_overlay_close'] : ''}`} onClick={onClose}></div>
        </section>
    );
};

export default TeacherSearchModal;