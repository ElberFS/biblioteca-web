import { useState, useEffect } from "react";
import { fetchBooks } from "../utils/api";
import BookUpdate from "./BookUpdate.jsx";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const getBooks = async () => {
            const data = await fetchBooks();
            console.log("Libros obtenidos:", data);
            setBooks(data);
            setLoading(false);
        };
        getBooks();
    }, []);

    const openModal = (book) => {
        setSelectedBook(book);
        setShowModal(true);
        setModalPosition({ x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 100 });
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedBook(null);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setModalPosition({ x: e.clientX - 150, y: e.clientY - 50 });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                📚 Lista de Libros
            </h2>

            {loading ? (
                <p className="text-center text-gray-500">Cargando libros...</p>
            ) : books.length === 0 ? (
                <p className="text-center text-gray-600">No hay libros disponibles.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-gray-50 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-3 px-4 text-left">Título</th>
                                <th className="py-3 px-4 text-left">Género</th>
                                <th className="py-3 px-4 text-left">Año de Publicación</th>
                                <th className="py-3 px-4 text-left">Autor</th>
                                <th className="py-3 px-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr key={book.id} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-50 transition`}>
                                    <td className="py-3 px-4">{book.title}</td>
                                    <td className="py-3 px-4">{book.genre}</td>
                                    <td className="py-3 px-4">{book.publishedYear}</td>
                                    <td className="py-3 px-4">{book.author?.name || "Autor desconocido"}</td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => openModal(book)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                                        >
                                            Actualizar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* MODAL */}
            {showModal && selectedBook && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-96 cursor-move"
                        style={{ position: "absolute", left: modalPosition.x, top: modalPosition.y }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                    >
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Actualizar Libro</h2>
                        <BookUpdate book={selectedBook} onClose={closeModal} />
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;
