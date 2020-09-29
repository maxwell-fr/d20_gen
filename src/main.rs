#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
use rocket::http::RawStr;
use rocket_contrib::serve::StaticFiles;
use rocket::response::content;

use d20_gen::{get_passphrase, get_coded_passphrase};

#[get("/<phr_sel>")]
fn generate(phr_sel: &RawStr) -> content::Json<&'static str>{
    match phr_sel.parse::<i32>() {
        Ok(val) => {get_passphrase(val)}
        Err(_) => {get_coded_passphrase(phr_sel)}
    }
}

#[get("/")]
fn hello() -> &'static str {
    "Hello, world!"
}

fn main() {
    let d20rocket = rocket::ignite()
        .mount("/generate", routes![generate])
        .mount("/", StaticFiles::from("client/build"));

        d20rocket.launch();
}