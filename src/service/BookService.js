import axios from 'axios';

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080/books'
    }
)

// get request
export const getBooks = () => {
    return apiClient.get();
}

// add request
export const addBook = (book) => {
    return apiClient.post(book/-1, book);
}

// delete request
export const deleteBook = (id) => {
    return apiClient.delete(`/${id}`);
}

// update request
export const updateBook = (id, book) => {
    return apiClient.put(`/${id}`, book);
}

export const retrieveBook = (id) => {
    return apiClient.get(`/${id}`)
}