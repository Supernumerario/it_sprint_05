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
    console.log('The joke: ', data.joke);
    console.log('1');
}

const getJokeBtn = document.getElementById('js-get-joke');
getJokeBtn.addEventListener('click', getJoke);