import { useState, useEffect } from "react";
import { fetchBooks, fetchAuthors, deleteBook, createBook } from "../utils/api"; // Importar createBook
import BookUpdate from "./BookUpdate";
import BookCreate from "./BookCreate";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]); // Libros filtrados por búsqueda
    const [authors, setAuthors] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
    const [selectedBook, setSelectedBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false); // Modal de creación
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = async () => {
        setLoading(true);
        const booksData = await fetchBooks();
        const authorsData = await fetchAuthors();

        const authorsMap = authorsData.reduce((acc, author) => {
            acc[author.id] = author.name;
            return acc;
        }, {});

        setAuthors(authorsMap);
        setBooks(booksData);
        setFilteredBooks(booksData); // Inicializar libros filtrados
        setLoading(false);
    };

    // Filtrar libros según el término de búsqueda
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredBooks(books); // Mostrar todos los libros si no hay término de búsqueda
        } else {
            const filtered = books.filter((book) =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    }, [searchTerm, books]);

    const openModal = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedBook(null);
    };

    const confirmDelete = (book) => {
        setBookToDelete(book);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (bookToDelete) {
            await deleteBook(bookToDelete.id);
            setShowDeleteModal(false);
            setBookToDelete(null);
            refreshData();
        }
    };

    const handleCreateBook = async (newBook) => {
        const createdBook = await createBook(newBook);
        if (createdBook) {
            refreshData(); // Actualizar la lista de libros
            setShowCreateModal(false); // Cerrar el modal
        }
    };

    return (
        <div className="relative">
            {/* Barra de búsqueda */}
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
                {/* Botón para abrir el modal de creación */}
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                    Crear Libro
                </button>
            </div>

            {/* Tabla de libros */}
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
                    {filteredBooks.map((book, index) => (
                        <tr
                            key={book.id}
                            className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-50 transition`}
                        >
                            <td className="py-3 px-4">{book.title}</td>
                            <td className="py-3 px-4">{book.genre}</td>
                            <td className="py-3 px-4">{book.publishedYear}</td>
                            <td className="py-3 px-4">{authors[book.authorId] || "Autor desconocido"}</td>
                            <td className="py-3 px-4 text-center flex gap-2 justify-center">
                                <button
                                    onClick={() => openModal(book)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                                >
                                    Actualizar
                                </button>
                                <button
                                    onClick={() => confirmDelete(book)}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de actualización */}
            {showModal && selectedBook && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Actualizar Libro</h2>
                        <BookUpdate book={selectedBook} onClose={closeModal} onUpdate={refreshData} />
                        <button
                            onClick={closeModal}
                            className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de confirmación para eliminar */}
            {showDeleteModal && bookToDelete && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">¿Estás seguro?</h2>
                        <p className="text-gray-600 mb-4">¿Quieres eliminar el libro <strong>{bookToDelete.title}</strong>?</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de creación de libros */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Crear Nuevo Libro</h2>
                        <BookCreate onCreate={handleCreateBook} />
                        <button
                            onClick={() => setShowCreateModal(false)}
                            className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;