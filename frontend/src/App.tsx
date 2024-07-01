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
      <div>
        my react app: {JSON.stringify(feed)}
        feed.map()
      </div>
    </>
  )
}

export default App
