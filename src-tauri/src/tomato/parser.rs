use super::node::Node;
use peg;

peg::parser!(pub grammar tomato() for str {
    pub rule parse() -> Vec<Node>
        = v:sentences()
    rule sentences() -> Vec<Node>
        = sentence() ** end_of_line()
    rule sentence() -> Node
        = print()/_ {Node::Nop}
    //print文定義
    rule print() -> Node
        = "print" _ "\"" v:$([^ '"']*) "\""
        {Node::PrintStr(v.to_string())}
        // / "print" _ v:calc()
        // {Node::Print(Box::new(v))}
    rule end_of_line() = [';' | '\n']+ _
    rule lf() = _ ['\n']* _
    rule _ = [' ' | '\t']*
});
