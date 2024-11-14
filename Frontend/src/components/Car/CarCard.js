import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import API from '../../services/api';

const CarCard = ({ car, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);  // To handle error messages
    
    // Construct the image URL or use a placeholder
    const imageUrl = car.images && car.images.length > 0
        ? `http://localhost:5000/uploads/${car.images[0]}`
        : 'https://via.placeholder.com/300x200';

    // Open the confirmation dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close the confirmation dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Handle delete action
    const handleDelete = async () => {
        try {
            // Make the DELETE request to the backend API
            await API.delete(`/cars/${car._id}`);
            
            // Notify the parent to refresh the car list
            onDelete(car._id);
            
            // Close the dialog
            setOpen(false);
            
            // Optionally reset any error state if successful
            setError(null);
        } catch (error) {
            console.error("Failed to delete car:", error);
            // Set the error message to be shown in the UI
            setError('Failed to delete the car. Please try again.');
        }
    };

    return (
        <>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt={car.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {car.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {car.description.substring(0, 100)}... {/* Shortened description */}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={Link} to={`/cars/${car._id}`}>
                        View Details
                    </Button>
                    <Button size="small" component={Link} to={`/edit-car/${car._id}`}>
                        Edit
                    </Button>
                    <Button size="small" color="error" onClick={handleClickOpen}>
                        Delete
                    </Button>
                </CardActions>
            </Card>

            {/* Error Message */}
            {error && (
                <div style={{ color: 'red', padding: '10px', textAlign: 'center' }}>
                    {error}
                </div>
            )}

            {/* Confirmation Dialog for Deletion */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Car</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete "{car.title}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CarCard;
