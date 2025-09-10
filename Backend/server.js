// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import maincontactRoutes from './routes/maincontactRoutes.js'; // .js
import chatRoutes from "./routes/chatRoutes.js";
import { join } from "path";
import authRoute from "./routes/auth.js"
import storyRoute from "./routes/story.js"
import userRoute from "./routes/user.js"
import commentRoute from "./routes/comment.js"
import connectDatabase from "./Helpers/database/connectDatabase.js";
import customErrorHandler from "./Middlewares/Errors/customErrorHandler.js";
import careerRoutes from "./routes/careerRoutes.js";


const app = express();
// ✅ Global CORS setup

// ✅ global cors setup
const allowedOrigins = [
  "http://127.0.0.1:5500",
   "http://127.0.0.1:5501",
   "http://localhost:5501",
  "http://localhost:5500",
  "http://localhost:3000",
  "https://itspaxiosinnovation.in",
  /\.vercel\.app$/   // ✅ allow any subdomain of vercel.app
];
app.options('*', cors()); // enable pre-flight for all routes

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / curl
    if (allowedOrigins.some(o => o instanceof RegExp ? o.test(origin) : o === origin)) {
      return callback(null, true);
    }
    console.log("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS","PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use((req, res, next) => {
  console.log("Request origin:", req.headers.origin);
  next();
});

app.use(express.json());

// Connect to MongoDB
dotenv.config();
connectDatabase();

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/main", maincontactRoutes);
app.use("/api/chat", chatRoutes)
app.use("/api/auth",authRoute)
app.use("/story",storyRoute)
app.use("/user",userRoute)
app.use("/comment",commentRoute)
app.use("/api/careers", careerRoutes);

// Error handler
app.use(customErrorHandler);

// Static files (should be before listen)
app.use(express.static(join(process.cwd(), "public")));


// Health check
app.get("/", (req, res) => res.send("API is running"));

// Error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} : ${process.env.NODE_ENV}`);
});
// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error : ${err}`);
  server.close(() => process.exit(1));
});
