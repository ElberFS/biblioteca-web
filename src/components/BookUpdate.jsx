import { useState } from "react";
import { updateBook } from "../utils/api";


const BookUpdate = ({ book, onClose }) => {
    const [title, setTitle] = useState(book.title);
    const [genre, setGenre] = useState(book.genre);
    const [publishedYear, setPublishedYear] = useState(book.publishedYear);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedBook = { id: book.id, title, genre, publishedYear };

        try {
            await updateBook(updatedBook);
            setMessage("Libro actualizado con éxito.");
            setTimeout(() => {
                setMessage("");
                onClose();
            }, 2000);
        } catch (error) {
            setMessage("Error al actualizar el libro.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {message && <p className="text-green-600 text-center">{message}</p>}
            <div>
                <label className="block text-gray-700 font-semibold">Título:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Género:</label>
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Año de Publicación:</label>
                <input
                    type="number"
                    value={publishedYear}
                    onChange={(e) => setPublishedYear(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full"
            >
                Guardar Cambios
            </button>
        </form>
    );
};

export default BookUpdate;
