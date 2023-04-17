window.onload = () => {
  if (getCookie("fivestars")) {
    document.querySelector(".hover-list").classList += " rated";
  }
};

const screenEl = document.getElementById("screen");

screenEl.addEventListener("mousedown", function (event) {
  event.preventDefault();
});

document
  .getElementById("fetchHighScore")
  .addEventListener("mousedown", async () => {
    console.log("clicked");
    try {
      const response = await fetch("/score");
      const userData = await response.json();
      const length = userData.length;

      let userDataExcludingLowest = [...userData];
      if (length > 1) userDataExcludingLowest = userData.slice(0, -1);

      screenEl.innerHTML =
        "<div id='highscoreh1div'><h1> High Scores </h1> <div>";

      userDataExcludingLowest.map((user, index) => {
        const highScoreEl = document.createElement("div");
        highScoreEl.id = "score-con";

        const userInitialsEl = document.createElement("h3");
        userInitialsEl.classList += "user-initials";
        userInitialsEl.innerText = `${index + 1}. ${user.userInitials}`;

        const userScoreEl = document.createElement("h3");
        userScoreEl.classList += "user-score";
        userScoreEl.innerText = user.userScore;

        highScoreEl.appendChild(userInitialsEl);
        highScoreEl.appendChild(userScoreEl);
        screenEl.appendChild(highScoreEl);
      });
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  });

document
  .getElementById("fetchLowScore")
  .addEventListener("mousedown", async () => {
    try {
      const response = await fetch("/score");
      const userData = await response.json();
      const length = userData.length;

      screenEl.innerHTML = "";
      const lowScoreH1El = document.createElement("h1");
      lowScoreH1El.id = "low-score-h1";
      lowScoreH1El.innerText = "Lowest Score";
      screenEl.appendChild(lowScoreH1El);

      let lowScoreEl = document.createElement("div");
      lowScoreEl.id = "low-score-con";

      if (length <= 1) {
        const userInitialsEl = document.createElement("h3");
        userInitialsEl.innerText = "No Low Score... Yet";
        lowScoreEl.appendChild(userInitialsEl);
      } else {
        const lowScore = userData[length - 1];

        const userInitialsEl = document.createElement("h3");
        userInitialsEl.classList += "user-initials";
        userInitialsEl.innerText = lowScore.userInitials;

        const userScoreEl = document.createElement("h3");
        userScoreEl.classList += "user-score";
        userScoreEl.innerText = lowScore.userScore;

        lowScoreEl.appendChild(userInitialsEl);
        lowScoreEl.appendChild(userScoreEl);
      }

      screenEl.appendChild(lowScoreEl);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  });

// CREATORS BUTTON
const creatorsEl = document.createElement("div");
creatorsEl.id = "creator-con";

const aidanMeyer = document.createElement("h3");
aidanMeyer.innerText = "Aidan Meyer";
const anthonyCavuoti = document.createElement("h3");
anthonyCavuoti.innerText = "Anthony Cavuoti";
const danteAyala = document.createElement("h3");
danteAyala.innerText = "Dante Ayala";
const victorDiaz = document.createElement("h3");
victorDiaz.innerText = "Victor Diaz";
const forrestReid = document.createElement("h3");
forrestReid.innerText = "Forrest Reid";

creatorsEl.appendChild(aidanMeyer);
creatorsEl.appendChild(anthonyCavuoti);
creatorsEl.appendChild(danteAyala);
creatorsEl.appendChild(victorDiaz);
creatorsEl.appendChild(forrestReid);

document.getElementById("creditsButton").addEventListener("mousedown", () => {
  screenEl.innerHTML = "<h1> Created By </h1>";

  screenEl.appendChild(creatorsEl);
});

document.getElementById("downloadButton").addEventListener("mousedown", () => {
  if (document.getElementById("originalh1")) {
    return;
  }

  screenEl.innerHTML = `
    <h1>Darwin Dash</h1>
    <div class="starter-div">
        <p>Welcome to Darwin Dash Use the Arcade Machine to navigate the page</p>
        <a 
        tabindex=2 id="download-button" href="/DarwinDash.zip" download>Download Darwin Dash</a>
    </div>

    <div id=star-con>
                <p>Rate the App</p>
                
                <ul class="hover-list">
                    <li>
                        <span tabindex=3 id="star1" class="material-symbols-outlined star">
                            star
                        </span>
                    </li>
                    <li>
                        <span tabindex=3 id="star2" class="material-symbols-outlined star">
                            star
                        </span>
                    </li>
                    <li>
                        <span tabindex=3 id="star3" class="material-symbols-outlined star">
                            star
                        </span>
                    </li>
                    <li>
                        <span tabindex=3 id="star4" class="material-symbols-outlined star">
                            star
                        </span>
                    </li>
                    <li>
                        <span tabindex=3 id="star5" class="material-symbols-outlined star">
                            star
                        </span>
                    </li>
                </ul>
        </div>
    `;
  document.querySelectorAll(".hover-list li").forEach((element) => {
    element.addEventListener("mouseover", function () {
      let sibling = this.previousElementSibling;
      while (sibling) {
        sibling.classList += "previous-hover";
        sibling = sibling.previousElementSibling;
      }
    });

    element.addEventListener("mouseout", function () {
      let sibling = this.previousElementSibling;
      while (sibling) {
        sibling.classList.remove("previous-hover");
        sibling = sibling.previousElementSibling;
      }
    });
  });

  if (getCookie("fivestars")) {
    document.querySelector(".hover-list").classList += " rated";
    let starElements = document.querySelectorAll(".star");
    starElements.forEach((star) => {
      star.removeAttribute("tabindex");
    });
  }
  
    document.querySelectorAll(".star").forEach((button) => {
      button.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          button.dispatchEvent(
            new MouseEvent("mousedown", { bubbles: true, cancelable: true })
          );
        }
      });
    });

  document.querySelectorAll(".star").forEach((element) => {
    console.log(element);
    element.addEventListener("mousedown", function () {
      console.log("down");
      const starId = element.id;
      if (starId != "star5" && !getCookie("fivestars")) {
        window.alert(
          "The correct answer was 5 stars... Let me fix that for you!"
        );
      }

      document.querySelector(".hover-list").classList += " rated";

      if (!getCookie("fivestars")) {
        setCookie("fivestars", "true", 1);
      }
    });
  });

  
});

