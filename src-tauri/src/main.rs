#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[tauri::command]
fn run_tomato(input: &str) -> String {
    tomato::tomato_main(input)
}

mod tomato;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_tomato])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
