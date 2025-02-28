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
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al crear el libro:", error);
        return null;
    }
};

// Actualizar un libro existente
export const updateBook = async (bookId, bookData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookData),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error al actualizar el libro:", error);
        return null;
    }
};

// Eliminar un libro existente
export const deleteBook = async (bookId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return true; // Retorna true si la eliminación fue exitosa
    } catch (error) {
        console.error("❌ Error al eliminar el libro:", error);
        return false; // Retorna false si hubo un error
    }
};

export const fetchBooksWithAuthors = async () => {
    try {
        const books = await fetchBooks();
        const authors = await fetchAuthors();
        
        // Combinar libros con nombres de autores
        return books.map(book => {
            const author = authors.find(a => a.id === book.authorId);
            return {
                ...book,
                authorName: author ? author.name : "Desconocido"
            };
        });
    } catch (error) {
        console.error("Error al obtener libros con autores:", error);
        return [];
    }
};
