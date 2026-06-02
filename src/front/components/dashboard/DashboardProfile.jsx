import React, { useEffect, useState } from "react";

export const DashboardProfile = () => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({

        first_name: "",

        last_name: "",

        email: ""
    });

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {

            headers: {

                "Authorization": `Bearer ${token}`,

                "Content-Type": "application/json"
            }

        })

            .then(response => {

                if (!response.ok) {
                    throw new Error("Could not load profile");
                }

                return response.json();
            })

            .then(data => {

                setUser(data);

                setFormData({

                    first_name: data.first_name || "",

                    last_name: data.last_name || "",

                    email: data.email || ""
                });

                setLoading(false);
            })

            .catch(error => {

                console.error(error);

                setLoading(false);
            });

    }, []);

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value
        });
    };

    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to permanently delete your account?"
        );

        if (!confirmed) return;

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg);
            }

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            alert("Account deleted successfully");

            window.location.href = "/";

        } catch (error) {

            console.error(error);

            alert("Could not delete account");

        }
    };

    const handleSave = () => {

        const token = localStorage.getItem("token");

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {

            method: "PUT",

            headers: {

                "Authorization": `Bearer ${token}`,

                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)

        })

            .then(response => {

                if (!response.ok) {
                    throw new Error("Could not update profile");
                }

                return response.json();
            })

            .then(data => {

                setUser(data.user);

                setIsEditing(false);
            })

            .catch(error => console.error(error));
    };

    if (loading) {

        return (

            <section className="dashboard-section">

                <h2>Personal Information</h2>

                <p className="dashboard-message">
                    Loading profile...
                </p>

            </section>
        );
    }

    if (!user) {

        return (

            <section className="dashboard-section">

                <h2>Personal Information</h2>

                <p className="dashboard-message">
                    Could not load profile.
                </p>

            </section>
        );
    }

    const initials = user.first_name
        ? user.first_name.charAt(0).toUpperCase()
        : "U";

    return (

        <section className="dashboard-section">

            <div className="section-header">

                <h2>Personal Information</h2>

                <div className="d-flex gap-2">

                    {!isEditing ? (

                        <button
                            className="section-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit Profile
                        </button>

                    ) : (

                        <button
                            className="section-btn"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>

                    )}

                    <button
                        className="delete-account-btn"
                        onClick={handleDelete}
                    >
                        Delete Account
                    </button>

                </div>

            </div>

            <div className="profile-card">

                <div className="profile-avatar">

                    {initials}

                </div>

                <div className="profile-info">

                    <div className="profile-row">

                        <span>First Name</span>

                        {!isEditing ? (

                            <strong>
                                {user.first_name}
                            </strong>

                        ) : (

                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="profile-input"
                            />

                        )}

                    </div>

                    <div className="profile-row">

                        <span>Last Name</span>

                        {!isEditing ? (

                            <strong>
                                {user.last_name}
                            </strong>

                        ) : (

                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="profile-input"
                            />

                        )}

                    </div>

                    <div className="profile-row">

                        <span>Email</span>

                        {!isEditing ? (

                            <strong>
                                {user.email}
                            </strong>

                        ) : (

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="profile-input"
                            />

                        )}

                    </div>

                    <div className="profile-row">

                        <span>Member Since</span>

                        <strong>

                            {user.created_at

                                ? new Date(
                                    user.created_at
                                ).toLocaleDateString()

                                : "Recently"}

                        </strong>

                    </div>

                </div>

            </div>

        </section>
    );
};