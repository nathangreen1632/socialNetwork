import express, {Router} from "express";
import { getUser as getUsers,
         createUser,
         updateUser,
         deleteUser } from "../controllers/userController.js";

const router: Router = express.Router();

// ✅ Get all users
router.get("/", async (req, res, next) => {
    try {
        await getUsers(req, res);
    } catch (error) {
        next(error);
    }
});

// ✅ Create a new user
router.post("/", async (req, res, next) => {
      try {
          await createUser(req, res);
      } catch (error) {
          next(error);
      }
  });

// ✅ Update a user by ID
router.put("/:id", async (req, res, next) => {
    try {
        await updateUser(req, res);
    } catch (error) {
        next(error);
    }
});

// ✅ Delete a user by ID
router.delete("/:id", async (req, res, next) => {
    try {
        await deleteUser(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
