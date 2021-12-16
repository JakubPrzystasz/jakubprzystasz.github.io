class ScheduleTime {
    constructor(start_hour, start_minute, finish_hour, finish_minute) {
        this.start_hour = start_hour;
        this.start_minute = start_minute;
        this.finish_hour = finish_hour;
        this.finish_minute = finish_minute;
    }

    toDate(hour, minute) {
        let date = new Date();
        date.setHours(hour, minute, 0, 0);
        return date;
    }

    difference(hour, minute) {
        return Math.ceil((this.toDate(hour, minute).getTime() - new Date().getTime()) / (1000));
    }

    addPefix(value) {
        if (value < 10) {
            return '0' + value;
        } else {
            return new String(value);
        }
    }

    format() {
        var d = Number(this.difference(this.finish_hour, this.finish_minute));
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        var hDisplay = this.addPefix(h);
        var mDisplay = this.addPefix(m);
        var sDisplay = this.addPefix(s);

        return (h > 0 ? hDisplay + ":" : "00:") + (m > 0 ? mDisplay + ":" : "00:") + (s > 0 ? sDisplay : "00");
    }

    isFajrant() {
        var now = new Date();
        var start = new Date().setHours(this.start_hour, this.start_minute, 0, 0);
        var finish = new Date().setHours(this.finish_hour, this.finish_minute, 0, 0);
        if (now > start && now < finish) {
            return false;
        }
        return true;
    }

    getPercentage() {
        var start = this.toDate(this.start_hour, this.start_minute);
        var finish = this.toDate(this.finish_hour, this.finish_minute);
        var total = Math.ceil((finish - start) / (1000));
        var current = this.difference(this.finish_hour, this.finish_minute);
        return ((total - current) / total);
    }
}

function animate(current_task) {
    $('.pour') //Pour Me Another Drink, Bartender!
        .animate({
            height: '360px'
        }, 100);

    $('#liquid') // I Said Fill 'Er Up!
        .animate({
            height: current_task.getPercentage() * 190 + 'px'
        }, 100);

    $('.beer-foam') // Keep that Foam Rollin' Toward the Top! Yahooo!
        .animate({
            bottom: current_task.getPercentage() * 220 + 'px'
        }, 100);
}

$(document).ready(function () {
    $("#robota").fadeOut();
    $("#fajrant").fadeOut();


    var schedule = [
        new ScheduleTime(7, 0, 8, 30),
        new ScheduleTime(8, 45, 10, 15),
        new ScheduleTime(10, 30, 12, 0),
        new ScheduleTime(12, 15, 13, 45),
        new ScheduleTime(14, 0, 15, 30),
        new ScheduleTime(15, 45, 17, 15),
        new ScheduleTime(17, 30, 19, 0),
    ]

    var current_task = null;

    setInterval(function () {
        current_task = null;

        for (const element of schedule) {
            if (!element.isFajrant()) {
                current_task = element;
                break;
            }
        }

        if (current_task == null) {
            $("#robota").fadeOut();
            $("#fajrant").fadeIn();
        } else {
            $("#robota").fadeIn();
            $("#fajrant").fadeOut();
            $("#counter").html(current_task.format());
            console.log(current_task.getPercentage());
            animate(current_task);
        }

    }, 500);

    setInterval(function() {
        $("#exclamation").toggleClass('blinking');
     }, 450);
});