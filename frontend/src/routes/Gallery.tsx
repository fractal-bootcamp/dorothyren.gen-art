import { useEffect, useState } from 'react';
import { z } from 'zod';

const SERVER_URL = "http://localhost:3000";
//zod is the way to get type guarantees from fetch requests
const ArtSchema = z.object({
    id: z.string(),
    bgColor: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    isPublished: z.boolean(),
    userId: z.string()
});

type Art = z.infer<typeof ArtSchema>;

type BGArt = {
    id: string;
    type: 'BG';
    bgColor: string;
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
    userId: string;
}

type VertexArt = {
    id: string;
    type: 'VERTEX';
    vertexNodes: number;
    vertexLineColor: string;
    vertexNodeColor: string;
    createdAt: string;
    updatedAt: string;
    isPublished: boolean;
    userId: string;
}

type Feed = (BGArt | VertexArt)[]

export default function Gallery() {
    //Art[] is a typescript annotation saying that artPieces is an array of objects
    //conforming to the Art type, as inferred from the ArtSchema as defined using zod

    //this state is created to store the fetched art pieces 
    const [artPieces, setArtPieces] = useState<Feed>([]);
    //this state is to track if the data is still being fetched


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchArt();
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [artPieces]);

    const fetchArt = async () => {
        try {
            //fetch the GET from localhost:3000/artfeed
            const response = await fetch(SERVER_URL + '/artfeed');
            const fetchedArt = await response.json() as Feed;
            console.log(fetchedArt)
            setArtPieces(fetchedArt);
        }
        catch (error) {
            console.error('Error fetching art pieces:', error);
        }
    }

    return (
        <div>
            <h2>Art Gallery</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {artPieces.map((art) => {
                    if (art.type === "BG") {
                        //if art.type === BG return 
                        //if art.type === VERTEX 
                        return <div key={art.id} style={{
                            backgroundColor: art.bgColor,
                            width: '200px',
                            height: '200px',
                            border: '1px solid black',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                        </div>
                    }
                    if (art.type === "VERTEX") {
                        // TODO: Implement the VertexArt componentx
                        return null
                    }
                })}
            </div>
        </div>
    )
}

