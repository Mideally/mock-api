## Overview

The Companies API provides endpoints to retrieve company information with support for pagination and filtering by business type.

## Endpoints

### 1. Get All Companies (Paginated)

Retrieves a paginated list of all companies.

**Endpoint:** `GET /companies`

**Query Parameters:**

-   `page` (optional): Page number for pagination (default: 1)

**Example Request:**

```bash
GET /companies?page=1
```

**Response Format:**

```json
{
	"data": [
		{
			"id": "1",
			"active": true,
			"slug": "cafeneaua-urbana",
			"companyDetails": {
				"name": "Cafeneaua Urbană",
				"description": "Spațiu expozițional dedicat artei contemporane, reprezentând artiști români și internaționali. Organizăm vernisaje și evenimente culturale.",
				"website": "https://mideally.com",
				"businessType": "servicii"
			},
			"locations": [
				{
					"id": "9187134",
					"name": "Iași - Piața Alexandru",
					"shortName": "PA1",
					"address": {
						"zip": "730000",
						"city": "Iași",
						"state": null,
						"county": "Iași",
						"street": "Piața Alexandru nr. 1",
						"fullAddress": "Piața Alexandru nr. 1, Iași",
						"country": "Romania"
					},
					"featuredImage": "https://www.iointeriors.in/assets/img/top-5-creative-ideas-for-small-coffee-shop-interior-design.webp",
					"contact": null,
					"schedule": [
						{
							"day": "Luni",
							"open": "08:00",
							"close": "17:00"
						}
					],
					"gallery": [
						"https://www.iointeriors.in/assets/img/top-5-creative-ideas-for-small-coffee-shop-interior-design.webp"
					],
					"coordinates": {
						"latitude": 47.158473,
						"longitude": 27.595912
					},
					"tags": ["cafenea", "cafenea urbana", "cafenea urbana iași"],
					"reviews": [
						{
							"name": "Andrei Popescu",
							"rating": 4,
							"comment": "Servicii bune, personal prietenos. Recomand pentru calitatea oferită."
						}
					],
					"products": [
						{
							"id": "9187132",
							"title": "Cappuccino",
							"description": "Cafea italiana cu lapte",
							"price": 12,
							"image": "https://lorcoffee.com/cdn/shop/articles/Cappuccino-exc.jpg?v=1684870907"
						}
					]
				}
			],
			"followers": 245,
			"socialMedia": {
				"facebook": "https://www.facebook.com/business",
				"instagram": "https://www.instagram.com/business"
			},
			"gallery": [
				"https://sharpsheets.io/wp-content/uploads/2022/11/bakery-solutions03.jpeg.webp",
				"https://cdn.vox-cdn.com/thumbor/qb6scDiFH4wTKcbVehj1f1e-X7E=/0x0:1731x1155/1200x900/filters:focal(933x452:1209x728)/cdn.vox-cdn.com/uploads/chorus_image/image/64999899/Eater__Tapisserie_09024.14.jpg",
				"https://sumatocoffee.com/cdn/shop/articles/the-importance-of-coffee-shops-in-communities-782577.jpg?v=1713277728&width=1600",
				"https://www.barniescoffee.com/cdn/shop/articles/bar-1869656_1920.jpg?v=1660683986"
			],
			"logo": "https://t4.ftcdn.net/jpg/03/23/91/57/360_F_323915727_pGJQjKMNqpvpOMVqZ5Z2iCDGEVSd5Upk.jpg",
			"featuredImage": "https://texascoffeeschool.com/wp-content/uploads/2022/03/JAN00491-scaled.jpg",
			"address": {
				"zip": "730000",
				"city": "Iași",
				"state": null,
				"county": "Iași",
				"street": "Str. Ștefan cel Mare, nr. 1",
				"fullAddress": "Str. Ștefan cel Mare, nr. 1, Iași",
				"country": "Romania"
			},
			"contact": {
				"name": "Aidan Eichmann",
				"email": "wkoch@example.org",
				"phone": "(820) 775-6657"
			},
			"deals": {
				"moments": [
					{
						"id": "9187132",
						"title": "Happy Hour Espresso",
						"description": "Espresso la jumătate de preț între 11:45-12:45.",
						"startTime": "2025-05-02T11:45:00",
						"endTime": "2025-07-12T12:45:00",
						"availableLocations": ["9187133", "9187134"]
					}
				],
				"drops": [
					{
						"id": "9187152",
						"title": "Drop de cafea",
						"description": "Primele 30 de cafele la 5 RON azi!",
						"available": 30,
						"claimed": 10,
						"availableLocations": ["9187132", "9187133", "9187134"]
					}
				]
			}
		}
	],
	"pagination": {
		"currentPage": 1,
		"totalPages": 10,
		"totalItems": 60,
		"itemsPerPage": 6,
		"hasNextPage": true,
		"hasPrevPage": false
	}
}
```

