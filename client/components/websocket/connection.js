import SockJS from 'sockjs-client'
const Stomp = require("stompjs/lib/stomp.js").Stomp;


const subscriptions = new Map();


let client = {
    subscribe: (topic, fn) => {
        subscriptions.set(topic, fn)
    }
};

export default {
    connect: () => {
        client = Stomp.over(new SockJS(process.env.SOCKET_URL, null, {}));
        client.connect({}, () => {
            subscriptions.forEach((fn, topic) => {
                client.subscribe(topic, fn, {})
            });

            subscriptions.clear();
        })
    },
    client
}
