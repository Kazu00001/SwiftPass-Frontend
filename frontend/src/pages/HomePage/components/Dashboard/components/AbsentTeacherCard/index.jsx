import Styles from './AbsentTeacherCard.module.css';
import { useState } from 'react';
import { TEACHERS } from '../PendingRequestsCard/Teachers.js';
import TeacherEventCard from '../TeacherEventCard';

export default function AbsentTeacherCard() {

const [activeTab, setActiveTab] = useState('Todos');

return (
    <div className={Styles['absent_teacher_card']}>
        <section className={Styles['absent_teacher_header']}>
            <h2 className={Styles['absent_teacher_title']}>Profesores Ausentes</h2>

        </section>
        <section className={Styles['absent_teacher_body']}>
            {
                TEACHERS.map(teacher => (
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