﻿import * as express from 'express';
import * as path from 'path';
import * as errorHandler from 'errorhandler';

import * as apiController from './controllers/api';

const app = express();

app.set('port', process.env.PORT || 8080);

app.get('/fortune', apiController.getFortune);
app.get('/fortune/:id', apiController.getFortuneById);

app.use(errorHandler());

app.listen(app.get('port'), ()=> {
    console.log((' App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
