const key = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const secret = process.env.NEXT_PUBLIC_PINATA_API_SECRET;

import axios from "axios";
export const pinJSONToIPFS = async (json) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, json, {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return response.data.IpfsHash;
    })
    .catch(function (error) {
      console.log(error);
      return "error";
    });
};

export const pinFileToIPFS = async (file, pinataMetaData) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  let data = new FormData();

  data.append("file", file);
  data.append("pinataMetadata", JSON.stringify(pinataMetaData));

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return response.data.IpfsHash;
    })
    .catch(function (error) {
      console.log(error);
    });
};

function makeFileObjects(data) {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

  return new File([blob], "nftdata.json");
}

export const pinJSONToIPFS2 = async (json, pinataMetaData) => {
  const file = makeFileObjects(json);
  return pinFileToIPFS(file, pinataMetaData);
};
