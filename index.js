require('dotenv').config()
//const fs = require('node:fs');
//const path = require('node:path');

const TOKEN = process.env.TOKEN;
const token = process.env.NEW_ENV;
//const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const express = require('express');
const app = express();
const axios = require('axios');
//const axios2 = require('axios');
const retry = require('axios-retry-after');
//const cron = require('node-cron');

//const client = new Client({
//    intents: [
//        GatewayIntentBits.Guilds
//    ]
//});

//client.commands = new Collection();

//const commandsPath = path.join(__dirname, 'commands');
//const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//for (const file of commandFiles) {
//    const filePath = path.join(commandsPath, file);
//    const command = require(filePath);
//    // Set a new item in the Collection with the key as the command name and the value as the exported module
//    if ('data' in command && 'execute' in command) {
//        client.commands.set(command.data.name, command);
//    } else {
//        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
//    }
//}

//const eventsPath = path.join(__dirname, 'events');
//const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

//for (const file of eventFiles) {
//    const filePath = path.join(eventsPath, file);
//    const event = require(filePath);
//    if (event.once) {
//        client.once(event.name, (...args) => event.execute(...args));
//    } else {
//        client.on(event.name, (...args) => event.execute(...args));
//    }
//}

// Log in to Discord with your client's token
//client.login(TOKEN);

const discord_api = axios.create({
    baseURL: 'https://discord.com/api/',
    timeout: 30000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Authorization",
        "Authorization": `${token}`
    }
});
discord_api.interceptors.response.use(null, retry(discord_api))

const discord_api_bot = axios.create({
    baseURL: 'https://discord.com/api/',
    timeout: 30000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Authorization",
        "Authorization": `Bot ${TOKEN}`
    }
});
discord_api_bot.interceptors.response.use(null, retry(discord_api_bot))

const chSource = [
    '814772719542599680', '814772747141382155', '790588103261552651', '790588104939143188', '790588106112761876', '790588107359649802', '790588108961611878', '790588110504853534', '790588111813214208', '790588112715644990', '790588114216288256', '790588115139559435', '790588116925939812', '790588118209789955', '790588119895769107', '790588121451593779'
];

const chDest = [
    //'1074588678330007582', '1074646341474594847', '1074646376572538881', '1074646409816576051', '1074646441986887770', '1074646472500457492', '1074646511679459358', '1074646551273689129', '1074646593107677295', '1074646621301788752', '1074646637059772457', '1074646663836213330', '1074646678444982292', '1074646705850548255', '1074646735386857502', '1074646748577931384'
    '1075252834846638080', '1075252888814768168', '1075259678809935992', '1075259719670841394', '1075259743335096370', '1075259767737561200', '1075259786339291201', '1075259812637585471', '1075259840567451699', '1075260184328421399', '1075260208357584936', '1075260228813205514', '1075260239923908648', '1075260261755277352', '1075260285369196545', '1075260330306961428'
]

const role = [
    '1076741296644952064', '1076810883545694259', '1076811348807254167', '1076814811050016938', '1076815151455539220', '1076815195239886958', '1076815255642050570', '1076815357953703996', '1076815389012533278', '1076815408671227914', '1076815429319798794', '1076815456159141908', '1076815564405755925', '1076815595988844615', '1076815620122873936', '1076815636166086686'
]

//class ClassWithStaticProperty {
//    static beforeValue = [
//        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
//    ];
//    //static staticMethod() {
//    //    return 'static method has been called.';
//    //}
//    //static {
//    //    console.log('Class static initialization block called');
//    //}
//}

async function forwardMessage(channel, res, idx) {
    let result = [];
    if (res.data) {
        const len = res.data.length;
        if (len > 0) {
            const sortRes = res.data.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
            for (let resp of sortRes) {
                let content = resp.content.split('||')[0];
                console.log('send channel', channel);
                console.log('content', content);
                const resAxios = await discord_api_bot.post(`/channels/${channel}/messages`, {
                    content: content,
                });

                const receivedEmbed = resp.embeds[0];
                if (receivedEmbed) {
                    const exampleEmbed = EmbedBuilder.from(receivedEmbed);
                    console.log('send channel2', channel);
                    //channel.send({ embeds: [exampleEmbed] });
                    const resAxios2 = await discord_api_bot.post(`/channels/${channel}/messages`, {
                        embeds: [exampleEmbed],
                    });
                }
            }
            //await Promise.all(requestData);
            //ClassWithStaticProperty.beforeValue[idx] = sortRes[len - 1].id ?? 0;
        }
        result.push(len);
    }
    return result;
}



async function runFunction() {
    try {
        //console.log('ClassWithStaticProperty.beforeValue', ClassWithStaticProperty.beforeValue);
        let url = '';
        let urlTemp = [];
        for (let x = 0; x < 16; x++) {
            //if (ClassWithStaticProperty.beforeValue[x] === 0) {
            //    url = `/channels/${chSource[x]}/messages?limit=100`;
            //}
            //else {
            //    url = `/channels/${chSource[x]}/messages?limit=100&after=${ClassWithStaticProperty.beforeValue[x]}`;
            //}
            url = `/channels/${chSource[x]}/messages?limit=100`
            urlTemp.push(discord_api.get(url));
        }
        const data1 = await Promise.all(urlTemp);
        const now = new Date();
        const then = new Date(now.setMinutes(now.getMinutes() - 15)); //filter last 15 minutes

        const filteredData = data1.map(word => ({ data: word.data.filter(x => new Date(x.timestamp) >= then) }));

        const data2 = await Promise.all([
            forwardMessage(chDest[0], filteredData[0], 0),
            forwardMessage(chDest[1], filteredData[1], 1),
            forwardMessage(chDest[2], filteredData[2], 2),
            forwardMessage(chDest[3], filteredData[3], 3),
            forwardMessage(chDest[4], filteredData[4], 4),
            forwardMessage(chDest[5], filteredData[5], 5),
            forwardMessage(chDest[6], filteredData[6], 6),
            forwardMessage(chDest[7], filteredData[7], 7),
            forwardMessage(chDest[8], filteredData[8], 8),
            forwardMessage(chDest[9], filteredData[9], 9),
            forwardMessage(chDest[10], filteredData[10], 10),
            forwardMessage(chDest[11], filteredData[11], 11),
            forwardMessage(chDest[12], filteredData[12], 12),
            forwardMessage(chDest[13], filteredData[13], 13),
            forwardMessage(chDest[14], filteredData[14], 14),
            forwardMessage(chDest[15], filteredData[15], 15)
        ]);
        console.log('runFunction ok');
    }
    catch (error) {
        console.log(error);
    }
    return 'runFunction ok';
}


app.get('/', async (req, res) => {
    return res.send('Follow documentation ')
})

app.get('/newMessage', async (req, res) => {
    console.time("response time")
    await runFunction();


    console.log('done');
    console.timeEnd("response time")
    return res.send('Done !')
})

//app.get('/channel-list', async (req, res) => {

//    const discordServer = client.guilds.cache.get('967719447311814666');
//    const channels = discordServer?.channels ? JSON.parse(
//        JSON.stringify(discordServer.channels)
//    ).guild.channels : [];
//    const chname = discordServer.channels.find(channel => channel.name === 'rare-items' && channel.type === 'text');
//    console.log(JSON.stringify(discordServer.channels))
//    console.log(chname)
//    return res.send('Done !')
//})

app.listen(8999, () => {

})

// Schedule tasks to be run on the server.
//cron.schedule('*/1 * * * *', function () {
//    console.log('Running cronjobs');
//    runFunction();
//});