import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatGroups, joinGroup } from '../redux/Chat/actions/chatAction'; // Adjust the import path as needed
import Swal from 'sweetalert2';

const AvailableGroups = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authentication.user); // Assuming userId is stored in auth state

  const groups = [
    { id: 1, name: 'Group 1: Visual Learners (Sensory Preferences)' },
    { id: 2, name: 'Group 2: Auditory Learners (Sensory Preferences)' },
    { id: 3, name: 'Group 3: Reading/Writing Learners (Sensory Preferences)' },
    { id: 4, name: 'Group 4: Kinesthetic Learners (Sensory Preferences)' },
    { id: 5, name: 'Group 5: Global Learners (Cognitive Styles)' },
    { id: 6, name: 'Group 6: Sequential Learners (Cognitive Styles)' },
    { id: 7, name: 'Group 7: Analytical Learners (Cognitive Styles)' },
    { id: 8, name: 'Group 8: Random Learners (Cognitive Styles)' },
    { id: 9, name: 'Group 9: Collaborative Learners (Technical Preferences)' },
    { id: 10, name: 'Group 10: Independent Learners (Technical Preferences)' },
    { id: 11, name: 'Group 11: Hands-on Practice Learners (Technical Preferences)' },
    { id: 12, name: 'Group 12: Theoretical Learners (Technical Preferences)' },
  ];

  const handleJoinGroup = async (groupId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to join this group?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, join it!'
    });

    if (result.isConfirmed) {
      try {
        await dispatch(joinGroup(userId, groupId));
        dispatch(fetchChatGroups(userId));
        Swal.fire(
          'Joined!',
          'You have successfully joined the group.',
          'success'
        );
      } catch (error) {
        console.error('Error joining group:', error);
        Swal.fire(
          'Error!',
          'An error occurred while joining the group.',
          'error'
        );
      }
    }
  };

  
  return (
    <div className="available-groups">
      <h2>Available Groups</h2>
      {groups.length > 0 ? (
        groups.map((group) => (
          <div key={group.id} className="group-item">
            <div className="group-name">{group.name}</div>
            <button style={{width:'200px'}} onClick={() => handleJoinGroup(group.id)}>Join Group</button>
          </div>
        ))
      ) : (
        <div className="no-groups">No groups available</div>
      )}
    </div>
  );
};

export default AvailableGroups;
