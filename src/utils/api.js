const API_BASE_URL = "http://localhost:8080"; // Ajusta la URL de tu backend

// Obtener todos los libros
export const fetchBooks = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/books`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener libros:", error);
        return [];
    }
};

// Obtener todos los autores
export const fetchAuthors = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/authors`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener autores:", error);
        return [];
    }
};

// Crear un nuevo libro
export const createBook = async (bookData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al crear el libro:", error);
        throw error;
    }
};

// Actualizar un libro
export const updateBook = async (bookId, updatedData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al actualizar el libro:", error);
        throw error;
    }
};
