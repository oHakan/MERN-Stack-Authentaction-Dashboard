const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.post('/register', userController.register)

router.post('/activation', userController.activateEmail)

router.post('/login', userController.login)

router.post('/refresh_token', userController.getAccessToken)

router.post('/forgot', userController.forgotPassword)

router.post('/reset', auth, userController.resetPassword)

router.get('/infor', auth, userController.getUserInfor)

router.get('/all_infor', auth, authAdmin, userController.getUsersAllInfor)

router.get('/logout', userController.logout)

router.patch('/update', userController.updateUser)

router.patch('/update_all/:id', auth, authAdmin, userController.updateUsersRole)

router.patch('/delete/:id', auth, authAdmin, userController.deleteUser)

router.post('/post', userController.postdata)

router.get('/allpost', userController.allpost)

router.get('/mypost/:baslik', userController.mypost)





module.exports = router