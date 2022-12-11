

export function parseTwitterDate(tdate) {
  var K = (function () {
    var a = navigator.userAgent;
    return {
      ie: a.match(/MSIE\s([^;]*)/),
    };
  })();

  var system_date = new Date(Date.parse(tdate));
  var user_date = new Date();
  if (K.ie) {
    system_date = Date.parse(tdate.replace(/( \+)/, " UTC$1"));
  }
  var diff = Math.floor((user_date - system_date) / 1000);
  if (diff <= 20) {
    return "just now";
  }
  if (diff <= 90) {
    return "a min ago";
  }
  if (diff <= 3540) {
    return Math.round(diff / 60) + "m";
  }
  if (diff <= 5400) {
    return "1h";
  }
  if (diff <= 86400) {
    return Math.round(diff / 3600) + "h";
  }
  if (diff <= 129600) {
    return "1d";
  }
  if (diff < 604800) {
    return Math.round(diff / 86400) + "d";
  }
  if (diff <= 777600) {
    return "1w";
  }
  //   if (diff <= 2592000) {
  //     return Math.round(diff / 604800) + "w";
  //   }
  //   if (diff <= 31104000) {
  //     return Math.round(diff / 2592000) + "m";
  //   }
  if (diff > 31104000) {
    return Math.round(diff / 31104000) + "y";
  }

  return (
    "" + system_date.toLocaleString("en", { month: "short", day: "numeric" })
  );
}


