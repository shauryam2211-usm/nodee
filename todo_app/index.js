//express is a web framework for node.js, it allows us to create web applications and APIs easily. In this code, we are creating a simple express application that listens on port 3000. We have defined two routes, /sum and /multiply, which take two query parameters a and b, and return the sum and product of those parameters respectively. We also have a middleware function requestLogger that logs the number of requests made to the server.
// its a chain of middleware functions that are executed in order for each request. The requestLogger function is called before the route handler for /sum, so it will log the request count before processing the sum calculation.


const express = require('express')
const app = express()
const port = 3000
let requestCount = 0;
function requestLogger(req, res, next) {
  requestCount++;
  console.log(`Request #${requestCount}: ${req.method} ${req.url}`);
  next();
}
//middleware function is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next. Middleware functions can perform the following tasks:
//Execute any code.
//Make changes to the request and the response objects.
//End the request-response cycle.
//Call the next middleware function in the stack. If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging and the client will not receive a response.
// main logic of the requestLogger middleware is to increment the requestCount variable and log the request method and URL to the console. After that, it calls next() to pass control to the next middleware function or route handler in the stack.
app.get("/sum", requestLogger, (req, res) => { //the requestLogger middleware is added to the /sum route, so it will be executed before the route handler for /sum. This means that every time a request is made to /sum, the requestLogger function will be called, logging the request count and the method and URL of the request before processing the sum calculation.
  const { a, b } = req.query;
  const sum = parseInt(a) + parseInt(b);
  res.send(`The sum of ${a} and ${b} is ${sum}`);
});
app.get("/multiply", requestLogger, (req, res) => {
  const { a, b } = req.query;
  const product = parseInt(a) * parseInt(b);
  res.send(`The product of ${a} and ${b} is ${product}`);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})