import React, { useTransition } from "react";
import Image from "next/image";

const PhotoCard = ({ url, onClick }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <div>
      <div>
        <Image src={url} alt="image" width={100} height={100} priority />
      </div>

      <button
        type="button"
        onClick={() => startTransition(onClick)}
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Delete"}
      </button>
    </div>
  );
};

export default PhotoCard;

/*

useTransition() is a hook provided by React that is used to manage transitions between different states in 
your application. It's commonly used to handle asynchronous operations and indicate loading or pending states.

const [isPending, startTransition] is a destructuring assignment. It's used to extract values from the result 
of calling useTransition(). isPending is a variable that will hold the value indicating whether a transition is 
pending or in progress.

The button's text content is conditionally determined based on the isPending state from the useTransition hook.

startTransition(onClick): This line calls the startTransition function, which is likely a part of the useTransition hook. 
The startTransition function takes another function (in this case, onClick) as an argument.

*/
