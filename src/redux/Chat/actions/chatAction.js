import axios from 'axios';
import Swal from 'sweetalert2';
import { setChatRooms, setMessages } from '../slices/chatSlice';


export const fetchChatGroups = (userId) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:5050/api/users/user/${userId}/chatRooms`);
        console.log(response.data)
        dispatch(setChatRooms(response.data.chatRooms));
      } catch (error) {
        console.error('Error fetching chat groups:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not fetch chat groups',
        });
      }
    };
  };

export const fetchRoomMessage = (selectedGroup) => {
  return async (dispatch) => {
    if (!selectedGroup) return;

    try {
        console.log("Selected", selectedGroup.id)
      const response = await axios.get(`http://localhost:5050/api/group-messages?chatRoomId=${selectedGroup}`);
      console.log(response.data);
      dispatch(setMessages({ groupId: selectedGroup.id, messages: response.data }));
    } catch (error) {
      console.error('Error fetching room messages:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not fetch room messages',
      });
    }
  };
};

export const sendMessageToGroup = (chatRoomId, message, sender) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5050/api/group-messages', {
        chatRoomId,
        message,
        sender
      });

      console.log('Message sent:', response.data);

      // After sending the message, fetch the updated messages for the group
      dispatch(fetchRoomMessage({ id: chatRoomId }));
      dispatch(fetchRoomMessage(chatRoomId));
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not send the message',
      });
      throw error;
    }
  };
};

export const joinGroup = (userId, groupId) => {
    return async (dispatch) => {
      try {
        console.log("user id", userId, "groupId", groupId);
        const response = await axios.post('http://localhost:5050/api/users/groups/join', { userId, groupId });
        
        if (response.data.message === 'Already a member') {
          Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'You are already a member of this group',
          });
        } else if (response.data.message === 'Successfully joined') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'You have successfully joined the group',
          });
        }
  
        dispatch(setChatRooms(response.data.chatGroups)); // Update user's chat groups
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while joining the group',
        });
        console.error('Error joining group:', error);
      }
    };
  };

  export const leaveGroup = (userId, groupId) => {
    return async (dispatch) => {
      try {
        console.log("user id", userId, "groupId", groupId);
        const response = await axios.post('http://localhost:5050/api/users/groups/leave', { userId, groupId });
  
        if (response.data.message === 'Successfully left') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'You have successfully left the group',
          });
        } else if (response.data.message === 'Not a member of the group') {
          Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'You are not a member of this group',
          });
        }
  
        dispatch(setChatRooms(response.data.chatGroups)); // Update user's chat groups
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while leaving the group',
        });
        console.error('Error leaving group:', error);
      }
    };
  };
