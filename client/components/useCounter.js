import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";

const useCounter = ({
  initialCount = 0,
  initialRef = null,
  initialActive = false,
}) => {
  const { currentUser, actionOnTweet } = useContext(TwitterContext);

  const [isActive, setIsActive] = useState(initialActive);
  const [count, setCount] = useState(initialCount);
  const counterRef = useRef(initialRef);

  useEffect(() => {
    setCount(initialCount);
    setIsActive(initialActive);
  }, [initialCount, initialActive]);

  useEffect(() => {
    if (counterRef === null || !counterRef.current) return;

    if (count === 0) {
      counterRef.current.animate(
        [
          { opacity: 1, transform: "translateY(0px)" },
          { opacity: 0, transform: "translateY(-10px)" },
        ],
        {
          duration: 100,
          easing: "ease-in-out",
        }
      );
      return;
    }

    counterRef.current.animate(
      [
        { opacity: 0, transform: "translateY(-10px)" },
        { opacity: 1, transform: "translateY(0px)" },
      ],
      {
        duration: 100,
        easing: "ease-in-out",
      }
    );
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const handleCount = (set, unset, tweetId,referenced_tweet_child = null) => {
    if (isActive) {
      decrement();
      actionOnTweet(unset, tweetId, currentUser._id,referenced_tweet_child);
      setIsActive(false);
    } else {
      increment();
      actionOnTweet(set, tweetId, currentUser._id);
      setIsActive(true);
    }
  };

  return {
    count,
    increment,
    decrement,
    isActive,
    setIsActive,
    counterRef,
    handleCount,
  };
};

export default useCounter;
