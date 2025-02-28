import { useState } from "react";
import { updateBook } from "../utils/api.js"; // Importamos la función de actualización

const BookUpdate = ({ book, onClose, onUpdate }) => {
    const [updatedBook, setUpdatedBook] = useState({
        title: book?.title || "",
        genre: book?.genre || "",
        publishedYear: book?.publishedYear || "",
        authorId: book?.authorId || "",
    });

    const [loading, setLoading] = useState(false); // Para mostrar un estado de carga

    const handleChange = (e) => {
        setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        if (!book?.id) {
            
            return;
        }

        setLoading(true);

        const result = await updateBook(book.id, updatedBook);
        
        if (result) {
            
            onUpdate?.(); // Actualizar la lista de libros
            onClose?.();  // Cerrar el modal
        } else {
            alert("Error al actualizar el libro. Revisa la consola.");
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

            <label className="block text-gray-700 mt-3">Autor ID:</label>
            <input
                type="number"
                name="authorId"
                value={updatedBook.authorId}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"
            />

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
