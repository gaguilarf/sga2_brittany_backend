# 🎯 Guía Rápida - Registro de Usuario

## ✅ Roles Creados

Los siguientes roles ya están disponibles en la base de datos:

| ID | Nombre | Descripción |
|----|--------|-------------|
| 1 | Administrador | Acceso completo al sistema |
| 2 | Docente | Acceso a gestión académica y asistencia |
| 3 | Desarrollador | Acceso técnico al sistema |
| 4 | Secretaria | Acceso a registro de datos (sin permisos de eliminación) |

## 📝 Cómo Registrar un Usuario

### Opción 1: Usando Swagger UI

1. Accede a: `http://localhost:3002/api/docs`
2. Busca el endpoint `POST /api/auth/register`
3. Click en "Try it out"
4. Usa este ejemplo:

```json
{
  "username": "admin",
  "password": "Admin123!",
  "fullname": "Administrador Principal",
  "email": "admin@brittanygroup.edu.pe",
  "phone": "+51987654321",
  "roleId": 1
}
```

### Opción 2: Usando cURL

```bash
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin123!",
    "fullname": "Administrador Principal",
    "email": "admin@brittanygroup.edu.pe",
    "phone": "+51987654321",
    "roleId": 1
  }'
```

### Opción 3: Usando Postman/Insomnia

**URL:** `POST http://localhost:3002/api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "admin",
  "password": "Admin123!",
  "fullname": "Administrador Principal",
  "email": "admin@brittanygroup.edu.pe",
  "phone": "+51987654321",
  "roleId": 1
}
```

## 🔐 Después del Registro

Una vez registrado, puedes iniciar sesión:

```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin123!"
  }' \
  -c cookies.txt
```

Esto creará una cookie HTTP-only con tu JWT token.

## 🔄 Si Necesitas Recrear los Roles

Si por alguna razón necesitas recrear los roles:

```bash
npm run seed:roles
```

## 📋 Validaciones del Registro

- **username**: Mínimo 3 caracteres, único
- **password**: Mínimo 6 caracteres
- **fullname**: Requerido
- **email**: Formato válido, único
- **phone**: Opcional
- **roleId**: Debe ser 1, 2, 3 o 4 (debe existir en la tabla roles)

## ⚠️ Errores Comunes

### "Cannot add or update a child row: foreign key constraint fails"
- **Causa**: El `roleId` especificado no existe
- **Solución**: Usa `roleId: 1`, `2`, `3` o `4`, o ejecuta `npm run seed:roles`

### "Username already exists"
- **Causa**: El username ya está registrado
- **Solución**: Usa un username diferente

### "Email already exists"
- **Causa**: El email ya está registrado
- **Solución**: Usa un email diferente
