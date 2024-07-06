import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
    const navigate = useNavigate();

    return (
        <ClerkProvider
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
            publishableKey={PUBLISHABLE_KEY}
        >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <header className="header" style={{ width: '100%', textAlign: 'center' }}>
                    <div>

                        <SignedOut>
                            <Link to="/sign-in">Sign In</Link>
                        </SignedOut>
                    </div>
                </header>
                <main style={{ width: '100%', textAlign: 'center' }}>
                    <Outlet />
                </main>
            </div>
            <SignedIn>
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <UserButton afterSignOutUrl='/sign-in' />
                </div>
            </SignedIn>
        </ClerkProvider>
    )
}
