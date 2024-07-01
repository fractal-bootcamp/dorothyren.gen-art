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



app.get('/', async (req, res) => {
    const feed = await prisma.art.findMany()
    res.json(feed);
})

app.post('/', async (req, res) => {
    const bgColor = req.body.bgColor
    await prisma.art.create({
        data: {
            bgColor: bgColor,
            userId: "cly3d6d8i000082v163hgac63",
            isPublished: true
        }
    })
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
});

export default app

