/**
 * Created by g00dv1n on 24.10.16.
 */

const fs = require('fs');
const Bb = require('bluebird');
const htmlToText = Bb.promisifyAll(require('html-to-text'));
const path = require('path');
const diff = require('diff');
const co = require('co');
const Instruction = require('./Instruction')


const compareWords = (text1, text2) => {
    let res = [];
    let w1 = text1.split(/\s/g);
    let w2 = text2.split(/\s/g);

    console.log(w1.length);
    console.log(w2.length);

    let length = w1.length;

    for(let i=0; i < length; i++) {
        if (w1[i] != w2[i]) {
            res.push({old: w1[i], 'new': w2[i]})
        }
    }
    console.log(res);
    return res;

};

class InstParser {
    constructor (path) {

    }

    static html2text() {
        htmlToText.fromFileAsync(path.join(__dirname, '# HELP DECRYPT #.html'))
            .then((res)=> {
                console.log(res);
            });
    }
    static compareInst() {

        co(function *() {
            let html_text = yield htmlToText.fromFileAsync(path.join(__dirname, '# HELP DECRYPT #.html'));
            let inst = yield Instruction.findOne({family: 'Cerber'});
            let html_text2 = inst.htmlText;
            //console.log(html_text)
            console.log(html_text2.replace(/\n/g, ''))
            if (html_text == html_text2) {
                console.log('YES');
            }

            let l1 = 'ab db dd';
            let l2 = 'ab db dc';


            compareWords(html_text, html_text2);




        }).catch((err) => {
           console.log(err);
        });
    }

}



InstParser.compareInst();