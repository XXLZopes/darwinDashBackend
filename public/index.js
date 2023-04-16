const screenEl = document.getElementById('screen');

document.getElementById('fetchHighScore').addEventListener('click', async () =>{
    try {
        const response = await fetch('/score');
        const userData = await response.json();
        const length = userData.length;


        screenEl.innerHTML = "<h1> High Scores </h1>";

        if (length > 0)
            userData = userData.splice(0, length-2);
            
        userData.map((user) => {
            const highScoreEl = document.createElement('div');
            highScoreEl.id = "score-con";

            const userInitialsEl = document.createElement('h3');
            userInitialsEl.classList += 'user-initials';
            userInitialsEl.innerText = user.userInitials;

            const userScoreEl = document.createElement('h3');
            userScoreEl.classList += 'user-score';
            userScoreEl.innerText = user.userScore;



            highScoreEl.appendChild(userInitialsEl);
            highScoreEl.appendChild(userScoreEl);
            screenEl.appendChild(highScoreEl);
        });
        
    } catch (err) {
        console.log('Error fetching data:', err);
    }
});


document.getElementById('fetchLowScore').addEventListener('click', async () =>{
    try {
        const response = await fetch('/score');
        const userData = await response.json();
        const length = userData.length;

        screenEl.innerHTML = "<h1> Lowest Score </h1>";

        // if use
        userData.map((user) => {
            const highScoreEl = document.createElement('div');
            highScoreEl.id = "score-con";

            const userInitialsEl = document.createElement('h3');
            userInitialsEl.classList += 'user-initials';
            userInitialsEl.innerText = user.userInitials;

            const userScoreEl = document.createElement('h3');
            userScoreEl.classList += 'user-score';
            userScoreEl.innerText = user.userScore;



            highScoreEl.appendChild(userInitialsEl);
            highScoreEl.appendChild(userScoreEl);
            screenEl.appendChild(highScoreEl);
        });
        
    } catch (err) {
        console.log('Error fetching data:', err);
    }
})