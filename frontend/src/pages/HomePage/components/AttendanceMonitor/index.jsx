import React, { useMemo, useState } from 'react';
import Styles from './AttendanceMonitor.module.css';
import SearchBar from './components/SearchBar';
import AttendanceList from './components/AttendanceList';
import { TEACHERS } from '../Dashboard/components/PendingRequestsCard/Teachers.js';

const AttendanceMonitor = () => {
  const [query, setQuery] = useState('');

  // ensure teachers is an array
  const teachers = Array.isArray(TEACHERS) ? TEACHERS : [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teachers;
    return teachers.filter((t) => {
      // cast to string to avoid errors when id/name are numbers or objects
      const name = String(t?.name ?? '').toLowerCase();
      const id = String(t?.id ?? '').toLowerCase();
      return name.includes(q) || id.includes(q);
    });
  }, [query, teachers]);

  return (
    <div className={Styles['attendance-monitor_container']}>
      <SearchBar value={query} onChange={setQuery} placeholder="Buscar profesor..." />
      <AttendanceList teachers={filtered} />
    </div>
  );
};

export default AttendanceMonitor;