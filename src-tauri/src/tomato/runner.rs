use super::node::Node;
use super::parser::tomato;
use std::collections::HashMap;

struct Context {
    vars: HashMap<String, i64>,
    output: String,
}

fn run_node(ctx: &mut Context, node: Node) -> i64 {
    match node {
        Node::PrintStr(v) => {
            ctx.output += &format!("{}\n", v);
            0
        }
        Node::Print(node) => {
            let v = run_node(ctx, *node);
            ctx.output += &format!("{}\n", v);
            v
        }
        _ => 0,
    }
}

fn run_nodes(ctx: &mut Context, nodes: &Vec<Node>) -> i64 {
    let mut result = 0;
    nodes
        .iter()
        .for_each(|node| result = run_node(ctx, node.clone()));
    result
}

pub fn run(src: &str) -> String {
    let nodes = tomato::parse(src).unwrap();
    let mut ctx = Context {
        vars: HashMap::new(),
        output: String::new(),
    };
    let r = run_nodes(&mut ctx, &nodes);
    if ctx.output == "" {
        return format!("{}", r);
    } else {
        return ctx.output.clone();
    }
}
