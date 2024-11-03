#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod ichimatsu;
mod mandelbrot;
mod tomato;

#[tauri::command]
fn run_tomato(input: &str) -> String {
    tomato::tomato_main(input)
}

#[tauri::command]
fn run_ichimatsu() {
    ichimatsu::ichimatsu_main()
}

#[tauri::command]
fn run_mandelbrot(args: Vec<String>) -> String {
    mandelbrot::mandelbrot_main(args)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            run_tomato,
            run_ichimatsu,
            run_mandelbrot
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
