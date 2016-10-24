/**
 * Created by g00dv1n on 24.10.16.
 */

const mongoose = require('./db');
const Instruction = require('./Instruction');
const fs = require('fs');
const path = require('path');

let files = require('./instructions/lockers.json');

for (let f of files) {
    let p = path.join(__dirname, 'instructions', f.path)
    console.log(p)
    let data = fs.readFileSync(p, 'utf8')
    console.log(data);

    let inst = new Instruction({family: f.name, data: data, originalName: f.path});
    inst.save()
        .then((res) =>{
           console.log(res);
        });
}

