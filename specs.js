//os information

const os = require("os");

console.log("Free RAM in GB", os.freemem/1024/1024/1024); // Free RAM

console.log("Total RAM in GB", os.totalmem/1024/1024/1024); // Total RAM
console.log("Version", os.version());
console.log("Processor", os.cpus());