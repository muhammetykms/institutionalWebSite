const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:12345@104.247.173.85:27017/myDatabase?authSource=admin')
  .then(async () => {
    console.log('Veritabanına başarıyla bağlanıldı.');
    
    // Test veri çekme işlemi
    const result = await mongoose.connection.db.collection('announcements').findOne({});
    console.log('Veri:', result);
    
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Veritabanı bağlantı hatası:', error);
  });
