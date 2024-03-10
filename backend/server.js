import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/user.routes.js";
import hotelRoutes from "./routes/hotel.routes.js";
import travelRoutes from "./routes/travel.routes.js";
import connectDB from "./config/db.js";

connectDB()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}))

app.use(cookieParser())

app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/travel",travelRoutes)

app.get("/", (req, res) => res.send("server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is Running at ${port}`));
