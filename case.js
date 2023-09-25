require("./settings");
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@adiwajshing/baileys");
const fs = require("fs");
const util = require("util");
const speed = require("performance-now");
const chalk = require("chalk");
const axios = require("axios");
const moment = require("moment-timezone");
const FormData = require("form-data");
const { fromBuffer } = require("file-type");
const fetch = require("node-fetch");
const { exec } = require("child_process");
const similarity = require("similarity");
const threshold = 0.72;
const path = require("path");
const os = require("os");
const nou = require("node-os-utils");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

//----------------- LIB FILE ------------------\\

const { menukiw } = require('./message/menu.js')


const {
   sendButLoc,
   sendButDoC,
   sendButDoc,
   sendListMenu,
   sendListAge,
   sendListGender,
   sendListLang,
   sendButImage,
   sendKatalog,
   sendKatalog2,
   sendContact
} = require('./lib/welcome')
const alpha = require('./lib/welcome')
const {
  isSetOpen,
  addSetOpen,
  removeSetOpen,
  changeSetOpen,
  getTextSetOpen,
} = require("./lib/setopen");
const {
  isSetClose,
  addSetClose,
  removeSetClose,
  changeSetClose,
  getTextSetClose,
} = require("./lib/setclose");
const { formatp } = require("./lib/myfunc.js");
const {
  smsg,
  fetchJson,
  getBuffer,
  getGroupAdmins,
  TelegraPh,
  msToDate,
  isUrl,
  hitungmundur,
  checkBandwidth,
  runtime,
  getRandom,
} = require("./lib/simple");
const {
  isSetWelcome,
  addSetWelcome,
  removeSetWelcome,
  changeSetWelcome,
  getTextSetWelcome,
} = require("./lib/setwelcome");
ozii = fs.readFileSync("./image/ozii.jpg");
sad = fs.readFileSync("./sound.mp3");
const _data = require("./lib/totalcmd.js");

//---------------------------------------------\\


global.db = JSON.parse(fs.readFileSync("./database/database.json"))
if (global.db) global.db.data = {
         users: {},
         chats: {},
         database: {},
         game: {},
         others: {},
         sticker: {},
         absen: {},
         cmd: {},
         settings: {},
         anonymous: {},
         menfess: {},
         ...(global.db.data || {})
      }

