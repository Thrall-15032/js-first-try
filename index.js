import { Compress, Decompress } from './compressor.js'

var verbose = false;

function Check(Str, ZipStr) {
    if (verbose) {
        console.log();
        console.log('String original = ', Str);
        console.log();
    }
    console.log('String original length = ', Str.length);
    if (verbose) {
        console.log();
        console.log('String zipped = ', ZipStr);
        console.log();
    }
    console.log('String original length = ', ZipStr.length);
    console.log('Compress rate = ', ((ZipStr.length * 100) / Str.length).toFixed(2), '%');
    var Array1 = Str.split(' ').map(item => Number(item));
    var Array2 = Decompress(ZipStr);
    var i;
    if (Array1.length !== Array2.length) {
        throw new Error('Invalid Decompress Length');
    }
    for (i=0; i<Array1.length; i++) {
        if (Array1[i] !== Array2[i]) {
            console.log(Str);
            console.log(ZipStr);
            console.log(Array1);
            console.log(Array2);
            console.log(Array1[i], Array2[i]);
            throw new Error('Invalid Decompress Result');
        }
    }
    console.log();
}

function RandomOneCharNumbers() {
    var i;
    const Arr = new Array(1000);
    for (i = 0; i<Arr.length; i++) {
        Arr[i] = Math.round(1 + (Math.random() * 8));
    }
    Arr.sort((a, b) => a - b);
    console.log('##############################################################');
    console.log('RandomOneCharNumbers');
    Check(Arr.join(' '), Compress(Arr));
}

function RandomTwoCharNumbers() {
    var i;
    const Arr = new Array(1000);
    for (i = 0; i<Arr.length; i++) {
        Arr[i] = Math.round(10 + (Math.random() * 98));
    }
    Arr.sort((a, b) => a - b);
    console.log('##############################################################');
    console.log('RandomTwoCharNumbers');
    Check(Arr.join(' '), Compress(Arr));
}

function RandomThreeCharNumbers() {
    var i;
    const Arr = new Array(1000);
    for (i = 0; i<Arr.length; i++) {
        Arr[i] = Math.round(100 + (Math.random() * 998));
    }
    Arr.sort((a, b) => a - b);
    console.log('##############################################################');
    console.log('RandomThreeCharNumbers');
    Check(Arr.join(' '), Compress(Arr));
}

function RandomEveryNumberX3() {
    var i;
    const Arr = new Array(900);
    for (i = 1; i<=300; i++) {
        Arr[(i*3) - 3] = i;
        Arr[(i*3) - 2] = i;
        Arr[(i*3) - 1] = i;
    }
    console.log('##############################################################');
    console.log('RandomEveryNumberX3');
    Check(Arr.join(' '), Compress(Arr));
}

function Random300x50() {
    var i;
    const Arr = new Array(50);
    for (i = 0; i<Arr.length; i++) {
        Arr[i] = Math.round(1 + (Math.random() * 299));
    }
    Arr.sort((a, b) => a - b);
    console.log('##############################################################');
    console.log('Random300x50');
    Check(Arr.join(' '), Compress(Arr));
}

function Random300x100() {
    var i;
    const Arr = new Array(100);
    for (i = 0; i<Arr.length; i++) {
        Arr[i] = Math.round(1 + (Math.random() * 299));
    }
    Arr.sort((a, b) => a - b);
    console.log('##############################################################');
    console.log('Random300x100');
    Check(Arr.join(' '), Compress(Arr));
}

function Random300x500() {
    var i;
    const Arr = new Array(500);
    for (i = 0; i<Arr.length; i++) {
        Arr[i] = Math.round(1 + (Math.random() * 299));
    }
    Arr.sort((a, b) => a - b);
    console.log('##############################################################');
    console.log('Random300x500');
    Check(Arr.join(' '), Compress(Arr));
}

function Random300x1000() {
    var i;
    const Arr = new Array(1000);
    for (i = 0; i<Arr.length; i++) {
        Arr[i] = Math.round(1 + (Math.random() * 299));
    }
    Arr.sort((a, b) => a - b);
    console.log('##############################################################');
    console.log('Random300x1000');
    Check(Arr.join(' '), Compress(Arr));
}

RandomOneCharNumbers();
RandomTwoCharNumbers();
RandomThreeCharNumbers();
RandomEveryNumberX3();
Random300x50();
Random300x100();
Random300x500();
Random300x1000();

