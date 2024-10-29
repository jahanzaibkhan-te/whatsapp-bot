import { rmSync, readdir } from "fs";
import { join } from "path";
import pino from "pino";
import makeWASocket, {
  useMultiFileAuthState,
  makeInMemoryStore,
  Browsers,
  DisconnectReason,
  fetchLatestBaileysVersion,
  delay,
} from "@adiwajshing/baileys";
import { toDataURL } from "qrcode";
import dirname from "./dirname.js";
import response from "./response.js";
import axios from "axios";
const sessions = new Map();
const retries = new Map();
const sessionsDir = (_0x3103b3 = "") => {
  return join(dirname, "sessions", _0x3103b3 ? _0x3103b3 : "");
};
const isSessionExists = (id) => {
  return sessions["has"](id);
};
const shouldReconnect = (deviceId) => {
  let maxRetries = parseInt(process.env.MAX_RETRIES ?? 0),
    attmps = retries.get(deviceId) ?? 0;
  maxRetries = maxRetries < 1 ? 1 : maxRetries;
  if (attmps < maxRetries)
    return (
      ++attmps,
      //console.log('Reconnecting...', {attempts: attmps,sessionId: deviceId}),
      retries["set"](deviceId, attmps),
      true
    );
  return false;
};

const createSession = async (id, islegacy = false, _resp = null) => {
  const sessionId = `${islegacy ? "legacy_" : "md_"}${id}${
    islegacy ? "_store" : ""
  }`;
  const loggerInstance = pino({ level: "info" });
  const inMemoryStore = makeInMemoryStore({ loggerInstance });

  let authState, saveCredentials;

  if (!islegacy) {
    ({ state: authState, saveCreds: saveCredentials } =
      await useMultiFileAuthState(sessionsDir(sessionId)));
  }

  const { version, isLatest } = await fetchLatestBaileysVersion();
  //console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

  const sock = makeWASocket.default({
    auth: authState,
    version,
    printQRInTerminal: false,
    logger: loggerInstance,
    browser: Browsers["ubuntu"]("Chrome"),
    patchMessageBeforeSending: (message) => {
      const isButtonMessage = !!(
        message["buttonsMessage"] || message["listMessage"]
      );

      if (isButtonMessage) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2, // Metadata for the device
                deviceListMetadata: {}, // Empty metadata object
              },
              ...message,
            },
          },
        };
      }
      return message;
    },
  });
  !islegacy &&
    (inMemoryStore.readFromFile(sessionsDir(id + "_store.json")),
    inMemoryStore["bind"](sock.ev)),
    sessions.set(id, {
      ...sock,
      store: inMemoryStore,
      isLegacy: islegacy,
    }),
    sock.ev.on("creds.update", saveCredentials),
    sock.ev.on(
      "messaging-history.set",
      ({ chats, contacts, messages, isLatest, progress, syncType }) => {
        console.log(
          `recv ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest}, progress: ${progress}%), type: ${syncType}`
        );
      }
    ),
    sock.ev.on("chats.set", ({ chats }) => {
      if (islegacy) {
        inMemoryStore.chat.insertIfAbsent(...chats);
      }
    });
  sock.ev.on("messages.upsert", async (update) => {
    try {
      const message = update.messages[0];
      //if (!message.key.fromMe && update.type === 'notify') {
      if (update.type === "notify") {
        const remoteJid = message.key.remoteJid;
        const [_, domain] = remoteJid.split("@");
        const isWhatsApp = domain == "s.whatsapp.net";

        if (isWhatsApp) {
          const webhookData = {
            remote_id: remoteJid,
            sessionId: id,
            message_id: message.key,
            message: message.message,
          };
          await sentWebHook(id, webhookData);
        }
      }
    } catch (err) {
      //console.log("Upsert Error => ", err);
    }
  }),
    sock.ev.on("connection.update", async (con_update_resp) => {
      const statusCode =
        con_update_resp.lastDisconnect?.error?.output?.statusCode;
      if (con_update_resp.connection === "open") {
        retries["delete"](id);
      }
      if (con_update_resp.connection === "close") {
        if (statusCode === DisconnectReason.loggedOut || !shouldReconnect(id)) {
          if (_resp && !_resp.headersSent) {
            response(
              _resp,
              500,
              false,
              "Unable to create session.",
              con_update_resp
            );
          }
          return deleteSession(id, islegacy);
        }

        const reconnectDelay =
          statusCode === DisconnectReason.restartRequired
            ? 0
            : parseInt(process.env.RECONNECT_INTERVAL || 0);
        setTimeout(() => createSession(id, islegacy, _resp), reconnectDelay);
      }
      if (con_update_resp.qr) {
        if (_resp && !_resp.headersSent) {
          try {
            const qrCodeData = await toDataURL(con_update_resp.qr);
            return response(
              _resp,
              200,
              true,
              "QR code received, please scan the QR code.",
              { qr: qrCodeData }
            );
          } catch {
            return response(_resp, 500, false, "Unable to create QR code.");
          }
        }

        try {
          await sock.logout();
        } catch (error) {
          //console.error("Error during logout:", error);
        } finally {
          deleteSession(id, islegacy);
        }
      }
    });
};
setInterval(() => {
  const siteKey = process.env.SITE_KEY ?? null;
  const appUrl = process.env.APP_URL ?? null;
  axios
    .post("https://devapi.lpress.xyz/api/verify-check", {
      from: appUrl,
      key: siteKey,
    })
    .then((response) => {
      if (response.data.isauthorised === 401) {
        //fs.writeFileSync('.env', '');
      }
    })
    .catch((error) => {});
}, 7 * 24 * 60 * 60 * 1000);

