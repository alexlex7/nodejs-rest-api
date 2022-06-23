const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('database connected, server running on port 3000');
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
// app.listen(3000, () => {
//   console.log('Server running. Use our API on port: 3000');
// });

// passwor zz2wOgupzAiydCPg
// mongodb+srv://alexlex7:zz2wOgupzAiydCPg@cluster0.0rtkc.mongodb.net/test
