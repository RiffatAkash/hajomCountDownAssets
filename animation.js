
const images = 
[
    "assets/bg2.jpg",
    "assets/bg1.jpg"
];
const wrapper = document.querySelector('.wrapper');
const displayTitle = document.querySelector('.patch_title');
const displayCounter = document.querySelector('.patch_countdown');
const displayBox = document.querySelector('.patch_box');

var i = 1;
setInterval( function() {
    wrapper.style.backgroundImage = "url(" + images[i] + ")";
    i = ( i == 1 ) ? 0 : 1;
}, 3000);


const sehriSet = [
    "4:03","4:03","4:02","4:01","4:01",
    "4:00","3:59","3:58","3:57","3:57",
    "3:56","3:55","3:54","3:54","4:20",
    "4:19","4:18","4:17","4:16","4:15","4:14",
    "4:13","4:12","4:11","4:10","4:09","4:08",
    "4:07","4:06","4:05","4:04"
];


const iftarSet = [
    "18:27","18:27","18:28","18:28",
    "18:29","18:29","18:30","18:30","18:31",
    "18:31","18:32","18:32","18:33","18:33",
    "18:20","18:20","18:21","18:21","18:22",
    "18:22","18:23","18:23","18:23","18:24",
    "18:24","18:25","18:25","18:26","18:26",
    "18:27","18:27"
];
 

setInterval(function () {
    var today = new Date();
    var curDate = today.getDate();
    var curTime = today.getHours()*60*60+ today.getMinutes()*60+today.getSeconds();

    var checkIftar = iftarSet[curDate].split(":");
    var checkSehri = sehriSet[curDate].split(":");
    var timeIftar = checkIftar[0]*60*60 + checkIftar[1]*60;
    var timeSehri = checkSehri[0]*60*60 + checkSehri[1]*60;

    if (timeSehri<timeIftar && timeSehri>curTime && timeSehri>=0){
        checkSehriTime(curDate, curTime);
    }
    else if (timeSehri<timeIftar && timeIftar<curTime) {
        checkSehriTime(curDate, curTime);
    }
    else {
        checkIftarTime(curDate, curTime);
    }
},1e3);


function checkIftarTime(todayDate, curTime) {
    var time = iftarSet[todayDate].split(":");
    var setTime = time[0]*60*60 + time[1]*60;
    var diffTime = setTime - curTime;
    if (diffTime<setTime && diffTime>=0){
        displayTitle.style.backgroundImage = "url('assets/iftar.png')";
        displayCounter.innerHTML = printTimer(diffTime);
    }
}

function checkSehriTime(todayDate, curTime) {
    var time = sehriSet[todayDate].split(":");
    var setTime = time[0]*60*60 + time[1]*60;
    var diffTime = setTime - curTime;

    if (diffTime<setTime && diffTime>=0){
        displayTitle.style.backgroundImage = "url('assets/sehri.png?v=1.1')";
        displayCounter.innerHTML = printTimer(diffTime);
    }
    else {
        var lastTime = setTime+24*60*60;
        var sehriEnd = lastTime - curTime;
        displayTitle.style.backgroundImage = "url('assets/sehri.png?v=1.1')";
        displayCounter.innerHTML = printTimer(sehriEnd);
    }
}

function printTimer(sec) {
    hr = Math.floor(sec / 3600) % 24;
    mm = Math.floor(sec / 60) % 60;
    ss = sec % 60;

    var x = hr < 10? "0"+hr : hr;
    var y = mm < 10? "0"+mm : mm;
    var z = ss < 10? "0"+ss : ss;
    return `<span class="hour absolute">${translteNum(x)}</span> <span class="minute absolute">${translteNum(y)}</span> <span class="second absolute">${translteNum(z)}</span>`;
}

function translteNum(num_str){
        var bengali = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
        var changed_nun='';
        num_str.toString().split('').forEach(l => {
          if(isNaN(l)){changed_nun +=l;}else{changed_nun += bengali[l];}
        });
        return changed_nun;
}
