import bcrypt from 'bcrypt';
import {fakerES as fa} from '@faker-js/faker';

export const generateMockUsers = async (count = 1) => {
    const users = [];
    
    for (let i = 0; i < count; i++) {
        const user = {
            first_name:fa.person.firstName(),
            last_name:fa.person.lastName(),
            email:fa.internet.email(),
            password: await bcrypt.hash('coder123', parseInt(process.env.BCRYPT_ROUNDS) || 10),
            role:fa.helpers.arrayElement(['user', 'admin']),
            pets: []
        };
        
        users.push(user);
    }
    
    return users;
};


export const generateMockPets = (count = 1) => {
    const pets = [];
    
    for (let i = 0; i < count; i++) {
        const pet = {
            name:fa.person.firstName(),
            specie:fa.helpers.arrayElement(['Perro', 'Gato', 'Conejo', 'Hamster', 'Pájaro']),
            birthDate:fa.date.past({ years: 5 }),
            adopted:fa.datatype.boolean(),
            image:fa.image.urlLoremFlickr({ category: 'animals' })
        };
        
        pets.push(pet);
    }
    
    return pets;
};