import React, { useState } from 'react';
import Styles from './AttendanceList.module.css';
import TeacherListBox from '../TeacherListBox';
import { TEACHERS } from '../../../Dashboard/components/PendingRequestsCard/Teachers.js';
import TeacherProfileModal from '../../../../../../shared/components/TeacherProfileModal';

const AttendanceList = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTeacherClick = (teacher) => {
        setSelectedTeacher(teacher);
        // open modal when selectedTeacher is set to avoid render with undefined
    };

    // Ensure modal opens only after selectedTeacher has been set
    React.useEffect(() => {
      if (selectedTeacher) setIsModalOpen(true);
    }, [selectedTeacher]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTeacher(null);
    };

    return (
        <div className={Styles['attendance-list_container']}>
            {
                TEACHERS.map(teacher => (
                    <TeacherListBox 
                        key={teacher.id} 
                        name={teacher.name} 
                        photo={teacher.photo} 
                        status={teacher.status}
                        time={teacher.time} 
                        onClick={() => handleTeacherClick(teacher)} // Agregar el manejador de clic
                    />
                ))
            }
            <TeacherProfileModal 
                teacher={selectedTeacher} 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
            />
        </div>
    );
}

export default AttendanceList;