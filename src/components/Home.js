import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);
    const handleDelete = (_id) => {
        const agree = window.confirm('Are you sure you want to delete this user?');
        if (agree) {
            fetch(`http://localhost:5000/users/${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert('User Deleted Successfully');
                        const remainingUsers = displayUsers.filter(user => user._id !== _id);
                        setDisplayUsers(remainingUsers);
                    }
                })
        }
    }

    return (
        <div>
            <h1>this is home</h1>
            <p>Users : {displayUsers.length} </p>
            <div>
                {
                    displayUsers.map(user => <p key={user._id}>{user.name} {user.email}
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDelete(user._id)}>X</button></p>)
                }
            </div>
        </div>
    );
};

export default Home;