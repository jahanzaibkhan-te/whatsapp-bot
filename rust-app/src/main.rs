#[macro_use] extern crate rocket;
//#[macro_use] extern crate rocket_sync_db_pools;

use rocket::fs::{FileServer, relative};
use rocket_dyn_templates::Template;

mod form;
mod chatbot;
//mod tblmessages;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![form::index, form::submit, chatbot::submit])
        .attach(Template::fairing())
        .mount("/", FileServer::from(relative!("/static")))
}
