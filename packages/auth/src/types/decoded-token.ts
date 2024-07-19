import type { JwtPayload } from "jsonwebtoken";

import type { TokenPayload } from "./token-payload";

export interface DecodedToken extends JwtPayload, TokenPayload {}
