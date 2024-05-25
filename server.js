const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/auth');

const app = express();


app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/auth_demo')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/auth', authRoutes);


app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'You have accessed the protected route!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
