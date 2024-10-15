use diesel::prelude::*;
use rocket::serde::{Deserialize, Serialize,json::Json};
use serde_json;
use crate::data::wamessage::WaMessage;
use crate::db::Db;
use crate::JzResult;


#[derive(Debug, Clone, Deserialize, Serialize, Queryable, Insertable)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = tbl_messages)]
pub struct TblMessages {
    id: Option<i32>,
    device_id: String,
    body: String,
    from: String,
}
impl From<WaMessage> for TblMessages {
    fn from(post_value: WaMessage) -> Self {
        Self::from(&post_value)
    }
}

impl From<&WaMessage> for TblMessages {
    fn from(value: &WaMessage) -> Self {
        TblMessages {
            body: serde_json::to_string(value).expect("Failed to serialize WaMessage"),
            device_id: value.deviceId.clone(), 
            from: value.from.clone(), 
            id: None,
        }
    }
}

impl From<Json<WaMessage>> for TblMessages {
    fn from(post_value: Json<WaMessage>) -> Self {
        TblMessages::from(post_value.into_inner())
    }
}

impl From<&Json<WaMessage>> for TblMessages {
    fn from(post_value: &Json<WaMessage>) -> Self {
        TblMessages::from(post_value.0.clone())
    }
}


table! {
    tbl_messages (id) {
        id -> Nullable<Integer>,
        device_id -> Text,
        body -> Text,
        from-> Text,
    }
}

pub async fn create(db: &Db, post_value: TblMessages) -> JzResult<Option<i32>> {
    let id: Option<i32> = db
        .run(move |conn| {
            diesel::insert_into(tbl_messages::table)
                .values(&post_value)
                .returning(tbl_messages::id)
                .get_result(conn)
        })
        .await?;

    let id = Some(id.expect("returning guarantees id present"));
    Ok(id)
}

pub async fn list(db:  &Db) -> JzResult<Vec<TblMessages>> {
    let messages = db
        .run(move |conn| {
            tbl_messages::table
                .select((
                    tbl_messages::id,
                    tbl_messages::device_id,
                    tbl_messages::body,
                    tbl_messages::from,
                ))
                .order(tbl_messages::id.desc())
                .load::<TblMessages>(conn)
        })
        .await?;

    Ok(messages)
}
