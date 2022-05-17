import {Injectable} from '@angular/core';
import {NodeService} from '../remote/node.service';
import fastCartesian from 'fast-cartesian';
import Tokenizr from 'tokenizr';

@Injectable({
    providedIn: 'root'
})
export class InputAnalysisService {

    constructor(private nodeService: NodeService) {
    }

    async getAnalysis(str, semantic): Promise<Array<string>> {
        // const lexer = new Tokenizr();
        // lexer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, (ctx, match) => {
        //     ctx.accept('string');
        // });
        // lexer.rule(/"((?:\\"|[^\r\n])*)"/, (ctx, match) => {
        //     ctx.accept('string', match[1].replace(/\\"/g, '"'));
        // });
        // lexer.rule(/((?:\\"|[^\r\n])*)/, (ctx, match) => {
        //     ctx.accept('string', match[1].replace(/\\"/g, '"'));
        // });
        // lexer.rule(/\/\/[^\r\n]*\r?\n/, (ctx, match) => {
        //     ctx.ignore();
        // });
        // lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
        //     ctx.ignore();
        // });
        // lexer.rule(/[+-]+/, (ctx, match) => {
        //     ctx.accept('string');
        // });
        // // lexer.input('\" mooo ggg\" + sea sss');
        // lexer.input(' (mooo ggg) + sea sss');
        // lexer.tokens().forEach((token) => {
        //     console.log(token.toString());
        // });
        // str = str.replaceAll(' + ', '+');
        let numOpenParan = 0;
        const words = str.split(' ');
        let finalString = [];
        let insidePar = '';
        for (let i = 0; i < words.length; i += 1) {
            const word = words[i];
            if (word.indexOf('*') > -1) {
                const star = await this.starAnalysis(word, semantic);
                if (star !== null) {
                    star.unshift(word + ',');
                    finalString = finalString.concat(star);
                }
            }
            numOpenParan = this.getNumParentheses(words[i], numOpenParan);
            if (numOpenParan !== 0) {
                // if (words[i + 1] !== '+' && words[i + 1] !== '|' && words[i] !== '+' && words[i] !== '|'
                //     && i !== words.length - 1) {
                //     words[i] = words[i] + ' ';
                // }
                insidePar = insidePar + ' ' + words[i];
            } else {
                if (insidePar !== '') {
                    insidePar = insidePar + ' ' + words[i];
                    finalString = finalString.concat(insidePar.trim());
                    insidePar = '';
                } else {
                    finalString = finalString.concat(words[i]);
                }
            }
        }
        for (let i = 0; i < finalString.length; i += 1) {
            finalString[i] = finalString[i].replaceAll('+', ' + ');
            finalString[i] = finalString[i].replaceAll('(', '');
            finalString[i] = finalString[i].replaceAll(')', '');
            finalString[i] = finalString[i].replaceAll('\"', '');
            finalString[i] = finalString[i].replaceAll('  ', ' ');
            if (finalString[i] === ' + ') {
                finalString[i] = finalString[i - 1] + ' + ' + finalString[i + 1];
                finalString.splice(i + 1, 1);
                finalString.splice(i - 1, 1);
            }
        }
        return finalString;
    }

    async getAnalysis2(str, semantic): Promise<Array<string>> {
        let words = str.split(' ');
        let isParOpen = 'no';
        let insidePar = '';
        const finalArray = [];
        for (let i = 0; i < words.length; i += 1) {
            const word = words[i];
            if (word.indexOf('*') > -1) {
                const star = await this.starAnalysis(word.slice(0, -1), semantic);
                if (star !== null) {
                    star.unshift(word);
                    words[i] = star;
                }
            }
        }
        for (let i = words.length - 1; i >= 0; i -= 1) {
            if (!Array.isArray(words[i])) {
                isParOpen = this.getIsParOpen(words[i], isParOpen);
                if (isParOpen === 'first' || isParOpen === 'last' || isParOpen === 'middle') {
                    insidePar = words[i] + ' ' + insidePar;
                }
                if (isParOpen === 'first' || isParOpen === 'middle') {
                    words[i + 1] = insidePar.trim();
                    words.splice(i, 1);
                }
                if (isParOpen === 'first') {
                    insidePar = '';
                }
            }
        }
        for (let i = words.length - 1; i >= 0; i -= 1) {
            if (words[i] === '+') {
                if (!Array.isArray(words[i - 1])) {
                    words[i - 1] = [words[i - 1]];
                }
                if (!Array.isArray(words[i + 1])) {
                    words[i + 1] = [words[i + 1]];
                }
                words[i + 1] = fastCartesian([
                    words[i - 1],
                    words[i + 1],
                ]);
                words.splice(i - 1, 2);
            }
        }
        words = words.flat();

        for (let i = 0; i < words.length; i += 1) {
            if (Array.isArray(words[i])) {
                finalArray.push(words[i].join(' + '));
            } else {
                finalArray.push(words[i]);
            }
        }
        return finalArray;
    }

    getIsParOpen(word, isParOpen): string {
        if ((word.startsWith('(') || word.startsWith('\'')) && (word.endsWith(')') || word.endsWith('\''))) {
            return 'no';
        }
        if (word.startsWith('(') || word.startsWith('\'')) {
            return 'first';
        }
        if (word.endsWith(')') || word.endsWith('\'')) {
            return 'last';
        }
        if (isParOpen === 'last') {
            return 'middle';
        }
        return 'no';
    }

    getNumParentheses(word, numOpenParentheses): number {
        if (word.startsWith('(') || word.startsWith('\'')) {
            numOpenParentheses++;
        }
        if (word.endsWith(')') || word.endsWith('\'')) {
            numOpenParentheses--;
        }
        return numOpenParentheses;
    }

    starAnalysis(word, semantic): any {
        return new Promise(resolve => {
            if (!semantic) {
                this.nodeService.suggestSimple(word.slice(0, -1)).subscribe(data => {
                    const keysText = [];
                    const keys = data.suggest[0].options;
                    keys.forEach((element) => {
                        const str = element.text;
                        keysText.push(str);
                    });
                    resolve(keysText);
                });
            } else {
                this.nodeService.suggestTerminology(word.slice(0, -1)).subscribe(data => {
                    const keysText = [];
                    const keys = data.results;
                    keys.forEach((element) => {
                        const str = element.label;
                        keysText.push(str);
                    });
                    resolve(keysText);
                });
            }
        });
    }
}
