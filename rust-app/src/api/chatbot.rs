use crate::db::Db;
use rocket_dyn_templates::{Template, context};
use rocket::fairing::AdHoc;

use crate::repo::tblmessages;


#[get("/list")]
pub async fn list(db: Db) -> Template {
    let messages = match tblmessages::list(&db).await {
        Ok(msgs) => msgs,
        Err(_) => Vec::new()
    };
    println!("Messages Stored => {:?}", messages);
    Template::render("chatbot/index", context! {
        messages: messages,
    })
}


pub fn stage() -> AdHoc {
    AdHoc::on_ignite("Messages List ", |rocket| async {
        rocket
            .mount("/chats", routes![list])
    })
}
