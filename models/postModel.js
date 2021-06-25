const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    baslik: {
        type: String,
        required: [true, "Lütfen kullanıcı adınızı giriniz"],
        trim: true
     },
    detaylar: {
        type: String,
        required: [true, "Lütfen kullanıcı adınızı giriniz"],
        trim: true
     },
    fotograflar: {
        type: String,
        default: "https://www.euroteks.com.tr/wp-content/uploads/2013/05/765-default-avatar.png"
     },
}, {
    timestamps: true
})

module.exports = mongoose.model("Post", postSchema)