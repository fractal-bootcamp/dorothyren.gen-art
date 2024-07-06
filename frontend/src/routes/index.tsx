import { Link } from "react-router-dom";
import { SignOutButton, useUser } from "@clerk/clerk-react";

export default function IndexPage() {
    const { isSignedIn } = useUser();

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Generative Art Library</h2>
                <div>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li><Link to="/sign-up">Sign Up</Link></li>
                        <li><Link to="/sign-in">Sign In</Link></li>
                        {isSignedIn && <li><Link to="/dashboard">Dashboard</Link></li>}
                    </ul>
                </div>
                <div>
                    {isSignedIn && <SignOutButton />}
                </div>
            </div>
        </div>
    )
}