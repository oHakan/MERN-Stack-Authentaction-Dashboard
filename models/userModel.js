const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
       type: String,
       required: [true, "Lütfen kullanıcı adınızı giriniz"],
       trim: true
    },
    email: {
        type: String,
        required: [true, "Lütfen e-mail adresinizi giriniz"],
        trim: true,
        unique: true
     },
     password: {
        type: String,
        required: [true, "Lütfen şifrenizi giriniz"],
     },
     role: {
        type: Number,
        default: 0
     },
     avatar: {
        type: String,
        default: "https://www.euroteks.com.tr/wp-content/uploads/2013/05/765-default-avatar.png"
     },
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)