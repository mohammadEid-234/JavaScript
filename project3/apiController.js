async function fetchMovieApis(){
 let result =  fetch("https://www.omdbapi.com/?t=Titanic&apikey=3804dca"
 ,{method : "GET"}
 ).then((response)=>{
        return response.json();
    }).then((responseData)=>{
        return responseData;
    }).catch((error)=>{
        return `Error Fetching Data from api : ${error}`;
    });
    return result;
}

export default fetchMovieApis;
