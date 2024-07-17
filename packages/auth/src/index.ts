import cors from "cors";
import express from "express";

import { env } from "./env";
import { responseFormatter } from "./middleware/response-formatter";
import { healthCheck } from "./routes/health-check";
import { logIn } from "./routes/log-in";
import { refreshToken } from "./routes/refresh-token";
import { signUp } from "./routes/sign-up";

const app = express();

app.use(cors());
app.use(express.json());
app.use(responseFormatter);

// Routes
app.get("/", healthCheck);
app.post("/sign-up", signUp);
app.post("/log-in", logIn);
app.post("/refresh-token", refreshToken);

app.listen(env.AUTH_API_PORT, () => {
  console.log(`🌍 Auth server running on port ${env.AUTH_API_PORT}`);
});
