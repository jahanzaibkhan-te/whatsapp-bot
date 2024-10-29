use lambda_runtime::{run, service_fn, tracing, Error, LambdaEvent};

use serde::{Deserialize, Serialize};
mod wamessage;
use crate::wamessage::WaMessage;
/// This is a made-up example. Requests come into the runtime as unicode
/// strings in json format, which can map to any structure that implements `serde::Deserialize`
/// The runtime pays no attention to the contents of the request payload.

/// This is a made-up example of what a response structure may look like.
/// There is no restriction on what it can be. The runtime requires responses
/// to be serialized into json. The runtime pays no attention
/// to the contents of the response payload.

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

/// This is the main body for the function.
/// Write your code inside it.
/// There are some code example in the following URLs:
/// - https://github.com/awslabs/aws-lambda-rust-runtime/tree/main/examples
/// - https://github.com/aws-samples/serverless-rust-demo/
async fn function_handler(event: LambdaEvent<WaMessage>) -> Result<Response, Error> {
    // Extract some useful info from the request
    let message = event.payload;
    let mut reply_text: &str = "";

    if let Some(conversation) = message.message.conversation.as_ref().or_else(|| {
        message
            .message
            .extendedTextMessage
            .as_ref()
            .and_then(|ext| ext.title.as_ref())
    }) {
        if !message.message_id.fromMe || true {
            println!("Message Received => {:?}", message);

            reply_text = if conversation.contains("hi")
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
                ""
                //"I'm sorry, I didn't understand that. I can only understand greetings yet."
            };
        }
    }
    Ok(Response {
        session_id: message.deviceId.clone(),
        message: RespMsg {
            text: reply_text.to_string(),
            r#type: "plain".to_string(),
            body: None,
            footer: None,
        },
    })
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    run(service_fn(function_handler)).await
}
