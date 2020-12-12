const ws = new WebSocket("ws://localhost:5000")
const sendMessageBtn = document.querySelector("#send-msg-btn")
const textContainer = document.querySelector("#text-container")

ws.onmessage = message => {
	console.log(`received a message from server: ${message.data}`)
	textContainer.innerHTML = `received a message from server: ${message.data}`
}

const sendMessageToSocketServer = message => {
	ws.send(message)
}

sendMessageBtn.onclick = () => sendMessageToSocketServer("Hi server!")
