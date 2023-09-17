import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [book,setBook] = useState({
        title:"",
        desc:"",
        cover:"",
        price:0
    })
    useEffect(()=>{
        axios.get(`http://localhost:8800/books/${id}`)
        .then((res)=>{
            setBook(res.data[0]);
        }).catch((e)=>{
            console.log(e);
        })
    }, []);

    const handleChange = (e) =>{
        setBook(prev=>({...prev, [e.target.name]:e.target.value}));
    }
    const handleClick = async (e) =>{
        try{
            await axios.put(`http://localhost:8800/books/${id}`, book);
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
        
    }
  return (
    <div>
        <h2>Update</h2>
        <input value={book.title} type="text" placeholder='title' name='title' onChange={handleChange}/>
        <input value={book.desc} type="text" placeholder='description' name='desc' onChange={handleChange}/>
        <input value={book.cover} type="text" placeholder='cover' name='cover' onChange={handleChange}/>
        <input value={book.price} type="number" placeholder='price' name='price' onChange={handleChange}/>
        <button onClick={handleClick}>Update the Book</button>
    </div>
  )
}

export default Update