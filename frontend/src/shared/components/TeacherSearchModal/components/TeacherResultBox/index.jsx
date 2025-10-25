import Styles from './TeacherResultBox.module.css';

export default function TeacherResultBox({ teacher }) {
  return (
    <div className={Styles['teacher-result_box']}>
        <div className={Styles['teacher-result_photo_container']}>
            <img 
                src={teacher.photo} 
                alt={`${teacher.name}'s photo`} 
                className={Styles['teacher-result_photo']}
                draggable="false"
            />
        </div>
        <div className={Styles['teacher-result_info']}>
            <p className={Styles['teacher-result_name']}>{teacher.name}</p>
            <p className={Styles['teacher-result_subject']}>{teacher.subject}</p>
        </div>
    </div>
  );
}