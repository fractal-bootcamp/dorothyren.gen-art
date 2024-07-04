//this file contains all the logic we need to set up the server
//setting up middleware and routes
import "dotenv/config"

//runs a bunch of stuff to create a new server and return it to you
import { ClerkExpressWithAuth, type EmailAddress } from "@clerk/clerk-sdk-node";
import express, { type RequestHandler } from "express";
import cookieParser from "cookie-parser";
import optionalUser from "./middleware/middleware-auth";
import prisma from "./prisma/client";
import cors from "cors";

//which we are now calling app 
const app = express()

// using middleware 
app.use(cors())
app.use(express.json())
// allow urlencoded data to be submitted using middleware
app.use(express.urlencoded({ extended: true }))
//allow cookies to be interpreted 
app.use(cookieParser())
// clerk modifies the request by adding req.auth
// this takes the token and communicates with clerk to get user information
// which gets assigned to req.auth
app.use(ClerkExpressWithAuth())
//this is the clerk middleware we wrote for auth
app.use(optionalUser)


// const exampleMiddleware: RequestHandler = (req, res, next) => {
//     // modify request
//     req.user = {
//         id: "1"
//     }

//     console.log(req.user)

//     next()
// }

//on the /artfeed endpoint, create GET to pull in prisma art data
app.get('/artfeed', async (req, res) => {
    try{
        const feed = await prisma.art.findMany({
            orderBy: {
                createdAt: 'desc' //returns the most recent first 
            },
        })
        res.json(feed);
    }
    catch (error) {
        console.error('Error fetching art feed', error);
        res.status(500).json({ error: 'An error occurred while fetching the art feed' });
    }
})

//on the /artfeed endpoint, create route to POST art
app.post('/artfeed', async (req, res) => {
    const bgColor = req.body.bgColor
    const userId = req.user?.id

    if (!bgColor) {
        return res.status(400).json({ error: 'bgColor and userId are required' });
    }

    if (!userId) {
        return res.status(400).json({ error: 'youn r not aut5hed' });
    }

    try {
        const artPiece = await prisma.art.create({
            data: {
                bgColor: bgColor,
                isPublished: true,
                userId: userId
            }
        });
        return res.json(artPiece);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create art piece' });
    }
})
//on the art/:id pages, create GET route
// app.get('/art/:id', async (req, res) => {
//     const id = req.params.id

//     console.log("I am a request handler", req.user)

//     try {

//     }
//     catch (error) {
//         console.error(error.message)
//     }
//     return res.json({ id })
// })


//on the sign-up page, create a POST to create a new user
app.post('/sign-up', async (req, res) => {
    const email = req.user?.email;
    const clerkId = req.user?.clerkId;
    //if either email or clerkId is not found, then 
    if (!email || !clerkId) {
        return res.status(400).json({error: 'User information is missing'})
    }
    try {
        const newUser = await prisma.users.findFirst({
            where: {
                clerkId: clerkId,
            }
        });
        return res.json(newUser);
    } catch (error) {
        return res.status(500).json({ error: "Failed to create user" });
    }
});

//on the button-page, create a POST to create a new book 
app.post('/book', async (req, res) => {
    const description = req.body.description

    if (!description) {
        return res.status(400).json({error: 'Book description is missing'})
    }
    try {
        const newBook = await prisma.book.create({
            data: {
                description : description,
            }
        });
        return res.json(newBook)
    } catch (error)
 {
    return res.status(500).json({error: 'Failed to create new book'});
 }})


app.listen(3000, () => {
    console.log("server is running on port 3000");
});

export default app

