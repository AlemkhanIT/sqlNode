import express from "express"
import mysql from "mysql"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config({path:'./.env'});

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host:process.env.dbHOST,
    user:process.env.dbUSER,
    password:process.env.dbPASSWORD,
    database:process.env.dbSCHEMA
});

app.get('/',(req,res)=>{
    res.json("Hello this is the backend");
});

app.get('/books',(req,res)=>{
    const q = "SELECT * FROM test.books;"
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err);
        }
        return res.json(data);
    })
});

app.get('/books/:id',(req,res)=>{
    const bookId = req.params.id;
    const q = "SELECT * FROM books WHERE id = ?";
    db.query(q,[bookId],(err,data)=>{
        if(err){
            return res.json(err);
        }
        return res.json(data);
    })
});

app.post('/books',(req,res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book was created")
    })
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    
    db.query(q, [bookId], (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      
      if (data.affectedRows === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      
      // Book was successfully deleted
      return res.json({ message: 'Book deleted successfully' });
    });
  });
  
  app.put('/books/:id', (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];
    db.query(q, [...values,bookId], (err, data) => {
        if (err) {
          return res.status(500).json({ error: 'Internal server error' });
        }
        
        if (data.affectedRows === 0) {
          return res.status(404).json({ error: 'Book not found' });
        }
        
        // Book was successfully deleted
        return res.json({ message: 'Book updated successfully' });
      });
  })

app.listen(8800, ()=>{
    console.log("App is running on 8800")
});