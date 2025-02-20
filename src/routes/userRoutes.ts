import express, {Router} from 'express';
import { getUser as getUsers,
         getAllUsers,
         createUser,
         updateUser,
         deleteUser } from '../controllers/userController.js';

const router: Router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        await getUsers(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await getAllUsers(req, res);
    } catch (error) {
        next(error);
    }
});


router.post('/', async (req, res, next) => {
      try {
          await createUser(req, res);
      } catch (error) {
          next(error);
      }
  });

router.put('/:id', async (req, res, next) => {
    try {
        await updateUser(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await deleteUser(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
