import React, { useState, useEffect } from 'react';
import './ChatWindow.css';
import { fetchChatGroups, leaveGroup, sendMessageToGroup } from '../../redux/Chat/actions/chatAction';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const ChatWindow = ({ group, messages, onLeaveGroup  }) => {
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState('');
    const dispatch = useDispatch();

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

    useEffect(() => {
        // Assuming the user name is stored in localStorage under 'username'
        const storedUser = localStorage.getItem('username');
        setUser(storedUser);
    }, []);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        console.log(newMessage, group, user)
        setIsLoading(true);
        try {
            // Send the message to the server
            await dispatch(sendMessageToGroup(group, newMessage, user));
        } catch (error) {
            console.error('Error sending message:', error);
        }
        setNewMessage('');
        setIsLoading(false);
    };

    const handleLeaveGroup = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to leave this group?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, leave it!'
        });
    
        if (result.isConfirmed) {
            try {
                await dispatch(leaveGroup(user, group));
                dispatch(fetchChatGroups(user));
                onLeaveGroup();
                Swal.fire(
                    'Left!',
                    'You have successfully left the group.',
                    'success'
                );
            } catch (error) {
                console.error('Error leaving group:', error);
                Swal.fire(
                    'Error!',
                    'An error occurred while leaving the group.',
                    'error'
                );
            }
        }
    };

    return (
        <div className="chat-window w-100">
            <div className="chat-header">{getGroupName(group)}</div>
            
            <div className="chat-messages">
            
            <div className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Write a message..."
                    disabled={isLoading}
                />
                <button onClick={handleSendMessage} disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>
                {messages && messages.length > 0 ? (
                    messages.map((msg, index) => {
                        const showSender = index === 0 || messages[index - 1].sender !== msg.sender;
                        return (
                            <div key={index} className={`chat-message ${msg.sender === user ? 'my-message' : ''}`}>
                                {showSender && (
                                    <div><strong>{msg.sender === user ? `${msg.sender} (You)` : msg.sender} </strong></div>
                                )}
                                <div>{msg.message}</div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-messages">No messages yet</div>
                )}
            </div>
            <div className="d-flex flex-end">
                <button onClick={handleLeaveGroup} className="btn btn-danger">Leave Group</button>
            </div>
        </div>
    );
};

export default ChatWindow;
