import { z } from "zod";
import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { createNewArt } from "../artService";

//zod is the way to get type guarantees from fetch requests
const ArtSchema = z.object({
    id: z.string(),
    type: z.enum(["BG", "VERTEX"]),
    bgColor: z.string().nullable(),
    vertexNodes: z.number().nullable(),
    vertexLineColor: z.string().nullable(),
    vertexNodeColor: z.string().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    isPublished: z.boolean(),
    userId: z.string()
});

export type Art = z.infer<typeof ArtSchema>;

type ArtState = "draft" | "loading" | "published"

export function ArtBuilder() {
    const { getToken } = useAuth(); //grab auth token 
    const [bgColor, setBgColor] = useState('#ffffff')
    const [artState, setArtState] = useState<ArtState>("draft")
    const { user } = useUser();

    const handleColorChange = async (event) => {
        setBgColor(event.target.value)
    }

    //creates a POST request to the server at serverurl/artfeed to save the new art being created
    const handleSave = async (bgColor: string) => {
        const SERVER_URL = "http://localhost:3000"
        const token = await getToken();

        if (!token) {
            console.error("No token found");
            return;
        }

        setArtState("loading");
        const newArt = await createNewArt(bgColor, token);
        setArtState("published")
    }

    if (artState === "loading") {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Loading
                    <span className="ellipsis">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                </div>
                <style>
                    {`
                        @keyframes ellipsis {
                            0% {
                                opacity: 0;
                            }
                            33% {
                                opacity: 1;
                            }
                            66% {
                                opacity: 0;
                            }
                        }
                        .ellipsis span {
                            animation: ellipsis 1s infinite;
                        }
                        .ellipsis span:nth-child(1) {
                            animation-delay: 0s;
                        }
                        .ellipsis span:nth-child(2) {
                            animation-delay: 0.33s;
                        }
                        .ellipsis span:nth-child(3) {
                            animation-delay: 0.66s;
                        }
                    `}
                </style>
            </div>
        );
    }

    if (artState === "published") {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>
                    Your art has been successfully published!
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button onClick={() => window.location.reload()} style={{ padding: '10px', border: '1px solid green', backgroundColor: 'white', color: 'green', cursor: 'pointer' }}>
                        Create Another Art
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <input
                type="color"
                value={bgColor}
                onChange={handleColorChange}
                style={{ width: '50px', height: '50px', marginRight: '10px' }}
            />
            <div
                style={{
                    backgroundColor: bgColor,
                    width: '200px',
                    height: '200px',
                    border: '1px solid black',
                    marginTop: '10px'
                }}
            />
            <button onClick={() => handleSave(bgColor)} style={{ padding: '10px', border: '1px dotted', marginTop: '10px' }}>
                Save Art
            </button>
        </div>
    )
}

export default ArtBuilder