import express from "express";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
// Routes
app.get("/", (req, res) => {
    res.send("Hello from Node + TypeScript + ESM 🚀");
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map