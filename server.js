const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.listen(PORT, () => {
    console.log(`Test website running at http://localhost:${PORT}`);
    console.log('Pages available:');
    console.log(`  - http://localhost:${PORT}/          (Home - mixed accessibility)`);
    console.log(`  - http://localhost:${PORT}/products  (Products - some issues)`);
    console.log(`  - http://localhost:${PORT}/contact   (Contact - form issues)`);
});
