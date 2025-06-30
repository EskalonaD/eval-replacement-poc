import express  from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { prepareJsResponse } from './web.utility.js';
import { convertEvalBasedJsonToJS } from './rule-to-object.convertor.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export const app = express();

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", `script-src data: 'self'`);

    next();
});
app.use(express.static('front/dist/front-dev/browser'));

app.get('/script', (rq, rs) => {
    const htmlPath = path.join(__dirname, 'assets/data-to-process.json');
    let json = fs.readFileSync(htmlPath, 'utf-8');
    const ruleDict = JSON.parse(json);
    console.log(ruleDict)

    const operators = ['getData', 'processData']

    const script = convertEvalBasedJsonToJS(ruleDict, operators);
      
    const fileName = 'script.js'; 

    prepareJsResponse(rs, fileName)

    rs.send(script);

    return;
})

app.listen(3001, () => console.log('opened'))




app.listen(3002, () => console.log('second'))