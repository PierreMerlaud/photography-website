import Image from "next/image";

const PhotoCardPublic = ({ url }) => {
  return (
    <div>
      <div>
        <Image src={url} alt="image" width={100} height={100} priority />
      </div>
    </div>
  );
};

export default PhotoCardPublic;
