require("./settings");
const {
  default: WADefault,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
} = require("@adiwajshing/baileys");
const pino = require("pino");
const chalk = require("chalk");
const CFonts = require("cfonts");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const axios = require("axios");
const FileType = require("file-type");
const fetch = require("node-fetch");
const PhoneNumber = require("awesome-phonenumber");
const path = require("path");
const { smsg, getBuffer, fetchJson, TelegraPh } = require("./lib/simple");
const {
  isSetClose,
  addSetClose,
  removeSetClose,
  changeSetClose,
  getTextSetClose,
  isSetLeft,
  addSetLeft,
  removeSetLeft,
  changeSetLeft,
  getTextSetLeft,
  isSetOpen,
  addSetOpen,
  removeSetOpen,
  changeSetOpen,
  getTextSetOpen,
  isSetWelcome,
  addSetWelcome,
  removeSetWelcome,
  changeSetWelcome,
  getTextSetWelcome,
} = require("./lib/store");
const { toAudio, toPTT, toVideo } = require("./lib/converter");
const { color } = require("./lib/color");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
  writeExif,
} = require("./lib/exif");
let set_welcome_db = JSON.parse(fs.readFileSync("./database/set_welcome.json"));
let set_left_db = JSON.parse(fs.readFileSync("./database/set_left.json"));
let _welcome = JSON.parse(fs.readFileSync("./database/welcome.json"));
let _left = JSON.parse(fs.readFileSync("./database/left.json"));
let set_open = JSON.parse(fs.readFileSync("./database/set_open.json"));
let set_close = JSON.parse(fs.readFileSync("./database/set_close.json"));
let antilink = JSON.parse(fs.readFileSync("./database/antilink.json"));
let antiwame = JSON.parse(fs.readFileSync("./database/antiwame.json"));
let antilink2 = JSON.parse(fs.readFileSync("./database/antilink2.json"));
let antiwame2 = JSON.parse(fs.readFileSync("./database/antiwame2.json"));

const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store",
  }),
});
global.api = (name, path = "/", query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? "?" +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? {
                [apikeyqueryname]:
                  global.APIKeys[
                    name in global.APIs ? global.APIs[name] : name
                  ],
              }
            : {}),
        })
      )
    : "");

function nocache(module, cb = () => {}) {
  fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module));
    cb(module);
  });
}

function uncache(module = ".") {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(module)];
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

CFonts.say(`FureyaBot`, {
  font: "shade",
  gradient: ["blue", "magenta"],
  transitionGradient: true,
  letterSpacing: 3,
});
CFonts.say(`Coded By Fauzijywrdna`, {
  font: "console",
  align: "center",
  gradient: ["#DCE35B", "#45B649"],
  transitionGradient: true,
});

console.log("Wait for bot connected...");
console.log(color("Wait for bot connected...", "yellow"));

setTimeout(() => {
  console.log(color("by FauziJayawardana", "red"));
}, 3000);

