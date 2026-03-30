import { Router, type IRouter, type Request, type Response } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/healthz", (_req: Request, res: Response) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

// Root route for /api/
router.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok", message: "API is running" });
});

export default router;
