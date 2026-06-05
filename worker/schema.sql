CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  property_type TEXT,
  bedrooms TEXT,
  postcode TEXT NOT NULL,
  preferred_date TEXT,
  message TEXT,
  source_page TEXT,
  ip_address TEXT
);
