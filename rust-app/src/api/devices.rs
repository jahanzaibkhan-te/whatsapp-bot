use rocket::fairing::AdHoc;
use rocket::serde::json::Json;

use crate::db::Db;
use crate::JzResult;
use crate::repo::{tbldevices, tbldevices::TblDevices};


#[get("/list")]
pub async fn list(db: Db) -> JzResult<Json<Vec<TblDevices>>> {
    let data = tbldevices::list(&db).await.unwrap_or_default();
    Ok(Json(data))
}

#[post("/create", data = "<data>")]
pub async fn create(db: Db, data: Json<TblDevices>) -> JzResult<Json<Option<i32>>> {
    let result = tbldevices::create(&db, data.into_inner())
        .await
        .unwrap_or_default();
    Ok(Json(result))
}

pub fn stage() -> AdHoc {
    AdHoc::on_ignite("devices List ", |rocket| async {
        rocket.mount("/api/devices", routes![list, create])
    })
}