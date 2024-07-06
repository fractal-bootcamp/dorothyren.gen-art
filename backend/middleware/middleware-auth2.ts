// import { type RequestHandler } from "express";

// import {  clerkClient } from "@clerk/clerk-sdk-node";

// import { PrismaClient } from "@prisma/client";

// //this middleware is written to handle the authorization process between
// //Clerk and the frontend client
// //we will need to use:
// //a clerk client to get the User information from Clerk 
// //Prisma to handle creating a new user in the database if there is not already a user
// // use RequestHandler from express to 

// const prisma = new PrismaClient();

// const optionalUser2 : RequestHandler = async (req, res, next) => {
//     //grab the token from the auth header
//     //the format of headers will always be "Bearer ${token}"
//     const token = req.headers.authorization?.split(' ')[1];

//     //extract the clerkId from the request's auth property
//     const clerkId = req.auth.userId

//     //if there is a clerk user ID
//     if (clerkId) {
//         //look up the yser in the database using prisma
//         const user = await prisma.users.findFirst({
//             where: {
//                 clerkId //match the clerk userID
//             }
//         })
//     //if a user is found in the database
//     if (user) {
//         console.log("found user", user)
    
//         //if user does exist, assign user to req.user
//         //req.user is a custom property is a custom property we added to the standard req object in Express
//         req.user = user;
//     } else {
//         //if the user is not found in the databasem fetch the user from Clerk 
//         const clerkUser = await clerkClient.users.getUser(clerkId)

//         //extract the email and put the data into the database using prisma
//         const email = clerkUser.emailAddresses[0].emailAddress
//         const newUser = await prisma.users.create({
//             data: {
//                 clerkId,
//                 email
//             }
//         })
//         //log the newly created user
//         console.log("created a new user", newUser);
//         req.user = newUser; 
//     }
//     console.log("user is", req.user)
// }
// next();
// }

// // export default optionalUser2