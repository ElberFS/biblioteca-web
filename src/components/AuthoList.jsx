import { useState, useEffect } from "react";
import { fetchAuthors } from "../utils/api.js";
import AuthorCreate from "./AuthorCreate.jsx";

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const authorsPerPage = 5;

    const refreshAuthors = async () => {
        const data = await fetchAuthors();
        setAuthors(data);
    };

    useEffect(() => {
        refreshAuthors();
    }, []);

    const totalPages = Math.ceil(authors.length / authorsPerPage);
    const indexOfLastAuthor = currentPage * authorsPerPage;
    const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
    const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <AuthorCreate refreshAuthors={refreshAuthors} />

            <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">📚 Lista de Autores</h2>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">Nombre</th>
                            <th className="p-3 border">Nacimiento</th>
                            <th className="p-3 border">Nacionalidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAuthors.length > 0 ? (
                            currentAuthors.map((author) => (
                                <tr key={author.id} className="border hover:bg-blue-100 transition">
                                    <td className="p-3 border text-center">{author.id}</td>
                                    <td className="p-3 border">{author.name}</td>
                                    <td className="p-3 border text-center">{author.birthdate}</td>
                                    <td className="p-3 border text-center">{author.nationality}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">No hay autores</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-end items-center mt-4 text-sm space-x-3">
                <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={`px-3 py-1 rounded ${
                        currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    ⬅️
                </button>

                <span className="text-gray-700">Página {currentPage} de {totalPages}</span>

                <button
                    type="button"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={`px-3 py-1 rounded ${
                        currentPage === totalPages || totalPages === 0
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    ➡️
                </button>
            </div>
        </div>

        
    );
};

export default AuthorList;
