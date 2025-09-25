import { Router } from 'express';
import { fakerES as fa } from '@faker-js/faker';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import { usersService, petsService } from '../services/index.js';

const router = Router();

router.post('/generateData', async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;
        
        const userCount = parseInt(users);
        const petCount = parseInt(pets);
        
        if (isNaN(userCount) || isNaN(petCount) || userCount < 0 || petCount < 0) {
            return res.status(400).json({
                status: 'error',
                error: 'Los parámetros users y pets deben ser números enteros no negativos'
            });
        }
        
        if (userCount === 0 && petCount === 0) {
            return res.status(400).json({
                status: 'error',
                error: 'Debe especificar al menos un parámetro mayor a 0'
            });
        }
        
        const results = {
            users: { created: 0, errors: 0 },
            pets: { created: 0, errors: 0 }
        };
        
        if (userCount > 0) {
            try {
                const mockUsers = await generateMockUsers(userCount);
                
                for (const user of mockUsers) {
                    try {
                        await usersService.create(user);
                        results.users.created++;
                    } catch (error) {
                        console.error('Error insertando usuario:', error);
                        results.users.errors++;
                    }
                }
            } catch (error) {
                console.error('Error generando usuarios:', error);
                results.users.errors = userCount;
            }
        }
        
        if (petCount > 0) {
            try {
                const mockPets = await generateMockPets(petCount);
                
                for (const pet of mockPets) {
                    try {
                        await petsService.create(pet);
                        results.pets.created++;
                    } catch (error) {
                        console.error('Error insertando mascota:', error);
                        results.pets.errors++;
                    }
                }
            } catch (error) {
                console.error('Error generando mascotas:', error);
                results.pets.errors = petCount;
            }
        }
        
        res.status(201).json({
            status: 'success',
            message: 'Datos generados e insertados exitosamente',
            results,
            summary: {
                totalUsers: results.users.created + results.users.errors,
                totalPets: results.pets.created + results.pets.errors,
                successfulUsers: results.users.created,
                successfulPets: results.pets.created,
                failedUsers: results.users.errors,
                failedPets: results.pets.errors
            },
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error en generateData:', error);
        res.status(500).json({
            status: 'error',
            error: 'Error interno del servidor al generar e insertar datos',
            timestamp: new Date().toISOString()
        });
    }
});


router.get('/mockingusers', async (req, res) => {
    try {
        const users = await generateMockUsers(50);
        const formatted = users.map(user => ({ _id: fa.database.mongodbObjectId(), ...user }));
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
    }
});



export default router;
