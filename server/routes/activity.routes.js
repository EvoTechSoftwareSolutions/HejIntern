import express from "express"

import { createActivity } from "../controller/activities.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";


const router = express.Router();


router.post("/",verifyToken, authorizeRoles("admin"), createActivity)


export default router;