import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { env } from "./env";
import { loggerMiddleware } from "./middleware/logger";
import { healthCheck } from "./routes/health-check";
import { logIn } from "./routes/log-in";
import { logOut } from "./routes/log-out";
import { refreshToken } from "./routes/refresh-token";
import { signUp } from "./routes/sign-up";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.get("/api", healthCheck);
app.post("/api/signup", signUp);
app.post("/api/login", logIn);
app.post("/api/logout", logOut);
app.post("/api/refresh-token", refreshToken);

app.listen(env.AUTH_API_PORT, () => {
  console.log(`🌍 Auth server running on port ${env.AUTH_API_PORT}`);
});
