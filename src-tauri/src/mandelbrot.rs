use num::Complex;

//<責務>
//与えられた虚数cがマンデルブロ集合に含まれそうか判定する
//cの実部と虚部を直交座標上のx, yとして扱ったとき、
//原点を中心とする半径2の円から一度でもzが出てしまうと、zは必ず無限大に発散する
fn escape_time(c: Complex<f64>, limit: usize) -> Option<usize> {
    let mut z = Complex { re: 0.0, im: 0.0 };
    for i in 0..limit {
        if z.norm_sqr() > 4.0 {
            return Some(i);
        }
        z = z * z + c;
    }
    None
}

//<責務>
//セパレータで区切られた文字列をタプルとして返す。
//タプルの各要素はFromStrトレイトを実装している型である必要がある。
fn parse_pair<T: FromStr>(s: &str, separator: char) -> Option<(T, T)> {
    //findがSome(usize)を返す時、usizeは文字列中で最初に合致した文字の位置を示す
    match s.find(separator) {
        None => None,
        Some(index) => match (T::from_str(&s[..index]), T::from_str(&s[index + 1..])) {
            (Ok(l), Ok(r)) => Some((l, r)),
            _ => None,
        },
    }
}

//<責務>
//このプログラム実行時、描画範囲を決めるため
//引数として2つの虚数が「実部,虚部」の形の文字列で渡される。それをパースする。
//セパレータで区切られた文字列をf64のタプルに変換した後、Complex<f64>にして返す
fn parse_complex(s: &str) -> Option<Complex<f64>> {
    match parse_pair(s, ',') {
        Some((re, im)) => Some(Complex { re, im }),
        None => None,
    }
}

//<責務>
//出力すべき画像の1ピクセルを複素数平面上の座標としてマッピングする
fn pixel_to_point(
    bounds: (usize, usize), //出力画像の(横, 縦)ピクセル数
    pixel: (usize, usize),  //複素数平面にマップすべきピクセル座標
    upper_left: Complex<f64>,
    lower_right: Complex<f64>,
) -> Complex<f64> {
    let (width, height) = (
        lower_right.re - upper_left.re,
        upper_left.im - lower_right.im,
    );
    Complex {
        re: upper_left.re + pixel.0 as f64 * width / bounds.0 as f64,
        im: upper_left.im - pixel.1 as f64 * height / bounds.1 as f64,
    }
}

//<責務>
//u8の配列を加工して、ピクセルごとのカラースケールを示す配列を作る
fn render(
    pixels: &mut [u8],
    bounds: (usize, usize),
    upper_left: Complex<f64>,
    lower_right: Complex<f64>,
) {
    assert!(pixels.len() == bounds.0 * bounds.1);

    for row in 0..bounds.1 {
        for column in 0..bounds.0 {
            let point = pixel_to_point(bounds, (column, row), upper_left, lower_right);
            pixels[row * bounds.0 + column] = match escape_time(point, 255) {
                None => 0,
                Some(count) => 255 - count as u8,
            };
        }
    }
}

fn single_thread_render(
    bounds: (usize, usize),
    upper_left: Complex<f64>,
    lower_right: Complex<f64>,
) -> Vec<u8> {
    let mut pixels = vec![0; bounds.0 * bounds.1];
    render(&mut pixels, bounds, upper_left, lower_right);

    pixels
}

use rayon::prelude::*;

fn multi_threads_render(
    bounds: (usize, usize),
    upper_left: Complex<f64>,
    lower_right: Complex<f64>,
) -> Vec<u8> {
    let mut pixels = vec![0; bounds.0 * bounds.1];
    {
        let bands: Vec<(usize, &mut [u8])> = pixels.chunks_mut(bounds.0).enumerate().collect();

        bands.into_par_iter().for_each(|(i, band)| {
            let top = i;
            let band_bounds = (bounds.0, 1);
            let band_upper_left = pixel_to_point(bounds, (0, top), upper_left, lower_right);
            let band_lower_right =
                pixel_to_point(bounds, (bounds.0, top + 1), upper_left, lower_right);
            render(band, band_bounds, band_upper_left, band_lower_right);
        });
    }

    pixels
}

use image::codecs::png::PngEncoder;
use image::ColorType;
use std::fs::File;
use std::{io::Error, str::FromStr};
//use image::error::ImageResult;

fn write_image(filename: &str, pixels: &[u8], bounds: (usize, usize)) -> Result<(), Error> {
    //Todo: エラーハンドリングよくわからん
    let output = File::create(filename)?;
    let encoder = PngEncoder::new(output);
    image::ImageEncoder::write_image(
        encoder,
        &pixels,
        bounds.0 as u32,
        bounds.1 as u32,
        ColorType::L8,
    )
    .expect("imageエンコーダーエラー");
    Ok(())
}

use std::time::Instant;
pub fn mandelbrot_main(args: Vec<String>) -> String {
    //let args: Vec<String> = std::env::args().collect();
    //let args: Vec<String> = vec![
    //    "mandelbrot.png".to_string(),
    //    "1000x750".to_string(),
    //    "-1.20,0.35".to_string(),
    //    "-1,0.20".to_string(),
    //    "multi".to_string(),
    //];

    if args.len() != 5 {
        eprintln!("incorrect number of args",);
        std::process::exit(1);
    }
    let start_time = Instant::now();

    let bounds = parse_pair(&args[1], 'x').expect("error parsing image dimensions");
    let upper_left = parse_complex(&args[2]).expect("error parsing upper left corner point");
    let lower_right = parse_complex(&args[3]).expect("error parsing lower right corner point");
    let mut pixels = vec![0; bounds.0 * bounds.1];
    if &*args[4] == "single" {
        pixels = single_thread_render(bounds, upper_left, lower_right);
    } else if &*args[4] == "multi" {
        pixels = multi_threads_render(bounds, upper_left, lower_right);
    } else {
        eprintln!(
            "Example: {} mandel.png 1000x750 -1.20,0.35 -1,0.20 multi",
            args[0]
        );
        std::process::exit(1);
    }
    write_image(&args[0], &pixels, bounds).expect("error writing PNG file");

    let end_time = start_time.elapsed();
    let proc_time_message = format!(
        "{}.{:03}秒経過しました。",
        end_time.as_secs(),
        end_time.subsec_nanos() / 1_000_000
    );
    proc_time_message
}