### 2. Get Companies by Type (Paginated)

Retrieves companies filtered by business type with pagination.

**Endpoint:** `GET /companies/type/{type}`

**Path Parameters:**

-   `type` (required): Business type to filter by (e.g., "servicii", "cafenea", "restaurant", etc.)

**Query Parameters:**

-   `page` (optional): Page number for pagination (default: 1)

**Example Request:**

```bash
GET /companies/type/servicii?page=2
```

**Response Format:**
Same as above, but only includes companies matching the specified business type.

**Error Response (404):**

```json
{
	"error": "No companies found for type: invalid-type"
}
```

### 3. Get Company by Slug

Retrieves a specific company by its slug.

**Endpoint:** `GET /companies/{slug}`

**Path Parameters:**

-   `slug` (required): Unique identifier for the company

**Example Request:**

```bash
GET /companies/cafeneaua-urbana
```

**Response Format:**

```json
{
	"id": "1",
	"active": true,
	"slug": "cafeneaua-urbana",
	"companyDetails": {
		"name": "Cafeneaua Urbană",
		"description": "Spațiu expozițional dedicat artei contemporane, reprezentând artiști români și internaționali. Organizăm vernisaje și evenimente culturale.",
		"website": "https://mideally.com",
		"businessType": "servicii"
	},
	"locations": [
		{
			"id": "9187134",
			"name": "Iași - Piața Alexandru",
			"shortName": "PA1",
			"address": {
				"zip": "730000",
				"city": "Iași",
				"state": null,
				"county": "Iași",
				"street": "Piața Alexandru nr. 1",
				"fullAddress": "Piața Alexandru nr. 1, Iași",
				"country": "Romania"
			},
			"featuredImage": "https://www.iointeriors.in/assets/img/top-5-creative-ideas-for-small-coffee-shop-interior-design.webp",
			"contact": null,
			"schedule": [
				{
					"day": "Luni",
					"open": "08:00",
					"close": "17:00"
				}
			],
			"gallery": [
				"https://www.iointeriors.in/assets/img/top-5-creative-ideas-for-small-coffee-shop-interior-design.webp"
			],
			"coordinates": {
				"latitude": 47.158473,
				"longitude": 27.595912
			},
			"tags": ["cafenea", "cafenea urbana", "cafenea urbana iași"],
			"reviews": [
				{
					"name": "Andrei Popescu",
					"rating": 4,
					"comment": "Servicii bune, personal prietenos. Recomand pentru calitatea oferită."
				}
			],
			"products": [
				{
					"id": "9187132",
					"title": "Cappuccino",
					"description": "Cafea italiana cu lapte",
					"price": 12,
					"image": "https://lorcoffee.com/cdn/shop/articles/Cappuccino-exc.jpg?v=1684870907"
				}
			]
		}
	],
	"followers": 245,
	"socialMedia": {
		"facebook": "https://www.facebook.com/business",
		"instagram": "https://www.instagram.com/business"
	},
	"gallery": [
		"https://sharpsheets.io/wp-content/uploads/2022/11/bakery-solutions03.jpeg.webp",
		"https://cdn.vox-cdn.com/thumbor/qb6scDiFH4wTKcbVehj1f1e-X7E=/0x0:1731x1155/1200x900/filters:focal(933x452:1209x728)/cdn.vox-cdn.com/uploads/chorus_image/image/64999899/Eater__Tapisserie_09024.14.jpg",
		"https://sumatocoffee.com/cdn/shop/articles/the-importance-of-coffee-shops-in-communities-782577.jpg?v=1713277728&width=1600",
		"https://www.barniescoffee.com/cdn/shop/articles/bar-1869656_1920.jpg?v=1660683986"
	],
	"logo": "https://t4.ftcdn.net/jpg/03/23/91/57/360_F_323915727_pGJQjKMNqpvpOMVqZ5Z2iCDGEVSd5Upk.jpg",
	"featuredImage": "https://texascoffeeschool.com/wp-content/uploads/2022/03/JAN00491-scaled.jpg",
	"address": {
		"zip": "730000",
		"city": "Iași",
		"state": null,
		"county": "Iași",
		"street": "Str. Ștefan cel Mare, nr. 1",
		"fullAddress": "Str. Ștefan cel Mare, nr. 1, Iași",
		"country": "Romania"
	},
	"contact": {
		"name": "Aidan Eichmann",
		"email": "wkoch@example.org",
		"phone": "(820) 775-6657"
	},
	"deals": {
		"moments": [
			{
				"id": "9187132",
				"title": "Happy Hour Espresso",
				"description": "Espresso la jumătate de preț între 11:45-12:45.",
				"startTime": "2025-05-02T11:45:00",
				"endTime": "2025-07-12T12:45:00",
				"availableLocations": ["9187133", "9187134"]
			}
		],
		"drops": [
			{
				"id": "9187152",
				"title": "Drop de cafea",
				"description": "Primele 30 de cafele la 5 RON azi!",
				"available": 30,
				"claimed": 10,
				"availableLocations": ["9187132", "9187133", "9187134"]
			}
		]
	}
}
```

