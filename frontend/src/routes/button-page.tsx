import { useState } from "react";

export default function ButtonPage() {
    //create state to store the book description 
    const [description, setDescription] = useState('')

    //function to create book in the database
    const createBookInDatabase = async (description: string) => {
        const hostname = "http://localhost:3000"; // this is the root URL of the backend server

        try {
            //send a POST request to the server to create a book 
            const response = await fetch(hostname + '/button-page', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: description // send the description of the book in the request body 
            });
            //check to see if the request was successful 
            if (!response.ok) {
                throw new Error('failed to create book in database');
            }
            //parse the response
            const result = await response.json()
            console.log('book created in database', result);
        } catch (error) {
            console.error('Error creating book:', error);
            //handle error 
        }
    }

    //maintains the state of the description field as the user types
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value); //this updates the description state as the user types 
    }

    //Handle the Post button click when user wants to Post
    const handlePostbook = () => {
        createBookInDatabase(description)
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
            <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="enter book description"
            />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3>User</h3>
                    <button>Post</button>
                    <button>Get All</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3>Book</h3>
                    <button onClick={handlePostbook}>Post</button>
                    <button>Get All</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3>Feed Post</h3>
                    <button>Post</button>
                    <button>Get All</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3>Like</h3>
                    <button>Post</button>
                    <button>Get All</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3>Friend</h3>
                    <button>Post</button>
                    <button>Get All</button>
                </div>
            </div>
        </div>
    );
}
