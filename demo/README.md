# WebSocket Demo

To run the demo clone the enclosing repo, navigate into the `/demo` directory and install the node modules:

```
git clone https://github.com/jaqarrick/websockets-info
cd demo && npm i
```

Launch the server with `npm start`

## Server

### Start with a simple HTTP server:

A WebSocket server lives aside any http server. For simplicity, we can use the built in `http` node module for this.

First import the module:
`const http = require("http")`

A small and optional addition is to allow the server to send a static `public` folder. We can do this by installing `node-static` and writing the following few lines of code:

First install the dependency with `npm i node-static`. Then in `index.js` write:

```
const static = require("node-static")
const file = new static.Server('./public')
```

We then instantiate our http server and serve the static `public` folder:

```
const httpServer = http.createServer((req, res) => {
	req.addListener("end", () => file.serve(req, res)).resume()
	console.log("We have received a request")
})
```

We can launch the server by calling the `listen` method and provide a `PORT` number:

```
httpServer.listen(5000, () =>
	console.log("The server is up and running at port 5000")
)
```

If we run `npm start` at this point, our server would run and if we navigated to `http://localhost:5000` we would see our `index.html` and anything else in our `public` directory.

### Integrating WebSockets

Our WebSocket server must live in tandem to our http server, which we have already created. To achieve this we will initialize a `WebSocketServer` and supply it our `httpServer`:

```
const websocket = new WebSocketServer({
	httpServer: httpServer,
})
```

Now that our WebSocket server is up and running we can start listening to events on the connection after an initial request. First we must define our `connection`:

```
websocket.on("request", request => {
	const connection = request.accept(null, request.origin)
}
```

Once a web socket request is received by the server, the server can chose to accept the request. If it does, we not have a connection.

We can add some simple listeners to the connection:

```
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
```

These listeners fire when respective events fire from the client.

## Client

Our client side code lives in `public/main/js` and it is very simple.

We first connect to the WebSocket server by supplying a ws url:

`const ws = new WebSocket("ws://localhost:5000")`

This automatically sends a request to connect to the server.

`ws.send("your message here")` sends a "message" event to the server. We can access that message in `index.js` with `message.utf8Data`.

We can also add event listeners to the client `ws` connection like `ws.onmessage` or `ws.addEventListener('message')`

---

This is simple straightforward example describes the basic operations of web socket communications.
