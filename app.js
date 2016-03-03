var fs = require('fs');
var dataSource = require('./dataSource.json');
var durationOutputResult = '';
var timeOutputResult = '';

Number.prototype.round = function (decimals) {
    return Number((Math.round(this + "e" + decimals) + "e-" + decimals));
};

var writeData = function (fileName, dataToWrite) {
    fs.writeFile(fileName, dataToWrite, (err) => {
        if (err) throw err;
        console.log(fileName + ' Created Successfully!');
    });
};

Number.prototype.fixThreeDecimalPlace = function () {
    var strNumber = ('' + this);
    if(!strNumber.match(/\./g)){
        return strNumber + '.000';
    }
    var splitObj = strNumber.split('.');

    var decimalFigure = splitObj[1];
    var newDecimalFigure = '';
    var lenFigure = decimalFigure.length;

    switch (lenFigure) {
        case 1:
            newDecimalFigure = decimalFigure + '00';
            break;
        case 2:
            newDecimalFigure = decimalFigure + '0';
            break;
        default:
            newDecimalFigure = decimalFigure
    }

    return splitObj[0]+'.'+newDecimalFigure;
};

var computeDurationBlock = function () {
    var durationF1 = '0.000';
    var durationF2 = '';
    var durationResult = '0.000';
    dataSource.words.forEach(function (data) {
        durationF2 = (+data.duration).round(3);
        durationResult = +(+durationF1).round(3) + (+durationF2).round(3);
        durationOutputResult += '' + (+durationF1).round(3).fixThreeDecimalPlace() + '  ' + (+durationResult).round(3).fixThreeDecimalPlace() +'   '+ data.name + '\n';
        durationF1 = durationResult.round(3);
    });
    writeData('duration-output.txt', durationOutputResult);
};

var computeTimeBlock = function () {
    var timeF1 = '0.000';
    var timeF2 = '';
    var timeResult = '0.000';
    dataSource.words.forEach(function (data) {
        timeF2 = (+data.time).round(3);
        timeResult = +(+timeF1).round(3) + (+timeF2).round(3);
        timeOutputResult += '' + (+timeF1).round(3).fixThreeDecimalPlace() + '  ' + (+timeResult).round(3).fixThreeDecimalPlace() +'   '+ data.name + '\n';
        timeF1 = timeResult.round(3);
    });
    writeData('time-output.txt', timeOutputResult);
};

var init = function () {
    computeDurationBlock();
    computeTimeBlock();
};

init();
