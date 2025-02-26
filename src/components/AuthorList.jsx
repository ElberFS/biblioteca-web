import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8080"; // Verifica que este sea correcto

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                console.log("Obteniendo autores desde:", `${API_BASE_URL}/api/authors`);
                const response = await fetch(`${API_BASE_URL}/api/authors`);
                console.log("Respuesta recibida:", response);
                
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                
                const data = await response.json();
                console.log("Datos recibidos:", data);
                setAuthors(data);
            } catch (error) {
                console.error("Error al obtener autores:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    if (loading) {
        return <p>Cargando autores...</p>;
    }

    if (authors.length === 0) {
        return <p>No hay autores disponibles.</p>;
    }

    return (
        <div>
            <h2>Lista de Autores</h2>
            <ul>
                {authors.map((author) => (
                    <li key={author.id}>
                        <strong>{author.name}</strong> - {author.nationality} ({author.birthdate})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorList;
