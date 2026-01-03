import { DataSource } from 'typeorm';

async function seedRoles() {
    const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: false,
    });

    try {
        await dataSource.initialize();
        console.log('✅ Database connection established');

        // Check if roles already exist
        const [existingRoles] = await dataSource.query('SELECT COUNT(*) as count FROM roles');
        if (existingRoles.count > 0) {
            console.log(`ℹ️  Roles already exist (${existingRoles.count} roles found). Skipping seed.`);
            await dataSource.destroy();
            return;
        }

        // Insert initial roles using raw SQL
        await dataSource.query(`
            INSERT INTO roles (name, description, active, created_at, updated_at) VALUES
            ('Administrador', 'Acceso completo al sistema', true, NOW(), NOW()),
            ('Docente', 'Acceso a gestión académica y asistencia', true, NOW(), NOW()),
            ('Desarrollador', 'Acceso técnico al sistema', true, NOW(), NOW()),
            ('Secretaria', 'Acceso a registro de datos (sin permisos de eliminación)', true, NOW(), NOW())
        `);

        console.log('\n🎉 Seed completed successfully!');
        console.log('\nCreated roles:');
        console.log('  ID 1: Administrador - Acceso completo al sistema');
        console.log('  ID 2: Docente - Acceso a gestión académica y asistencia');
        console.log('  ID 3: Desarrollador - Acceso técnico al sistema');
        console.log('  ID 4: Secretaria - Acceso a registro de datos (sin permisos de eliminación)');
        console.log('\n💡 You can now register users with roleId: 1, 2, 3, or 4');

        await dataSource.destroy();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Load environment variables
require('dotenv').config();

seedRoles();
