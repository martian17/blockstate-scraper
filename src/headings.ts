import {createMatchFunc,TextMatch} from "./string";

type Elements = HTMLElement[]|HTMLCollection;


interface groupHeadingsOptions {
    name:TextMatch,
    content:TextMatch,
    custom:((elem:HTMLElement)=>boolean)|false
};

export const groupHeadings = function(arr:HTMLCollection,{name=true,content=true,custom=false}:groupHeadingsOptions):HTMLElement[][]{
    let matchFunc;
    if(custom){
        matchFunc = custom;
    }else{
        const matchNodeName = createMatchFunc(name);
        const matchContent = createMatchFunc(content);
        matchFunc = function(elem:HTMLElement):boolean{
            return matchNodeName(elem.nodeName) && matchContent(elem.textContent.trim());
        };
    }
    const groups = [];
    let top;
    for(let item of arr){
        if(matchFunc(item)){
            top = [item];
            groups.push(top);
        }else if(top){
            top.push(item);
        }
    }
    return groups;
};


export const isContentHeading = function(elem:HTMLElement,content:string):boolean{
    if(elem.nodeName !== "P"){
        return false;
    }
    let a;
    if(!(a = elem.querySelector("a"))){
        return false;
    }
    if(a.textContent.trim() === content){
        return true;
    }
    return false;
};

export const isJavaHeading = function(elem:HTMLElement):boolean{
    return isContentHeading(elem,"Java Edition");
};

export const isBedrockHeading = function(elem:HTMLElement):boolean{
    return isContentHeading(elem,"Bedrock Edition");
};




