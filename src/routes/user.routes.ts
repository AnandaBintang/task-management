import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { getUsers, registerUser, login } from '../controllers/user.controller'

const userRouter = Router()

userRouter.get('/user', expressAsyncHandler(getUsers))
userRouter.post('/register', expressAsyncHandler(registerUser))
userRouter.post('/login', expressAsyncHandler(login))

export default userRouter
