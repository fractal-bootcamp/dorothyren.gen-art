import { SignUp, useAuth, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

export default function SignUpPage() {
    const { getToken } = useAuth();
    const { user, isLoaded } = useUser();
    const [isCreatingUser, setIsCreatingUser] = useState(false);

    //ensure we have user data before trying to create a database entry for a new user
    useEffect(() => {
        if (user && isLoaded) {
            createUserInDatabase();
        }
    }, [isLoaded, user])

    const createUserInDatabase = async () => {
        if (isCreatingUser) return;
        setIsCreatingUser(true);
        try {
            const token = await getToken();
            const response = await fetch('/api/create-user', {
                method: 'POST',
                headers: {
                    //this token is randomly generated all the time
                    //Clerk is going to handle updating, verifying the token and tying the token to a user
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('failed to create user in database');
            }
            //handle user creation
            console.log('user created in database');
        } catch (error) {
            console.error('Error creating user:', error);
            //handle error 
        } finally {
            setIsCreatingUser(false);
        }

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h2>Sign Up</h2>
                <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
            </div>
        </div>
    );
}
