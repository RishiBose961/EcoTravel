import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Maps from "../../components/Maps/Maps";

const IndividualTravels = () => {
  const { id } = useParams("");
  const { userInfo } = useSelector((state) => state.auth);

  const {
    isPending,
    error,
    isError,
    data: singletravelData,
  } = useQuery({
    queryKey: ["singletravelDatas", id],
    queryFn: async () => {
      return await fetch(`/api/travel/getsingletravel/${id}`).then((res) =>
        res.json()
      );
    },
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }


  //   const {
  //     isPending: isLoading,
  //     error: Errors,
  //     isError: isErrors,
  //     data: followbut,
  //   } = useQuery({
  //     queryKey: ["followbuts"],
  //     queryFn: async () => {
  //       return await fetch(`/api/v1/f/getfollowing/${userInfo._id}`).then((res) =>
  //         res.json()
  //       );
  //     },
  //     staleTime: 30000,
  //   });

  //   if (isError) {
  //     return <span>Error: {error.message}</span>;
  //   }
  return (
    <div>
      <section class="text-gray-400 bg-gray-900 body-font">
        <div class="container px-5 py-10 mx-auto flex flex-col">
          <div class="lg:w-4/6 mx-auto">
            <p className=" text-xl font-bold text-white pb-4">
              {singletravelData?.carname}
            </p>
            <div class="rounded-lg h-64 overflow-hidden">
              <Maps
                address={singletravelData?.address}
                city={singletravelData?.city}
                country={singletravelData?.country}
              />
            </div>
            <div class="flex flex-wrap -mx-4 -mb-10 text-center mt-4">
              {singletravelData?.imagecar.map((item) => (
                <div class="sm:w-1/2 mb-10 px-4">
                  <div class="rounded-lg h-64 overflow-hidden">
                    <img
                      alt="content"
                      class="object-cover object-center h-full w-full"
                      src={item}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div class="flex flex-col sm:flex-row mt-10">
              <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800 text-gray-600">
                  <img src={singletravelData?.postedBy.avatar} alt="loading"/>
                </div>
                <div class="flex flex-col items-center text-center justify-center">
                  <h2 class="font-medium title-font mt-4 text-white text-lg">
                  {singletravelData?.postedBy.name}
                  </h2>
                  <p>{singletravelData?.postedBy.username}</p>
                  <div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p class="text-base text-gray-400"></p>
                </div>
              </div>
              <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p class="leading-relaxed text-lg mb-4">
                  {singletravelData?.country}
                </p>
              <p class="leading-relaxed text-lg mb-4">
                  {singletravelData?.city}
                </p>
                <p class="leading-relaxed text-lg mb-4">
                  {singletravelData?.caraddress}
                </p>
                <a class="text-indigo-400 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndividualTravels;
