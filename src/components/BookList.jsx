import { useState, useEffect } from "react";
import { fetchBooks, fetchAuthors, deleteBook, createBook } from "../utils/api";
import BookUpdate from "./BookUpdate.jsx";
import BookCreate from "./BookCreate.jsx";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [authors, setAuthors] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBook, setSelectedBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);

    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1); 
    const itemsPerPage = 10; 

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
        setFilteredBooks(booksData);
        setLoading(false);
    };

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredBooks(books);
        } else {
            setFilteredBooks(
                books.filter((book) =>
                    book.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        setCurrentPage(1); 
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
            refreshData();
            setShowCreateModal(false);
        }
    };

    // Lógica de paginación
    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="relative p-6">
            {/* Barra de búsqueda y botón de creación */}
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                />
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="ml-10 bg-green-500 text-white px-20 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 whitespace-nowrap flex items-center gap-2"
                >
                    📗 Crear Libro
                </button>
            </div>

            {/* Tabla de libros */}
            <div className="overflow-x-auto transition-opacity duration-500 ease-in-out">
                <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="py-3 px-4 text-center">Título</th>
                            <th className="py-3 px-4 text-center">Género</th>
                            <th className="py-3 px-4 text-center">Año</th>
                            <th className="py-3 px-4 text-center">Autor</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks.map((book, index) => (
                            <tr
                                key={book.id}
                                className={`border-b ${
                                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                } hover:bg-blue-50 transition-all duration-300`}
                            >
                                <td className="py-3 px-4 text-center">{book.title}</td>
                                <td className="py-3 px-4 text-center">{book.genre}</td>
                                <td className="py-3 px-4 text-center">{book.publishedYear}</td>
                                <td className="py-3 px-4 text-center">
                                    {authors[book.authorId] || "Desconocido"}
                                </td>
                                <td className="py-3 px-4 flex justify-center gap-2">
                                    <button
                                        onClick={() => openModal(book)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-all duration-300"
                                    >
                                        ✏️ Editar
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(book)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all duration-300"
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                >
                    Anterior
                </button>

                {[...Array(totalPages).keys()].map((page) => (
                    <button
                        key={page + 1}
                        onClick={() => handlePageChange(page + 1)}
                        className={`px-4 py-2 ${
                            currentPage === page + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        {page + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                >
                    Siguiente
                </button>
            </div>

            {/* Modal de actualización */}
            {showModal && selectedBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-700">
                                Actualizar Libro
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-red-500 text-lg"
                            >
                                ✖
                            </button>
                        </div>
                        <BookUpdate
                            book={selectedBook}
                            onClose={closeModal}
                            onUpdate={refreshData}
                        />
                    </div>
                </div>
            )}

            {/* Modal de eliminación */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold text-gray-700">
                            ¿Eliminar libro?
                        </h2>
                        <p className="mb-4 text-gray-600">
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de creación */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-130">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">
                            Crear Nuevo Libro
                        </h2>
                        <BookCreate
                            onCreate={handleCreateBook}
                            onClose={() => setShowCreateModal(false)}
                        />
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