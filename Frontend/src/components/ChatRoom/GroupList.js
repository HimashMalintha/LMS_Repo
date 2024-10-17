import React from 'react';
import './GroupList.css';

const GroupList = ({ groups = [], onSelectGroup }) => {

    const getGroupName = (groupNumber) => {
        const groupNames = {
            1: 'Visual Learners',
            2: 'Auditory Learners',
            3: 'Reading/Writing Learners',
            4: 'Kinesthetic Learners',
            5: 'Global Learners',
            6: 'Sequential Learners',
            7: 'Analytical Learners',
            8: 'Random Learners',
            9: 'Collaborative Learners',
            10: 'Independent Learners',
            11: 'Hands-on Practice Learners',
            12: 'Theoretical Learners'
        };

        return groupNames[groupNumber] || 'Unknown Group';
    };
    return (
        <div className="group-list">
            {groups.length > 0 ? (
                groups.map(group => (
                    <div key={group.id} className="group-item" onClick={() => onSelectGroup(group)}>

                        <div className="group-name">{getGroupName(group)}</div>
                        <div className="group-last-message">{group.lastMessage}</div>
                    </div>
                ))
            ) : (
                <div className="no-groups">No groups available</div>
            )}
        </div>
    );
};

export default GroupList;
