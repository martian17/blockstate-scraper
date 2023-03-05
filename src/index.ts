import fetch from "node-fetch";
import {JSDOM} from "jsdom";
import {promises as fs} from "fs";
import {ArgumentParser} from "argparse";


const argparser = new ArgumentParser;
//argparser.add_argument("--fetch",{nargs:0});
argparser.add_argument("--fetch",{action:"store_true"});
//argparser.add_argument("--src");

const args:Map<string, any>
    = argparser.parse_args()
    |> Object.entries(%)
    |> new Map(%);

console.log(args);

let text: string;
if(args.has("fetch")){
    console.log("fetch option specified, ");
    text = await fetch("https://minecraft.fandom.com/wiki/Block_states").then(res=>res.text());
    await fs.writeFile("./block_state.html",text);
}else{
    console.log("reading file from local store");
    text = await fs.readFile("./block_state.html");
}

console.log(text.slice(0,100));

const dom = new JSDOM(text);
const document = dom.window.document;

const allowedNames = {
    "Jack o'Lantern":true
}

let top;
let headings = {};
let unqheadings = [];
for(let child of document.querySelector(".mw-parser-output").children){
    if(child.nodeName === "H3" || child.nodeName === "H4"){
        top = [child];
        let hnames = [...child.querySelector("span.mw-headline").children]
            .filter(e=>e.nodeName === "A").map(e=>e.textContent);
        if(hnames.length === 0)hnames = [child.textContent.trim()];
        // if(hnames.length !== 1){
        //     console.log("warning: multiple");
        //     console.log(hnames);
        //     console.log(child.textContent);
        // }
        for(let hname of hnames){
            if(!hname.match(/^[a-zA-Z ]+$/) && !(hname in allowedNames)){
                throw new Error(`irregular name ${hname} found in the block name while reading HTML`);
            }
            headings[hname] = top;
        }
        unqheadings.push(top);
    }else if(top){
        top.push(child);
    }
}

for(let section of uniqueHeadings){
    if(section.length === 0)continue;
    for(let child of section){
        if(child){
        }
    }
}








