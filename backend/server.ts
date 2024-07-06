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
app.use(ClerkExpressWithAuth())

// const exampleMiddleware: RequestHandler = (req, res, next) => {
//     // modify request
//     req.user = {
//         id: "1"
//     }

//     console.log(req.user)

//     next()
// }

//this is the clerk middleware we wrote 
app.use(optionalUser)

//on the root page, create GET to pull in prisma art data
app.get('/dashboard', async (req, res) => {
    const feed = await prisma.art.findMany()
    res.json(feed);
})

//on the home page, create route to POST art
app.post('/dashboard', async (req, res) => {
    const bgColor = req.body.bgColor
    const artPiece = await prisma.art.create({
        data: {
            bgColor: bgColor,
            userId: "cly4gfve20000khkx86pjlru1",
            isPublished: true
        }
    })
    return res.json(artPiece)
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
app.post('/button-page', async (req, res) => {
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