module.exports = fureya = async (
  fureya,
  m,
  chatUpdate,
  store,
  antilink,
  antiwame,
  antilink2,
  antiwame2,
  set_welcome_db,
  set_left_db,
  set_open,
  set_close,
  _welcome,
  _left
) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : ""; //omzee
    var budy = typeof m.text == "string" ? m.text : "";
    const isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body);
    const prefix = isCmd ? budy[0] : "";
    const command = isCmd
      ? body.slice(1).trim().split(" ").shift().toLowerCase()
      : "";
    const args = body.trim().split(/ +/).slice(1);
    const text = (q = args.join(" "));
    const type = Object.keys(mek.message)[0];
    const timestampp = speed();
    const latensi = speed() - timestampp;
    
    const pushname = m.pushName || "No Name";
    const botNumber = await fureya.decodeJid(fureya.user.id);
    const tanggal = moment().tz("Asia/jakarta").format("dddd, ll");
    const jam = moment(Date.now())
      .tz("Asia/jakarta")
      .locale("id")
      .format("HH:mm:ss z");
    const salam = moment(Date.now())
      .tz("Asia/jakarta")
      .locale("id")
      .format("a");
    const isCreator = [
      "6289528652225@s.whatsapp.net",
      botNumber,
      ...global.owner,
    ]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const quoted = m.quoted ? m.quoted : m;
    const from = m.chat;
    const mime = (quoted.msg || quoted).mimetype || "";
    const isMedia = /image|video|sticker|audio/.test(mime);
     const groupMetadata = m.isGroup
      ? await fureya.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : ""; 
    
    
    
    
    const timestampi = speed();
    const latensii = speed() - timestampi;
    const tescuy = ['0@s.whatsapp.net']
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isAntiLink = antilink.includes(m.chat) ? true : false;
    const isAntiWame = antiwame.includes(m.chat) ? true : false;
    const isAntiLink2 = antilink2.includes(m.chat) ? true : false;
    const isAntiWame2 = antiwame2.includes(m.chat) ? true : false;
    const isWelcome = _welcome.includes(m.chat);
    const isLeft = _left.includes(m.chat);
    const time = moment(Date.now())
      .tz("Asia/Jakarta")
      .locale("id")
      .format("HH:mm:ss z");
      
    
    const reply = (text) => {
      fureya.sendFakeLink(m.chat, text, salam, pushname, m);
    };
    const getStyle = (style, style2) => {
      let listt = `*${style2} Yg Kamu Masukkan Salah*\n\n_Berikut List ${style2} Yg Benar, Total_ *${style}* _${style2}_\n\n`;
      no = 0;
      for (var i = 0; i < style.length; i++) {
        no += 1;
        listt += no.toString() + ".  " + style[i] + "\n";
      }
      reply(listt);
    };

    async function getGcName(groupID) {
      try {
        let data_name = await fureya.groupMetadata(groupID);
        return data_name.subject;
      } catch (err) {
        return "-";
      }
    }
    if (m.message) {
      fureya.readMessages([m.key]);
      console.log(
        chalk.black(chalk.bgWhite("[ CMD ]")),
        chalk.black(chalk.bgGreen(new Date())),
        chalk.black(chalk.bgBlue(budy || m.mtype)) +
          "\n" +
          chalk.magenta("=> From"),
        chalk.green(pushname),
        chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> In"),
        chalk.green(m.isGroup ? pushname : "Chat Pribadi", m.chat)
      );
    }
    
   
   
   

    //antilink
    if (isAntiLink) {
      if (budy.match(`chat.whatsapp.com`)) {
        reply(
          `*「 ANTI LINK 」*\n\nLink grup detected, maaf kamu akan di kick !`
        );
        if (!isBotAdmins) return reply(`gajadi dehhh bot bukan admin`);
        let gclink =
          `https://chat.whatsapp.com/` + (await fureya.groupInviteCode(m.chat));
        let isLinkThisGc = new RegExp(gclink, "i");
        let isgclink = isLinkThisGc.test(m.text);
        if (isgclink)
          return reply(`duhh hampir aja ku kick ternyta link gc sendiri`);
        if (isAdmins) return reply(`gamau kalo kik atmin`);
        if (isCreator) return reply(`ownerkuu yangg gntengg mhh bebass`);
        if (m.key.fromMe) return reply(`ownerkuuu mahh bebass`);
        await fureya.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        });
        fureya.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }

    //antilink2
    if (isAntiLink2) {
      if (budy.match(`chat.whatsapp.com`)) {
        if (!isBotAdmins) return; //reply(`Upsss... gajadi, bot bukan admin`)
        let gclink =
          `https://chat.whatsapp.com/` + (await fureya.groupInviteCode(m.chat));
        let isLinkThisGc = new RegExp(gclink, "i");
        let isgclink = isLinkThisGc.test(m.text);
        if (isgclink) return; //reply(`Upsss... gak jadi, untung link gc sendiri`)
        if (isAdmins) return; //reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
        if (isCreator) return; //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
        if (m.key.fromMe) return; //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
        await fureya.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,

            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        });
      }
    }
    
    // public & self
