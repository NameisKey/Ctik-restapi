const mongoose = require('mongoose')

const ctikSchema = mongoose.Schema({
    nama_konser: {
        type: String,
        required: true
    },
    tanggal_konser: {
        type: String,
        required: true
    },
    lokasi_konser: {
        type: String,
        required: true
    },
    harga_tiket: {
        type: Number,
        required: true
    },
    tentang_konser: {
        type: String,
        required: true
    },
    waktu_konser: {
        type: String,
        required: true
    },
    gambar_konser: {
        type: String,
        required: true
    },
   
    
},{
    versionKey: false
})

module.exports = mongoose.model('Ctik', ctikSchema, 'ctik');