async function Botstarted() {
  const { state, saveCreds } = await useMultiFileAuthState(`./${sessionName}`);

  const fureya = WADefault({
    logger: pino({
      level: "silent",
    }),
    printQRInTerminal: true,
    browser: ["created by oziijywrdna", "Safari", "1.0.0"],
    patchMessageBeforeSending: (message) => {
      const requiresPatch = !!(
        message.buttonsMessage ||
        message.templateMessage ||
        message.listMessage
      );
      if (requiresPatch) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {},
              },
              ...message,
            },
          },
        };
      }
      return message;
    },
    auth: state,
  });

  require("./case");
  nocache("./case", (module) => console.log(` "${module}" Telah diupdate!`));
  nocache("./settings", (module) =>
    console.log(` "${module}" Telah diupdate!`)
  );

  store.bind(fureya.ev);

  fureya.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      mek = chatUpdate.messages[0];
      if (!mek.message) return;
      mek.message =
        Object.keys(mek.message)[0] === "ephemeralMessage"
          ? mek.message.ephemeralMessage.message
          : mek.message;
      if (mek.key && mek.key.remoteJid === "status@broadcast") return;
      if (!fureya.public && !mek.key.fromMe && chatUpdate.type === "notify")
        return;
      if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return;
      m = smsg(fureya, mek, store);
      require("./case")(
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
      );
    } catch (err) {
      console.log(err);
    }
  });

  //----> Function participants group

  fureya.ev.on("group-participants.update", (anu) => {
    console.log(anu);

    try {
      //To get photo of user
      var ppu = fureya.profilePictureUrl(sender, "image");
    } catch (e) {
      var ppu =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
    }

    const contextInfo = {
      externalAdReply: {
        title: `© FauziJayawardana`,
        mediaType: 1,
        renderLargerThumbnail: true,
        thumbnailUrl: ppu,
        sourceUrl: gc,
      },
    };
    if (anu.action === "add") {
      fureya.sendMessage(anu.id, {
        contextInfo,
        text: `welkam broww intro dlu sabi kalii😋🗿`,
      });
    }
    if (anu.action === "remove") {
      fureya.sendMessage(anu.id, {
        contextInfo,
        text: `yahhh outt yaudeh ati ati dijalan ye🗿`,
      });
    }
  });

  // Setting
  fureya.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return (
        (decode.user && decode.server && decode.user + "@" + decode.server) ||
        jid
      );
    } else return jid;
  };

  fureya.ev.on("contacts.update", (update) => {
    for (let contact of update) {
      let id = fureya.decodeJid(contact.id);
      if (store && store.contacts)
        store.contacts[id] = {
          id,
          name: contact.notify,
        };
    }
  });

  fureya.getName = (jid, withoutContact = false) => {
    id = fureya.decodeJid(jid);
    withoutContact = fureya.withoutContact || withoutContact;
    let v;
    if (id.endsWith("@g.us"))
      return new Promise(async (resolve) => {
        v = store.contacts[id] || {};
        if (!(v.name || v.subject)) v = fureya.groupMetadata(id) || {};
        resolve(
          v.name ||
            v.subject ||
            PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
              "international"
            )
        );
      });
    else
      v =
        id === "0@s.whatsapp.net"
          ? {
              id,
              name: "WhatsApp",
            }
          : id === fureya.decodeJid(fureya.user.id)
          ? fureya.user
          : store.contacts[id] || {};
    return (
      (withoutContact ? "" : v.name) ||
      v.subject ||
      v.verifiedName ||
      PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
        "international"
      )
    );
  };

  fureya.sendContact = async (jid, kon, quoted = "", opts = {}) => {
    let list = [];
    for (let i of kon) {
      list.push({
        displayName: await fureya.getName(i + "@s.whatsapp.net"),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await fureya.getName(
          i + "@s.whatsapp.net"
        )}\nFN:${await fureya.getName(
          i + "@s.whatsapp.net"
        )}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      });
    }
    fureya.sendMessage(
      jid,
      {
        contacts: {
          displayName: `${list.length} Kontak`,
          contacts: list,
        },
        ...opts,
      },
      {
        quoted,
      }
    );
  };

  fureya.public = true;

  fureya.serializeM = (m) => smsg(fureya, m, store);

  fureya.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.badSession) {
        console.log(`Bad Session File, Please Delete Session and Scan Again`);
        fureya.logout();
      } else if (reason === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        Botstarted();
      } else if (reason === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        Botstarted();
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log(
          "Connection Replaced, Another New Session Opened, reconnecting..."
        );
        Botstarted();
      } else if (reason === DisconnectReason.loggedOut) {
        console.log(`Device Logged Out, Please Scan Again And Run.`);
        fureya.logout();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        Botstarted();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        Botstarted();
      } else if (reason === DisconnectReason.Multidevicemismatch) {
        console.log("Multi device mismatch, please scan again");
        fureya.logout();
      } else fureya.end(`Unknown DisconnectReason: ${reason}|${connection}`);
    }
    if (
      update.connection == "open" ||
      update.receivedPendingNotifications == "true"
    ) {
      console.log(`Connected to = ` + JSON.stringify(fureya.user, null, 2));
    }
  });

  fureya.ev.on("creds.update", saveCreds);

  fureya.sendText = (jid, text, quoted = "", options) =>
    fureya.sendMessage(
      jid,
      {
        text: text,
        ...options,
      },
      {
        quoted,
        ...options,
      }
    );

  fureya.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    return buffer;
  };

  fureya.downloadAndSaveMediaMessage = async (
    message,
    filename,
    attachExtension = true
  ) => {
    let quoted = message.msg ? message.msg : message;

    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? filename + "." + type.ext : filename;
    // save to file
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };
  fureya.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
    fureya.sendMessage(
      jid,
      {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(
          (v) => v[1] + "@s.whatsapp.net"
        ),
        ...options,
      },
      {
        quoted,
      }
    );
  fureya.getFile = async (PATH, returnAsFilename) => {
    let res, filename;
    const data = Buffer.isBuffer(PATH)
      ? PATH
      : /^data:.*?\/.*?;base64,/i.test(PATH)
      ? Buffer.from(PATH.split`,`[1], "base64")
      : /^https?:\/\//.test(PATH)
      ? await (res = await fetch(PATH)).buffer()
      : fs.existsSync(PATH)
      ? ((filename = PATH), fs.readFileSync(PATH))
      : typeof PATH === "string"
      ? PATH
      : Buffer.alloc(0);
    if (!Buffer.isBuffer(data)) throw new TypeError("Result is not a buffer");
    const type = (await FileType.fromBuffer(data)) || {
      mime: "application/octet-stream",
      ext: ".bin",
    };
    if (data && returnAsFilename && !filename)
      (filename = path.join(
        __dirname,
        "./image/" + new Date() * 1 + "." + type.ext
      )),
        await fs.promises.writeFile(filename, data);
    return {
      res,
      filename,
      ...type,
      data,
      deleteFile() {
        return filename && fs.promises.unlink(filename);
      },
    };
  };

  fureya.sendFile = async (
    jid,
    path,
    filename = "",
    caption = "",
    quoted,
    ptt = false,
    options = {}
  ) => {
    let type = await fureya.getFile(path, true);
    let { res, data: file, filename: pathFile } = type;
    if ((res && res.status !== 200) || file.length <= 65536) {
      try {
        throw {
          json: JSON.parse(file.toString()),
        };
      } catch (e) {
        if (e.json) throw e.json;
      }
    }
    let opt = {
      filename,
    };
    if (quoted) opt.quoted = quoted;
    if (!type) options.asDocument = true;
    let mtype = "",
      mimetype = type.mime,
      convert;
    if (
      /webp/.test(type.mime) ||
      (/image/.test(type.mime) && options.asSticker)
    )
      mtype = "sticker";
    else if (
      /image/.test(type.mime) ||
      (/webp/.test(type.mime) && options.asImage)
    )
      mtype = "image";
    else if (/video/.test(type.mime)) mtype = "video";
    else if (/audio/.test(type.mime))
      (convert = await (ptt ? toPTT : toAudio)(file, type.ext)),
        (file = convert.data),
        (pathFile = convert.filename),
        (mtype = "audio"),
        (mimetype = "audio/ogg; codecs=opus");
    else mtype = "document";
    if (options.asDocument) mtype = "document";

    delete options.asSticker;
    delete options.asLocation;
    delete options.asVideo;
    delete options.asDocument;
    delete options.asImage;

    let message = {
      ...options,
      caption,
      ptt,
      [mtype]: {
        url: pathFile,
      },
      mimetype,
    };
    let m;
    try {
      m = await fureya.sendMessage(jid, message, {
        ...opt,
        ...options,
      });
    } catch (e) {
      //console.error(e)
      m = null;
    } finally {
      if (!m)
        m = await fureya.sendMessage(
          jid,
          {
            ...message,
            [mtype]: file,
          },
          {
            ...opt,
            ...options,
          }
        );
      file = null;
      return m;
    }
  };
  fureya.sendMedia = async (jid, path, filename, quoted = "", options = {}) => {
    let { ext, mime, data } = await fureya.getFile(path);
    messageType = mime.split("/")[0];
    pase = messageType.replace("application", "document") || messageType;
    return await fureya.sendMessage(
      jid,
      {
        [`${pase}`]: data,
        mimetype: mime,
        fileName: filename + ext ? filename + ext : getRandom(ext),
        ...options,
      },
      {
        quoted,
      }
    );
  };
  fureya.sendMediaAsSticker = async (jid, path, quoted, options = {}) => {
    let { ext, mime, data } = await fureya.getFile(path);
    let media = {};
    let buffer;
    media.data = data;
    media.mimetype = mime;
    if (options && (options.packname || options.author)) {
      buffer = await writeExif(media, options);
    } else {
      buffer = /image/.test(mime)
        ? await imageToWebp(data)
        : /video/.test(mime)
        ? await videoToWebp(data)
        : "";
    }
    await fureya.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
    );
    return buffer;
  };
  fureya.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await (await fetch(path)).buffer()
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options);
    } else {
      buffer = await imageToWebp(buff);
    }

    await fureya.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
    );
    return buffer;
  };

  fureya.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path)
      ? path
      : /^data:.*?\/.*?;base64,/i.test(path)
      ? Buffer.from(path.split`,`[1], "base64")
      : /^https?:\/\//.test(path)
      ? await getBuffer(path)
      : fs.existsSync(path)
      ? fs.readFileSync(path)
      : Buffer.alloc(0);
    let buffer;
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVid(buff, options);
    } else {
      buffer = await videoToWebp(buff);
    }

    await fureya.sendMessage(
      jid,
      {
        sticker: {
          url: buffer,
        },
        ...options,
      },
      {
        quoted,
      }
    );
    return buffer;
  };
  fureya.sendButtonText = (
    jid,
    buttons = [],
    text,
    footer,
    quoted = "",
    options = {}
  ) => {
    let buttonMessage = {
      text,
      footer,
      buttons,
      headerType: 2,
      ...options,
    };
    fureya.sendMessage(jid, buttonMessage, {
      quoted,
      ...options,
    });
  };
  fureya.send1ButMes = (
    jid,
    text = "",
    footer = "",
    butId = "",
    dispText = "",
    quoted,
    ments
  ) => {
    let but = [
      {
        buttonId: butId,
        buttonText: {
          displayText: dispText,
        },
        type: 1,
      },
    ];
    let butMes = {
      text: text,
      buttons: but,
      footer: footer,
      mentions: ments ? ments : [],
    };
    fureya.sendMessage(jid, butMes, {
      quoted: quoted,
    });
  };

  fureya.sendButImage = async (
    jid,
    link,
    but = [],
    text = "",
    footer = "",
    ments = [],
    quoted
  ) => {
    let dlimage;
    try {
      dlimage = await getBuffer(link);
    } catch {
      dlimage = await getBuffer(
        "https://telegra.ph/file/ca0234ea67c9a8b8af9a1.jpg"
      );
    }
    const buttonMessage = {
      image: dlimage,
      caption: text,
      footer: footer,
      buttons: but,
      headerType: "IMAGE",
      mentions: ments,
    };

    fureya.sendMessage(jid, buttonMessage, quoted);
  };
  fureya.sendFakeLink = (jid, text, salam, pushname, quoted) =>
    fureya.sendMessage(
      jid,
      {
        text: text,
        contextInfo: {
          externalAdReply: {
            title: `Selamat ${salam} ${pushname}`,
            body: footer_text,
            previewType: "PHOTO",
            thumbnail: pp_bot,
            sourceUrl: myweb,
          },
        },
      },
      {
        quoted,
      }
    );

  return fureya;
}

Botstarted();
