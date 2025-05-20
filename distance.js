require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS to allow requests from your Angular frontend
app.use(cors());
app.use(express.json());

// Distance Matrix API route
app.get("/api/distance", async (req, res) => {
    const { origin, destination } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!origin || !destination) {
        return res.status(400).json({ error: "Origin and destination are required" });
    }

    try {
        const googleResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json`,
            {
                params: {
                    origins: origin,
                    destinations: destination,
                    key: apiKey,
                },
            }
        );

        res.json(googleResponse.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch distance data", details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
