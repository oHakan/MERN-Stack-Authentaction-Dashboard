require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

// Router
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))

//MongoDB bağlantısı
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("MongoDB bağlantısı başarılı")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('server aktif olarak çalışıyor', PORT)
})