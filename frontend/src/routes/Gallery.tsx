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

export default function Gallery() {
    //Art[] is a typescript annotation saying that artPieces is an array of objects
    //conforming to the Art type, as inferred from the ArtSchema as defined using zod

    //this state is created to store the fetched art pieces 
    const [artPieces, setArtPieces] = useState<Art[]>([]);
    //this state is to track if the data is still being fetched

    useEffect(() => {
        fetchArt();
    }, [artPieces])

    const fetchArt = async () => {
        try {
            //fetch the GET from localhost:3000/artfeed
            const response = await fetch(SERVER_URL + '/artfeed');
            const fetchedArt = await response.json();
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
                {artPieces.map((art) => (
                    <div key={art.id} style={{
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
                ))}
            </div>
        </div>
    )
}

