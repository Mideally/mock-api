'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
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

app.get('/companies', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'companies.json');
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

app.get('/companies/type/:type', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'companies.json');
	const type = req.params.type;
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
			const filteredCompanies = companies.filter((company) => company.companyDetails?.businessType === type);

			const paginatedResults = paginateResults(filteredCompanies, page, limit);

			res.json(paginatedResults);
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in companies.json' });
		}
	});
});

app.get('/companies/megamenu', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'companies.json');

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('File read error:', err);
			res.status(500).json({ error: 'Failed to read companies.json' });

			return;
		}

		try {
			const companies = JSON.parse(data);

			// Group companies by business type
			const companiesByType = companies.reduce((acc, company) => {
				const businessType = company.companyDetails?.businessType;

				if (businessType) {
					if (!acc[businessType]) {
						acc[businessType] = [];
					}

					acc[businessType].push(company);
				}
				return acc;
			}, {});

			// Create megamenu structure
			const megamenuData = {
				defaultActive: 'cafenele',
				cafenele: {
					title: 'Cafenele populare',
					label: 'Cafenele',
					url: '/cafenele',
					items: (companiesByType.cafenea || []).slice(0, 2).map((company, index) => ({
						id: company.id,
						title: company.companyDetails.name,
						image: company.locations?.[0]?.featuredImage || '/assets/images/cafenea1.webp',
						url: `/${company.slug}`,
					})),
				},
				patiserii: {
					title: 'Patiserii recomandate',
					label: 'Patiserii',
					url: '/patiserii',
					items: (companiesByType.patiserie || []).slice(0, 2).map((company, index) => ({
						id: company.id,
						title: company.companyDetails.name,
						image: company.locations?.[0]?.featuredImage || '/assets/images/patiserie1.jpg',
						url: `/${company.slug}`,
					})),
				},
				restaurante: {
					title: 'Restaurante populare',
					label: 'Restaurante',
					url: '/restaurante',
					items: (companiesByType.restaurant || []).slice(0, 2).map((company, index) => ({
						id: company.id,
						title: company.companyDetails.name,
						image: company.locations?.[0]?.featuredImage || '/assets/images/cafenea1.webp',
						url: `/${company.slug}`,
					})),
				},
				servicii: {
					title: 'Servicii recomandate',
					label: 'Servicii',
					url: '/servicii',
					items: (companiesByType.servicii || []).slice(0, 2).map((company, index) => ({
						id: company.id,
						title: company.companyDetails.name,
						image: company.locations?.[0]?.featuredImage || '/assets/images/cafenea1.webp',
						url: `/${company.slug}`,
					})),
				},
				magazine: {
					title: 'Magazine populare',
					label: 'Magazine',
					url: '/magazine',
					items: (companiesByType.magazin || []).slice(0, 2).map((company, index) => ({
						id: company.id,
						title: company.companyDetails.name,
						image: company.locations?.[0]?.featuredImage || '/assets/images/cafenea1.webp',
						url: `/${company.slug}`,
					})),
				},
			};

			res.json({ data: megamenuData });
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in companies.json' });
		}
	});
});

app.get('/companies/:slug', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'companies.json');

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('File read error:', err);
			res.status(500).json({ error: 'Failed to read companies.json' });

			return;
		}

		try {
			const companies = JSON.parse(data);
			const company = companies.find((c) => c.slug === req.params.slug);

			if (!company) {
				res.status(404).json({ error: 'Company not found' });
				return;
			}
			res.json(company);
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in companies.json' });
		}
	});
});

app.get('/companies/city/:city', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'companies.json');
	const city = req.params.city;
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
			const filteredCompanies = companies.filter((company) =>
				company.locations?.some(
					(location) =>
						removeDiacritics(location.address?.city?.toLowerCase()) === removeDiacritics(city.toLowerCase())
				)
			);

			const paginatedResults = paginateResults(filteredCompanies, page, limit);

			res.json(paginatedResults);
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in companies.json' });
		}
	});
});