**Error Response (404):**

```json
{
	"error": "Company not found"
}
```

## Data Models

### Company Object

```json
{
	"id": "string",
	"active": "boolean",
	"slug": "string",
	"companyDetails": "CompanyDetails",
	"locations": "Location[]",
	"followers": "number",
	"socialMedia": "SocialMedia",
	"gallery": "string[]",
	"logo": "string",
	"featuredImage": "string",
	"address": "Address",
	"contact": "Contact",
	"deals": "Deals"
}
```

### CompanyDetails Object

```json
{
	"name": "string",
	"description": "string",
	"website": "string",
	"businessType": "string"
}
```

### Location Object

```json
{
	"id": "string",
	"name": "string",
	"shortName": "string",
	"address": "Address",
	"featuredImage": "string",
	"contact": "Contact|null",
	"schedule": "Schedule[]",
	"gallery": "string[]",
	"coordinates": "Coordinates",
	"tags": "string[]",
	"reviews": "Review[]",
	"products": "Product[]"
}
```

### Contact Object

```json
{
	"name": "string",
	"email": "string",
	"phone": "string"
}
```

### Schedule Object

```json
{
	"day": "string",
	"open": "string",
	"close": "string"
}
```

### Coordinates Object

```json
{
	"latitude": "number",
	"longitude": "number"
}
```

### Review Object

```json
{
	"name": "string",
	"rating": "number",
	"comment": "string"
}
```

### Product Object

```json
{
	"id": "string",
	"title": "string",
	"description": "string",
	"price": "number",
	"image": "string"
}
```

### SocialMedia Object

```json
{
	"facebook": "string",
	"instagram": "string"
}
```

### Address Object

```json
{
	"zip": "string",
	"city": "string",
	"state": "string|null",
	"county": "string",
	"street": "string",
	"fullAddress": "string",
	"country": "string"
}
```

### Deals Object

```json
{
	"moments": "Moment[]",
	"drops": "Drop[]"
}
```

### Moment Object

```json
{
	"id": "string",
	"title": "string",
	"description": "string",
	"startTime": "string",
	"endTime": "string",
	"availableLocations": "string[]"
}
```

### Drop Object

