use rocket::fairing::AdHoc;



pub fn stage() -> AdHoc {
    AdHoc::on_ignite("Send Messages ", |rocket| async {
        rocket.mount("/api/msg", routes![])
    })
}