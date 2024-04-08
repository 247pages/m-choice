// Define an array of questions and their options
var questions = [
    {
        question: "Select Genre:",
        options: ["Action", "Comedy", "Drama"]
    },
    {
        question: "Select Rating:",
        options: ["7+", "8+", "9+"]
    }
];

// Display questions and options
var questionsDiv = document.getElementById("questions");
questions.forEach(function(q, index) {
    var questionHTML = "<p>" + q.question + "</p>";
    q.options.forEach(function(option) {
        questionHTML += "<input type='radio' name='q" + index + "' value='" + option + "'>" + option + "<br>";
    });
    questionsDiv.innerHTML += questionHTML;
});
questionsDiv.innerHTML += "<button onclick='getRecommendations()'>Get Recommendations</button>";

// Function to fetch recommendations based on user responses
// Function to fetch recommendations based on user responses
// Function to fetch recommendations based on user responses
function getRecommendations() {
    var genre = document.querySelector('input[name="q0"]:checked').value;
    var rating = document.querySelector('input[name="q1"]:checked').value;

    // Call TMDb API with user-selected genre and rating to fetch recommendations
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=fc65f0806227cb6bc6b74722635a0412&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&vote_average.gte=${rating}`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzY1ZjA4MDYyMjdjYjZiYzZiNzQ3MjI2MzVhMDQxMiIsInN1YiI6IjY2MTMwNmM3MTNhZjVmMDE2M2RhNmQyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A8ALN-9LGMuepDxjYFDuys4UsCkJ6LrU0WE3osTgU-k'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayRecommendations(data.results);
        })
        .catch(error => {
            console.error('Error fetching recommendations:', error);
        });
}

// Function to display recommendations
function displayRecommendations(data) {
    var recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = "<h2>Recommended Movies</h2>";
    data.forEach(function(movie) {
        recommendationsDiv.innerHTML += "<p>" + movie.title + "</p>";
    });
}

