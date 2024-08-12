const http = require('http');

const groceries = [
    { id: 1, name: 'Apples', quantity: 10, category: 'Fruits' },
    { id: 2, name: 'Bread', quantity: 2, category: 'Bakery' },
    { id: 3, name: 'Milk', quantity: 1, category: 'Dairy' },
    { id: 4, name: 'Eggs', quantity: 12, category: 'Dairy' },
    { id: 5, name: 'Carrots', quantity: 5, category: 'Vegetables' },
    { id: 6, name: 'Chicken Breast', quantity: 4, category: 'Meat' },
    { id: 7, name: 'Pasta', quantity: 3, category: 'Grains' },
    { id: 8, name: 'Tomatoes', quantity: 8, category: 'Vegetables' },
    { id: 9, name: 'Cheese', quantity: 1, category: 'Dairy' },
    { id: 10, name: 'Bananas', quantity: 6, category: 'Fruits' }
];

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/groceries') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(groceries));
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
