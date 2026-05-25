import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable must be set in production");
  } else {
    console.warn("[WARN] JWT_SECRET is not set — using insecure dev default. Set it before going to production.");
  }
}

const EFFECTIVE_SECRET = JWT_SECRET || "nyumba-dev-secret-NOT-for-production";

export interface AuthRequest extends Request {
  user?: { userId: number; email: string; userType: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized — no token" });
  }
  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, EFFECTIVE_SECRET) as { userId: number; email: string; userType: string };
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized — invalid token" });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (req.user?.userType !== "admin") {
      return res.status(403).json({ error: "Forbidden — admin only" });
    }
    next();
  });
}

export { EFFECTIVE_SECRET as JWT_SECRET_RESOLVED };

// Sets req.user if a valid Bearer token is present; does not block if absent
export function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    try {
      const decoded = jwt.verify(token, EFFECTIVE_SECRET) as { userId: number; email: string; userType: string };
      req.user = decoded;
    } catch {
      // invalid token — treat as anonymous
    }
  }
  next();
}
