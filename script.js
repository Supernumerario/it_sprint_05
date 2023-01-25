let theJoke;
const jokesReport = [];
const jokesSource0 = 'https://icanhazdadjoke.com/';
const jokesSource1 = 'https://api.chucknorris.io/jokes/random';
let sourceSwitch = false;

// Get a new joke
// Show it to the user
// Show and reset the rating buttons
// Save the joke to "theJoke"
async function getJoke() {
	const response = await fetch(
		sourceSwitch? jokesSource0 : jokesSource1,
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
	data.joke = data.joke? data.joke : data.value; // Just to integrate Chuck Norris jokes in previous code structure
	sourceSwitch = !sourceSwitch;
    document.getElementById('js-joke-container').innerHTML = data.joke;
	document.getElementsByClassName('jokes-reporting-container')[0].style.opacity = 1;

	let radios = document.getElementsByName('report-joke-radio');
	radios.forEach(radio => radio.checked = false);
	theJoke = data;

	changeBubles(mainBuble);
	changeBubles(leftBuble);
	changeBubles(rightBuble);
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

// Bubles changing function
const mainBuble = document.getElementById('js-main-buble');
const leftBuble = document.getElementById('js-left-buble');
const rightBuble = document.getElementById('js-right-buble');

function changeBubles(buble) {
	svgPosition = buble.className.split(' ')[1];
	buble.classList.remove(svgPosition);
	svgPosition = svgPosition.substring(3);
	if (svgPosition > 8) {svgPosition = svgPosition -7;} else {svgPosition++;}
	svgPosition = 'svg' + svgPosition;
	buble.classList.add(svgPosition);
}