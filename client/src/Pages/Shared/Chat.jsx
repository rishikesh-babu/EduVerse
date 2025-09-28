import Video from '../../Components/Shared/Video'
import ClassSidebar from '../User/ClassSidebar';

import React, { useState, useEffect, useRef } from 'react';

export default function Chat() {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' },
    ]);
    const [fileInput, setFileInput] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Auto scroll on every new message
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 🔄 WebSocket connection for live tutor + STT updates
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5000/ws");
        let lastUserText = "";
        let lastBotText = "";

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // 🎤 Show STT converted user speech (only if new)
            if (data.text && data.text !== lastUserText) {
                lastUserText = data.text;
                setMessages((prev) => [
                    ...prev,
                    { id: Date.now(), text: data.text, sender: "user" }
                ]);
            }

            // 🤖 Show Tutor Agent reply (only if not empty & new)
            if (data.tutor_response && data.tutor_response !== lastBotText) {
                lastBotText = data.tutor_response;
                setMessages((prev) => [
                    ...prev,
                    { id: Date.now() + 1, text: data.tutor_response, sender: "bot" }
                ]);
            }
        };

        return () => ws.close();
    }, []);

    // Handle typed input
    async function handleSendMessage(e) {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: newMessage,
            sender: 'user',
        };

        setMessages((prev) => [...prev, userMessage]);
        setNewMessage('');
        setIsLoading(true);

        try {
            // Send to backend
            await fetch("http://localhost:5000/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newMessage }),
            });

            // Wait a bit for tutor_loop to process
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Fetch updated state
            const res = await fetch("http://localhost:5000/state");
            const data = await res.json();

            if (data.tutor_response) {
                const botMessage = {
                    id: Date.now() + 1,
                    text: data.tutor_response,
                    sender: 'bot',
                };
                setMessages((prev) => [...prev, botMessage]);
            }

        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [...prev, {
                id: Date.now() + 1,
                text: "⚠️ Backend not reachable",
                sender: 'bot',
            }]);
        } finally {
            setIsLoading(false);
        }
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setFileInput({ url: fileURL, file });
        } else {
            setFileInput(null);
        }
    }

    return (
        <div className="h-[90dvh] bg-gray-900 text-gray-200 font-sans flex flex-col justify-between">
           <ClassSidebar/>
            <main className="grow p-6 w-full max-w-4xl mx-auto overflow-y-auto flex flex-col gap-6">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex flex-col animate-fade-in-up ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <div
                            className={`py-3 px-5 rounded-2xl max-w-[80%] break-words shadow-lg ${message.sender === 'user'
                                ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-lg'
                                : 'bg-gray-700 text-gray-200 rounded-bl-lg'
                                }`}
                        >
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex items-start">
                        <div className="py-2 px-4 rounded-2xl max-w-[75%] bg-gray-200 text-black rounded-bl-none">
                            <div className="flex items-center justify-center gap-1.5 h-5">
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '-0.32s' }}></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '-0.16s' }}></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 m-2 sm:mx-auto sm:w-full max-w-2xl bg-gray-700/90 border-none rounded-2xl flex flex-col gap-3 ">
                {fileInput && (
                    <div className="p-2 w-[30%] aspect-square relative border border-gray-500 bg-gray-800/40 rounded-xl overflow-hidden ">
                        <div onClick={() => setFileInput(null)} className='absolute z-10 right-2 cursor-pointer hover:scale-105 transition-all duration-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#ffff"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" /></svg>
                        </div>

                        {fileInput.file.type.startsWith('video/') ? (
                            <video src={fileInput.url} controls></video>
                        ) : ' '}
                        {fileInput.file.type.startsWith('image/') ? (
                            <img
                                src={fileInput.url}
                                alt="Preview"
                                className="size-full object-cover rounded-lg"
                            />
                        ) : ''}
                    </div>
                )}

                <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
                    <div className="hover:scale-105">
                        <label htmlFor="fileInput" className='cursor-pointer '>
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="40px" fill="#fff">
                                <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
                            </svg>
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e => { e.key === 'Enter' && handleSendMessage(e) })}
                        placeholder="Type your message here..."
                        disabled={isLoading}
                        className="flex-grow py-2 px-4 text-white bg-transparent rounded-full outline-none transition-shadow"
                    />
                    <button
                        className='fill-white select-none cursor-pointer hover:scale-105 transition-all duration-200 '
                        type="submit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="">
                            <path d="M452-244v-400L282-477l-42-43 241-241 241 241-42 42-168-168v402h-60Z" />
                        </svg>
                    </button>
                </form>
            </footer>
        </div>
    )
}
