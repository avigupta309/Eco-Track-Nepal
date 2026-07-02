import { Router } from "express";
import { sosSet, findSosUser, removeHelper } from "../controllers/sos.js";
import {
  requestReceive,
  SendImmediateAlert,
  sosHelperAvailable,
  updateRequestStatus,
} from "../controllers/requestedSos.js";

export const sosRouter = Router();

sosRouter
  .post("/set", sosSet)
  .post("/show", findSosUser)
  .put("/update", updateRequestStatus)
  .delete("/remove", removeHelper)
  .post("/alert", SendImmediateAlert)
  .post("/requestreceive", requestReceive)
  .post("/soshelper", sosHelperAvailable);
