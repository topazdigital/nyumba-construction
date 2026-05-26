import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import articlesRouter from "./articles";
import propertiesRouter from "./properties";
import professionalsRouter from "./professionals";
import contractorsRouter from "./contractors";
import suppliersRouter from "./suppliers";
import eventsRouter from "./events";
import messagesRouter from "./messages";
import settingsRouter from "./settings";
import commentsRouter from "./comments";
import seedRouter from "./seed";
import newsletterRouter from "./newsletter";
import advertisementsRouter from "./advertisements";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(articlesRouter);
router.use(propertiesRouter);
router.use(professionalsRouter);
router.use(contractorsRouter);
router.use(suppliersRouter);
router.use(eventsRouter);
router.use(messagesRouter);
router.use(settingsRouter);
router.use(commentsRouter);
router.use(seedRouter);
router.use(newsletterRouter);
router.use(advertisementsRouter);

export default router;
