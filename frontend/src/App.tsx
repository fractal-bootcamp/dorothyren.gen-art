import { useEffect, useState } from "react"
import { getArt, createNewArt, Art } from "./artService"

function App() {
  const [feed, setFeed] = useState<Art[]>([])

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
    const newArt = await createNewArt('green');
    //update the feed (setFeed) with the new art
    if (newArt) {
      setFeed(pastFeed => [newArt, ...pastFeed])
    }
  }

  // TODO: Render ART using the feed, instead of a string
  return (
    <>
      <div style={{ width: '100vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1> Art Feed </h1>
          {feed.map((item, index) => (
            <div key={index} style={{ backgroundColor: item.bgColor, border: '1px solid', borderColor: 'black', padding: '40px', color: 'white', margin: '10px', borderRadius: '8px' }}>{item.bgColor}</div>
          ))}
          <button style={{ padding: '10px', border: '1px dotted' }} onClick={handleNewArt}> New Art </button>
        </div>
      </div>
    </>
  )
}

export default App

