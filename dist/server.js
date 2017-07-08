"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const errorHandler = require("errorhandler");
const apiController = require("./controllers/api");
const app = express();
app.set('port', process.env.PORT || 5000);
app.get('/fortune', apiController.getFortune);
app.get('/fortune/:id', apiController.getFortuneById);
app.use(errorHandler());
app.listen(app.get('port'), () => {
    console.log((' App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
//# sourceMappingURL=server.js.map