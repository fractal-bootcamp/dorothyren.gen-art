import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Import the layouts
import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout'

// Import the components
import IndexPage from './routes'
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import VertexBuilder from './routes/vtx-builder.tsx'
import ButtonPage from './routes/button-page'
import ArtBuilder from './routes/artbuilder.tsx'
import Gallery from './routes/Gallery.tsx'


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      { path: "/vtx-art-builder", element: <VertexBuilder /> },
      // { path: "/button-page", element: <ButtonPage /> },
      { path: "/bg-art-builder", element: <ArtBuilder /> },
      { path: "/gallery", element: <Gallery /> },
      // {
      //   element: <DashboardLayout />,
      //   path: "dashboard",
      //   children: [
      //     { path: "/dashboard", element: <ArtFeedPage /> },
      //   ]
      // }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
