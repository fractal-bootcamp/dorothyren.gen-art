const SERVER_URL = "http://localhost:3000"
import { z } from "zod";

//zod is the way to get type guarantees from fetch requests
const ArtSchema = z.object({
    id: z.string(),
    bgColor: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    isPublished: z.boolean(),
    userId: z.string()
});

export type Art = z.infer<typeof ArtSchema>;

async function getArt() {
    try {
        const response = await fetch(SERVER_URL);
        // making a GET request to the index page
        // parse the response as json
        const results = await response.json();
        // validate the response using zod
        const parsedResults = z.array(ArtSchema).parse(results);
        return parsedResults;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation error:", error.errors);
        } else {
            console.error("Fetch error:", error.message);
        }
    }
}
export default getArt