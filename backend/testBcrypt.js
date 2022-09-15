import bcrypt from "bcrypt";
import colors from "colors";
import aes256 from "aes256";
// let hash = await bcrypt.hash("abhishek", 10);
// console.log(hash);
// let password = "$2b$10$FgyIpH1HWl4EEnjB//U77Ow1uDrXQWFWi5Zo03ie./xnhcWR3OX8q";
// let compare = await bcrypt.compare('saini7284', password);
// if (!compare) {
//     console.log('Invalid Password'.bgRed.bold)
// } else {
//     console.log('Verified'.bgGreen.bold)
// }
let key = "Abhishek Kumar";
let plaintext = "Ashwinder Singh Rana";
const buffer = Buffer.from(plaintext);

const encryptedPlainText = aes256.encrypt(key, plaintext);
console.log(encryptedPlainText);
