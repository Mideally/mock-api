const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// CORS middleware - must come first
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

	// Handle preflight requests
	if (req.method === 'OPTIONS') {
		res.status(200).end();
		return;
	}

	next();
});

// Helper function to paginate results
const paginateResults = (data, page = 1, limit = 6) => {
	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;
	const results = data.slice(startIndex, endIndex);

	return {
		data: results,
		pagination: {
			currentPage: parseInt(page),
			totalPages: Math.ceil(data.length / limit),
			totalItems: data.length,
			itemsPerPage: limit,
			hasNextPage: endIndex < data.length,
			hasPrevPage: page > 1,
		},
	};
};

// Helper function to remove diacritics using Unicode normalization
const removeDiacritics = (text) => {
	if (!text) return '';

	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();
};

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Root endpoint
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Copy all your existing routes here
app.get('/companies', (req, res) => {
	const filePath = path.join(__dirname, '..', 'data', 'companies.json');
	const page = parseInt(req.query.page) || 1;
	const limit = 6;

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('File read error:', err);
			res.status(500).json({ error: 'Failed to read companies.json' });
			return;
		}

		try {
			const companies = JSON.parse(data);
			const paginatedResults = paginateResults(companies, page, limit);

			res.json(paginatedResults);
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in companies.json' });
		}
	});
});

// Add all your other routes here...
// (Copy all the routes from your server.js file)

module.exports = app;
