import Styles from './TeacherSchedule.module.css';

export default function TeacherSchedule({ schedule }) {
  const days = [
    { key: "monday", label: "Lunes" },
    { key: "tuesday", label: "Martes" },
    { key: "wednesday", label: "Miércoles" },
    { key: "thursday", label: "Jueves" },
    { key: "friday", label: "Viernes" }
  ];

  if (!schedule) {
    return <p>No hay datos disponibles.</p>;
  }

  // Obtener todas las horas del horario
  const allTimes = Object.values(schedule).flatMap((classes) =>
    classes.flatMap((c) => [c.startTime, c.endTime])
  );

  if (allTimes.length === 0) {
    return <p>No hay clases registradas para este profesor.</p>;
  }

  // Convierte "HH:MM" a minutos
  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  // Convierte minutos a formato HH:MM
  const toTimeString = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  // Calcula el rango completo del día (mínimo y máximo)
  const minHour = Math.min(...allTimes.map(toMinutes));
  const maxHour = Math.max(...allTimes.map(toMinutes));

  // Genera una lista de intervalos de 1 hora (para más precisión)
  const generateTimeSlots = () => {
    const slots = [];
    for (let t = minHour; t < maxHour; t += 60) {
      const start = toTimeString(t);
      const end = toTimeString(t + 60);
      slots.push({ start, end });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Obtiene TODAS las clases dentro del rango de tiempo
  const getClassesForSlot = (dayKey, start, end) => {
    const startMin = toMinutes(start);
    const endMin = toMinutes(end);
    const classes = schedule?.[dayKey] || [];

    // Filtra TODAS las clases que caen dentro del intervalo
    return classes.filter((c) => {
      const classStart = toMinutes(c.startTime);
      return classStart >= startMin && classStart < endMin;
    });
  };

  return (
    <div className={Styles['schedule_wrapper']}>
      {/* === HEADER === */}
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

      {/* === BODY === */}
      <div className={Styles['schedule_body_container']}>
        <table className={Styles['schedule_table_body']}>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot.start}>
                <td>{`${slot.start} - ${slot.end}`}</td>
                {days.map((d) => {
                  const classItems = getClassesForSlot(d.key, slot.start, slot.end);
                  return (
                    <td key={d.key}>
                      {classItems.length > 0 ? (
                        classItems.map((c, idx) => (
                          <div key={idx} className={Styles['class_cell']}>
                            <div>{c.location}</div>
                          </div>
                        ))
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