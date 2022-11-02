import React, { useState } from 'react';

const AddUser = () => {

    const [user, setUser] = useState({})


    const handleAddUser = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('User Added Successfully')
                    e.target.reset()
                }
            })
    }
    const handleInputBlur = (e) => {
        const value = e.target.value;
        const field = e.target.name;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    }


    return (
        <div>
            <h2>Please add a new user</h2>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleInputBlur} type="text" name='name' placeholder='name' required />
                <br />
                <input onBlur={handleInputBlur} type="email" name='email' placeholder='Email' required />
                <br />
                <button type="submit">Add user</button>
            </form>
        </div>
    );
};

export default AddUser;