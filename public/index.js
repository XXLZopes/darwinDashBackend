const screenEl = document.getElementById('screen');

document.getElementById('fetchHighScore').addEventListener('mousedown', async () =>{
    console.log('clicked');
    try {
        const response = await fetch('/score');
        const userData = await response.json();
        const length = userData.length;

        let userDataExcludingLowest = [...userData];
        if (length > 1)
            userDataExcludingLowest = userData.slice(0, -1);

        screenEl.innerHTML = "<h1> High Scores </h1>";
        
            userDataExcludingLowest.map((user, index) => {
            const highScoreEl = document.createElement('div');
            highScoreEl.id = "score-con";

            const userInitialsEl = document.createElement('h3');
            userInitialsEl.classList += 'user-initials';
            userInitialsEl.innerText = `${index+1}. ${user.userInitials}`;

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


document.getElementById('fetchLowScore').addEventListener('mousedown', async () =>{
    try {
        const response = await fetch('/score');
        const userData = await response.json();
        const length = userData.length;

        screenEl.innerHTML = "";
        const lowScoreH1El = document.createElement("h1");
        lowScoreH1El.id = "low-score-h1"
        lowScoreH1El.innerText = "Lowest Score";
        screenEl.appendChild(lowScoreH1El);

        let lowScoreEl = document.createElement('div');
        lowScoreEl.id = "low-score-con";

        if (length <= 1) {
            const userInitialsEl = document.createElement('h3');
            userInitialsEl.innerText = "No Low Score... Yet";
            lowScoreEl.appendChild(userInitialsEl);
        } else {
            const lowScore = userData[length-1];

            const userInitialsEl = document.createElement('h3');
            userInitialsEl.classList += 'user-initials';
            userInitialsEl.innerText = lowScore.userInitials;


            const userScoreEl = document.createElement('h3');
            userScoreEl.classList += 'user-score';
            userScoreEl.innerText = lowScore.userScore;

            lowScoreEl.appendChild(userInitialsEl);
            lowScoreEl.appendChild(userScoreEl);
        }
            
        screenEl.appendChild(lowScoreEl);
        
    } catch (err) {
        console.log('Error fetching data:', err);
    }
});



// CREATORS BUTTON
const creatorsEl = document.createElement('div');
creatorsEl.id = "creator-con";

const aidanMeyer = document.createElement('h3');
aidanMeyer.innerText = "Aidan Meyer";
const anthonyCavuoti = document.createElement('h3');
anthonyCavuoti.innerText ="Anthony Cavuoti"
const danteAyala = document.createElement('h3');
danteAyala.innerText = "Dante Ayala";
const victorDiaz = document.createElement('h3');
victorDiaz.innerText = "Victor Diaz";
const forrestReid = document.createElement('h3');
forrestReid.innerText = "Forrest Reid"

creatorsEl.appendChild(aidanMeyer);
creatorsEl.appendChild(anthonyCavuoti);
creatorsEl.appendChild(danteAyala);
creatorsEl.appendChild(victorDiaz);
creatorsEl.appendChild(forrestReid);



document.getElementById('creditsButton').addEventListener('mousedown', () => {
    screenEl.innerHTML = "<h1> Created By </h1>";
    
    screenEl.appendChild(creatorsEl);

});


const downloadButton = document.createElement('button');
downloadButton.id = "download-button";

document.getElementById('downloadButton').addEventListener('mousedown', () => {
    const downloadButtonEl = document.createElement('button');
    downloadButtonEl.id = "download-button";
    downloadButtonEl.innerText = "Download Darwin Dash";

    screenEl.innerHTML=
    `
    <h1>Darwin Dash</h1>
    <div class="starter-div">
        <p>Welcome to Darwin Dash Use the Arcade Machine to navigate the page</p>
    </div>
    `

    screenEl.appendChild(downloadButtonEl);
})