import { Router } from 'express'
import sessionsRoute from './routes/sessionsRoute.js'
import chatsRoute from './routes/chatsRoute.js'
import groupsRoute from './routes/groupsRoute.js'

const router = Router()

router.use('/sessions', sessionsRoute)
router.use('/chats', chatsRoute)
router.use('/groups', groupsRoute)

export default router
