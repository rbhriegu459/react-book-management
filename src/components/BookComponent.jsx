import { useEffect, useState } from 'react'
import {Field, Form, Formik} from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { addBook, retrieveBook, updateBook } from '../service/BookService'

const BookComponent = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [author, setauthor] = useState('')
  const [genres, setGenres] = useState('')

  useEffect(
    ()=> retrieveBooks(),
    [id]
    )

  function retrieveBooks(){
    
    if(id != -1) {

      retrieveBook(id)
      .then(response => {
        setTitle(response.data.title)
        setauthor(response.data.author)
        setGenres(response.data.genres)
      })
      .catch(error => console.log(error))
    }
  }

  function onSubmit(values){
    const book = {
      id:id,
      title:values.title,
      author:values.author,
      genres:values.genres
    }

    if(id== -1){
      addBook(book)
      .then(response => {
        navigate('/')
      })
      .catch(error => console.log(error))
    }

    else{
      updateBook(id, book)
      .then(response => {
        navigate('/')
      })
      .catch(error => console.log(error))
  }
  }

  return (
    <div className='conatiner align-items-center'>
        <h1 className='fw-bold'>Enter Book Details</h1>
        <hr></hr>
        <div> 
            <Formik initialValues={{title, author, genres}}
            enableReinitialize={true} 
            onSubmit={onSubmit}>
              {(props) => (
                <Form>
                  <fieldset className='form-group m-5'>
                    <label className='fw-bolder form-control-lg'>Title</label>
                    <Field type="text" className="form-control bg-light" name="title"/>
                  </fieldset>

                  <fieldset className='form-group m-5' >
                    <label className=' fw-bolder form-control-lg'>Author</label>
                    <Field type="text" className="form-control bg-light" name="author"/>
                  </fieldset>

                  <fieldset className='form-group m-5'>
                    <label className=' fw-bolder  form-control-lg'>Genres</label>
                    <Field type="text" className="form-control bg-light" name="genres"/>
                  </fieldset>

                  <div>
                    <button className='btn btn-info' type='submit'>Save</button>
                  </div>
                </Form>
              )}
            </Formik>
        </div>

    </div>
  )
}

export default BookComponent