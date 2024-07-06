import { SignOutButton, useAuth, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// url of our backend server
// const hostname = "http://localhost:3000"

// // Function to make an API call to the backend server
// // getToken: a function that returns a Promise resolving to a token string
// // callback: a function to handle the response from the API call
// const makeAnApiCall = async (getToken: () => Promise<string | null>, callback: (res: any) => void) => {
//     // Retrieve the token by calling getToken function
//     const token = await getToken();

//     // Make a fetch request to the backend server at the root 
//     // Include the token in the Authorization header for authentication
//     const response = await fetch(hostname, {
//         headers: {            // Add the token to the Authorization header
//             // Add the token to the Authorization header
//             "Authorization": `Bearer ${token}`
//         }
//     });

//     // Parse the JSON response from the server
//     const data = await response.json();

//     // Log the response data to the console for debugging purposes
//     console.log(data);

//     // Call the callback function with the response data
//     callback(data);
// }

export default function IndexPage() {
    const { isSignedIn } = useUser();
    const { getToken } = useAuth();
    const [art, setArt] = useState([])

    const callback = (res) => {
        setArt(res)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Generative Art Library</h2>
                <div>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {!isSignedIn && <li><Link to="/sign-up">Sign Up</Link></li>}
                        {!isSignedIn && <li><Link to="/sign-in">Sign In</Link></li>}
                        {isSignedIn && <li><Link to="/dashboard">Enter Art Feed</Link></li>}
                        {isSignedIn && <li><Link to="/button-page">Button Page</Link></li>}
                        {isSignedIn && <li><Link to="/artbuilder">Art Builder</Link></li>}
                        {isSignedIn && <li><Link to="/gallery">Gallery</Link></li>}

                    </ul>
                </div>
                <div>
                    {isSignedIn && <SignOutButton />}
                </div>
                {/* <div>
                    feed:
                    {
                        art.map(piece => <div>{JSON.stringify(piece)}</div>)
                    }
                </div> */}
            </div>
        </div>
    )
}