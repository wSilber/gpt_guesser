import React, { useEffect, useState } from 'react';
import { useChannel } from "./AblyReactEffect";
import styles from './styles/AblyChatComponent.module.css';

const AblyChatComponent = () => {
    let inputBox = null;
    let messageEnd = null;
    const [messageText, setMessageText] = useState("");
    const [receivedMessages, setMessages] = useState([]);
    const messageTextIsEmpty = messageText.trim().length === 0;

    const [channel, ably] = useChannel("chat-demo", (message) => {
        // Here we're computing the state that'll be drawn into the message history
        // We do that by slicing the last 199 messages from the receivedMessages buffer
    
        const history = receivedMessages.slice(-199);
        setMessages([...history, message]);
    
        // Then finally, we take the message history, and combine it with the new message
        // This means we'll always have up to 199 message + 1 new message, stored using the
        // setMessages react useState hook
      });
    
    const sendChatMessage = (messageText) => {
        channel.publish({ name: "chat-message", data: messageText });
        setMessageText("");
        inputBox.focus();
    }

    const handleFormSubmission = (event) => {
        event.preventDefault();
        sendChatMessage(messageText);
    }

    const handleKeyPress = (event) => {
        if (event.charCode !== 13 || messageTextIsEmpty) {
          return;
        }
        sendChatMessage(messageText);
        event.preventDefault();
    }

    const messages = receivedMessages.map((message, index) => {
        const author = message.connectionId === ably.connection.id ? "me" : "other";
        return <span key={index} className={`${styles.message} ${author === "me" ? styles.me : styles.other}`} data-author={author}>{message.data}</span>;
    });

    <div ref={(element) => { messageEnd = element; }}></div>

    useEffect(() => {
        messageEnd.scrollIntoView({ behaviour: "smooth" });
    });

    return (
        <div className={styles.chatHolder}>
          <div className={styles.chatText}>
            {messages}
            <div ref={(element) => { messageEnd = element; }}></div> 
          </div>
          <span className={styles.spacer}></span>

          <form onSubmit={handleFormSubmission} className={styles.form}>
            <textarea
              ref={(element) => { inputBox = element; }}
              value={messageText}
              placeholder="Type a message..."
              onChange={e => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.textarea}
            ></textarea>
            <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>Send</button>
          </form>
        </div>
      )
    }
    
    export default AblyChatComponent;

    
