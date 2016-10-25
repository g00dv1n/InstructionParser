/**
 * Created by g00dv1n on 24.10.16.
 */

const mongoose = require('./db');
const Instruction = require('./Instruction');
const fs = require('fs');
const path = require('path');
const Bb = require('bluebird');
const htmlToText = Bb.promisifyAll(require('html-to-text'));
const co = require('co');

let files = require('./instructions/lockers.json');

for (let f of files) {
    co(function *() {
        let pp = path.join(__dirname, 'instructions', f.txtPath);
        console.log(pp);
        let hp = path.join(__dirname, 'instructions', f.htmlPath);
        let plainText = fs.readFileSync(pp, 'utf8');
        console.log(plainText);

        let htmlText = yield htmlToText.fromFileAsync(hp);

        let inst = new Instruction({
            family: f.name,
            plainText: plainText,
            htmlText: htmlText,
            originalName: f.txtPath.replace('.txt','')
        });
        try {
            let res = yield inst.save();
            console.log(res);
        } catch (err) {
            console.log(err);
        }

    }).catch((err) => {
       console.log(err);
    });


}

