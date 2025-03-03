import { useState } from "react";
import { createAuthor } from "../utils/api";

const AuthorCreate = ({ refreshAuthors }) => {
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [nationality, setNationality] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newAuthor = { name, birthdate, nationality };
        const result = await createAuthor(newAuthor);
        if (result) {
            refreshAuthors(); // Actualiza la tabla después de crear un autor
            setName("");
            setBirthdate("");
            setNationality("");
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">📝 Crear Autor</h2>

            <div className="mb-3">
                <label className="block text-gray-600 text-sm mb-1">Nombre</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingrese el nombre"
                    required
                    className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <div className="mb-3">
                <label className="block text-gray-600 text-sm mb-1">Fecha de Nacimiento</label>
                <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                    className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1">Nacionalidad</label>
                <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder="Ingrese la nacionalidad"
                    required
                    className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
                />
            </div>

            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                📌 Crear Autor
            </button>
        </form>
    );
};

export default AuthorCreate;