app.get('/companies/county/:county', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'companies.json');
	const county = req.params.county;
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
			const filteredCompanies = companies.filter((company) =>
				company.locations?.some(
					(location) =>
						removeDiacritics(location.address?.county?.toLowerCase()) ===
						removeDiacritics(county.toLowerCase())
				)
			);

			const paginatedResults = paginateResults(filteredCompanies, page, limit);

			res.json(paginatedResults);
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in companies.json' });
		}
	});
});

// Moments endpoints
app.get('/moments', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'moments.json');
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 6;

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('File read error:', err);
			res.status(500).json({ error: 'Failed to read moments.json' });
			return;
		}

		try {
			const moments = JSON.parse(data);
			const paginatedResults = paginateResults(moments, page, limit);

			res.json(paginatedResults);
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in moments.json' });
		}
	});
});

app.get('/moments/expiring-soon', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'moments.json');

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('File read error:', err);
			res.status(500).json({ error: 'Failed to read moments.json' });
			return;
		}

		try {
			const moments = JSON.parse(data);
			const now = new Date();

			// Filter moments that haven't ended yet and sort by closest to expiry
			const activeMoments = moments
				.filter((moment) => new Date(moment.endTime) > now)
				.sort((a, b) => new Date(a.endTime) - new Date(b.endTime))
				.slice(0, 6);

			res.json({ data: activeMoments });
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in moments.json' });
		}
	});
});

app.get('/moments/:id', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'moments.json');
	const momentId = req.params.id;

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('File read error:', err);
			res.status(500).json({ error: 'Failed to read moments.json' });
			return;
		}

		try {
			const moments = JSON.parse(data);
			const moment = moments.find((m) => m.id === momentId);

			if (!moment) {
				res.status(404).json({ error: 'Moment not found' });
				return;
			}

			res.json(moment);
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in moments.json' });
		}
	});
});

app.get('/moments/business/:businessId', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'moments.json');
	const businessId = req.params.businessId;
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 6;

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('File read error:', err);
			res.status(500).json({ error: 'Failed to read moments.json' });
			return;
		}

		try {
			const moments = JSON.parse(data);
			const filteredMoments = moments.filter((moment) => moment.business.id === businessId);
			const paginatedResults = paginateResults(filteredMoments, page, limit);

			res.json(paginatedResults);
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in moments.json' });
		}
	});
});

// Drops endpoints
app.get('/drops', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'drops.json');
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 6;

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('File read error:', err);
			res.status(500).json({ error: 'Failed to read drops.json' });
			return;
		}

		try {
			const drops = JSON.parse(data);
			const paginatedResults = paginateResults(drops, page, limit);

			res.json(paginatedResults);
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in drops.json' });
		}
	});
});

app.get('/drops/ending-soon', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'drops.json');

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('File read error:', err);
			res.status(500).json({ error: 'Failed to read drops.json' });
			return;
		}

		try {
			const drops = JSON.parse(data);

			// Filter drops that still have availability and sort by least remaining
			const availableDrops = drops
				.filter((drop) => drop.available > 0)
				.sort((a, b) => a.available - b.available)
				.slice(0, 7);

			res.json({ data: availableDrops });
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in drops.json' });
		}
	});
});

app.get('/drops/:id', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'drops.json');
	const dropId = req.params.id;

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('File read error:', err);
			res.status(500).json({ error: 'Failed to read drops.json' });
			return;
		}

		try {
			const drops = JSON.parse(data);
			const drop = drops.find((d) => d.id === dropId);

			if (!drop) {
				res.status(404).json({ error: 'Drop not found' });
				return;
			}

			res.json(drop);
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in drops.json' });
		}
	});
});

app.get('/drops/business/:businessId', (req, res) => {
	const filePath = path.join(__dirname, 'data', 'drops.json');
	const businessId = req.params.businessId;
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 6;

	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('File read error:', err);
			res.status(500).json({ error: 'Failed to read drops.json' });
			return;
		}

		try {
			const drops = JSON.parse(data);
			const filteredDrops = drops.filter((drop) => drop.business.id === businessId);
			const paginatedResults = paginateResults(filteredDrops, page, limit);

			res.json(paginatedResults);
		} catch (parseErr) {
			res.status(500).json({ error: 'Invalid JSON format in drops.json' });
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
