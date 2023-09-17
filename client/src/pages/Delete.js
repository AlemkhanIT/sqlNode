import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const Delete = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const onDelete = (bookId) => {
        // Send a DELETE request to delete the book by ID
        axios.delete(`http://localhost:8800/books/${id}`)
          .then((res) => {
            console.log(res);
            navigate('/');
          })
          .catch((error) => {
            console.error('Error deleting book:', error);
          });
      };
  return (
    <div>
        <h2>Are you sure?</h2>
        <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default Delete