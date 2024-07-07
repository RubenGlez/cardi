import express from "express";
import { signUp } from "./routes/sign-up";
import { responseFormatter } from "./middleware/response-formatter";
import { PORT } from "./config";
import { logIn } from "./routes/log-in";
import { refreshToken } from "./routes/refresh-token";
import { healthCheck } from "./routes/health-check";

const app = express();

app.use(express.json());
app.use(responseFormatter);

// Routes
app.get("/", healthCheck);
app.post("/sign-up", signUp);
app.post("/log-in", logIn);
app.post("/refresh-token", refreshToken);

app.listen(PORT, () => {
  console.log(`🌍 Auth server running on port ${PORT}`);
});
