import { useState, useEffect } from "react";
import { fetchAuthors } from "../utils/api";

const BookCreate = ({ onCreate }) => {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const loadAuthors = async () => {
            const data = await fetchAuthors();
            setAuthors(data);
        };
        loadAuthors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = { title, genre, publishedYear: parseInt(publishedYear), authorId: parseInt(authorId) };
        await onCreate(newBook); // Llamar a la función onCreate pasada como prop
        setTitle("");
        setGenre("");
        setPublishedYear("");
        setAuthorId("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                required
                className="w-full p-2 border rounded"
            />
            <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Género"
                className="w-full p-2 border rounded"
            />
            <input
                type="number"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                placeholder="Año de Publicación"
                required
                className="w-full p-2 border rounded"
            />
            <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                required
                className="w-full p-2 border rounded"
            >
                <option value="">Selecciona un autor</option>
                {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                ))}
            </select>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Crear Libro
            </button>
        </form>
    );
};

export default BookCreate;