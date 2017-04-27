// CSV-Entry -> Expense
export default function({
    entry
}) {
    let arr = Object.keys(entry).map(key => entry[key]);

    let dates = arr.map(val => {
        if(isDate(val)){
            return Date.parse(val);
        }
        return;
    }).filter(val => val);

    let amounts = arr.map(val => {
        if (!isDate(val) && isNumber(val)) {
            return toNumber(val);
        }
        return;
    }).filter(amount => amount);

    let tags = arr.map(val => {
        if(!isDate(val) && !isNumber(val)){
            return val;
        }
        return;
    }).filter(val => val);

    let expense = {
       date:dates[0],
       amount:Math.abs(amounts[amounts.length - 1]),
       tags:tags
    }

    return expense;
}

function isNumber(val){
    return !isNaN(parseFloat(val));
}

function toNumber(val){
    return parseFloat(val);
}

function isDate(str){
    return !!str.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
}
