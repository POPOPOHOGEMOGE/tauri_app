use image;
use rand::Rng;

pub fn ichimatsu_main() {
    let mut rng = rand::thread_rng();
    let r = rng.gen_range(10..=240);
    let g = rng.gen_range(10..=240);
    let b = rng.gen_range(10..=240);
    let white = image::Rgb::<u8>([255, 255, 255]);
    let random_color = image::Rgb::<u8>([r, g, b]);
    let w = 64;
    let draw = |x, y| {
        let (xi, yi) = (x / w, y / w);
        match (xi % 2, yi % 2) {
            (0, 0) => white,
            (1, 0) => random_color,
            (0, 1) => random_color,
            (1, 1) => white,
            (_, _) => panic!("error"),
        }
    };

    let img = image::ImageBuffer::from_fn(512, 512, draw);
    img.save("ichimatsu.png").unwrap();
}
