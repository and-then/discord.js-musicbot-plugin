const ytscrape = require('scrape-youtube').default;

module.exports = function search(message) {
    let query = message.content.replace(/^[\S]+[\s]+/, '');
    console.log(query);
    ytscrape.search(query, {
        type : 'video',
        limit : 1
    }).then(function(results){
        console.log(results[0]);
        let videoID = results[0].id;
        let title = results[0].title;
        console.log(videoID);
        message.client.music.queue.add(videoID, message);
        message.channel.send('Adding `' + title + '` to the queue.');
        console.log(message.client.songQueue);
        if (!message.client.playing) message.client.music.next(message);
    }, function(err){
        console.log(err);
    });
};