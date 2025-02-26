import { useState, useEffect } from "react";
import { fetchAuthors, createBook } from "../utils/api";

const BookCreate = () => {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [authors, setAuthors] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const loadAuthors = async () => {
            try {
                const data = await fetchAuthors();
                setAuthors(data);
            } catch (error) {
                setError("Error al obtener autores.");
            }
        };

        loadAuthors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!title || !authorId) {
            setError("Título y autor son obligatorios.");
            return;
        }

        const newBook = {
            title,
            genre,
            publishedYear,
            author: { id: authorId },
        };

        try {
            const data = await createBook(newBook);
            setMessage(`Libro "${data.title}" creado con éxito.`);
            setTitle("");
            setGenre("");
            setPublishedYear("");
            setAuthorId("");
        } catch (error) {
            setError("Error al crear el libro. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Agregar Nuevo Libro</h2>
            {message && <p className="text-green-600 mb-2">{message}</p>}
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Género:</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Año de Publicación:</label>
                    <input
                        type="number"
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Autor:</label>
                    <select
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Seleccionar Autor</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                >
                    Crear Libro
                </button>
            </form>
        </div>
    );
};

export default BookCreate;
