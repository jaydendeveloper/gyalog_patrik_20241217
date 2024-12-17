const newJokeBtn = document.getElementById("newJokeBtn");
const cardContainer = document.getElementById("card-container");

const jokes = [];


function fetchData(){
    fetch("https://official-joke-api.appspot.com/jokes/random")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(joke => {
            console.log(joke)
            jokes.unshift(joke);
            updateCards();
            
            /* window.history.pushState(null, null, '/?username='+user.username); */
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });

}

function updateCards(){

    cardContainer.innerHTML="";

    jokes.forEach(joke=> 
        cardContainer.innerHTML += 
        `
            <div class="card">
                <div class="card-header">
                    ${joke.type}
                </div>
                <div class="card-body">
                    <h1 class="setup">${joke.setup}</h1>

                    <div class="punchline">
                        <div id="punchline-${joke.id}" class="hidden">${joke.punchline}</div>
                    </div>
                </div>
                <button id="show-${joke.id}" class="punchlineBtn" onClick="showPunchLine(${joke.id})">Show punchline</button>
            </div>
        `
    )

}


function showPunchLine(jokeId){
    document.getElementById("punchline-" + jokeId).style.display = "block"
}


newJokeBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    fetchData();
})