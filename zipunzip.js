import { FindArrMatches, FindStrMatches } from './arrutils.js';

export function Zip(Arr) {
    let Prefix = '';
    let Result = Arr.join(' ');
    // console.log(Result);
    // console.log();
    const MatchesArr = FindArrMatches(Arr);
    let Code = 'A';
    for (let i=0; i<MatchesArr.length-1; i++) {
        let TempStr = MatchesArr[i].join(' ');
        let OldLen = Result.length;
        if (!Result.includes(TempStr, Result.indexOf(TempStr) + TempStr.length)) {
            continue;
        }
        Result = Result.replaceAll(TempStr, Code);
        if (OldLen !== Result.length) {
            Prefix = Prefix + Code + TempStr;
            Code = String.fromCharCode(Code.charCodeAt(0)+1);
        }
    }


    return Prefix + '|' + Result;
}

export function Unzip(Str) {

}