// Определим объект для счетчика нотификаций
var notifications = {
    counter: 0,
    count: function () {
        this.counter++;
    }
};

// Определим для хранения логов
var logger = {
    logs: []
};

var eventObj = {};


function on (event, subscriber, handler) {
	if (eventObj.hasOwnProperty(event)){
		eventObj[event].push({subscriber: subscriber, handler: handler });
	} else  {
		eventObj[event] = [];
		eventObj[event].push({subscriber: subscriber, handler: handler });
	}         
}


function off (event, subscriber) {
	if (eventObj.hasOwnProperty(event)) {
		for (var i = 0; i<eventObj[event].length; i++){
			if (eventObj[event][i].subscriber === subscriber) {
                eventObj[event].splice(i, 1);
                i--;
            }
		}

	}else {
        console.info('that event is not!')
    }

}

function cbEmit(sub) {
    sub.handler.call(sub.subscriber);
}

function emit (event) {
if (eventObj.hasOwnProperty(event)){
	eventObj[event].forEach(cbEmit);
} else {
	console.info('that event have not subscriber!')
}
}
// checking
on('new_notification', notifications, notifications.count);

on('new_notification', logger, function () {
        this.logs.push('Произошло новое событие new_notification');
    });
on('new_notification', logger, function () {
        // this указывает на logger
        this.logs.push('Добавлена новая нотификация. Количество - ' + notifications.counter);
    });
console.info('подписки')
console.info(eventObj);

emit('new_notification');

console.info('нотификация');
console.info(notifications);

console.info('логгер ')
console.info(logger);

console.info('подписки ')
console.info(eventObj);

off('new_notification', logger);
emit('new_notification');
console.info('подписки после откл')
console.info(eventObj);

on('new_notification', logger, function () {
    this.logs.push('Новое событие new_notification!');
});
emit('new_notification');

console.info('подписки после вкл')
console.info(eventObj);
console.info('нотификация после вкл')
console.info(notifications);
console.info('логгер после вкл');
console.info(logger);