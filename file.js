const fs = require('fs');
const num = parseInt(process.argv[2]);
const quote = "Live more, Worry less";
const quote2 = "Good Morning";
// for (let index = 1; index <= num; index++) {
//     fs.writeFile(`./backup/text-${index}.html`, quote, (err)=>{
//         console.log("Completed Writing");
//     });
// }
// fs.writeFile("./file.txt", quote, (err)=>{
//     console.log("Completed Writing");
// })

// fs.readFile("./backup/text-1.html", "utf-8", (err, data) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

// fs.appendFile("./file.txt", "\n" + quote2 + "\n", (err)=> {
//     console.log("Completed Updating");
// })