const https = require('https');
const notifier = require('node-notifier');
const path = require('path');
const player = require('play-sound')();

const regEx = /<p class="isp">(.+)<\/p>/gm;
const url = "https://www.whoismyisp.org/";

// Plays sound when starts
player.play(path.join(__dirname, 'sound.mp3'), (err) => {
    if (err) console.log(`Could not play sound: ${err}`);
});

https.get(url, (res) => {

    res.setEncoding('utf8');
    let htmlData = '';

    res.on('data', (chunk) => {
        htmlData += chunk
    });
    res.on('end', () => {
        const match = regEx.exec(htmlData);
        if (match !== null) {

            //Found ISP Name
            const ispName = match[1];
            notifier.notify({
                title: `${ispName}`,
                message: `Your ISP is ${ispName}`,
                sound: './sound.mp3',
                icon: path.join(__dirname, 'icon.png')
            });
        } else {

            //Coundn't find ISP Name due to html structure change
            ispFailed('Program expired! Please update to continue');
        }
    })

}).on('error', (e) => {

    //Some network issue
    ispFailed('Some network issue');
});

ispFailed = (reason) => {
    notifier.notify({
        title: `get_isp`,
        message: reason,
        sound: true,
        icon: path.join(__dirname, 'icon.png')
    });
};
