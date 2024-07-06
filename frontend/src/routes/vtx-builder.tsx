import { Link } from "react-router-dom";

import { useEffect, useState } from "react"
import { Art, createVertexArt } from "../artService"
import VertexArtBuilder from "../components/VertexArtBuilder"
import CustomGraph from "../components/VertexArtBuilder";
import { useAuth, useUser } from "@clerk/clerk-react";


function VertexBuilder() {


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <VertexArtBuilder
            />

            <div style={{ marginBottom: '20px' }}>
                <Link to="/">Return to index</Link>
            </div>
        </div>
    );
}
export default VertexBuilder