document.querySelectorAll(".hover-list li").forEach((element) => {
  element.addEventListener("mouseover", function () {
    let sibling = this.previousElementSibling;
    while (sibling) {
      sibling.classList += "previous-hover";
      sibling = sibling.previousElementSibling;
    }
  });

  element.addEventListener("mouseout", function () {
    let sibling = this.previousElementSibling;
    while (sibling) {
      sibling.classList.remove("previous-hover");
      sibling = sibling.previousElementSibling;
    }
  });
});

//click
//if not 5 star then tell them they are wrong
//set all stars to     font-variation-settings:
//                                  'FILL' 100,
//                                  'wght' 400,
//                                  'GRAD' 100,
//                                  'opsz' 48
// and then store in cookies

const star1El = document.getElementById("star1");
const star2El = document.getElementById("star2");
const star3El = document.getElementById("star3");
const star4El = document.getElementById("star4");
const star5El = document.getElementById("star5");

function setCookie(cName, cData, exDays) {
  const d = new Date();
  d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cName + "=" + cData + ";" + expires + ";path=/";
}

function getCookie(cName) {
  let decodedCookie = decodeURIComponent(document.cookie);
  let cArray = decodedCookie.split(";");
  let cObject = {};

  cArray.forEach((element) => {
    let key = element.split("=")[0];
    let value = element.split("=")[1];
    cObject[[key]] = value;
  });
  return cObject[cName];
}

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.querySelectorAll(".star");
  buttons.forEach((button) => {
    button.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        button.dispatchEvent(
          new MouseEvent("mousedown", { bubbles: true, cancelable: true })
        );
      }
    });
  });
});

document.querySelectorAll(".star").forEach((element) => {
  element.addEventListener("mousedown", function () {
    if (getCookie("fivestars")) {
      return;
    }
    const starId = element.id;
    if (starId != "star5") {
      window.alert(
        "The correct answer was 5 stars... Let me fix that for you!"
      );
    }

    document.querySelector(".hover-list").classList += " rated";

    if (!getCookie("fivestars")) {
      setCookie("fivestars", "true", 1);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        button.dispatchEvent(
          new MouseEvent("mousedown", { bubbles: true, cancelable: true })
        );
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (getCookie("fivestars")) {
    let starElements = document.querySelectorAll(".star");
    starElements.forEach((star) => {
      star.removeAttribute("tabindex");
    });
  }
});
