const {createChannel} = require('../utils/messageQueues');

module.exports = {
    CHANNEL: (async () => {return (await createChannel())})()
}