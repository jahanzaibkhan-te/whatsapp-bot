CREATE TABLE IF NOT EXISTS tbl_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT NOT NULL,
    body TEXT NOT NULL,
    "from" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
