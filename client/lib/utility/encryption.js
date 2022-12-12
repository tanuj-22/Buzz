const CryptoJS = require("crypto-js");
// const algorithm = "aes-256-ctr";
// const crypto = require("crypto");
// const FileSaver = require("file-saver");
import imageCompression from "browser-image-compression";
let key = `${process.env.NEXT_PUBLIC_ENCRYPTION_KEY}`;
// key = crypto.createHash("sha256").update(key).digest("base64").substr(0, 32);

function toString(words) {
  return CryptoJS.enc.Utf8.stringify(words);
}
function uintToString(uintArray) {
  var decodedStr = new TextDecoder("utf-8").decode(uintArray);
  return decodedStr;
}
function wordToByteArray(word, length) {
  var ba = [],
    i,
    xFF = 0xff;
  if (length > 0) ba.push(word >>> 24);
  if (length > 1) ba.push((word >>> 16) & xFF);
  if (length > 2) ba.push((word >>> 8) & xFF);
  if (length > 3) ba.push(word & xFF);

  return ba;
}

function wordArrayToByteArray(wordArray, length) {
  if (
    wordArray.hasOwnProperty("sigBytes") &&
    wordArray.hasOwnProperty("words")
  ) {
    length = wordArray.sigBytes;
    wordArray = wordArray.words;
  }

  var result = [],
    bytes,
    i = 0;
  while (length > 0) {
    bytes = wordToByteArray(wordArray[i], Math.min(4, length));
    length -= bytes.length;
    result.push(bytes);
    i++;
  }
  // flatten the array
  return result.flat(1);
}

// const createBlob = async (data) => {
//   return new Promise((resolve, reject) => {
//     var blob = new Blob([data], { type: "image/jpg" });
//     FileSaver.saveAs(blob, "filename");
//     // let imageurl = URL.createObjectURL(blob);
//     resolve(blob);
//   });
// };

const blobToDataURL = async (blob) => {
  var a = new FileReader();
  return new Promise((resolve, reject) => {
    a.onload = (e) => resolve(e.target.result);
    a.readAsDataURL(blob);
  });
};

function callEncrypt(argument) {
  const wordArray = CryptoJS.lib.WordArray.create(argument);
  const str = CryptoJS.enc.Hex.stringify(wordArray);
  const ct = CryptoJS.AES.encrypt(str, key);
  const ctstr = ct.toString();
  return ctstr;
}

const compressImage = async (file) => {
  return new Promise(async (resolve, reject) => {
    const imageFile = file;
    const options = {
      maxSizeMB: 0.01,
      maxWidthOrHeight: 400,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const file2 = new File([compressedFile], compressedFile.name);
      resolve(file2);
    } catch (error) {
      console.log(error);
    }
  });
};

export const uploadAndEncryptImage = async (imagefile) => {
  // console.log("imagefile", imagefile);
  const file = await compressImage(imagefile);
  // console.log("file", file);
  let fr = new FileReader();
  return new Promise((resolve, reject) => {
    fr.onerror = () => {
      fr.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    fr.onload = (e) => {
      let textread = e.target.result;
      let enctext = callEncrypt(textread);
      let testBuffer = new Buffer(enctext);
      resolve(testBuffer);
    };
    fr.readAsArrayBuffer(file);
  });
};

export const decryptImage = async (data) => {
  return new Promise(async (resolve, reject) => {
    var enctext = Buffer.from(data);

    try {
      var str = uintToString(enctext);
      const decrypted = CryptoJS.AES.decrypt(str, key);
      str = decrypted.toString(CryptoJS.enc.Utf8);
      const wordArray = CryptoJS.enc.Hex.parse(str);
      var BaText = wordArrayToByteArray(wordArray, wordArray.length);

      var arrayBufferView = new Uint8Array(BaText);

      var blob = new Blob([arrayBufferView], { type: "image/jpg" });
      const dataURL = await blobToDataURL(blob);
      resolve(dataURL.toString());
    } catch (err) {
      reject(new Error("Error decrypting image"));
    }
  });
};
