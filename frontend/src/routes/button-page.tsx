import { useState } from "react";

export default function ButtonPage() {
    //create state to store the book description 
    const [description, setDescription] = useState('')
    //useAuth is a custom hook from the Clerk library that returns an object with various auth related functions and properties
    //including getToken. we need to destructure it here to use it. 
    //getToken is a function that retrieces the current auth token for the loggedin user
    // const { getToken } = useAuth();
    //useUser is also a custom hook from the Clerk library that provides access to the current user's info and auth state
    // user is an objcet that contains the current user's info - id, email, etc.
    //isLoaded is a boolean indicating if the user data has been loaded
    //we use useUser because it helps for conditional rendering components or performing actions based on user's auth state
    // const { user, isLoaded } = useUser();

    //function to create book in the database
    const createBookInDatabase = async (description: string) => {
        const hostname = "http://localhost:3000"; // this is the root URL of the backend server

        try {
            //send a POST request to the server to create a book 
            const response = await fetch(hostname + '/book', {
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
    const handleDescriptionChange = (event: any) => {
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
                placeholder="enter description"
            />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>

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
