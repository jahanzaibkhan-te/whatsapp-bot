#[macro_use] extern crate rocket;
//#[macro_use] extern crate rocket_sync_db_pools;

mod api;
mod repo;
mod data;
mod db;

use std::collections::HashMap;
use rocket::fs::{FileServer, relative};
use rocket_dyn_templates::Template;
use api::{chatbot,devices,sendmsg, webhook};
use rocket::response::Debug;

pub type JzResult<T, E = Debug<diesel::result::Error>> = std::result::Result<T, E>;


#[get("/")]
pub async fn index() -> Template {
    let context: HashMap<&str, &str> = HashMap::new();
    Template::render("index",  &context)
}

#[launch]
fn rocket() -> _ {
    let r = rocket::build()
        .attach(db::Db::fairing())
        .mount("/", routes![index, webhook::submit])
        .attach(chatbot::stage())
        .attach(devices::stage())
        .attach(sendmsg::stage())
        .attach(Template::fairing())
        .mount("/", FileServer::from(relative!("/static")));
        r
}
