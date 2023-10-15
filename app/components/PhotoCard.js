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
