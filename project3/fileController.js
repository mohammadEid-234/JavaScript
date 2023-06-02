import * as file from 'fs'; 

function fetchMovieFromFile () {
 return new Promise((resolve, reject) => {
    file.readFile("movies.json","utf-8",(err,data)=>{
        if(err){
            reject("Error reading file: movies.json")
            return;
        }
        try{
            let  movies =  JSON.parse(data);
            resolve(movies);
        }catch(exception){
            reject("Error parsing data "+exception);
        }
     });
 }); 
}
function writeMovieToFile(content){
   return new Promise((resolve, reject) => {
    file.writeFile("movies.json",content,(err)=>{
        if(err){    
            reject("Error writing movies to file");
            return;
        }
        resolve("Movies Updated Successfully")
    });
   });
   
}

export {fetchMovieFromFile as readMovies,writeMovieToFile as updateMovies }