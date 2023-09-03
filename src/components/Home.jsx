import React, { useEffect, useState } from 'react'
import { deleteBook, getBooks } from '../service/BookService'
import 'bootstrap/dist/css/bootstrap.css'
import {useNavigate} from 'react-router-dom';

const Home = () => {

    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect(() => refreshTodos(), [])

    function refreshTodos(){
        getBooks()
        .then(resposne => {
            setData(resposne.data)
        })
        .catch(error=> console.log(error))
    }

    function deleteTodo(id){
        deleteBook(id)
        .then(response => {
            refreshTodos();
        })
        .catch(error=>console.log(error));
    }

    function updateTodo(id){
        console.log('clicked '+id)
        navigate(`/books/${id}`)
    }

    function addNewBook(){
        navigate(`books/-1`)
    }

  return (
    <div className='container'>
        <h1 className='text-center m-5 fw-bold'>Books Library</h1>
        <table className='table table-dark table-hover'> 
            <thead>
                <tr style={{fontSize: "25px"}}>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genres</th>
                    <th>Delete/Update</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((book, index) => {
                        return(
                            <tr key={index} className='table-secondary'>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genres}</td>
                                <td>
                                    <button className='btn btn-danger me-5' onClick={()=>deleteTodo(book.id)}>Delete</button>
                                    <button className='btn btn-info' onClick={()=> updateTodo(book.id)}>Update</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <div className='btn btn-success m-5' onClick={addNewBook}>Add Book</div>
    </div>
  )
}

export default Home;