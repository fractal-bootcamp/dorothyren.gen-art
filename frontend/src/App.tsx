import { useEffect, useState } from "react"
import getArt, { Art } from "./artService"

function App() {
  const [feed, setFeed] = useState<Art[]>([])

  useEffect(() => {
    async function getData() {
      const feed = await getArt();
      if (feed) setFeed(feed)
    }
    getData()
  }, [])

  // TODO: Render ART using the feed, instead of a string

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <h1> Art Feed </h1>
        {feed.map((item, index) => (
          <div key={index} style={{ backgroundColor: item.bgColor, border: '1px solid', borderColor: 'black', padding: '40px', font: 'mono', color: 'white', margin: '10px' }}>{item.bgColor}</div>
        ))}
      </div>
    </>
  )
}

export default App
