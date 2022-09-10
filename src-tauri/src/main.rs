#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod tomato;
mod ichimatsu;

#[tauri::command]
fn run_tomato(input: &str) -> String {
    tomato::tomato_main(input)
}

#[tauri::command]
fn run_ichimatsu() {
    ichimatsu::ichimatsu_main()
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_tomato, run_ichimatsu])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
