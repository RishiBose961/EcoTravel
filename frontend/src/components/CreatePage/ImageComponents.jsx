import React, { useState } from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

const ImageComponents = ({ thumnail, setThumnail }) => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setThumnail(selectedFiles);


    if (imagePreviews.length + selectedFiles.length <= 2) {
      for (const image of selectedFiles) {
        const reader = new FileReader();
        reader.onload = () => {
          imagePreviews.push({
            src: reader.result,
            name: image.name,
          });
          setImagePreviews([...imagePreviews]);
        };
        reader.readAsDataURL(image);
      }
    } else {
      alert("You can only select up to 4 images.");
    }
  };

  const removeImage = (imageIdentifier) => {
    const filteredImages = imagePreviews.filter(
      (image) => image.src !== imageIdentifier
    );
    setImagePreviews(filteredImages);
  };

  return (
    <div className="mt-4">
      <label className="text-base font-medium text-white"> Upload Image </label>{" "}
      <input
        type="file"
        accept="image/png"
        className="file-input file-input-bordered file-input-primary w-full"
        multiple
        onChange={handleImageChange}
      />
      <div className="grid  grid-cols-3 gap-2 mt-4">
        {imagePreviews.length > 0 ? (
          <>
            {imagePreviews.map((imagePreview, index) => (
              <div>
                <Card isFooterBlurred radius="lg" className="border-none">
                  <Image
                    alt={imagePreview.name}
                    className="object-cover"
                    height={200}
                    src={imagePreview.src}
                    width={200}
                  />
                  <CardFooter
                    className="justify-between before:bg-white/10
                   border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl
                    rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
                  >
                    <p className="text-tiny text-white/80">{index + 1}</p>
                    <Button
                      className="text-tiny text-white bg-black/20"
                      variant="flat"
                      color="default"
                      radius="lg"
                      size="sm"
                      onClick={() => removeImage(imagePreview.src)}
                    >
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </>
        ) : (
          <p className=" text-red-500 animate-bounce">*Image Not Found</p>
        )}
      </div>
    </div>
  );
};

export default ImageComponents;
