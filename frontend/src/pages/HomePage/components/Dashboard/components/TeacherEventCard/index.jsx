import Styles from './TeacherEventCard.module.css';
import { useState, useEffect } from 'react';

export default function TeacherEventCard({ name, photo, status, time }) {
    const [event, setEvent] = useState("");

    useEffect(() => {
        if (status === 1) setEvent("Justificación");
        if (status === 2) setEvent("Permiso");
        if (status === 4) setEvent("Asistencia"); 
        if (status !== 1 && status !== 2 && status !== 4) setEvent("Ausencia");
    }, [status]);

    return (
        <button className={`${Styles['teacher_event_card']} ${Styles[`teacher_event_${status}`]}`}>
            <div className={Styles['teacher_event_top']}>
                <h4 className={Styles[`teacher_event_status_${status}`]}>{event}</h4>
                <h3 className={Styles['teacher_event_time']}>{time}</h3>
            </div>

            <div className={Styles['teacher_event_photo_container']}>
                <img 
                    src={photo} 
                    alt={name} 
                    className={Styles['teacher_event_photo']} 
                    draggable="false"
                />
            </div>

            <div className={Styles['teacher_event_name_container']}>
                <p className={Styles['teacher_event_name']}>{name}</p>
            </div>
            <hr className={Styles['teacher_event_divider']}/>
        </button>
    );
}