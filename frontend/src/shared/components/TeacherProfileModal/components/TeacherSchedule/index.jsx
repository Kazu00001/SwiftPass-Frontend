
import Styles from './TeacherSchedule.module.css';

export default function TeacherSchedule({ schedule }) {
  const days = [
    { key: "monday", label: "Lunes" },
    { key: "tuesday", label: "Martes" },
    { key: "wednesday", label: "Miércoles" },
    { key: "thursday", label: "Jueves" },
    { key: "friday", label: "Viernes" }
  ];

  // Extrae todas las horas de inicio y fin del horario
  const allTimes = Object.values(schedule || {}).flatMap((classes) =>
    classes.flatMap((c) => [c.startTime, c.endTime])
  );

  // Si no hay clases
  if (allTimes.length === 0) {
    return <p>No hay clases registradas para este profesor.</p>;
  }

  // Convierte "HH:MM" a número
  const toHour = (time) => parseInt(time.split(":")[0], 10);

  const minHour = Math.min(...allTimes.map(toHour));
  const maxHour = Math.max(...allTimes.map(toHour));

  // Genera bloques de 2 horas según el horario del profesor
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = minHour; hour < maxHour; hour += 2) {
      const start = `${hour.toString().padStart(2, "0")}:00`;
      const end = `${(hour + 2).toString().padStart(2, "0")}:00`;
      slots.push({ start, end });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Busca clase según rango horario
  const getClassForSlot = (dayKey, start, end) => {
    const classes = schedule?.[dayKey] || [];
    return classes.find((c) => c.startTime >= start && c.startTime < end);
  };

  return (
    <div className={Styles['schedule_wrapper']}>
    {/* === HEADER TABLE (fija arriba) === */}
    <div className={Styles['schedule_header_container']}>
        <table className={Styles['schedule_table_header']}>
        <thead>
            <tr>
            <th>Hora</th>
            {days.map((d) => (
                <th key={d.key}>{d.label}</th>
            ))}
            </tr>
        </thead>
        </table>
    </div>

    {/* === BODY TABLE (scrolleable) === */}
    <div className={Styles['schedule_body_container']}>
        <table className={Styles['schedule_table_body']}>
        <tbody>
            {timeSlots.map((slot) => (
            <tr key={slot.start}>
                <td>{`${slot.start} - ${slot.end}`}</td>
                {days.map((d) => {
                const classItem = getClassForSlot(d.key, slot.start, slot.end);
                return (
                    <td key={d.key}>
                    {classItem ? (
                        <div className={Styles['class_cell']}>
                        {classItem.location}
                        </div>
                    ) : (
                        <div className={Styles['empty_cell']}>—</div>
                    )}
                    </td>
                );
                })}
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    </div>
  );
}