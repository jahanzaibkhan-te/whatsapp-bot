use rocket::serde::{Serialize, Deserialize};
use rocket::response::Debug;
use diesel::prelude::*;

#[database("diesel")]
struct Db(diesel::SqliteConnection);
type Result<T, E = Debug<diesel::result::Error>> = std::result::Result<T, E>;


#[derive(Debug, Clone, Deserialize, Serialize, Queryable, Insertable)]
#[serde(crate = "rocket::serde")]
#[diesel(table_name = tbl_messages)]
struct TblMessages {
    id: Option<i32>,
    device_id: String,
    body: String,
    from: String,
}

table! {
    tbl_messages (id) {
        id -> Nullable<Integer>,
        device_id -> Text,
        body -> Text,
        from-> Text,
    }
}


pub async fn create(db: Db, post: TblMessages) -> Result<i32> {
    let post_value = post.clone();

    let id = db.run(move |conn| {
        diesel::insert_into(tbl_messages::table)
            .values(&post_value)
            .returning(tbl_messages::id) // Tell Diesel to return the ID after insertion
            .get_result(conn)
    })
    .await?;
    id
}

#[get("/")]
async fn list(db: Db) -> Result<Vec<TblMessages>, diesel::result::Error> {
    let ids = db.run(move |conn| {
        tbl_messages::table
            .select((tbl_messages::id, tbl_messages::device_id, tbl_messages::body, tbl_messages::from)) // Use a tuple to select columns
            .load::<TblMessages>(conn)
    }).await?;

    Ok(ids) // Wrap the result in Json
}

