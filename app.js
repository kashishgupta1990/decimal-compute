var fs = require('fs');
var dataSource = require('./dataSource.json');
var durationOutputResult = '';
var timeOutputResult = '';

Number.prototype.round = function(decimals) {
    return Number((Math.round(this + "e" + decimals)  + "e-" + decimals));
};

var writeData = function (fileName, dataToWrite) {
    fs.writeFile(fileName, dataToWrite, (err) => {
        if (err) throw err;
        console.log(fileName + ' Created Successfully!');
    });
};

var computeDurationBlock = function(){
    var durationF1 = '0.000';
    var durationF2 = '';
    var durationResult = '0.000';
    dataSource.words.forEach(function(data){
        durationF2 = (+data.duration).round(3);
        durationResult = +(+durationF1).round(3) + (+durationF2).round(3);
        durationOutputResult+=''+(+durationF1).round(3)+'  '+(+durationF2).round(3)+'  '+(+durationResult).round(3)+'\n';
        durationF1 = durationResult.round(3);
    });
    writeData('duration-output.txt',durationOutputResult);
};

var computeTimeBlock = function(){
    var timeF1 = '0.000';
    var timeF2 = '';
    var timeResult = '0.000';
    dataSource.words.forEach(function(data){
        timeF2 = (+data.time).round(3);
        timeResult = +(+timeF1).round(3) + (+timeF2).round(3);
        timeOutputResult+=''+(+timeF1).round(3)+'  '+(+timeF2).round(3)+'  '+(+timeResult).round(3)+'\n';
        timeF1 = timeResult.round(3);
    });
    writeData('time-output.txt',timeOutputResult);
};

var init = function(){
    computeDurationBlock();
    computeTimeBlock();
};

init();
