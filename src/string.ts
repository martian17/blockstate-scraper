export type MatchFunction = (str:string)=>boolean;
export type TextMatch = MatchFunction|string|string[]|RegExp|boolean;

export const createMatchFunc = function(match:TextMatch):MatchFunction{
    if(typeof match === "function")return match;
    if(typeof match === "boolean")return (str:string)=>match;
    if(match instanceof RegExp)
        return (str:string)=>str.match(match);
    if(typeof match === "string")match = [match];
    let matchObj = Object.fromEntries(match.map(v=>[v,true]));
    return (str:string)=>(str in matchObj);
};

