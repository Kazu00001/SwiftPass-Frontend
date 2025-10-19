import Styles from './Dashboard.module.css';
import ClockCard from './components/ClockCard';
import NfcStatusCard from './components/NfcStatusCard';
import PendingRequestsCard from './components/PendingRequestsCard';
import Calendar from './components/Calendar';
import AbsentTeacherCard from './components/AbsentTeacherCard';

export default function Dashboard() {
  return (
    <div className={Styles['dashboard_container']}>
      <section className={Styles['dashboard_top']}>
        <ClockCard />
        <NfcStatusCard />
      </section>

      <section className={Styles['dashboard_middle']}>
        <PendingRequestsCard />
      </section>


      <section className={Styles['dashboard_bottom']}>
        <Calendar />
        <AbsentTeacherCard />
      </section>
    </div>
  );
}