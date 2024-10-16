import React, { useEffect, useState } from 'react';
import GroupList from '../components/ChatRoom/GroupList';
import ChatWindow from '../components/ChatRoom/ChatWindow';
import './Chat.css';
import { fetchRoomMessage, fetchChatGroups } from '../redux/Chat/actions/chatAction';
import { useDispatch, useSelector } from 'react-redux';

const Chat = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const groups = useSelector((state) => state.chat.chatRooms);
  const user = useSelector((state) => state.authentication.user); // Assuming userId is stored in auth state
  console.log("user", user)
  useEffect(() => {
    console.log("user", user)
    if (user) {
      dispatch(fetchChatGroups(user));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (selectedGroup) {
      console.log("selected group", selectedGroup)
      dispatch(fetchRoomMessage(selectedGroup));
    }
  }, [selectedGroup, dispatch]);

  const handleLeaveGroup = () => {
    setSelectedGroup(null); // Remove the group when the user leaves
};

  return (
    <div className="App">
      <GroupList groups={groups} onSelectGroup={setSelectedGroup} />
      <div className='container h-100'>
        {selectedGroup && (
          <ChatWindow group={selectedGroup} messages={messages[selectedGroup.id] || []} onLeaveGroup={handleLeaveGroup} />
        )}
      </div>
    </div>
  );
};

export default Chat;
