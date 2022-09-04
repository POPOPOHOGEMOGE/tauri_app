mod parser;
mod runner;
mod node;

pub fn tomato_main(input: &str)  -> String {
    runner::run(input)
}

# [cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_run() {
        //assert_eq!(runner::run("print 32"), 32);
        //assert_eq!(runner::run("print \"abc\""), 0);
    }
}
