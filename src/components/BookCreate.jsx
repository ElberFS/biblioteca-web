import { useState, useEffect } from "react";
import { fetchAuthors } from "../utils/api";

const BookCreate = ({ onCreate }) => {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [authorId, setAuthorId] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1);
    const authorsPerPage = 5;

    useEffect(() => {
        const loadAuthors = async () => {
            const data = await fetchAuthors();
            setAuthors(data);
        };
        loadAuthors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!authorId) {
            alert("Por favor, selecciona un autor.");
            return;
        }
        const newBook = {
            title,
            genre,
            publishedYear: parseInt(publishedYear),
            authorId: parseInt(authorId),
        };
        await onCreate(newBook);
        setTitle("");
        setGenre("");
        setPublishedYear("");
        setAuthorId(null);
        setSearchTerm("");
    };

    const filteredAuthors = authors.filter((author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);
    const indexOfLastAuthor = currentPage * authorsPerPage;
    const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
    const currentAuthors = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

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

            {/* Buscador */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
                placeholder="Buscar autor..."
                className="w-full p-2 border rounded mb-2"
            />

            {/* Tabla de autores */}
            <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-2 py-1">ID</th>
                            <th className="border border-gray-300 px-2 py-1">Nombre</th>
                            <th className="border border-gray-300 px-2 py-1">Seleccionar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAuthors.length > 0 ? (
                            currentAuthors.map((author) => (
                                <tr
                                    key={author.id}
                                    className={`cursor-pointer ${
                                        authorId === author.id ? "bg-blue-200" : "hover:bg-gray-100"
                                    }`}
                                >
                                    <td className="border border-gray-300 px-2 py-1">{author.id}</td>
                                    <td className="border border-gray-300 px-2 py-1">{author.name}</td>
                                    <td className="border border-gray-300 px-2 py-1 text-center">
                                        <input
                                            type="radio"
                                            name="author"
                                            value={author.id}
                                            checked={authorId === author.id}
                                            onChange={() => setAuthorId(author.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="border border-gray-300 px-2 py-1 text-center">
                                    No se encontraron autores
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-end items-center mt-2 text-sm space-x-2">
                <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={`px-3 py-1 rounded ${
                        currentPage === 1 ? "bg-sky-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    ⬅️
                </button>

                <span className="text-xs">Página {currentPage} de {totalPages}</span>

                <button
                    type="button"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={`px-3 py-1 rounded ${
                        currentPage === totalPages || totalPages === 0
                            ? "bg-sky-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    ➡️
                </button>
            </div>
        </form>
    );
};

export default BookCreate;
