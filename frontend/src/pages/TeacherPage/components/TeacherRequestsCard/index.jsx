import Styles from './PendingRequestsCard.module.css';
import { useState, useEffect } from 'react';
import { fetchTeachers } from './Teachers.js';
import TeacherEventCard from '../TeacherEventCard';
import EmptyBox from '../EmptyBox/index.jsx';
import PendingRequestsSkeleton from '../PendingRequestsSkeleton/index.jsx';

export default function TeacherRequestsCard() {
    const [activeTab, setActiveTab] = useState(['Todos', 0]);
    const [isReversed, setIsReversed] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            setIsLoading(true);
            try {
                const t = await fetchTeachers();
                if (!mounted) return;
                setTeachers(Array.isArray(t) ? t : []);
            } catch (err) {
                console.error('TeacherRequestsCard: failed to load teachers', err);
                if (mounted) setTeachers([]);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };
        load();
        return () => {
            mounted = false;
        };
    }, []);


    const filteredTeachers = () => {
        let filtered = teachers || [];
        if (activeTab[0] === 'Justificaciones') {
            filtered = filtered.filter((teacher) => teacher.status === 1);
        } else if (activeTab[0] === 'Permisos') {
            filtered = filtered.filter((teacher) => teacher.status === 2);
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

        {
        isLoading ? (
            <PendingRequestsSkeleton />
        ) : (
            <section className={Styles['pending_requests_body']}>
            {
                // compute once and guard against undefined
                (() => {
                    const list = filteredTeachers() || [];
                    if (!Array.isArray(list) || list.length === 0) return <EmptyBox />;
                    return list.map((teacher) => (
                        <TeacherEventCard
                            key={teacher.id}
                            name={teacher.name}
                            photo={teacher.photo}
                            status={teacher.status}
                            time={teacher.time}
                        />
                    ));
                })()
            }
            </section>
        )
        }
        </div>
    );
}