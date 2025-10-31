import Styles from './TeacherListBox.module.css';

export default function TeacherListBox({ name, photo, status, time, onClick }) {
  return (
    <button className={Styles['teacher-list-box_container']} onClick={onClick}>
        <section className={Styles['teacher-photo_container']}>
            <img 
                className={Styles['teacher-photo']}
                src={photo} 
                alt={`${name}'s photo`} 
                draggable="false"
            />
        </section>

        <section className={Styles['teacher-name_container']}>
            <p className={Styles['teacher-name']}>{name}</p>
        </section>

        <section className={Styles['teacher-time_container']}>
            <p className={Styles['teacher-time']}>{time}</p>
            <div className={`${Styles['teacher-status']} ${status == 1 ? Styles['teacher-status_active'] : ''}`}>
            </div>
        </section>
    </button>
  );
}