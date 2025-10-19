import styles from './Calendar.module.css';

export default function Calendar() {
  return (
    <div className={styles['calendar_container']}>
      <p className={styles['calendar_text']}>Calendario</p> 
    </div>
  );
}