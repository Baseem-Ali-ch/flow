import {Router} from 'express'
import { users } from '../controllers/user.controller'

const router = Router()

router.get('/admin', users)

export default router