

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct MessageID {
    pub remoteJid: String,
    pub fromMe: bool,
    pub id: String,
    pub participant: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct Message {
    pub conversation: Option<String>,
    pub extendedTextMessage: Option<ExtendedTextMessage>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ExtendedTextMessage {
    pub title: Option<String>,
    pub description: Option<String>,
    pub text: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct WaMessage {
    pub deviceId: String,
    pub from: String,
    pub message_id: MessageID,
    pub message: Message,
}
