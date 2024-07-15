const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// module.exports.register = (req, res) => {
//     debugger;
//     console.info(req.body); 
//     res.send('Registration endpoint hit');
// };
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.info('DB connected');
}).catch(err => {
    console.error(err.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})