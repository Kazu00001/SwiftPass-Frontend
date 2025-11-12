import styles from './Calendar.module.css';

export default function Calendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  
  const daysArray = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDay + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  const weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

  return (
    <div className={styles['calendar_container']}>
      <div className={styles['calendar_header']}>
        {weekDays.map((day) => (
          <span key={day} className={styles['calendar_day_label']}>{day}</span>
        ))}
      </div>

      <div className={styles['calendar_grid']}>
        {daysArray.map((day, index) => {
          const isToday = day === today.getDate();
          return (
            <div
              key={index}
              className={`${styles['calendar_day']} ${isToday ? styles['today'] : ''}`}
            >
              {day || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}