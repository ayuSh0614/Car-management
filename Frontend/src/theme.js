// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Customize your primary color
        },
        secondary: {
            main: '#dc004e', // Customize your secondary color
        },
    },
    typography: {
        h4: {
            fontWeight: 600,
        },
    },
    components: {
        // Customize component styles if needed
    },
});

export default theme;
