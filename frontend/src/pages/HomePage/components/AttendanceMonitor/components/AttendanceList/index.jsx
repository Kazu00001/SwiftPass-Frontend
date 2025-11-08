import React, { useState, useEffect } from 'react';
import Styles from './AttendanceList.module.css';
import TeacherListBox from '../TeacherListBox';
import TeacherProfileModal from '../../../../../../shared/components/TeacherProfileModal';

const AttendanceList = ({ teachers = [] }) => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTeacherClick = (teacher) => {
        setSelectedTeacher(teacher);
    };

    useEffect(() => {
        if (selectedTeacher) setIsModalOpen(true);
    }, [selectedTeacher]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTeacher(null);
    };

    return (
        <div className={Styles['attendance-list_container']}>
            {teachers.map((teacher) => (
                <TeacherListBox
                    key={teacher.id}
                    name={teacher.name}
                    photo={teacher.photo}
                    status={teacher.status}
                    time={teacher.time}
                    onClick={() => handleTeacherClick(teacher)}
                />
            ))}
            <TeacherProfileModal teacher={selectedTeacher} isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default AttendanceList;