import { useState, useEffect } from "react";
import { updateBook, fetchAuthors } from "../utils/api.js"; 

const BookUpdate = ({ book, onClose, onUpdate }) => {
    const [updatedBook, setUpdatedBook] = useState({
        title: book?.title || "",
        genre: book?.genre || "",
        publishedYear: book?.publishedYear || "",
        authorId: book?.authorId || "",
    });

    const [authors, setAuthors] = useState([]); // Lista de autores
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadAuthors = async () => {
            const authorsData = await fetchAuthors();
            setAuthors(authorsData);
        };
        loadAuthors();
    }, []);

    const handleChange = (e) => {
        setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (!book?.id) return;

        setLoading(true);
        const result = await updateBook(book.id, updatedBook);

        if (result) {
            onUpdate?.();
            onClose?.();
        } else {
            alert("Error al actualizar el libro.");
        }

        setLoading(false);
    };

    return (
        <div className="p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-xl font-bold mb-4">Editar Libro</h2>

            <label className="block text-gray-700">Título:</label>
            <input
                type="text"
                name="title"
                value={updatedBook.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
            />

            <label className="block text-gray-700 mt-3">Género:</label>
            <input
                type="text"
                name="genre"
                value={updatedBook.genre}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
            />

            <label className="block text-gray-700 mt-3">Año de Publicación:</label>
            <input
                type="number"
                name="publishedYear"
                value={updatedBook.publishedYear}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
            />

            <label className="block text-gray-700 mt-3">Autor:</label>
            <select
                name="authorId"
                value={updatedBook.authorId}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
            >
                <option value="">Seleccione un autor</option>
                {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                ))}
            </select>

            <button
                onClick={handleUpdate}
                className={`mt-4 px-4 py-2 rounded-md w-full transition ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                disabled={loading}
            >
                {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
        </div>
    );
};

export default BookUpdate;
