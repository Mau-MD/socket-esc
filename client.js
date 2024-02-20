const ioClient = require("socket.io-client");

const socket = ioClient("http://localhost:3000");
const readline = require("readline");
const tty = require("tty");
const { randomBytes } = require("crypto");

const userId = Math.random();

const blueColor = "\x1b[34m";
const resetColor = "\x1b[0m";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Listen for events from the server
socket.on("connect", () => {});

socket.on("msg-incoming", (message) => {
  const parsedData = JSON.parse(message);
  if (parsedData.id == userId) return;
  console.log(
    `${blueColor}[User ${parsedData.id.toFixed(2)}]: ${
      parsedData.msg
    }${resetColor}`
  );
});

function askQuestion() {
  setTimeout(() => {
    rl.question("", (msg) => {
      const data = {
        id: userId,
        msg: msg,
      };
      socket.emit("msg-send", JSON.stringify(data));

      askQuestion();
    });
  }, 1000);
}

askQuestion();
