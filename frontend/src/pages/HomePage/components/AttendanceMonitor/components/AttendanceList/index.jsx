import Styles from './AttendanceList.module.css';
import TeacherListBox from '../TeacherListBox';
import { TEACHERS } from '../../../Dashboard/components/PendingRequestsCard/Teachers.js';

const AttendanceList = () => {
  return (
    <div className={Styles['attendance-list_container']}>
      {
        TEACHERS.map(teacher => (
            <TeacherListBox 
                key={teacher.id} 
                name={teacher.name} 
                photo={teacher.photo} 
                status={teacher.status}
                time={teacher.time} 
            />
        ))
      }
      
    </div>
  );
}

export default AttendanceList;