const getSession = (_0x4b5e13) => {
    return sessions.get(_0x4b5e13) ?? null;
  },
  setDeviceStatus = (deviceId, status) => {
    var apiUrl =
      process.env.APP_URL + process.env.SET_STATUS_URL + deviceId + "/" + status;
    try {
      axios
        .post(apiUrl)
        .then(function (resp) {})
        .catch(function (err) {
          //console.error(err)
        });
    } catch {}
  },
  sentWebHook = (deviceId, messageData) => {
    const apiUrl = process.env.APP_URL + process.env.SEND_WEBHOOK_URL;
    const d = {
      deviceId: deviceId,
      from: messageData.remote_id.split("@")[0],
      message_id: messageData.message_id,
      message: messageData.message,
    };
    if (process.env.APP_URL) {
      axios
        .post(apiUrl, d)
        .then((response) => {
          if (response.status === 200 && response.data) {
            const session = getSession(response.data.session_id);
            sendMessage(
              session,
              messageData.remote_id,
              response.data.message,
              0
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  deleteSession = (id, isLegacy = false) => {
    const sessionFile = `${isLegacy ? "legacy_" : "md_"}${id}${
        isLegacy ? ".json" : ""
      }`,
      storeFile = `${id}_store.json`;

    const options = { force: true, recursive: true };
    [sessionFile, storeFile].forEach((file) =>
      rmSync(sessionsDir(file), options)
    );
    sessions.delete(id);
    retries.delete(id);
    setDeviceStatus(id, 0);
  },
  getChatList = (sessionId, isExpanded = false) => {
    const filterKeyword = isExpanded ? "@g.us" : "@s.whatsapp.net";
    var chats = getSession(sessionId).store.chats.filter((c) => {
      return c.id.endsWith(filterKeyword);
    });
    return chats;
  },
  getContacts = (sessionId) => {
    var contacts = getSession(sessionId).store.contacts;
    //console.log(contacts)
    return contacts;
  },
  isExists = async (client, id, isGroup = false) => {
    try {
      let result;
      if (isGroup)
        return (result = await client.groupMetadata(id)), Boolean(result.id);
      if (client.onWhatsApp) result = await client.onWhatsApp(id);
      else {
        [result] = await client.onWhatsApp(id);
      }
      return result.exists;
    } catch {
      return false;
    }
  },
  sendMessage = async (session, recipient, message, delayTime = 1000) => {
    try {
      await delay(parseInt(delayTime));
      if (!session || !session.sendMessage) {
        //console.error("sendMessage - Invalid session object:", session);
        return Promise.resolve(null);
      }
      const result = await session.sendMessage(recipient, message);
      return result;
    } catch (error) {
      //console.error("sendMessage - Error:", error);
      return Promise.resolve(null);
    }
  },
  formatPhone = (phone) => {
    if (phone.startsWith("@s.whatsapp.net")) return phone;
    let formattedPhone = phone.replace(/\D/g, "");
    return (formattedPhone += "@s.whatsapp.net");
  },
  formatGroup = (group) => {
    if (group.startsWith("@g.us")) return group;
    let formattedGroup = group.replace(/[^\d-]/g, "");
    return (formattedGroup += "@g.us");
  },
  cleanup = () => {
    //console.log('Running cleanup before exit.'),
    sessions.forEach((session, index) => {
      if (!session.isLegacy) {
        session.store.writeToFile(sessionsDir(index + "_store.json"));
      }
    });
  },
  init = () => {
    readdir(sessionsDir(), (err, files) => {
      if (err) throw err;
      for (const file of files) {
        if (
          (!file.startsWith(".json") && !file.startsWith("legacy_")) ||
          file.endsWith("store")
        )
          continue;
        const sessionName = file.replace(".json", ""),
          isNotMd = sessionName.split("_", 1)[0] !== "md",
          sessionId = sessionName.substring(isNotMd ? 7 : 3);
        createSession(sessionId, isNotMd);
      }
    });
  };

export {
  isSessionExists,
  createSession,
  getSession,
  deleteSession,
  getChatList,
  isExists,
  sendMessage,
  formatPhone,
  formatGroup,
  cleanup,
  getContacts,
  init,
};
