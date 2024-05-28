import { type NextFunction, type Request, type Response } from 'express'
import { create, getAll } from '../services/task.service'
import { TaskType, validateCreateTask } from '../validations/task.validation'
import { findUnique } from '../services/user.service'

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAll()
    res.status(200).json({
      error: null,
      message: 'Get all tasks successfully',
      data
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error in src/controllers/task.controller.ts: getTasks - ' +
          error.message
      )
    )
  }
}

export const getUniqueTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const task = await findUnique(id)
    if (!task) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Task not found',
        data: null
      })
    }
    return res.status(200).json({
      error: null,
      message: 'Get task successfully',
      data: task
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error in src/controllers/task.controller.ts: getUniqueTask - ' +
          error.message
      )
    )
  }
}

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = validateCreateTask(req.body)
    if (data) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid Data',
        data
      })
    }

    const { title, description, status, priority, deadline, userId } = req.body
    const taskData: TaskType = {
      title,
      description,
      status,
      priority,
      deadline,
      userId
    }

    const task = await create(taskData)
    return res.status(201).json({
      error: null,
      message: 'Task created successfully',
      data: task
    })
  } catch (error: Error | any) {
    next(
      new Error(
        'Error in src/controllers/task.controller.ts: createTask - ' +
          error.message
      )
    )
  }
}
