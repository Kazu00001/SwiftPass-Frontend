import React, { useState } from 'react';
import Styles from './ReviewRequestModal.module.css';
import { asseptPermisoOJustificante } from './hook.js';

const DEFAULT_DOC = '/Graphics/docImage.jpeg';
const DEFAULT_PROFILE = '/Graphics/default-profile.png';
const DEFAULT_COMMENT = 'No hay comentarios disponibles.';

export default function ReviewRequestModal({ teacher, isOpen, onClose, onActionSuccess, onActionError }) {
  const [showImage, setShowImage] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  if (!isOpen) return null;

  const t = teacher || {};
  const r = t || {};
  const details = r.details || {};

  const isJustificante = String((r.recordType || '')).toLowerCase() === 'justificante';
  const isPermiso = String((r.recordType || '')).toLowerCase() === 'permiso';

  const titleText = isJustificante ? 'Información del Justificante' : isPermiso ? 'Información del Permiso' : 'Información del Registro';
  const typeText = r.recordType || 'Desconocido';

  const reasonText = isJustificante
    ? (details.titulo || '—')
    : isPermiso
    ? (details.nombre_permiso || '—')
    : (details.motivo || details.descripcion || '—');

  const commentText = isJustificante
    ? (details.motivo || DEFAULT_COMMENT)
    : isPermiso
    ? (details.descripcion || DEFAULT_COMMENT)
    : (details.comentario || DEFAULT_COMMENT);

  const dateText = isJustificante
    ? (details.fecha || '—')
    : isPermiso
    ? `${details.fecha_inicio || '—'} - ${details.fecha_fin || '—'}`
    : (details.fecha || '—');

  const timeText = r.time || null;
  const autorizado = details.autorizado ?? details.aprobado ?? null;

  const imageSrc = details.recordPhoto || DEFAULT_DOC;

  const deriveTeacherNumericId = () => {
    const candidates = [details.teacher_id, r.teacher_id, r.id_maestro, t.id];
    for (const c of candidates) {
      if (c == null) continue;
      if (typeof c === 'number' && !Number.isNaN(c)) return c;
      const digits = String(c).replace(/[^0-9]/g, '');
      if (digits) return Number(digits);
    }
    return null;
  };

  const teacherNumericId = deriveTeacherNumericId();

  const handleAction = async (approve_status) => {
    setActionError(null);
    setActionLoading(true);
    try {
      const res = await asseptPermisoOJustificante(r.recordId, r.recordType || 'permiso', teacherNumericId || 0, approve_status);
      if (res.ok) {
        setActionLoading(false);
        if (typeof onActionSuccess === 'function') {
          try {
            onActionSuccess({ action: approve_status ? 'approve' : 'reject', recordId: r.recordId, recordType: r.recordType });
          } catch (e) {
            console.warn('onActionSuccess callback threw', e);
          }
        }
        onClose && onClose();
      } else {
        const err = res.error || `Status ${res.status}`;
        setActionError(err);
        if (typeof onActionError === 'function') onActionError(err);
        setActionLoading(false);
      }
    } catch (err) {
      setActionError(err?.message || String(err));
      setActionLoading(false);
    }
  };

  return (
    <div className={Styles.modal_overlay}>
      <div className={Styles.modal_container} onClick={(e) => e.stopPropagation()}>
        <TeacherProfileHeader teacher={t} onClose={onClose} />

        <div className={Styles.teacher_profile_container}>
          <div className={Styles.top_container}>
            <h3 className={Styles.title_text}>{titleText}</h3>
            <p className={Styles.small_text}>Tipo: {typeText}</p>
            <p className={Styles.small_text}>Razón: {reasonText}</p>
            <p className={Styles.small_text}>Fechas: {dateText}</p>
            {timeText && <p className={Styles.small_text}>Hora: {timeText}</p>}
            {autorizado !== null && (
              <p className={Styles.small_text}>{isJustificante ? `Autorizado: ${autorizado}` : `Aprobado: ${autorizado}`}</p>
            )}
          </div>

          <div className={Styles.center_container}>
            <button
              className={Styles.document_container}
              onClick={() => {
                if (details.recordPhoto) setShowImage(true);
              }}
              aria-label={details.recordPhoto ? 'Ver documento' : 'Documento no disponible'}
            >
              <img src={imageSrc} alt="Documento" className={Styles.document_image} draggable="false" />
            </button>

            <div className={Styles.comment_container}>
              <h3 className={Styles.comment_title}>Comentarios:</h3>
              <p className={Styles.comment}>{commentText}</p>
            </div>
          </div>

          <div className={Styles.bottom_container}>
            <button className={Styles.button_1} onClick={() => handleAction(0)} disabled={actionLoading}>
              {actionLoading ? 'Procesando...' : 'Rechazar'}
            </button>
            <button className={Styles.button_2} onClick={() => handleAction(1)} disabled={actionLoading}>
              {actionLoading ? 'Procesando...' : isJustificante ? 'Justificar' : isPermiso ? 'Aprobar' : 'Confirmar'}
            </button>
          </div>

          {actionError && <div className={Styles.error_text}>{String(actionError)}</div>}
        </div>
      </div>

      {showImage && <ImageModal imageSrc={imageSrc} onClose={() => setShowImage(false)} />}
    </div>
  );
}

function TeacherProfileHeader({ teacher, onClose }) {
  const t = teacher || {};
  return (
    <div className={Styles.modal_header}>
      <div className={Styles.teacher_info_container}>
        <div className={Styles.teacher_photo_container}>
          <img src={t.photo || DEFAULT_PROFILE} alt={`${t.name || 'Profesor'}'s photo`} className={Styles.teacher_photo} draggable="false" />
        </div>
        <div className={Styles.teacher_details_container}>
          <h2 className={Styles.teacher_name}>{t.name || 'Sin nombre'}</h2>
          <p className={Styles.teacher_email}>{t.email || ''}</p>
        </div>
      </div>
      <button className={Styles.modal_close_button} onClick={onClose} aria-label="Cerrar modal">
        ✕
      </button>
    </div>
  );
}

function ImageModal({ imageSrc, onClose }) {
  return (
    <div className={Styles.image_modal_overlay} onClick={onClose}>
      <div className={Styles.image_modal_content} onClick={(e) => e.stopPropagation()}>
        <button className={Styles.image_modal_close} onClick={onClose} aria-label="Cerrar imagen">
          ✕
        </button>
        <img src={`http://localhost:3000${imageSrc}`} alt="Justificante" className={Styles.image_modal_img} draggable="false" />
      </div>
    </div>
  );
}
