// Sports Day Project
const readline = require("readline");
function OpeningCeremony(callback) {
    let scores = { red: 0, blue: 0, green: 0, yellow: 0 };
    console.log("Let the games begin!");

    let countdown = 3;
    let interval = setInterval(() => {
        console.log(`Opening ceremony starts in ${countdown}...`);
        countdown--;
        if (countdown < 0) {
            clearInterval(interval);
            console.log("🎉 Opening Ceremony is over. Let's start the first event!");
            callback(scores); // Pass scores to the first event
        }
    }, 1000);
}

function Race100M(scores, callback) {
    console.log("\n Race 100M starts in 3 seconds...");
    setTimeout(() => {
        let times = {
            red: Math.floor(Math.random() * 6) + 10,   // 10-15 sec
            blue: Math.floor(Math.random() * 6) + 10,
            green: Math.floor(Math.random() * 6) + 10,
            yellow: Math.floor(Math.random() * 6) + 10
        };

        console.log("Race results (time in sec):", times);

        let sorted = Object.entries(times).sort((a, b) => a[1] - b[1]); // sort by time
        scores[sorted[0][0]] += 50; // fastest
        scores[sorted[1][0]] += 25; // second fastest

        console.log("Updated scores after Race 100M:", scores);
        callback(scores);
    }, 3000);
}

function LongJump(scores, callback) {
    console.log("\n Long Jump starts in 2 seconds...");
    setTimeout(() => {
        let colors = Object.keys(scores);
        let winner = colors[Math.floor(Math.random() * colors.length)];
        console.log(`Winner of Long Jump: ${winner}`);
        scores[winner] += 150;
        console.log("Updated scores after Long Jump:", scores);
        callback(scores);
    }, 2000);
}


function HighJump(scores, callback) {
    console.log("\n High Jump event begins!");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Which color secured the highest jump? (red/blue/green/yellow): ", (color) => {
        color = color.trim().toLowerCase();

        if (color && scores[color] !== undefined) {
            scores[color] += 100;
            console.log(`${color} awarded 100 points!`);
        } else {
            console.log("Event was cancelled due to no valid input.");
        }

        console.log("Updated scores after High Jump:", scores);
        rl.close();
        callback(scores);
    });
}

function AwardCeremony(scores) {
    console.log("\n Award Ceremony Time!");
    let sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    console.log(`1st Place: ${sorted[0][0]} with ${sorted[0][1]} points`);
    console.log(`2nd Place: ${sorted[1][0]} with ${sorted[1][1]} points`);
    console.log(`3rd Place: ${sorted[2][0]} with ${sorted[2][1]} points`);
    console.log(`4th Place: ${sorted[3][0]} with ${sorted[3][1]} points`);
}

// Start the sports day
OpeningCeremony((scores) => {
    Race100M(scores, (scores) => {
        LongJump(scores, (scores) => {
            HighJump(scores, (scores) => {
                AwardCeremony(scores);
            });
        });
    });
});
