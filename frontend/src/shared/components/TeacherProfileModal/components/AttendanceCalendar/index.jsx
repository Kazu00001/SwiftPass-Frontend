import React, { useEffect, useRef, useState } from "react";
import Styles from "./AttendanceCalendar.module.css";
import { attendanceData, schedule } from "./attendanceData.js";

const STATUS = {
  0: { label: "Inasistencia", color: "#e86666ff" },
  1: { label: "Asistencia", color: "#3b82f6" },
  2: { label: "Retardo", color: "#ecd44dff" },
  3: { label: "Justificado", color: "#f6a23bff" },
};

const formatDate = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

// 🔠 Mapeo de días
const DAYS_MAP = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export default function AttendanceCalendar({ isAdmin = true }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [data, setData] = useState(attendanceData);
  const [menu, setMenu] = useState(null);
  const gridRef = useRef(null);

  const monthName = new Date(year, month - 1).toLocaleString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const getDays = () => {
    const first = new Date(year, month - 1, 1);
    const totalDays = new Date(year, month, 0).getDate();
    const offset = first.getDay(); // 0 domingo
    const days = Array(offset).fill(null);

    for (let d = 1; d <= totalDays; d++) {
      const date = formatDate(year, month, d);
      const record = data.find((r) => r.fecha === date);
      const weekDay = DAYS_MAP[new Date(year, month - 1, d).getDay()];
      const hasClass = !!schedule[weekDay] && schedule[weekDay].length > 0;

      days.push({ day: d, date, estado: record?.estado ?? null, hasClass, weekDay });
    }

    while (days.length % 7 !== 0) days.push(null);
    return days;
  };

  const changeMonth = (dir) => {
    const newMonth = month + dir;
    if (newMonth < 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else if (newMonth > 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else setMonth(newMonth);
    setMenu(null);
  };

  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
    setMenu(null);
  };

  const changeStatus = (estado) => {
    if (!menu) return;
    const { date } = menu;
    setData((prev) => {
      const exists = prev.some((d) => d.fecha === date);
      return exists
        ? prev.map((d) => (d.fecha === date ? { ...d, estado } : d))
        : [...prev, { fecha: date, estado }];
    });
    setMenu(null);
  };

  const handleDayClick = (e, cell) => {
    if (!isAdmin || !cell || !cell.hasClass) return; // 🚫 no permitir clic si no hay clase
    const grid = gridRef.current.getBoundingClientRect();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({
      date: cell.date,
      top: rect.top - grid.top,
      left: rect.right - grid.left - 170,
    });
  };

  useEffect(() => {
    const close = (e) => {
      if (!menu) return;
      const menuEl = document.getElementById("ac-menu");
      if (menuEl && menuEl.contains(e.target)) return;
      setMenu(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menu]);

  const days = getDays();

  return (
    <div className={Styles.wrapper}>
      <header className={Styles.header}>
        <div className={Styles.nav}>
          <button onClick={() => changeMonth(-1)}>◀</button>
          <button onClick={goToday}>Hoy</button>
          <button onClick={() => changeMonth(1)}>▶</button>
        </div>
        <h2 className={Styles.month}>{monthName}</h2>
        <div className={Styles.legend}>
          {Object.values(STATUS).map((s) => (
            <div key={s.label} className={Styles.legendItem}>
              <span className={Styles.dot} style={{ background: s.color }} />
              {s.label}
            </div>
          ))}
        </div>
      </header>

      <div className={Styles.weekdays}>
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d, i) => {
          const key = DAYS_MAP[i];
          const hasClass = !!schedule[key] && schedule[key].length > 0;
          return (
            <div
              key={d}
              className={`${Styles.weekday} ${
                hasClass ? Styles.activeDay : Styles.inactiveDay
              }`}
            >
              {d}
            </div>
          );
        })}
      </div>

      <div className={Styles.grid} ref={gridRef}>
        {days.map((cell, i) =>
          cell ? (
            <div
              key={cell.date}
              className={`${Styles.day} ${!cell.hasClass ? Styles.disabledDay : ""}`}
              onClick={(e) => handleDayClick(e, cell)}
              style={{
                background: cell.hasClass
                  ? STATUS[cell.estado]?.color || "#1f2937"
                  : "#4b5563",
                cursor: cell.hasClass ? "pointer" : "not-allowed",
              }}
            >
              <span>{cell.day}</span>
            </div>
          ) : (
            <div key={`empty-${i}`} className={Styles.empty} />
          )
        )}
      </div>

      {menu && (
        <div id="ac-menu" className={Styles.menu} style={{ top: menu.top, left: menu.left }}>
          <h4>{menu.date}</h4>
          {Object.entries(STATUS).map(([num, s]) => (
            <button
              key={num}
              onClick={() => changeStatus(Number(num))}
              className={Styles.menuBtn}
              style={{ background: s.color }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}