// import fetch from "node-fetch";
// import express from "express";
// const app = express();

// function getSafe(fn, defaultVal) {
//   try {
//     return fn();
//   } catch (e) {
//     return defaultVal;
//   }
// }
// app.get("/", (req, res) => {
//   let options = {
//     hostname: "gettrend.vercel.app",
//     path: "/gettrends",
//     method: "GET",
//     port: 443,
//   };
//   let str = "";

//   fetch("https://api.twitter.com/1.1/guest/activate.json", {
//     credentials: "include",
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0) Gecko/20100101 Firefox/107.0",
//       Accept:
//         "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
//       "Accept-Language": "en-US,en;q=0.5",
//       authorization:
//         "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
//     },
//     method: "POST",
//   }).then((response) => {
//     response.json().then((d) => {
//       fetch(
//         "https://twitter.com/i/api/2/guide.json?include_profile_interstitial_type=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&include_ext_is_blue_verified=1&include_ext_verified_type=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_ext_limited_action_results=false&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_ext_collab_control=true&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&include_ext_trusted_friends_metadata=true&simple_quoted_tweet=true&count=20&include_page_configuration=true&ext=mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2Cenrichments%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl%2Ccollab_control%2Cvibe",
//         {
//           credentials: "include",
//           headers: {
//             authorization:
//               "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
//             "x-guest-token": d.guest_token,
//           },
//           referrer: "https://twitter.com/explore/tabs/trending",
//           method: "GET",
//           mode: "cors",
//         }
//       ).then((x) =>
//         x.json().then((r) => {
//           const obj = r;
//           let datanowArr = getSafe(
//             () =>
//               obj.timeline.instructions[1].addEntries.entries[1].content
//                 .timelineModule.items,
//             "nothing"
//           );
//           let arrnewo = datanowArr.map((itema) => itema.item);
//           let arrnewoc = arrnewo.map((itema) => {
//             if (itema.content) return itema.content;
//           });
//           let arrnew = arrnewoc.map((item) => {
//             let obj1 = {};
//             let dataobj = getSafe(() => item.trend.name);
//             let datameta = getSafe(() => item.trend.trendMetadata);
//             let domain = getSafe(() => datameta.domainContext);
//             let meta = getSafe(() => datameta.metaDescription);
//             obj1 = {
//               name: dataobj,
//               domain: domain,
//               meta: meta,
//             };

//             return obj1;
//           });

//           console.log(arrnew);
//         })
//       );
//     });
//   });
//   res.send("hello");

//   setTimeout(() => {
//     console.log("ending...");
//     res.end();
//   }, 200000);
// });

// app.listen(1338, () => {
//   console.log("Server started");
// });

// await fetch(
//   "https://twitter.com/i/api/2/guide.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&include_ext_is_blue_verified=1&include_ext_verified_type=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_ext_limited_action_results=false&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_ext_collab_control=true&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&include_ext_trusted_friends_metadata=true&send_error_codes=true&simple_quoted_tweet=true&count=20&include_page_configuration=true&initial_tab_id=trending&entity_tokens=false&ext=mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2Cenrichments%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl%2Ccollab_control%2Cvibe",
//   {
//     credentials: "include",
//     headers: {
//       "User-Agent":
//         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0) Gecko/20100101 Firefox/107.0",
//       Accept: "*/*",
//       "Accept-Language": "en-US,en;q=0.5",
//       "X-Twitter-UTCOffset": "+0530",
//       authorization:
//         "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
//       "x-guest-token": "1603510319346618368",
//       "x-twitter-client-language": "en",
//       "x-twitter-active-user": "yes",
//       "x-csrf-token": "ba68f9ac0b8a6822b0b64c067aff902a",
//       "Sec-Fetch-Dest": "empty",
//       "Sec-Fetch-Mode": "cors",
//       "Sec-Fetch-Site": "same-origin",
//     },
//     referrer: "https://twitter.com/explore/tabs/trending",
//     method: "GET",
//     mode: "cors",
//   }
// );
