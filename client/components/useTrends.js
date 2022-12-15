import { useEffect, useState } from "react";
import axios from "axios";

export const useTrends = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    let subscribed = true;

    if (subscribed) {
      try {
        axios
          .get("https://twitterdata.vercel.app/gettrends", {})
          .then((res) => {
            const data = res.data.message;
            let result = data.map((item) => {
              //   let jsonBody = JSON.parse(item);
              let jsonBody = item;
              let count = 0;
              if (
                jsonBody &&
                jsonBody.metaDescription &&
                jsonBody.metaDescription.includes("K")
              ) {
                let index = jsonBody.metaDescription.indexOf("K");
                let number = parseInt(
                  jsonBody.metaDescription.substring(0, index)
                );

                count = number * 1000;
              }
              return { ...jsonBody, count: count };
            });

            // result.sort((a, b) => b.count - a.count);
            setTrends(result);
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }

      //clean up
      return () => {
        subscribed = false;
      };
    }
  }, []);

  return trends;
};
