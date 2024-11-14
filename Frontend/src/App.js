// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import CarList from './components/Car/CarList';
import CarDetail from './components/Car/CarDetail';
import AddEditCar from './components/Car/CarForm';
import PrivateRoute from './components/Shared/PrivateRoute';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={
                            <PrivateRoute>
                                <CarList />
                            </PrivateRoute>
                        } />
                        <Route path="/add-car" element={
                            <PrivateRoute>
                                <AddEditCar />
                            </PrivateRoute>
                        } />
                        <Route path="/edit-car/:id" element={
                            <PrivateRoute>
                                <AddEditCar />
                            </PrivateRoute>
                        } />
                        <Route path="/cars/:id" element={
                            <PrivateRoute>
                                <CarDetail />
                            </PrivateRoute>
                        } />
                        {/* Add a 404 Not Found Route if desired */}
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
