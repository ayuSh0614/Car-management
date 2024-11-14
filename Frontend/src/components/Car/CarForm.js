// src/components/Car/CarForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Chip, Stack, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    tags: yup.array().of(yup.string()),
    images: yup.mixed(),
});

const AddEditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const [error, setError] = useState('');
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        if (isEdit) {
            // Fetch existing car data
            const fetchCar = async () => {
                try {
                    const res = await API.get(`/cars/${id}`);
                    const { title, description, tags, images } = res.data;
                    setValue('title', title);
                    setValue('description', description);
                    setValue('tags', tags);
                    setPreviewImages(images);
                } catch (err) {
                    setError(err.response?.data?.message || 'Failed to fetch car details');
                }
            };
            fetchCar();
        }
    }, [id, isEdit, setValue]);

    const onSubmit = async (data) => {
        setError('');
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('tags', JSON.stringify(data.tags));
            if (data.images && data.images.length > 0) {
                Array.from(data.images).forEach((file) => {
                    formData.append('images', file);
                });
            }

            if (isEdit) {
                await API.put(`/cars/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await API.post('/cars', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        if (files.length + previewImages.length > 10) {
            setError('You can upload up to 10 images.');
            return;
        }
        const urls = Array.from(files).map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...urls]);
    };

    const handleDeleteImage = (index) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {isEdit ? 'Edit Car' : 'Add New Car'}
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Title"
                                fullWidth
                                margin="normal"
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        )}
                    />
                    <Controller
                        name="tags"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Tags (comma separated)"
                                fullWidth
                                margin="normal"
                                onChange={(e) => field.onChange(e.target.value.split(',').map(tag => tag.trim()))}
                                error={!!errors.tags}
                                helperText={errors.tags?.message}
                            />
                        )}
                    />
                    <Controller
                        name="images"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ mt: 2 }}
                            >
                                Upload Images
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => {
                                        field.onChange(e.target.files);
                                        handleImageChange(e);
                                    }}
                                />
                            </Button>
                        )}
                    />
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {previewImages.map((img, index) => (
                            <Box key={index} sx={{ position: 'relative' }}>
                                <img src={img} alt={`preview-${index}`} width={100} height={100} style={{ objectFit: 'cover', borderRadius: 4 }} />
                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => handleDeleteImage(index)}
                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                >
                                    X
                                </Button>
                            </Box>
                        ))}
                    </Box>
                    <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 4 }}>
                        {isEdit ? 'Update Car' : 'Add Car'}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AddEditCar;
