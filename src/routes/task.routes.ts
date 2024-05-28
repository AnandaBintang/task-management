import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { authenticate } from '../controllers/error.controller'
import { getTasks, createTask } from '../controllers/task.controller'

const taskRouter = Router()

taskRouter.get('/task', authenticate, expressAsyncHandler(getTasks))
taskRouter.post('/task', authenticate, expressAsyncHandler(createTask))

export default taskRouter
