import { client } from '../index.js';

export async function updateMovieByID(id, data) {
    return await client
        .db("class_mongo")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}
export async function deleteMovie(id) {
    return await client
        .db("class_mongo")
        .collection("movies")
        .deleteOne({ id: id });
}
export async function createMovies(data) {
    return await client
        .db("class_mongo")
        .collection("movies")
        .insertMany(data);
}
export async function getMovies(req) {
    return await client
        .db("class_mongo")
        .collection("movies")
        .find(req.query)
        .toArray();
}
export async function getMovieByID(id) {
    return await client
        .db("class_mongo")
        .collection("movies")
        .findOne({ id: id });
}
