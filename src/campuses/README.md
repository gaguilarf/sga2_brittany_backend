# 🏢 Campuses Module - Documentation

## Overview

Complete CRUD module for managing campuses (sedes) following Clean Architecture principles with role-based access control.

## 📁 Structure

```
src/campuses/
├── domain/
│   ├── dtos/
│   │   ├── create-campus.dto.ts       # DTO for creating campus
│   │   ├── update-campus.dto.ts       # DTO for updating campus
│   │   └── campus-response.dto.ts     # DTO for API responses
│   └── repositories/
│       └── campuses.repository.interface.ts  # Repository interface
├── application/
│   └── services/
│       └── campuses.service.ts        # Business logic
├── infrastructure/
│   └── persistence/
│       └── typeorm/
│           └── campuses.typeorm-entity.ts  # Database entity
├── presentation/
│   └── controllers/
│       └── campuses.controller.ts     # REST API endpoints
└── campuses.module.ts                 # NestJS module
```

## 🔐 Role-Based Access Control

| Endpoint | Method | Roles Allowed | Description |
|----------|--------|---------------|-------------|
| `/api/campuses` | POST | Administrador (1), Secretaria (4) | Create campus |
| `/api/campuses` | GET | All (1, 2, 3, 4) | Get all campuses |
| `/api/campuses/active` | GET | All (1, 2, 3, 4) | Get active campuses |
| `/api/campuses/:id` | GET | All (1, 2, 3, 4) | Get campus by ID |
| `/api/campuses/:id` | PATCH | Administrador (1) | Update campus |
| `/api/campuses/:id` | DELETE | Administrador (1) | Delete campus |

### Role Permissions

- **Administrador (1)**: Full CRUD access
- **Docente (2)**: Read-only access
- **Desarrollador (3)**: Read-only access
- **Secretaria (4)**: Can create and read (no delete)

## 📝 API Endpoints

### 1. Create Campus

**POST** `/api/campuses`

**Roles**: Administrador, Secretaria

**Request Body**:
```json
{
  "name": "Sede Central Lima",
  "address": "Av. Javier Prado 123, San Isidro",
  "district": "San Isidro",
  "active": true
}
```

**Response** (201):
```json
{
  "id": 1,
  "name": "Sede Central Lima",
  "address": "Av. Javier Prado 123, San Isidro",
  "district": "San Isidro",
  "active": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### 2. Get All Campuses

**GET** `/api/campuses`

**Roles**: All

**Response** (200):
```json
[
  {
    "id": 1,
    "name": "Sede Central Lima",
    "address": "Av. Javier Prado 123, San Isidro",
    "district": "San Isidro",
    "active": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

### 3. Get Active Campuses

**GET** `/api/campuses/active`

**Roles**: All

**Response** (200):
```json
[
  {
    "id": 1,
    "name": "Sede Central Lima",
    "address": "Av. Javier Prado 123, San Isidro",
    "district": "San Isidro",
    "active": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

### 4. Get Campus by ID

**GET** `/api/campuses/:id`

**Roles**: All

**Response** (200):
```json
{
  "id": 1,
  "name": "Sede Central Lima",
  "address": "Av. Javier Prado 123, San Isidro",
  "district": "San Isidro",
  "active": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### 5. Update Campus

**PATCH** `/api/campuses/:id`

**Roles**: Administrador only

**Request Body**:
```json
{
  "name": "Sede Central Lima - Actualizada",
  "active": false
}
```

**Response** (200):
```json
{
  "id": 1,
  "name": "Sede Central Lima - Actualizada",
  "address": "Av. Javier Prado 123, San Isidro",
  "district": "San Isidro",
  "active": false,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T11:45:00Z"
}
```

### 6. Delete Campus

**DELETE** `/api/campuses/:id`

**Roles**: Administrador only

**Response** (204): No content

## ✅ Validations

### Create Campus DTO

- `name`: Required, string, max 255 characters
- `address`: Optional, string, max 255 characters
- `district`: Optional, string, max 100 characters
- `active`: Optional, boolean, default: true

### Update Campus DTO

All fields are optional (partial update)

## 🔒 Security Features

1. **JWT Authentication**: All endpoints require valid JWT token
2. **Role-Based Authorization**: Different permissions per role
3. **Input Validation**: DTOs with class-validator
4. **Conflict Detection**: Prevents duplicate campus names
5. **Logging**: All operations are logged

## 🧪 Testing Examples

### Using cURL

```bash
# Login first
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "Admin123!"}' \
  -c cookies.txt

# Create campus
curl -X POST http://localhost:3002/api/campuses \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Sede Central Lima",
    "address": "Av. Javier Prado 123",
    "district": "San Isidro"
  }'

# Get all campuses
curl -X GET http://localhost:3002/api/campuses \
  -b cookies.txt

# Get active campuses
curl -X GET http://localhost:3002/api/campuses/active \
  -b cookies.txt

# Get campus by ID
curl -X GET http://localhost:3002/api/campuses/1 \
  -b cookies.txt

# Update campus
curl -X PATCH http://localhost:3002/api/campuses/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"active": false}'

# Delete campus
curl -X DELETE http://localhost:3002/api/campuses/1 \
  -b cookies.txt
```

### Using Swagger

Access: `http://localhost:3002/api/docs`

1. Click "Authorize" button
2. Login to get JWT cookie
3. Test endpoints in the "Campuses" section

## 📊 Database Schema

**Table**: `sedes` (unchanged)

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| id | INT | NO | Primary key |
| name | VARCHAR(255) | NO | Campus name |
| address | VARCHAR(255) | YES | Campus address |
| district | VARCHAR(100) | YES | District |
| active | BOOLEAN | NO | Active status |
| created_at | TIMESTAMP | NO | Creation date |
| updated_at | TIMESTAMP | NO | Last update |

## 🚀 Next Steps

This module serves as a template for implementing the remaining modules:
- Plans
- Students
- Enrollments
- Payments
- Grades
- Attendance

Each module will follow the same Clean Architecture pattern with role-based access control.
