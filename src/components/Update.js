import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();

    const [user, setUser] = useState(storedUser);
    const handleUpdateUser = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    alert('User Updated Successfully')
                }
            })
    }


    const handleInputChange = (e) => {
        const value = e.target.value;
        const field = e.target.name;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    }

    return (
        <div>
            <h2>please Update : {storedUser.name}</h2>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} type="text" name='name' defaultValue={storedUser.name} placeholder='name' required />
                <br />
                <input onChange={handleInputChange} type="email" name='email' placeholder='Email' defaultValue={storedUser.email} required />
                <br />
                <button type="submit">Update user</button>
            </form>
        </div>
    );
};

export default Update;