use rocket::response::content;

pub fn get_coded_passphrase(seed: &str) -> content::Json<&'static str> {
        content::Json("{\"success\":  true, \"passphrase\": \"coded not yet implemented\"}")
}

pub fn get_passphrase(count: i32) -> content::Json<&'static str> {
        content::Json("{\"success\":  true, \"passphrase\": \"not yet implemented\"}")
}