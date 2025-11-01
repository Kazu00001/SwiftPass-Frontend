import Styles from './PendingRequestsCard.module.css';
import { useState } from 'react';
import { TEACHERS } from '../PendingRequestsCard/Teachers.js';
import TeacherEventCard from '../TeacherEventCard';

export default function PendingRequestsCard() {
    const [activeTab, setActiveTab] = useState(['Todos', 0]);
    const [isReversed, setIsReversed] = useState(false);

    const filteredTeachers = () => {
        let filtered = TEACHERS;
        if (activeTab[0] === 'Justificaciones') {
            filtered = TEACHERS.filter(teacher => teacher.status === 1);
        } else if (activeTab[0] === 'Permisos') {
            filtered = TEACHERS.filter(teacher => teacher.status === 2);
        }
        return isReversed ? filtered.slice().reverse() : filtered;
    };

    return (
        <div className={Styles['pending_requests_card']}>
            <section className={Styles['pending_requests_header']}>
                <h2 className={Styles['pending_requests_title']}>Solicitudes Pendientes</h2>
                <button 
                    className={`${Styles['pending_requests_button']} ${activeTab[0] === 'Todos' ? Styles['pending_requests_button_active'] : ''}`} 
                    onClick={() => setActiveTab(['Todos', 0])}>Todos</button>
                <button 
                    className={`${Styles['pending_requests_button']} ${activeTab[0] === 'Justificaciones' ? Styles['pending_requests_button_active'] : ''}`} 
                    onClick={() => setActiveTab(['Justificaciones', 1])}>Justificaciónes</button>
                <button 
                    className={`${Styles['pending_requests_button']} ${activeTab[0] === 'Permisos' ? Styles['pending_requests_button_active'] : ''}`} 
                    onClick={() => setActiveTab(['Permisos', 2])}>Permisos</button>
                <button 
                    className={Styles['pending_requests_button']} 
                    onClick={() => setIsReversed(!isReversed)}>
                    {isReversed ? 'Mostrar Original' : 'Invertir Lista'}
                </button>
            </section>
            <section className={Styles['pending_requests_body']}>
                {
                    filteredTeachers().map(teacher => (
                        <TeacherEventCard 
                            key={teacher.id} 
                            name={teacher.name} 
                            photo={teacher.photo} 
                            status={teacher.status}
                            time={teacher.time} 
                        />
                    ))
                }
            </section>
        </div>
    );
}