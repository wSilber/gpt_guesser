import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from './styles/ChatRooms.module.css';

const ChatRoomsComponent = () => {

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
      setInputValue(event.target.value);
    };

    const handleSubmit = async (e) => {
        console.log('handle submit')
        const newChatRoom = {
            name: inputValue,
            particpants: 1,
        };
        setInputValue("")

        const res = await fetch('/api/chatRooms', {
            body: JSON.stringify(newChatRoom),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        });

        const result = await res.json()
        console.log(result)

    }
    return (
        <div className={styles.container}>
            <Head>Create New Room</Head>
            <input
                type="text"
                name = 'name'
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter Name"
            />
            <button onClick={handleSubmit}>
                click me
            </button>

            
        </div>
    )
} 

export default ChatRoomsComponent
