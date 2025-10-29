import Styles from './TeacherProfileModal.module.css';
import TeacherSchedule from './components/TeacherSchedule';
import { useState } from 'react';

export default function TeacherProfileModal({ teacher, isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeCase, setActiveCase] = useState(1);

  return (
    <div className={Styles['modal_overlay']}>
      <div className={Styles['modal_container']}>

        <TeacherProfileHeader teacher={teacher} onClose={onClose} activeCase={activeCase} />

        <div className={Styles['teacher_profile_container']}>
          {activeCase === 1 && <TeacherCase1 schedule={teacher.schedule} />}
          {activeCase === 2 && <TeacherCase2 schedule={teacher.schedule} />}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   ° Subcomponente: TeacherProfileHeader
   - Muestra la foto, nombre y correo del profesor.
   - Incluye el botón de cierre del modal.
-------------------------------------------------------- */
function TeacherProfileHeader({ teacher, onClose, activeCase }) {
  return (
    <div className={Styles['modal_header']}>
      <div className={Styles[activeCase === 1 ? 'teacher_info_container_case1' : 'teacher_info_container']}>
        <div className={Styles[activeCase === 1 ? 'teacher_photo_container_case1' : 'teacher_photo_container']}>
          <img
            src={teacher.photo}
            alt={`${teacher.name}'s photo`}
            className={Styles['teacher_photo']}
            draggable="false"
          />
        </div>
        <div className={Styles[activeCase === 1 ? 'teacher_details_container_case1' : 'teacher_details_container']}>
          <h2 className={Styles['teacher_name']}>{teacher.name}</h2>
          <p className={Styles['teacher_email']}>Email: {teacher.email}</p>
        </div>
      </div>
      <button
        className={Styles['modal_close_button']}
        onClick={onClose}
        aria-label="Cerrar modal"
      >
        ✕
      </button>
    </div>
  );
}

/* -------------------------------------------------------
   ° Subcomponente: TeacherCase1
   - Contenedor que renderiza el horario del profesor.
-------------------------------------------------------- */
function TeacherCase1({ schedule }) {
  return (
    <div className={Styles['teacher_case1_container']}>
        <div className={Styles['schedule_main_container']}>
            <TeacherSchedule schedule={schedule} />
        </div>
    </div>
  );
}

function TeacherCase2({ schedule }) {
  return (
    <div className={Styles['teacher_case2_container']}>
    </div>
  );
}

