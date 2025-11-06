import Layout from '../Layout';
import Styles from './TeacherPage.module.css';
import AttendanceTeacherCalendar from './components/AttendanceTeacherCalendar';
import TeacherRequestsCard from './components/TeacherRequestsCard';

const TeacherPage = () => {
  return (
    <Layout>
      <div className={Styles['teacher_page_container']}>

        <div className={Styles['top_container']}>
            <div className={Styles['attendance_calendar_container']}>
                <AttendanceTeacherCalendar isAdmin={true} />
            </div>
            <div className={Styles['stats_main_container']}>

            </div>
        </div>
        <div className={Styles['requests_main_container']}>
            <TeacherRequestsCard/>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherPage;