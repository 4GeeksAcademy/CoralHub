import React, { useEffect, useState } from "react";

export const DashboardMessages = () => {

    const [selectedUser, setSelectedUser] = useState(null);

    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const loadMessages = async (userId) => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${backendUrl}/api/messages/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Could not load messages");
            }

            const data = await response.json();

            setMessages(data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        const seller = JSON.parse(
            localStorage.getItem("selectedSeller")
        );

        if (!seller) return;

        setSelectedUser(seller);

        loadMessages(seller.id);

        localStorage.removeItem(
            "selectedSeller"
        );

    }, []);

    const handleSendMessage = async (e) => {

        e.preventDefault();
        console.log("Sending...");

        if (!newMessage.trim()) return;

        if (!selectedUser) return;

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${backendUrl}/api/messages`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        receiver_id: selectedUser.id,
                        content: newMessage
                    })
                }
            );

            console.log("Status:", response.status);

            if (!response.ok) {

                const errorData = await response.json();

                console.log("Backend Error:", errorData);

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

        <section className="dashboard-section">

            <div className="section-header">

                <h2>My Messages</h2>

            </div>

            {!selectedUser ? (

                <p>
                    Select a seller from a product page to start a conversation.
                </p>

            ) : (

                <>

                    <div className="message-user-header">

                        <div className="seller-avatar">
                            {selectedUser.name?.charAt(0)}
                        </div>

                        <h3>
                            {selectedUser.name}
                        </h3>

                    </div>
                    <div className="messages-list">

                        {messages.map(message => (

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

                        ))}

                    </div>

                    <form
                        onSubmit={handleSendMessage}
                        className="message-form"
                    >

                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) =>
                                setNewMessage(
                                    e.target.value
                                )
                            }
                            placeholder="Write a message..."
                        />

                        <button type="submit">

                            Send

                        </button>

                    </form>

                </>

            )}

        </section>

    );
};