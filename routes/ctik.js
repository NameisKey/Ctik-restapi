const express = require('express');
const router = express.Router();
const Ctik = require('../models/Ctik');
const { ObjectId } = require('mongodb')

// Route GET untuk mendapatkan semua data tiket konser
router.get('/get', async (req, res) => {
  try {
    const tiketKonser = await Ctik.find();
    res.json({ success: 1, message: 'Data tiket konser berhasil ditampilkan', konser: tiketKonser });
  } catch (err) {
    res.status(500).json({ success: 0, message: err.message });
  }
});

// Route GET untuk mendapatkan data tiket konser berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const tiketKonser = await Ctik.findById(req.params.id);
    if (!tiketKonser) {
      return res.status(404).json({ message: 'Data tiket konser tidak ditemukan' });
    }
    res.json(tiketKonser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route POST untuk membuat data tiket konser baru
router.post('/add', async (req, res) => {
  const tiketKonser = new Ctik({
    nama_konser: req.body.nama_konser,
    tanggal_konser: req.body.tanggal_konser,
    lokasi_konser: req.body.lokasi_konser,
    harga_tiket: req.body.harga_tiket,
    tentang_konser: req.body.tentang_konser,
    waktu_konser: req.body.waktu_konser,
    gambar_konser: req.body.gambar_konser,
    konser_id: req.body.konser_id
  });

  try {
    const newTiketKonser = await tiketKonser.save();
    res.status(201).json({ message: 'Tiket konser berhasil ditambahkan', data: newTiketKonser });
  } catch (err) {
    res.status(400).json({ message: 'Gagal menambahkan tiket konser', error: err.message });
  }
});

// Route PUT untuk memperbarui data tiket konser berdasarkan ID
router.put('/update/:id', async (req, res) => {
  try {
    const tiketKonser = await Ctik.findById(req.params.id);
    if (!tiketKonser) {
      return res.status(404).json({ message: 'Data tiket konser tidak ditemukan' });
    }

    tiketKonser.konser_id = req.body.konser_id;
    tiketKonser.nama_konser = req.body.nama_konser;
    tiketKonser.tanggal_konser = req.body.tanggal_konser;
    tiketKonser.lokasi_konser = req.body.lokasi_konser;
    tiketKonser.harga_tiket = req.body.harga_tiket;
    tiketKonser.tentang_konser = req.body.tentang_konser;
    tiketKonser.waktu_konser = req.body.waktu_konser;
    tiketKonser.gambar_konser = req.body.gambar_konser;

    const updatedTiketKonser = await tiketKonser.save();
    res.json({ message: 'Data tiket konser berhasil diperbarui', data: updatedTiketKonser });
  } catch (err) {
    res.status(400).json({ message: 'Gagal memperbarui data tiket konser', error: err.message });
  }
});

// Route DELETE untuk menghapus data tiket konser berdasarkan ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const tiketKonser = await Ctik.findByIdAndDelete(new ObjectId(req.params.id));
    if (!tiketKonser) {
      return res.status(404).json({success:0, message: 'Data tiket konser tidak ditemukan' });
    }

    res.json({ success: 1, message: 'Data tiket konser berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success:0 ,message: 'Gagal menghapus data tiket konser', error: err.message });
  }
});

module.exports = router;
