import React, { useEffect, useState } from "react";

export const DashboardMessages = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [conversations, setConversations] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const loadMessages = async (userId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${backendUrl}/api/messages/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Could not load messages");
            }

            const data = await response.json();
            setMessages(data);

        } catch (error) {
            console.error(error);
        }
    };

    const loadConversations = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${backendUrl}/api/messages/conversations`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            setConversations(data);

            if (data.length > 0 && !selectedUser) {
                setSelectedUser(data[0]);
                loadMessages(data[0].id);
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadConversations();

        const seller = JSON.parse(localStorage.getItem("selectedSeller"));

        if (seller) {
            setSelectedUser(seller);
            loadMessages(seller.id);
            localStorage.removeItem("selectedSeller");
        }
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim() || !selectedUser) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${backendUrl}/api/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    receiver_id: selectedUser.id,
                    content: newMessage
                })
            });

            if (!response.ok) {
                const errorData = await response.json();

                throw new Error(
                    errorData.error ||
                    errorData.message ||
                    "Could not send message"
                );
            }

            setNewMessage("");
            loadMessages(selectedUser.id);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="dashboard-section dashboard-messages-section">
            <div className="section-header">
                <h2>My Messages</h2>
                <p>View and manage conversations with other users.</p>
            </div>

            <div className="dashboard-messages-layout">
                <aside className="conversations-panel">
                    <h3>Conversations</h3>

                    {conversations.length === 0 ? (
                        <p className="empty-message">
                            No conversations yet.
                        </p>
                    ) : (
                        <div className="conversations-list">
                            {conversations.map((conversation) => (
                                <button
                                    key={conversation.id}
                                    type="button"
                                    className={`conversation-item ${
                                        selectedUser?.id === conversation.id ? "active" : ""
                                    }`}
                                    onClick={() => {
                                        setSelectedUser(conversation);
                                        loadMessages(conversation.id);
                                    }}
                                >
                                    <span className="conversation-avatar">
                                        {conversation.name?.charAt(0)}
                                    </span>

                                    <span>{conversation.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </aside>

                <div className="chat-panel">
                    {!selectedUser ? (
                        <div className="empty-chat-state">
                            <h3>No conversation selected</h3>
                            <p>
                                Select a seller from a product page to start a conversation.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="message-user-header">
                                <div className="seller-avatar">
                                    {selectedUser.name?.charAt(0)}
                                </div>

                                <div>
                                    <h3>{selectedUser.name}</h3>
                                    <p>Conversation</p>
                                </div>
                            </div>

                            <div className="messages-list">
                                {messages.length === 0 ? (
                                    <p className="empty-message">
                                        No messages yet. Start the conversation.
                                    </p>
                                ) : (
                                    messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={
                                                message.sender_id === selectedUser.id
                                                    ? "message-received"
                                                    : "message-sent"
                                            }
                                        >
                                            {message.content}
                                        </div>
                                    ))
                                )}
                            </div>

                            <form
                                onSubmit={handleSendMessage}
                                className="message-form"
                            >
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Write a message..."
                                    aria-label="Write a message"
                                />

                                <button type="submit">
                                    Send
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};