if (!fureya.public) {
if (!m.key.fromMe && !isCreator) return
}

    //antiwame
    if (isAntiWame) {
      if (budy.match(`wa.me/`)) {
        reply(`*「 ANTI WA ME 」*\n\nWa Me detected, maaf kamu akan di kick !`);
        if (!isBotAdmins) return reply(`Upsss... gajadi, bot bukan admin`);
        if (isAdmins)
          return reply(`Upsss... gak jadi, kasian adminnya klo di kick`);
        if (isCreator)
          return reply(`Upsss... gak jadi, kasian owner ku klo di kick`);
        if (m.key.fromMe)
          return reply(`Upsss... gak jadi, kasian owner ku klo di kick`);
        await fureya.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,

            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        });
        fureya.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }

    //antiwame2
    if (isAntiWame2) {
      if (budy.match(`wa.me/`)) {
        if (!isBotAdmins) return; //reply(`Upsss... gajadi, bot bukan admin`)
        if (isAdmins) return; //reply(`Upsss... gak jadi, kasian adminnya klo di kick`)
        if (isCreator) return; //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
        if (m.key.fromMe) return; //reply(`Upsss... gak jadi, kasian owner ku klo di kick`)
        await fureya.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,

            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        });
      }
    }
    if (isAntiWame) {
      if (budy.includes(`Wa.me/` || `Wa.me/`)) {
        reply(`*「 ANTI WA ME 」*\n\nWa Me detected, maaf kamu akan di kick !`);
        if (!isBotAdmins) return reply(`Upsss... gajadi, bot bukan admin`);
        if (isAdmins)
          return reply(`Upsss... gak jadi, kasian adminnya klo di kick`);
        if (isCreator)
          return reply(`Upsss... gak jadi, kasian owner ku klo di kick`);
        if (m.key.fromMe)
          return reply(`Upsss... gak jadi, kasian owner ku klo di kick`);
        fureya.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }



    //-------------[BATAS AREA CASE]--------------\\

    switch (command) {
    
        case "help":
        case "menu": {
        var mundur = await hitungmundur(4, 23);
          var { totalGb, usedGb, freeGb } = await nou.drive.info();
          var { download, upload } = await checkBandwidth();
        fureya.sendMessage(from, { contextInfo: { externalAdReply: { showAdAttribution: true,
title: `𝐅𝐮𝐫𝐞𝐲𝐚𝐌𝐝`,
thumbnail: pp_bot,
sourceUrl: gc,
mediaType: 1,
renderLargerThumbnail: true 
}}, text: menukiw(pushname,
                salam,
                mundur,
                upload,
                download,
                totalGb,
                usedGb,
                freeGb,
                namaowner,
                namabot,
                jam,
                tanggal,
                runtime(process.uptime()),
                prefix ),
                }, { quoted: m })
}
break


        
      /**fureya.sendMessage(from, { contextInfo: { externalAdReply: { showAdAttribution: true,
title: `FZY Bot`,
body:`Bot aktif ${runtime(process.uptime())}`,
previewType:"PHOTO", 
thumbnail: fs.readFileSync('./FZY-botz-V1-By-FauziSpedzz/reply.jpg'),
sourceUrl:`https://chat.whatsapp.com/B8wsbWCX5BEL8qVq6mlKq7`
}}, image: { url: `${maulana}` }, caption: anu}, { quoted: m })
}
break
*/
      case "owner":
      case "creator":
        {
          fureya.sendContact(m.chat, global.owner, m);
          fureya.sendMessage(m.chat, {
            audio: sad,
            mimetype: "audio/mpeg",
            ptt: true,
          });
        }
        break;
        
      
      case "ping":
        {
          const used = process.memoryUsage();
          const cpus = os.cpus().map((cpu) => {
            cpu.total = Object.keys(cpu.times).reduce(
              (last, type) => last + cpu.times[type],
              0
            );
            return cpu;
          });
          const cpu = cpus.reduce(
            (last, cpu, _, { length }) => {
              last.total += cpu.total;
              last.speed += cpu.speed / length;
              last.times.user += cpu.times.user;
              last.times.nice += cpu.times.nice;
              last.times.sys += cpu.times.sys;
              last.times.idle += cpu.times.idle;
              last.times.irq += cpu.times.irq;
              return last;
            },
            {
              speed: 0,
              total: 0,
              times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0,
              },
            }
          );
          let timestamp = speed();
          let latensi = speed() - timestamp;
          let neww = performance.now();
          let oldd = performance.now();
          let respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${
            oldd - neww
          } _miliseconds_\n\nRuntime : ${runtime(process.uptime())}
💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
_NodeJS Memory Usaage_
${Object.keys(used)
  .map(
    (key, _, arr) =>
      `${key.padEnd(Math.max(...arr.map((v) => v.length)), " ")}: ${formatp(
        used[key]
      )}`
  )
  .join("\n")}
${
  cpus[0]
    ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times)
        .map(
          (type) =>
            `- *${(type + "*").padEnd(6)}: ${(
              (100 * cpu.times[type]) /
              cpu.total
            ).toFixed(2)}%`
        )
        .join("\n")}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus
  .map(
    (cpu, i) =>
      `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(
        cpu.times
      )
        .map(
          (type) =>
            `- *${(type + "*").padEnd(6)}: ${(
              (100 * cpu.times[type]) /
              cpu.total
            ).toFixed(2)}%`
        )
        .join("\n")}`
  )
  .join("\n\n")}`
    : ""
}
                `.trim();
          reply(respon);
        }
        break;
        
      case "groupbot":
      case "gcbot": {
           reply(global.gc)
        }
      break;

      case "donasi":
      case "donate":
        {
          reply(`
    ╔═══⟬ *${command}*  ⟭
    ╠ ▢ *6289528652225* *_"DANA"_*
    ╠ ▢ *6289528652225* *_"GOPAY"_*
    ╚════◇
          `);
        }
        break;

      case "sc":
      case "script":
      case "soucecode":
        {
          fureya.sendMessage(from, { contextInfo: { externalAdReply: { showAdAttribution: true,
title: `𝐅𝐮𝐫𝐞𝐲𝐚𝐌𝐝`,
thumbnail: pp_bot,
sourceUrl: 'https://youtube.com/@fauzijayawardana',
mediaType: 1,
renderLargerThumbnail: true 
}}, text: `https://github.com/@oziispedzz\n\n*Ambil aja bang heheheh*` }, { quoted: m }) 
        }
        break;
        
  


      //DOWNLOADER
      case "tiktoknowm":
      case "tiktok":
        {
          if (args.length < 1) return reply("Link?");
          if (!isUrl(args[0]) && !args[0].includes("tiktok.com"))
            return reply("Error link");
          if (q.startsWith("https://vt.tiktok.com/")) {
            var lin = args[0];
          } else if (q.startsWith("https://vm.tiktok.com/")) {
            var lin = args[0];
          } else if (q.startsWith("https://www.tiktok.com/")) {
            var lin = args[0];
          } else {
            return Reply("Masukan link tikok, contoh https://vt.tiktok.com/");
          }
          reply(mess.wait);
          const { tiktokdlv2 } = require("@bochilteam/scraper");
          tiktokdlv2(lin).then((res) => {
            let ep = res.video.no_watermark;
            fureya.sendMessage(
              m.chat,
              { caption: (mess.done), video: { url: ep } },
              { quoted: m }
            );
          });
        }
        break;

      //MAKER-MENU

    case 'swm': case 'take':
         case 'wm': {

            if (!quoted) return reply('mana?')
            if (quoted.isAnimated) {
               let media = await fureya.downloadAndSaveMediaMessage(quoted)
               let webpToMp4 = await webp2mp4File(media)
               let encmedia = await fureya.sendVideoAsSticker(m.chat, webpToMp4.result, m, {
                  packname: text.split('|')[0] ? text.split('|')[0] : pushname,
                  author: text.split('|')[1] ? text.split('|')[1] : ''
               })
               await fs.unlinkSync(encmedia)
            } else if (/image/.test(mime)) {
               let media = await quoted.download()
               let encmedia = await fureya.sendImageAsSticker(m.chat, media, m, {
                  packname: text.split('|')[0] ? text.split('|')[0] : pushname,
                  author: text.split('|')[1] ? text.split('|')[1] : ''
               })
               await fs.unlinkSync(encmedia)
            } else if (/video/.test(mime)) {
               if ((quoted.msg || quoted).seconds > 11) return reply(lang.NoToStik(prefix, command))
               let media = await quoted.download()
               let encmedia = await fureya.sendVideoAsSticker(m.chat, media, m, {
                  packname: text.split('|')[0] ? text.split('|')[0] : pushname,
                  author: text.split('|')[1] ? text.split('|')[1] : ''
               })
               await fs.unlinkSync(encmedia)
            } else {
               reply('hah')
            }
         }
         break
      
      case "s":
      case "sticker":
      case "stiker":
        {
          if (!quoted) return reply("reply fto nya");
          if (/image/.test(mime)) {
            let media = await quoted.download();
            let encmedia = await fureya.sendImageAsSticker(m.chat, media, m, {
              packname: global.packname,
              author: global.author,
            });
            await fs.unlinkSync(encmedia);
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11) return reply("bentar kak");
            let media = await quoted.download();
            let encmedia = await fureya.sendVideoAsSticker(m.chat, media, m, {
              packname: global.packname,
              author: global.author,
            });
            await fs.unlinkSync(encmedia);
          } else {
            reply("reply yang mau dibikin stiker");
          }
        }
        break;

      //GROUP-MENU
      
      case 'welcome':
            if (!m.isGroup) return reply(mess.group)
            if (!isAdmins && !isCreator) return reply(mess.admin)
            if (args[0] === "on") {
               if (isWelcome) return reply(mess.done)
               _welcome.push(m.chat)
               fs.writeFileSync('./database/welcome.json', JSON.stringify(_welcome, null, 2))
               reply(mess.done)
            } else if (args[0] === "off") {
               if (!isWelcome) return reply(mess.done)
               let anu = _welcome.indexOf(m.chat)
               _welcome.splice(anu, 1)
               fs.writeFileSync('./database/welcome.json', JSON.stringify(_welcome, null, 2))
               reply('udh off')
            } else {
               fureya.sendButMessage(from, 'Mode Welcome Msg', `© ${namaowner}`, [{
                  buttonId: '.welcome on',
                  buttonText: {
                     displayText: 'ON'
                  },
                  type: 1
               }, {
                  buttonId: '.welcome off',
                  buttonText: {
                     displayText: 'OFF'
                  },
                  type: 1
               }], {
                  quoted: m
               })
            }
            break
         case 'goodbye':
         case 'left':
            if (!m.isGroup) return reply(mess.group)
            if (!isAdmins && !isCreator) return reply(mess.admin)
            if (args[0] === "on") {
               if (isLeft) return reply(mess.done)
               _left.push(m.chat)
               fs.writeFileSync('./database/left.json', JSON.stringify(_left, null, 2))
               reply('udah on kak')
            } else if (args[0] === "off") {
               if (!isLeft) return reply(mess.done('mematikan goodbye'))
               let anu = _left.indexOf(m.chat)
               _left.splice(anu, 1)
               fs.writeFileSync('./database/welcome.json', JSON.stringify(_left, null, 2))
               reply('udah off')
            } else {
              //reply(lang.KisahNabi(prefix, command, 'on/off', 'mode'))
               fureya.sendButMessage(from, 'Mode Goodbye Msg', `© ${namaowner}`, [{
                  buttonId: '.left on',
                  buttonText: {
                     displayText: 'ON'
                  },
                  type: 1
               }, {
                  buttonId: '.left off',
                  buttonText: {
                     displayText: 'OFF'
                  },
                  type: 1
               }], {
                  quoted: m
               })
            }
            break
      
      case "antiwame":
        {
          if (!m.isGroup) return reply("Fitur Khusus Group!");
          if (!isAdmins) return reply("Fitur Khusus admin!");
          if (!isBotAdmins)
            return reply("Jadikan bot sebagai admin terlebih dahulu");
          if (args[0] === "on") {
            if (isAntiWame) return reply(`Udah aktif`);
            antiwame.push(m.chat);
            fs.writeFileSync(
              "./database/antiwame.json",
              JSON.stringify(antiwame, null, 2)
            );
            reply("Successfully Activate Antiwame In This Group");
          } else if (args[0] === "off") {
            if (!isAntiWame) return reply(`Udah nonaktif`);
            let anu = antiwame.indexOf(m.chat);
            antiwame.splice(anu, 1);
            fs.writeFileSync(
              "./database/antiwame.json",
              JSON.stringify(antiwame, null, 2)
            );
            reply("Successfully Disabling Antiwame In This Group");
          } else {
            reply(
              `Kirim perintah ${prefix + command} on/off\n\nContoh: ${
                prefix + command
              } on`
            );
          }
        }
        break;
      case "antiwame2":
        {
          if (!m.isGroup) return reply("Fitur Khusus Group!");
          if (!isAdmins) return reply("Fitur Khusus admin!");
          if (!isBotAdmins)
            return reply("Jadikan bot sebagai admin terlebih dahulu");
          if (args[0] === "on") {
            if (isAntiWame2) return reply(`Udah aktif`);
            antiwame2.push(m.chat);
            fs.writeFileSync(
              "./database/antiwame2.json",
              JSON.stringify(antiwame2, null, 2)
            );
            reply("Successfully Activate antiwame2 In This Group");
          } else if (args[0] === "off") {
            if (!isAntiWame2) return reply(`Udah nonaktif`);
            let anu = antiwame2.indexOf(m.chat);
            antiwame2.splice(anu, 1);
            fs.writeFileSync(
              "./database/antiwame2.json",
              JSON.stringify(antiwame2, null, 2)
            );
            reply("Successfully Disabling antiwame2 In This Group");
          } else {
            reply(
              `Kirim perintah ${prefix + command} on/off\n\nContoh: ${
                prefix + command
              } on`
            );
          }
        }
        break;
      case "open":
      case "buka":
        {
          if (!m.isGroup) return reply("Fitur Khusus Group!");
          if (!isAdmins) return reply("Fitur Khusus admin!");
          if (!isBotAdmins) return reply("Bot bukan admin");
          fureya.groupSettingUpdate(m.chat, "not_announcement");
          const textOpen = await getTextSetOpen(m.chat, set_open);
          reply(
            textOpen ||
              `Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`
          );
        }
        break;
      case "antilink": {
        if (!m.isGroup) return reply("Fitur Khusus Group!");
        if (!isAdmins) return reply("Fitur Khusus admin!");
        if (!isBotAdmins) return reply("Bot harus menjadi admin");
        if (args[0] === "on") {
          if (isAntiLink) return reply(`Udah aktif`);
          antilink.push(m.chat);
          fs.writeFileSync(
            "./database/antilink.json",
            JSON.stringify(antilink, null, 2)
          );
          reply("Successfully Activate Antilink In This Group");
        } else if (args[0] === "off") {
          if (!isAntiLink) return reply(`Udah nonaktif`);
          let anu = antilink.indexOf(m.chat);
          antilink.splice(anu, 1);
          fs.writeFileSync(
            "./database/antilink.json",
            JSON.stringify(antilink, null, 2)
          );
          reply("Successfully Disabling Antilink In This Group");
        } else {
          reply(
            `Kirim perintah ${prefix + command} on/off\n\nContoh: ${
              prefix + command
            } on`
          );
        }
      }

      case "antilink2":
        {
          if (!m.isGroup) return reply("Fitur Khusus Group!");
          if (!isAdmins) return reply("Fitur Khusus admin!");
          if (!isBotAdmins) return reply("Bot harus menjadi admin");
          if (args[0] === "on") {
            if (isAntiLink2) return reply(`Udah aktif`);
            antilink2.push(m.chat);
            fs.writeFileSync(
              "./database/antilink2.json",
              JSON.stringify(antilink2, null, 2)
            );
            reply("Successfully Activate antilink2 In This Group");
          } else if (args[0] === "off") {
            if (!isAntiLink2) return reply(`Udah nonaktif`);
            let anu = antilink2.indexOf(m.chat);
            antilink2.splice(anu, 1);
            fs.writeFileSync(
              "./database/antilink2.json",
              JSON.stringify(antilink2, null, 2)
            );
            reply("Successfully Disabling antilink2 In This Group");
          } else {
            reply(
              `Kirim perintah ${prefix + command} on/off\n\nContoh: ${
                prefix + command
              } on`
            );
          }
        }
        break;

      case "close":
      case "tutup":
        {
          if (!m.isGroup) return reply("Fitur Khusus Group!");
          if (!isAdmins) return reply("Fitur Khusus admin!");
          if (!isBotAdmins) return reply("Bot bukan admin");
          fureya.groupSettingUpdate(m.chat, "announcement");
          const textClose = await getTextSetClose(m.chat, set_close);
          reply(
            textClose ||
              `Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`
          );
        }
        break;
      case "h":
      case "hidetag":
        {
          if (!m.isGroup) return reply("Khusus grup");
          if (!(isAdmins || isCreator)) return reply("Fitur khusus admin");
          let tek = m.quoted ? quoted.text : text ? text : "";
          fureya.sendMessage(
            m.chat,
            {
              text: tek,
              mentions: participants.map((a) => a.id),
            },
            {}
          );
          fureya.sendMessage(m.chat, {
            audio: sad,
            mimetype: "audio/mpeg",
            ptt: true,
          });
        }
        break;

      case "tagall":
      case "infoall":
        if (!m.isGroup) return reply("fitur khusus gc");
        if (!(isAdmins || isCreator))
          return reply("eitsss cumaaa admin yang bisa pake fitur ini");
        let tekss = `══ • *Mention All* • ══\n\n• *Message : ${
          q ? q : "kosong"
        }*\n\n`;
        for (let mem of participants) {
          tekss += `> @${mem.id.split("@")[0]}\n`;
        }
        tekss += `\n>>>>> *FureyaBot* <<<<<`;
        fureya.sendMessage(
          m.chat,
          {
            text: tekss,
            mentions: participants.map((a) => a.id),
          },
          {
            quoted: m,
          }
        );
        break;

      case "add": {
        if (!m.isGroup) return reply("fitur khusus group kak");
        if (!isCreator) return reply("fitur khusus ownerkuu");
        if (!(isAdmins || isBotAdmins)) return reply("fiturr khusus atmin");
        if (!m.quoted && !text)
          return reply("add siapee?? reply org nya lahhh🗿");
        let users = m.quoted
          ? m.quoted.sender
          : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        await fureya
          .groupParticipantsUpdate(m.chat, [users], "add")
          .then((res) => reply("dahhh"))
          .catch((err) => reply(lang.err()));
        break;
      }
      case "kick":
        {
          if (!m.isGroup) return reply("fitur khusus group kak");
          if (!isCreator) return reply("khusus owner");
          if (!(isAdmins || isBotAdmins)) return reply("fiturr khusus atmin");
          if (!m.quoted && !text)
            return reply("kik siapee?? reply org nya lahhh🗿");
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await fureya
            .groupParticipantsUpdate(m.chat, [users], "remove")
            .then((res) => reply(`Pergi jauh jauh lu sono`))
            .catch((err) => reply(lang.err()));
        }
        break;

      case "demote":
        {
          if (!m.isGroup) return reply("fitur khusus group");
          if (!isCreator) return reply("fitur khusus ownerkuu");
          if (!(isAdmins || isBotAdmins)) return reply("fitur khusus atmin");
          if (!m.quoted && !text) return reply("reply org nya dong");
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await fureya
            .groupParticipantsUpdate(m.chat, [users], "demote")
            .then((res) => reply("awokawok kasian kena demote"))
            .catch((err) => reply(lang.err()));
        }
        break;
      case "revoke":
        if (!m.isGroup) return reply("fitur khusus grup");
        if (!isCreator) return reply("khusus owner");
        if (!(isAdmins || isBotAdmins)) return reply("khusus atmin");
        let link = await fureya.groupRevokeInvite(from);
        await reply(
          "dahhh" +
            `\n\n*New Link for ${groupName}* :\n https://chat.whatsapp.com/${link}`
        );
        break;
        
      //gabut menu
      
      case '🗿':
      case '🗿🗿': {
       fureya.sendMessage(from, { text: `🗿` })
      }
      break
      
      //owner menu
      case 'self': {
if (!m.key.fromMe && !isCreator) return reply('khusus owner')
fureya.public = false
m.reply('Self Mode Activate')
}
break

case 'public': {
if (!m.key.fromMe && !isCreator) return
reply('khusus owner')
fureya.public = true
m.reply('Public Mode Activate')
}
break;


      default:
        if (budy.startsWith(">")) {
          if (!isCreator) return;
          try {
            let evaled = await eval(budy.slice(2));
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
            await reply(evaled);
          } catch (err) {
            await reply(util.format(err));
          }
        } 
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};
