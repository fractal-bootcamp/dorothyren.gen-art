import { Link } from "react-router-dom";


import { useEffect, useState } from "react"
import { getArt, createNewArt, Art } from "../artService"


function ArtFeedPage() {
    const [feed, setFeed] = useState<Art[]>([])
    const [color, setColor] = useState<string>('#F245F0')

    useEffect(() => {
        async function getData() {
            const feed = await getArt();
            if (feed) setFeed(feed)
        }
        getData()
    }, [])

    const handleNewArt = async () => {
        // call createNewArt with that color
        console.log("Current feed:", feed);
        const newArt = await createNewArt(color);
        //update the feed (setFeed) with the new art
        if (newArt) {
            setFeed(pastFeed => [newArt, ...pastFeed])
        }
    }

    // TODO: Render ART using the feed, instead of a string
    return (
        <>
            <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '40%' }}>
                    <h1> Art Feed </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '20px' }}>
                        <input
                            type="color"
                            id="colorPicker"
                            name="colorPicker"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{ width: '50px', height: '50px', marginRight: '10px' }}
                        />
                        <button style={{ padding: '10px', border: '1px dotted' }} onClick={handleNewArt}> Create New Art</button>
                    </div>
                    <div style={{ overflowY: 'scroll', maxHeight: '80vh', width: '100%', display: 'flex', flexDirection: 'column-reverse' }}>
                        {feed.map((item, index) => (
                            <div key={index} style={{ backgroundColor: item.bgColor, border: '1px solid', borderColor: 'black', padding: '40px', color: 'white', margin: '10px', borderRadius: '8px', width: '80%', position: 'relative' }}>
                                {item.bgColor}
                                <div style={{ position: 'absolute', bottom: '5px', right: '10px', fontSize: '12px', color: 'white' }}>
                                    {item.userId}
                                </div>
                            </div>
                        ))}
                    </div>
                    <ul>
                        <li><Link to="/">Return to index</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ArtFeedPage


