// script.js

const apiKey = "AIzaSyDC_aqgXAhScsYg85qTTs1fQcUtgn2Z2xQ";
const sheetId = "1ITo6A2vSmu9LjrsoxtaXootEJlpJjg2h_-JaG-pR9d8";
const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

const loginForm = document.getElementById("login-form");
const modeSection = document.getElementById("mode-section");
const dataSection = document.getElementById("data-section");
const bgMusic = document.getElementById("bgMusic");

let userData = {};

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const roll = document.getElementById("roll").value;
    const password = document.getElementById("password").value;

    const response = await fetch(sheetUrl);
    const data = await response.json();
    const rows = data.values;

    const userRow = rows.find(row => row[0] === roll && row[1] === password);

    if (userRow) {
        userData = {
            name: userRow[2],
            points: parseInt(userRow[3], 10),
            task: userRow[4],
            userAverage: userRow[5],
            allAverage: userRow[6],
            curatorMessage: userRow[7],
            course: userRow[8]
        };

        document.getElementById("login-section").style.display = "none";
        modeSection.style.display = "block";
    } else {
        alert("Invalid roll or password. Please try again .");
    }
});

modeSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("mode-button")) {
        const mode = e.target.dataset.mode;
        setMode(mode);
        modeSection.style.display = "none";
        displayUserData(mode);
    }
});

function setMode(mode) {
    const modeConfig = {
    neutral: { 
        bg: "1.jpg", 
        music: "1.mp3", 
        levels: ["Newton", "Tesla", "Curie", "Da Vinci", "Edison", "Einstein", "Socrates"] 
    },
    islamic: { 
        bg: "2.jpg", 
        music: "2.mp3", 
        levels: ["Adam", "Khadija", "Suleiman", "Ayesha", "Ibn Sina", "Omar", "Muhammad"] 
    },
    bts: { 
        bg: "3.jpg", 
        music: "3.mp3", 
        levels: ["Jin", "Yoongi", "Jimin", "Namjoon", "Taehyung", "Jungkook", "Bangtan"] 
    },
    villain: { 
        bg: "4.jpg", 
        music: "4.mp3", 
        levels: ["Joker", "Voldemort", "Thanos", "Loki", "Moriarty", "Hannibal", "Darth Vader"] 
    }
};


    const { bg, music, levels } = modeConfig[mode];

    document.body.style.backgroundImage = `url(${bg})`;
    document.body.style.backgroundSize = "3in 5in";
    document.body.style.backgroundRepeat = "repeat";
    bgMusic.src = music;
    bgMusic.play();

    userData.levelNames = levels;
}

function displayUserData(mode) {
    dataSection.style.display = "block";

    document.getElementById("user-name").textContent = userData.name;
    document.getElementById("user-points").textContent = userData.points;

    const levelIndex = getLevelIndex(userData.points);
    const currentLevel = userData.levelNames[levelIndex];
    document.getElementById("user-level").textContent = currentLevel;

    const nextLevelPoints = getNextLevelPoints(levelIndex);
    const progressValue = Math.min((userData.points / nextLevelPoints) * 100, 100);
    document.getElementById("progress").value = progressValue;

    document.getElementById("user-task").textContent = userData.task;
    document.getElementById("user-average").textContent = userData.userAverage;
    document.getElementById("all-average").textContent = userData.allAverage;
    document.getElementById("curator-message").textContent = userData.curatorMessage;
    document.getElementById("user-course").textContent = userData.course;

    document.getElementById("exam-button").addEventListener("click", () => {
        const roll = parseInt(document.getElementById("roll").value, 10);

        if (roll >= 1 && roll <= 1999) {
            window.location.href = "https://curator100.github.io/rugbi/";
        } else if (roll >= 2000 && roll <= 3999) {
            window.location.href = "https://curator100.github.io/View/";
        } else if (roll >= 4000 && roll <= 5999) {
            window.location.href = "https://youtube.com";
        } else if (roll >= 6000 && roll <= 7999) {
            window.location.href = "https://curator100.github.io/1811/";
        } else {
            alert("Invalid roll range. Please contact support.");
        }
    });
}

function getLevelIndex(points) {
    if (points <= 100) return 0;
    if (points <= 250) return 1;
    if (points <= 500) return 2;
    if (points <= 1000) return 3;
    if (points <= 2500) return 4;
    if (points <= 5000) return 5;
    return 6;
}

function getNextLevelPoints(levelIndex) {
    const thresholds = [100, 250, 500, 1000, 2500, 5000, 10000];
    return thresholds[levelIndex];
}
