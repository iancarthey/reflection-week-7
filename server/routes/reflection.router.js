const router = require('express').Router()
//brings in express from node-modules
const pool = require('../modules/pool')
//sources in pool.js


//GET REQUEST FOR REFLECTIONS
router.get('/', (req,res)=>{
    const queryText = 'SELECT * from reflection'
    pool.query(queryText).then((response)=>{
        res.send(response.rows);
    }).catch((error)=>{
        console.log('error in reflection.router.get: ', error);
        res.sendStatus(500)
    });
});//end router.get

//POST REQUEST FOR NEW REFLECTION
router.post('/', (req, res)=>{
    const newReflection = req.body;
    console.log(newReflection)
    const queryText = `INSERT INTO "reflection" ("topic", "description") VALUES ($1, $2)`;
    pool.query(queryText, [newReflection.topic, newReflection.reflectionBody])
    .then( ()=>{
        console.log('successfully added reflection');
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in reflection.router.post: ', error);
    })
})

//DELETE REQUEST FOR REMOVING REFLECTION
router.delete('/', (req, res) => {
    const queryText = 'DELETE FROM reflection WHERE id=$1';
    pool.query(queryText, [req.query.id]).then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in reflection.router.delete: ', error)
    })
})

//PUT REQUEST FOR UPDATING BOOKMARKED 
router.put('/', (req, res) => {
    updateBookmark = req.body;
    console.log(updateBookmark)
    const queryText = 'UPDATE reflection SET "bookmarked" = $1 WHERE "id" = $2';
    pool.query(queryText, [updateBookmark.bookmarked, req.query.id])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in reflection.router.put: ', error);
    })
})

module.exports = router