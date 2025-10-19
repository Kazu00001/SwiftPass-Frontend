import Styles from './TeacherListBox.module.css';

export default function TeacherListBox({ name, photo, status, time }) {
  return (
    <button className={Styles['teacher-list-box_container']}>
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
    </button>
  );
}