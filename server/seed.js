import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Movie from './models/Movie.js';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Đọc dữ liệu từ db.json
        const dbPath = path.join(__dirname, '../webPhim/src/ultis/db.json');
        const rawData = fs.readFileSync(dbPath, 'utf-8');
        const data = JSON.parse(rawData);

        // Xóa dữ liệu cũ (tùy chọn)
        await Movie.deleteMany({});
        console.log('Old movies deleted');

        // Import phim
        const movies = data.movies.map(movie => {
            const { id, ...movieData } = movie; // Loại bỏ id cũ của json-server
            return movieData;
        });

        await Movie.insertMany(movies);
        console.log(`${movies.length} movies imported successfully!`);

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

// Thực thi seed data
seedData(); 
