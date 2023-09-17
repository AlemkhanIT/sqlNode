import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const navigate = useNavigate();
    const [book,setBook] = useState({
        title:"",
        desc:"",
        cover:"",
        price:null
    })
    const handleChange = (e) =>{
        setBook(prev=>({...prev, [e.target.name]:e.target.value}));
    }
    const handleClick = async (e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:8800/books', book);
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
        
    }
  return (
    <div>
        <h2>Add the new Book</h2>
        <input type="text" placeholder='title' name='title' onChange={handleChange}/>
        <input type="text" placeholder='description' name='desc' onChange={handleChange}/>
        <input type="text" placeholder='cover' name='cover' onChange={handleChange}/>
        <input type="number" placeholder='price' name='price' onChange={handleChange}/>
        <button onClick={handleClick}>Add the Book</button>
    </div>
  )
}

export default Add