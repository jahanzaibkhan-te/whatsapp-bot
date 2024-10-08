use rocket::serde::{json::Json, Deserialize, Serialize};

//use crate::tblmessages;

#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(non_snake_case)]
struct MessageID {
    remoteJid: String,
    fromMe: bool,
    id: String,
    participant: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(non_snake_case)]
struct Message {
    conversation: Option<String>,
    extendedTextMessage: Option<ExtendedTextMessage>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct ExtendedTextMessage {
    title: Option<String>,
    description: Option<String>,
    text: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(non_snake_case)]
pub struct WaMessage {
    deviceId: String,
    from: String,
    message_id: MessageID,
    message: Message,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Response {
    session_id: String,
    message: RespMsg,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct RespMsg {
    text: String,
    r#type: String,
    body: Option<String>,
    footer: Option<String>,
}

#[post("/api/send-webhook", data = "<message>")]
pub fn submit(message: Json<WaMessage>) -> Json<Option<Response>> {

    if let Some(conversation) = message.message.conversation.as_ref()
    .or_else(|| {
        message.message.extendedTextMessage
            .as_ref()
            .and_then(|ext| ext.title.as_ref())
    }) {
        if !message.message_id.fromMe || true {
            println!("Message Received => {:?}", message);

            let reply_text = if conversation.contains("hi")
                || conversation.contains("hello")
                || conversation.contains("assalam")
                || conversation.contains("a o a")
            {
                "Hello! How can I help you today?"
            } else if conversation.contains("bye") {
                "Goodbye! Have a great day!"
            } else if conversation.contains("help") {
                "Here are some things I can assist you with: ..."
            } else if conversation.contains("how are you") {
                "I'm just a program, but I'm here to help you!"
            } else if conversation.contains("your name") {
                "I am your assistant here to help you!"
            } else if conversation.contains("thank") {
                "You're welcome! If you need anything else, just let me know."
            } else if conversation.contains("morning") {
                "Good morning! Hope you have a wonderful day!"
            } else if conversation.contains("evening") {
                "Good evening! How can I assist you tonight?"
            } else {
                "I'm sorry, I didn't understand that. I can only understand greetings yet."
            };

            return Json(Some(Response {
                session_id: message.deviceId.clone(),
                message: RespMsg {
                    text: reply_text.to_string(),
                    r#type: "plain".to_string(),
                    body: None,
                    footer: None,
                },
            }));
        }
    }
    Json(None)
}

// {
//     "text": "Hello, world!",
//     "linkPreview": null,
//     "mentionedJid": ["12345@s.whatsapp.net"],
//     "contextInfo": {
//         "key": "some-context-key"
//     },
//     "editable": true,
//     "poll": {
//         "question": "What's your favorite color?",
//         "options": ["Red", "Blue", "Green"],
//         "totalVotes": 10
//     },
//     "contacts": {
//         "displayName": "John Doe",
//         "contacts": [
//             {
//                 "displayName": "Alice",
//                 "jid": "11111@s.whatsapp.net"
//             },
//             {
//                 "displayName": "Bob",
//                 "jid": "22222@s.whatsapp.net"
//             }
//         ]
//     },
//     "location": {
//         "latitude": 37.7749,
//         "longitude": -122.4194,
//         "name": "San Francisco",
//         "address": "California"
//     },
//     "react": {
//         "reactType": "👍",
//         "messageId": "message-id-123"
//     },
//     "buttonReply": {
//         "id": "button-1",
//         "title": "Click me"
//     },
//     "type": "template",
//     "groupInvite": {
//         "inviteCode": "some-invite-code",
//         "groupName": "Fun Group"
//     },
//     "listReply": {
//         "title": "Choose an option",
//         "sections": [
//             {
//                 "title": "Options",
//                 "rows": [
//                     {
//                         "title": "Option 1",
//                         "description": "Description for option 1",
//                         "rowId": "row1"
//                     },
//                     {
//                         "title": "Option 2",
//                         "description": "Description for option 2",
//                         "rowId": "row2"
//                     }
//                 ]
//             }
//         ]
//     },
//     "pin": {
//         "chatId": "chat-id-123",
//         "messageKey": "some-message-key"
//     },
//     "type": "message",
//     "time": 86400,
//     "product": {
//         "productId": "prod-001",
//         "productName": "Awesome Product",
//         "price": 19.99,
//         "currency": "USD"
//     },
//     "businessOwnerJid": "business@s.whatsapp.net",
//     "body": "Check out this product!",
//     "footer": "Available now!",
//     "phoneNumber": {
//         "displayName": "Contact Name",
//         "phoneNumber": "+1234567890"
//     },
//     "requestPhoneNumber": {
//         "message": "Please share your phone number."
//     },
//     "viewOnce": true
// }
