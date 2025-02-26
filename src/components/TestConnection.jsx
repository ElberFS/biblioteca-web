// src/components/TestConnection.jsx
import  { useState, useEffect } from 'react';
import { testConnection } from '../utils/api';

const TestConnection = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConnectionStatus = async () => {
            try {
                const data = await testConnection();
                setMessage(data); // Muestra el mensaje de conexión exitosa
            } catch (err) {
                setError('No se pudo conectar con el backend');
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchConnectionStatus();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return <p style={{ color: 'green' }}>{message}</p>;
};

export default TestConnection;