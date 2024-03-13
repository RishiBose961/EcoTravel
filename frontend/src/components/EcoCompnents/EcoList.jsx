import React from "react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { Chip, User } from "@nextui-org/react";
import { Car, Hotel } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import Scrollbars from "react-custom-scrollbars-2";
import EcoFilter from "./EcoFilter";
import StoryDay from "./StoryDay";

const EcoList = ({ informUser }) => {
  const { ref, inView } = useInView();
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";
  const city = searchParams.get("city") || "All";
  const fetchPost = async ({ pageParam }) => {
    const res = await fetch(
      `/api/travel/gethoteltravel?country=${category}&city=${city}&page=${pageParam}`
    );
    return res.json();
  };

  const {
    error,
    isError,
    data: currentPostes,
    fetchNextPage,
    status,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["currentPostess", category, city],
    queryFn: fetchPost,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allpages) => {
      const nextPage = lastPage?.currentPages?.length
        ? allpages?.length + 1
        : undefined;
      return nextPage;
    },
    placeholderData: keepPreviousData,
    staleTime: 20000,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <p>Loading</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        <div>
          <EcoFilter
            setSearchParams={setSearchParams}
            searchParams={searchParams}
          />
        </div>
        <div>
          <Scrollbars style={{ width: "auto", height: 890 }}>
            <StoryDay />
            <div ref={ref} className=" space-y-4 mb-5">
              {currentPostes?.pages.map((item) =>
                item?.currentPages?.map((post) => (
                  <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Swiper
                      pagination={{
                        dynamicBullets: true,
                      }}
                      modules={[Pagination]}
                      className="mySwiper"
                    >
                      {(post.imagehotel || post.imagecar)?.map((item) => (
                        <>
                          <SwiperSlide>
                            <figure
                              class="relative transition-all duration-300 
                        cursor-pointer"
                            >
                              <img src={item} className="w-full h-80" />{" "}
                              <figcaption class="absolute px-4 text-lg text-white top-2 right-1">
                                <Chip
                                  color="warning"
                                  className="bg-black text-white p-2"
                                  startContent={
                                    post.carname ? <Car /> : <Hotel />
                                  }
                                >
                                  {post.carname ? "Transport" : "Hospitality"}
                                </Chip>
                              </figcaption>
                            </figure>
                          </SwiperSlide>
                        </>
                      ))}
                    </Swiper>
                    <div class="p-5">
                      <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {" "}
                          {post.hotelname || post.carname}
                        </h5>
                      </a>
                      <div className="mt-2">
                        <div className="flex justify-between items-center mx-1">
                          <div className="flex justify-start items-center space-x-2">
                            <p>{post.country}</p>
                            <span className="bg-white h-1 w-1 rounded-full"></span>
                            <p>{post.city}</p>
                          </div>
                          <p>
                            {informUser.currency_name} {post?.cheapestPrice}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mx-1 mt-5">
                        <User
                          name={post.postedBy.name}
                          description={post.postedBy.username}
                          avatarProps={{
                            src: post.postedBy.avatar,
                          }}
                        />
                        <Link
                          className="btn btn-primary"
                          to={`/hotels/${post._id}`}
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Scrollbars>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default EcoList;
