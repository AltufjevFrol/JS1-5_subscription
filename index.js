

var eventObj = {};// определяем массив где будут храниться подписки
module.exports = {

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if (eventObj.hasOwnProperty(event)){//если событие в подписках уже есть пушим туда подписчика и обработчика
            eventObj[event].push({subscriber: subscriber, handler: handler });
        } else  {// если нет то сначала создаем свойство события и потом пушим
            eventObj[event] = [];
            eventObj[event].push({subscriber: subscriber, handler: handler });
        }
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if (eventObj.hasOwnProperty(event)) {//ищем событие, если находим то пробегаем все члены массива и удалем те в которых свойство подписчик соответствует заданному
            for (var i = 0; i<eventObj[event].length; i++){
                if (eventObj[event][i].subscriber === subscriber) {
                    eventObj[event].splice(i, 1);
                    i--;// интересный момент, прямо в цикле меняется длинна массива чтобы проверить остальные члены нужна эта строка
                }
            }

        }
        return this;
    },

    /**
     * @param {String} event
     */

    cbEmit: function (sub) {//колбек вызываемый для наших событий, обработчик вызывается в контексте подписчика
    sub.handler.call(sub.subscriber);
},

    emit: function (event) {
        if (eventObj.hasOwnProperty(event)){// ищем событие, если находим то для каждого элемента массива вызываем колбэк
            eventObj[event].forEach(this.cbEmit);
        } 
        return this;
    }
    Object.defineProperty(sub)