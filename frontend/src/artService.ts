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

export async function getArt() {
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

export async function createNewArt(bgColor: string): Promise<Art> {
    try {
        const response = await fetch(SERVER_URL, {
            //make a POST request to the index page 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bgColor }),
        });
        //parse the response as json
        const result = await response.json();
        const newArt = ArtSchema.parse(result);
        return newArt;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation error:", error.errors);
        } else {
            console.error("Fetch error:", error.message);
        }
    }
    return { error: "something bad happened" }
}






