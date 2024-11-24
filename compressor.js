var copies = {
    a: [], // 97  -> 1
    b: [], // 98  -> 2
    c: [], // 99  -> 3
    d: [], // 100 -> 4
    e: [], // 101 -> 5
    f: [], // 102 -> 6
    g: [], // 103 -> 7
    h: [], // 104 -> 8
    i: [], // 105 -> 9
}

var complex = {
    A: [], // 65 -> 1..
    B: [], // 66 -> 2..
    C: [], // 67 -> 3..
    D: [], // 68 -> 4..
    E: [], // 69 -> 5..
    F: [], // 70 -> 6..
    G: [], // 71 -> 7..
    H: [], // 72 -> 8..
    I: [], // 73 -> 9..
}

var copies_two = {
    j: [], // 106 -> .0
    k: [], // 107 -> .1
    l: [], // 108 -> .2
    m: [], // 109 -> .3
    n: [], // 110 -> .4
    o: [], // 111 -> .5
    p: [], // 112 -> .6
    q: [], // 113 -> .7
    r: [], // 114 -> .8
    s: [], // 115 -> .9
}

var complex_two = {
    J: [], // 74 -> .0.
    K: [], // 75 -> .1.
    L: [], // 76 -> .2.
    M: [], // 77 -> .3.
    N: [], // 78 -> .4.
    O: [], // 79 -> .5.
    P: [], // 80 -> .6.
    Q: [], // 81 -> .7.
    R: [], // 82 -> .8.
    S: [], // 83 -> .9.
}

function ClearOneLevel() {
    copies.a = [];
    copies.b = [];
    copies.c = [];
    copies.d = [];
    copies.e = [];
    copies.f = [];
    copies.g = [];
    copies.h = [];
    copies.i = [];
    complex.A = [];
    complex.B = [];
    complex.C = [];
    complex.D = [];
    complex.E = [];
    complex.F = [];
    complex.G = [];
    complex.H = [];
    complex.I = [];
}

function ClearTwoLevel() {
    copies_two.j = [];
    copies_two.k = [];
    copies_two.l = [];
    copies_two.m = [];
    copies_two.n = [];
    copies_two.o = [];
    copies_two.p = [];
    copies_two.q = [];
    copies_two.r = [];
    copies_two.s = [];
    complex_two.J = [];
    complex_two.K = [];
    complex_two.L = [];
    complex_two.M = [];
    complex_two.N = [];
    complex_two.O = [];
    complex_two.P = [];
    complex_two.Q = [];
    complex_two.R = [];
    complex_two.S = [];
}

export function Compress(Arr) {
    var i;
    var TempStr;
    ClearOneLevel();

    for (i=0; i<Arr.length; i++) {
        if (Arr[i] < 10) {
            copies[String.fromCharCode(96+Arr[i])].push(Arr[i]);
        } else {
            TempStr = String(Arr[i]);
            complex[String.fromCharCode(64+Number(TempStr[0]))].push(TempStr.slice(1));
        }
    }
    
    var Result = '';
    var Encode = '';
    var TempEncodeA, TempEncodeB = '';
    var Key, Value, Key_two, Value_two;
    for ([Key, Value] of Object.entries(copies)) {
        if (Value.length === 0) {
            continue;
        } else if (Value.length === 1) {
            Result = Result + Value[0] + ' '
        } else {
            Encode = Encode + Key + String(Value.length) + ','
        }
    }

    for ([Key, Value] of Object.entries(complex)) {
        if (Value.length === 0) {
            continue;
        } else if (Value.length === 1) {
            Result = Result + String(Key.charCodeAt(0)-64) + Value[0] + ' '
        } else {
            Encode = Encode + Key;
            ClearTwoLevel();
            TempEncodeA = '';
            TempEncodeB = '';
            for (i=0; i<Value.length; i++) {
                if ((Value[i].length === 1) && (Number(Value[i]) < 10)) {
                    copies_two[String.fromCharCode(106+Number(Value[i]))].push(Value[i]);
                } else {
                    complex_two[String.fromCharCode(74+Number(Value[i][0]))].push(Value[i].slice(1));
                }
            }

            for ([Key_two, Value_two] of Object.entries(copies_two)) {
                if (Value_two.length === 0) {
                    continue;
                } else if (Value_two.length === 1) {
                    TempEncodeA = TempEncodeA + Value_two[0] + ';'
                } else {
                    TempEncodeB = TempEncodeB + Key_two + String(Value_two.length) + ';'
                }
            }
            for ([Key_two, Value_two] of Object.entries(complex_two)) {
                if (Value_two.length === 0) {
                    continue;
                } else if (Value_two.length === 1) {
                    TempEncodeA = TempEncodeA + String(Key_two.charCodeAt(0)-74) + Value_two[0] + ';'
                } else {
                    TempEncodeB = TempEncodeB + Key_two + Value_two.join(' ') + ';';
                }
            }
            if (TempEncodeB === '') {
                Encode = Encode + TempEncodeA.slice(0, TempEncodeA.length-1) + ',';
            } else {
                Encode = Encode + TempEncodeA + TempEncodeB.slice(0, TempEncodeB.length-1) + ',';
            }
        }

    }
    return Result.trim()+Encode.slice(0, Encode.length-1);
}

export function Decompress(Str) {
    var Result = new Array();
    var Index = Str.search(/[a-zA-Z]/)
    if (Index !== 0) {
        Result = Result.concat(Str.slice(0, Index).split(' ').map(item => Number(item)));
    }

    Str = Str.slice(Index);
    var TempArr = Str.split(',');
    var TempArr_two = [];
    var i, j;
    for (i=0; i<TempArr.length; i++) {
        if ((97 <= TempArr[i].charCodeAt(0)) && (TempArr[i].charCodeAt(0) <= 105)) {
            Result = Result.concat(new Array(Number(TempArr[i].slice(1))).fill(TempArr[i].charCodeAt(0) - 96));
        }
        if ((65 <= TempArr[i].charCodeAt(0)) && (TempArr[i].charCodeAt(0) <= 73)) {
            TempArr_two = TempArr[i].slice(1).split(';');
            for (j=0; j<TempArr_two.length; j++) {
                if ((106 <= TempArr_two[j].charCodeAt(0)) && (TempArr_two[j].charCodeAt(0) <= 115)) {
                    Result = Result.concat(new Array(Number(TempArr_two[j].slice(1))).fill(
                        Number(String(TempArr[i].charCodeAt(0)-64) + String(TempArr_two[j].charCodeAt(0) - 106))
                    ));
                    continue;
                }
                if ((74 <= TempArr_two[j].charCodeAt(0)) && (TempArr_two[j].charCodeAt(0) <= 83)) {
                    Result = Result.concat(TempArr_two[j].slice(1).split(' ').map(item => 
                        Number(String(TempArr[i].charCodeAt(0)-64) + String(TempArr_two[j].charCodeAt(0)-74) + item)
                    ));
                    continue;
                }
                Result = Result.concat(Number(String(TempArr[i].charCodeAt(0)-64) + TempArr_two[j]));
            }
        }
    }

    Result.sort((a, b) => a - b);
    return Result;
}