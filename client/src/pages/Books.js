import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get('http://localhost:8800/books');
        setBooks(res.data);
      } 
      catch(e){
        console.log(e);
      }
    }
    fetchData();
  },[]);
  return (
    <div>
      <h1>Book Storage</h1>
      <div className='books'>
        {books.map(book=>(
         <div key={book.id} className='book'>
          {book.cover && <img src={book.cover} alt="" />}
          <h3>{book.title}</h3>
          <p>{book.desc}</p>
          <span>{book.price}</span>
          <button><Link to={`/delete/${book.id}`}>Delete</Link></button>
          <button><Link to={`/update/${book.id}`}>Update</Link></button>
         </div> 
        ))}
      </div>
      <button><Link to='/add'>Add the new Book</Link></button>
    </div>
  )
}

export default Books