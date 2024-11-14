// src/components/Car/CarList.js
import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Grid, TextField, Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import CarCard from './CarCard';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCars = async () => {
        try {
            const res = await API.get('/cars');
            setCars(res.data);
            setFilteredCars(res.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch cars');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredCars(cars);
        } else {
            const keyword = search.toLowerCase();
            const filtered = cars.filter(car =>
                car.title.toLowerCase().includes(keyword) ||
                car.description.toLowerCase().includes(keyword) ||
                car.tags.some(tag => tag.toLowerCase().includes(keyword))
            );
            setFilteredCars(filtered);
        }
    }, [search, cars]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error" sx={{ mt: 4 }}>
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
                <Typography variant="h4">My Cars</Typography>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>
            {filteredCars.length === 0 ? (
                <Typography>No cars found.</Typography>
            ) : (
                <Grid container spacing={4}>
                    {filteredCars.map(car => (
                        <Grid item key={car._id} xs={12} sm={6} md={4}>
                            <CarCard car={car} onDelete={fetchCars} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default CarList;
