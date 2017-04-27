export default function csvConverter(arr){
  let csvFile = '';
  let newArr = JSON.parse(JSON.stringify(arr));
  let maxTagsLength = maximumRowLength(newArr,"tags");
  let rows = csvFormater(newArr,maxTagsLength);
  for(let i=0;i<maxTagsLength-1;i++){
    rows[0].push(`tag ${i+1}`);
  }
  rows.map((row)=>{
    csvFile += row.reduce((prev, curr) => `${prev},${curr}`) + "\n";
  });

  return csvFile;
}

function csvFormater(arr){
  let csvRows = arr.map((row,index)=>{
    if(index === 0){
      return Object.keys(row).map((key)=>{
        return key;
      });
    }
    return Object.keys(row).map((key)=>{
      return row[key];
    });
  });
  return csvRows;
}

function maximumRowLength(rows,key){
  let arr = rows.map((row)=>{
    return row[key];
  }).map((subArr)=>{
    return subArr.length;
  }).sort((a, b)=>{return b-a});
  return arr[0];
}
