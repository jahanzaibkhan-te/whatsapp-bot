import { Router } from 'express'
import { body } from 'express-validator'
import requestValidator from './../middlewares/requestValidator.js'
import sessionValidator from './../middlewares/sessionValidator.js'
import * as controller from './../controllers/sessionsController.js'

const router = Router()


router.get('/deviceList', controller.deviceList)
router.get('/server-status', controller.find);
router.post('/add', body('id').notEmpty(), body('isLegacy').notEmpty(), requestValidator, controller.add)

router.get('/status/:id', sessionValidator, controller.status)
router.get('/find/:id', sessionValidator, controller.find);
router.delete('/delete/:id', sessionValidator, controller.del)



export default router
