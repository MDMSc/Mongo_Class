import express from 'express';
import { getMovies, getMovieByID, createMovies, deleteMovie, updateMovieByID } from './helper.js';

const router = express.Router();

// /movies
router.get("/", async (req, res) => {
    //db.movies.find({})
    if (req.query.rating) {
      req.query.rating = +req.query.rating;
    }
  
    // Cursor -> Pagination | Cursor -> Array | toArray
    const movies = await getMovies(req);
    res.send(movies);
  });
  
  // /movies/id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    // const movie = movies.find(mv => mv.id === id);
    // console.log(movie);
  
    // db.movies.findOne({ id: id })
    const movie = await getMovieByID(id);
  
    movie ? res.send(movie) : res.status(404).send({ msg: "Movie not found" });
  });
  
  //convert body -> JSON
  // using middleware - express.json()
  // router.post('/movies', express.json(), async (req, res) => {
router.post("/", async (req, res) => {
    //db.movies.find({})
    const data = req.body;
    //console.log(data);
  
    const result = await createMovies(data);
  
    res.send(result);
  });
  
  // delete
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    // const movie = movies.find(mv => mv.id === id);
    // console.log(movie);
  
    // db.movies.deleteOne({ id: id })
    const movie = await deleteMovie(id);
  
    movie.deletedCount > 0
      ? res.send({ msg: "Movie deleted successfully" })
      : res.status(404).send({ msg: "Movie not found" });
  });
  
  // update -> put
router.put("/:id", async (req, res) => {
      //db.movies.find({})
      const { id } = req.params;
      const data = req.body;
      console.log(data);
    
      const result = await updateMovieByID(id, data);
    
      console.log(result);
      result.modifiedCount > 0 ? res.send({msg: "Movie updated successfully" }) : res.status(400).send({ msg: "Movie not updated" });
  });

export const moviesRouter = router;