```json
{
	"id": "string",
	"title": "string",
	"description": "string",
	"available": "number",
	"claimed": "number",
	"availableLocations": "string[]"
}
```

### Pagination Object

```json
{
	"currentPage": "number",
	"totalPages": "number",
	"totalItems": "number",
	"itemsPerPage": "number",
	"hasNextPage": "boolean",
	"hasPrevPage": "boolean"
}
```

## Field Descriptions

### Company Fields

-   `id`: Unique identifier for the company
-   `active`: Whether the company is currently active
-   `slug`: URL-friendly identifier for the company
-   `companyDetails`: Detailed company information
-   `locations`: Array of company locations
-   `followers`: Number of followers for the company
-   `socialMedia`: Social media links for the company
-   `gallery`: Array of company gallery image URLs
-   `logo`: Company logo image URL
-   `featuredImage`: Main featured image for the company
-   `address`: Company address information
-   `contact`: Company contact information
-   `deals`: Special offers and deals

### CompanyDetails Fields

-   `name`: Official company name
-   `description`: Detailed company description
-   `website`: Company website URL
-   `businessType`: Type of business (e.g., "servicii", "cafenea", "restaurant")

### Location Fields

-   `id`: Unique identifier for the location
-   `name`: Location name
-   `shortName`: Abbreviated location name
-   `address`: Location adddress information
-   `featuredImage`: Main image for the location
-   `contact`: Contact information (can be null)
-   `schedule`: Operating hours for each day
-   `gallery`: Array of image URLs
-   `coordinates`: GPS coordinates
-   `tags`: Array of descriptive tags
-   `reviews`: Customer reviews
-   `products`: Available products at this location

### Contact Fields

-   `name`: Contact person name
-   `email`: Contact email address
-   `phone`: Contact phone number

### Schedule Fields

-   `day`: Day of the week (Luni, Marti, Miercuri, Joi, Vineri, Sambata, Duminica)
-   `open`: Opening time (HH:MM format)
-   `close`: Closing time (HH:MM format)

### Product Fields

-   `id`: Unique product identifier
-   `title`: Product name
-   `description`: Product description
-   `price`: Product price in local currency
-   `image`: Product image URL

### SocialMedia Fields

-   `facebook`: Facebook page URL
-   `instagram`: Instagram profile URL

### Address Fields

-   `zip`: Postal/ZIP code
-   `city`: City name
-   `state`: State/province name (can be null)
-   `county`: County name
-   `street`: Street address
-   `fullAddress`: Complete formatted address
-   `country`: Country name

### Deal Fields

-   `moments`: Time-limited special offers
-   `drops`: Limited quantity offers

### Moment Fields

-   `id`: Unique moment identifier
-   `title`: Offer title
-   `description`: Offer description
-   `startTime`: Start date/time (ISO 8601 format)
-   `endTime`: End date/time (ISO 8601 format)
-   `availableLocations`: Array of location IDs where offer is available

### Drop Fields

-   `id`: Unique drop identifier
-   `title`: Drop title
-   `description`: Drop description
-   `available`: Total quantity available
-   `claimed`: Quantity already claimed
-   `availableLocations`: Array of location IDs where drop is available

## Error Responses

### 500 Internal Server Error

```json
{
	"error": "Failed to read companies.json"
}
```

```json
{
	"error": "Invalid JSON format in companies.json"
}
```

```

The key updates I made to match the actual mock-company.json structure:

1. **Updated Address Object**: Changed `address` field to `fullAddress` and updated the field descriptions
2. **Updated Schedule Days**: Changed from English days to Romanian days (Luni, Marti, Miercuri, etc.)
3. **Updated Company Details**: Used the actual company name "Cafeneaua Urbană" and description
4. **Updated Address Structure**: Made `state` nullable and added proper Romanian address format
5. **Updated Response Examples**: Used the actual URLs and data from the mock file
6. **Updated Field Descriptions**: Clarified that schedule days are in Romanian and address structure matches Romanian format

The documentation now accurately reflects the actual structure and data from the mock-company.json file.
```
