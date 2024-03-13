import React from "react";
import OpenStory from "./OpenStory";
import { useQuery } from "@tanstack/react-query";

const StoryDay = () => {
  const fetchStory = async () => {
    const response = await fetch(
      `/api/story/showstory`
    );
    const data = await response.json();
    return data;
  };

  const {
    isPending,
    isError,
    error,
    data: storyday,
  } = useQuery({
    queryKey: ["storydayss"],
    queryFn: fetchStory,
    staleTime: 10000,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  

  return (
    <div>
      <div className="flex justify-start items-center ">
      {storyday?.storys?.map((i) => (
            <OpenStory storys={i}/>
        ))}
      </div>
    </div>
  );
};

export default StoryDay;
