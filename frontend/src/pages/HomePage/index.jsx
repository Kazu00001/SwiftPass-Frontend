import Layout from '../Layout';
import AttendanceMonitor from './components/AttendanceMonitor';
import Dashboard from './components/Dashboard';

const HomePage = () => {
  return (
    <Layout>
      <AttendanceMonitor/>
      <Dashboard/>
    </Layout>
  );
};
export default HomePage;