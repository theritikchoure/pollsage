import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Replace with your server URL

const Chat = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');

  const joinRoom = (r) => {
    socket.emit('joinRoom', r || room);
  };

  const sendMessage = () => {
    socket.emit('sendMessage', { room, message });
    setMessage('');
  };


  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    console.log(id);
    // Socket.IO event listeners
    socket.on(`pollResultUpdated-${id}`, handlePollResultUpdate);

    // Clean up the event listeners on component unmount
    return () => {
      socket.off(`pollResultUpdated-${id}`, handlePollResultUpdate);
    };
  }, []);

  const handlePollResultUpdate = (data) => {
    // Handle the updated poll result
    console.log('Poll result updated:', data);
    // Update your state or perform any other necessary actions
  };

  return (
    <div>
      <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Enter room name" />
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message" />
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default Chat;
