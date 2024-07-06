//this file contains all the logic we need to set up the server
//setting up middleware and routes

//runs a bunch of stuff to create a new server and return it to you
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma from "./prisma/client";
import type { Art } from "@prisma/client";
//which we are now calling app 
const app = express()

//using middleware 
app.use(cors())
app.use(express.json())
// allow urlencoded data to be submitted using middleware
app.use(express.urlencoded({ extended: true }))
//allow cookies to be interpreted 
app.use(cookieParser())




//on the home page, create GET to pull in prisma art data
app.get('/', async (req, res) => {
    const feed = await prisma.art.findMany()
    res.json(feed);
})

//on the home page, create route to POST art
app.post('/', async (req, res) => {
    const bgColor = req.body.bgColor
    const artPiece = await prisma.art.create({
        data: {
            bgColor: bgColor,
            userId: "cly3d6d8i000082v163hgac63",
            isPublished: true
        }
    })
    return res.json(artPiece)
})

//on the art/:id pages, create GET route
app.get('art/:id', async (req, res) => {
    const id = req.params.id
    try {

    }
    catch (error) {
        console.error(error.message)
    }
})



app.listen(3000, () => {
    console.log("server is running on port 3000");
});

export default app

