use diesel::prelude::*;
use rocket::serde::{Deserialize, Serialize};
use crate::db::Db;
use crate::JzResult;


#[derive(Debug, Clone, Deserialize, Serialize, Queryable, Insertable)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = tbl_devices)]
pub struct TblDevices {
    id: Option<i32>,
    device_id: String,
    number: String,
    name: String,
}

table! {
    tbl_devices (id) {
        id -> Nullable<Integer>,
        device_id -> Text,
        number -> Text,
        name -> Text,
    }
}

pub async fn create(db: &Db, post_value: TblDevices) -> JzResult<Option<i32>> {
    let id: Option<i32> = db
        .run(move |conn| {
            diesel::insert_into(tbl_devices::table)
                .values(&post_value)
                .returning(tbl_devices::id)
                .get_result(conn)
        })
        .await?;

    let id = Some(id.expect("returning guarantees id present"));
    Ok(id)
}

pub  async fn delete(db: &Db, id: i32) -> JzResult<Option<()>> {
    let affected = db.run(move |conn| {
        diesel::delete(tbl_devices::table)
            .filter(tbl_devices::id.eq(id))
            .execute(conn)
    }).await?;
    Ok((affected == 1).then(|| ()))
}

pub async fn list(db:  &Db) -> JzResult<Vec<TblDevices>> {
    let devices = db
        .run(move |conn| {
            tbl_devices::table
                .select((
                    tbl_devices::id,
                    tbl_devices::device_id,
                    tbl_devices::number,
                    tbl_devices::name,
                ))
                .order(tbl_devices::id.desc())
                .load::<TblDevices>(conn)
        })
        .await?;

    Ok(devices)
}
