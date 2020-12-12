const http = require("http")

const static = require("node-static")

const file = new static.Server("./public")
var WebSocketServer = require("websocket").server
const httpServer = http.createServer((req, res) => {
	req.addListener("end", () => file.serve(req, res)).resume()
	console.log("We have received a request")
})

const websocket = new WebSocketServer({
	httpServer: httpServer,
})

websocket.on("request", request => {
	const connection = request.accept(null, request.origin)
	connection.on("open", e => {
		console.log("web socket connection opened")
	})
	connection.on("close", () => console.log("connection closed"))
	connection.on("message", message => {
		console.log(`Received message: ${message.utf8Data}`)
		connection.send(
			`From server: I got your message it said "${message.utf8Data}"`
		)
	})
})
httpServer.listen(5000, () =>
	console.log("The server is up and running at port 5000")
)
