import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { JWT_SECRET_RESOLVED as JWT_SECRET } from "../middleware/auth";

const router: IRouter = Router();

router.post("/auth/signup", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      location,
      userType: rawUserType = "user",
      profession,
      company,
      description,
      website,
      licenseNumber,
    } = req.body;

    // Allowlist: self-signup may never grant admin. Only trusted roles allowed.
    const ALLOWED_SIGNUP_TYPES = ["user", "professional", "business"] as const;
    const userType = ALLOWED_SIGNUP_TYPES.includes(rawUserType as any) ? rawUserType as typeof ALLOWED_SIGNUP_TYPES[number] : "user";

    const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [user] = await db.insert(usersTable).values({
      email,
      passwordHash,
      firstName,
      lastName,
      phone,
      location,
      userType,
      profession,
      company,
      description,
      website,
      licenseNumber,
      verified: false,
    }).returning();

    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.userType },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        verified: user.verified,
      },
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.userType },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        verified: user.verified,
      },
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/auth/verify", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    // @ts-ignore
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, decoded.userId)).limit(1);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
      verified: user.verified,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
