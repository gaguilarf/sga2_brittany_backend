# 🔄 Guía de Renombrado de Features (Español → Inglés)

## ⚠️ IMPORTANTE: Detener el Servidor Primero

Antes de ejecutar cualquier script, **detén todos los servidores** que estén corriendo:
- Presiona `Ctrl+C` en cada terminal donde esté corriendo `npm run start:dev`

## 📋 Pasos para Renombrar

### Paso 1: Renombrar Carpetas

Ejecuta el script de renombrado:

```powershell
.\scripts\rename-features.ps1
```

Este script renombrará:
- `alumnos` → `students`
- `matriculas` → `enrollments`
- `pagos` → `payments`
- `sedes` → `campuses`
- `planes` → `plans`
- `notas` → `grades`
- `asistencia` → `attendance`

### Paso 2: Actualizar Referencias

Ejecuta el script de actualización de referencias:

```powershell
.\scripts\update-references.ps1
```

Este script actualizará automáticamente:
- Imports en archivos TypeScript
- Referencias a entidades
- Rutas relativas

### Paso 3: Renombrar Archivos de Entidades

Los archivos de entidades también deben renombrarse:

```powershell
# En src/students/infrastructure/persistence/typeorm/
Rename-Item "alumnos.typeorm-entity.ts" "students.typeorm-entity.ts"

# En src/enrollments/infrastructure/persistence/typeorm/
Rename-Item "matriculas.typeorm-entity.ts" "enrollments.typeorm-entity.ts"

# En src/payments/infrastructure/persistence/typeorm/
Rename-Item "pagos.typeorm-entity.ts" "payments.typeorm-entity.ts"

# En src/campuses/infrastructure/persistence/typeorm/
Rename-Item "sedes.typeorm-entity.ts" "campuses.typeorm-entity.ts"

# En src/plans/infrastructure/persistence/typeorm/
Rename-Item "planes.typeorm-entity.ts" "plans.typeorm-entity.ts"
Rename-Item "planes-sedes.typeorm-entity.ts" "plans-campuses.typeorm-entity.ts"

# En src/grades/infrastructure/persistence/typeorm/
Rename-Item "notas.typeorm-entity.ts" "grades.typeorm-entity.ts"
Rename-Item "notas-detalle.typeorm-entity.ts" "grade-details.typeorm-entity.ts"

# En src/attendance/infrastructure/persistence/typeorm/
Rename-Item "asistencia.typeorm-entity.ts" "attendance.typeorm-entity.ts"
```

### Paso 4: Actualizar Nombres de Clases y Exports

Deberás actualizar manualmente los nombres de las clases en cada entidad:

- `AlumnosTypeOrmEntity` → `StudentsTypeOrmEntity`
- `MatriculasTypeOrmEntity` → `EnrollmentsTypeOrmEntity`
- `PagosTypeOrmEntity` → `PaymentsTypeOrmEntity`
- `SedesTypeOrmEntity` → `CampusesTypeOrmEntity`
- `PlanesTypeOrmEntity` → `PlansTypeOrmEntity`
- `PlanesSedesTypeOrmEntity` → `PlansCampusesTypeOrmEntity`
- `NotasTypeOrmEntity` → `GradesTypeOrmEntity`
- `NotasDetalleTypeOrmEntity` → `GradeDetailsTypeOrmEntity`
- `AsistenciaTypeOrmEntity` → `AttendanceTypeOrmEntity`

### Paso 5: Actualizar Nombres de Tablas en @Entity()

En cada entidad, actualiza el decorador `@Entity()`:

```typescript
// Antes
@Entity('alumnos')

// Después
@Entity('students')
```

**IMPORTANTE**: Los nombres de tablas en la base de datos permanecen en español. Solo cambiamos los nombres de features/carpetas/clases.

### Paso 6: Rebuild y Restart

```bash
npm run build
npm run start:dev
```

## ✅ Verificación

Después de completar todos los pasos:

1. ✅ No hay errores de compilación
2. ✅ El servidor inicia correctamente
3. ✅ Las entidades se cargan sin errores
4. ✅ Swagger muestra la documentación correctamente

## 🔄 Alternativa Más Simple

Si prefieres un enfoque más simple, puedo:
1. Recrear todas las entidades con los nombres correctos
2. Eliminar las carpetas antiguas
3. Actualizar todas las referencias automáticamente

¿Prefieres que lo haga automáticamente?
