export function FindStrMatches(Str) {
    return FindArrMatches(Str.split(''));
}

export function FindArrMatches(Arr) {
    let Temp = [];
    const Result = [];
    
    for (let i = 0; i<Arr.length-1; i++) {
        Temp = [Arr[i]];
        for (let index = 1; index < Arr.length-i; index++) {
            Temp.push(Arr[i+index]);
            let Match = false;
            for (let j = i+index+1; j<Arr.length-index; j++) {
                Match = true;
                for (let k = 0; k<=index; k++) {
                    Match = Match && (Temp[k] === Arr[j+k])
                    //console.log('aaa', Match);
                }
                if (Match) {
                    break;
                }
            }
            //console.log('bbb', Match);
            if (!Match) {
                Temp.pop();
                break;
            }
            //console.log(Temp);
        }
    
        if (Temp.length > 2) {
            Result.push(Temp);
        }
    }
    Result.sort((a, b) => b.length - a.length);
    return Result;
}