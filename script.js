let theJoke;
const jokesReport = [];

// Get a new joke
// Show it to the user
// Show and reset the rating buttons
// Save the joke to "theJoke"
async function getJoke() {
	const response = await fetch(
		'https://icanhazdadjoke.com/',
		{
			method: 'GET',
			headers: {
                'Accept': 'application/json',
			}
		}
	);
    if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
    const data = await response.json();
    document.getElementById('js-joke-container').innerHTML = data.joke;
	document.getElementsByClassName('jokes-reporting-container')[0].style.opacity = 1;

	let radios = document.getElementsByName('report-joke-radio');
	radios.forEach(radio => radio.checked = false);
	theJoke = data;
}

// Add event to the main button
const getJokeBtn = document.getElementById('js-get-joke');
getJokeBtn.addEventListener('click', getJoke);

// Save the actual joke to the report with selected score
function reportJoke() {
	if (theJoke.isReported) {
		jokeToUpdate = jokesReport.find(joke => joke.id === theJoke.id);
		jokeToUpdate.score = this.value;
		jokeToUpdate.date = new Date().toISOString();
	} else {
		theJoke.isReported = true;
		const jokeToReport = {
			id: theJoke.id,
			joke: theJoke.joke,
			score: this.value,
			date: new Date().toISOString()
		}
		jokesReport.push(jokeToReport);
	}
	console.log(jokesReport);
}

// Add event to all radiobuttons
const radiosBtn = document.getElementsByName('report-joke-radio');
radiosBtn.forEach(element => element.addEventListener('click', reportJoke));