import Styles from './AttendanceMonitor.module.css';
import SearchBar from './components/SearchBar';
import AttendanceList from './components/AttendanceList';

const AttendanceMonitor = () => {
  return (
    <div className={Styles['attendance-monitor_container']}>
        <SearchBar />
        <AttendanceList />
    </div>
  );
};
export default AttendanceMonitor;