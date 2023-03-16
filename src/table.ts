import {newarr} from "ds-js/arrutil.mjs";

const getRowspan = function(elem: HTMLElement): number{
    const r = elem.getAttribute("rowspan");
    if(!r)return 1;
    return parseInt(r);
};
const getColspan = function(elem: HTMLElement): number{
    const r = elem.getAttribute("colspan");
    if(!r)return 1;
    return parseInt(r);
};



export const normalizeTable = function(table: HTMLElement): HTMLElement[][]{
    const rows = [...table.querySelector("tbody").children].map(e=>[...e.children]);
    //first count up the row spans in the top row
    let width = 0;
    for(let elem of rows[0]){
        width += getColspan(elem);
    }
    const spans = newarr(width);
    const spanCache = newarr(width);
    const res = [];
    for(let row of rows){
        const resr = [];
        let readidx = 0;
        for(let i = 0; i < width; i++){
            if(spans[i] <= 0){
                const item = row[readidx++];
                const rowspan = getRowspan(item);
                const colspan = getColspan(item);
                for(let j = 0; j < colspan; j++){
                    spans[i+j] = rowspan;
                    spanCache[i+j] = item;
                }
            }
            resr.push(spanCache[i]);
            spans[i]--;
        }
        res.push(resr);
    }
    return res;
};
