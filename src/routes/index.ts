import { Router } from 'express'
import userRouter from './user.routes'
import taskRouter from './task.routes'
import { errorHandler, notFoundHandler } from '../controllers/error.controller'

const router = Router()

router.use('/api', userRouter)
router.use('/api', taskRouter)

router.use('*', errorHandler)
router.use('*', notFoundHandler)

export default router
