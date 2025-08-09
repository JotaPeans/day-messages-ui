import {
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Heart, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useTransition } from "react";
import moment from "moment";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import LogoIcon from "@/components/icons/LogoIcon";

import { fetchMessages } from "../-queries/fetchMessages";
import { api, cn } from "@/lib/utils";

const Messages = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const queryClient = useQueryClient();

  const [isLikeLoading, startLike] = useTransition();

  const { data, isPending, fetchNextPage } = useInfiniteQuery({
    queryKey: ["messages"],
    queryFn: async ({ pageParam }) => await fetchMessages(pageParam),
    refetchOnWindowFocus: true,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  function handleLike(messageId: string) {
    startLike(async () => {
      const { data } = await api.patch(`/messages/${messageId}`, {
        liked: true,
      });

      if (data) {
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      }
    });
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full my-auto"
    >
      <CarouselContent className="mt-1 h-96">
        {isPending
          ? Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="pt-1 h-96">
                <Skeleton className="w-full h-full" />
              </CarouselItem>
            ))
          : data?.pages.map((messages, i) => (
              <React.Fragment key={i}>
                {messages.map((data) => (
                  <CarouselItem key={data.id} className="pt-1 h-96">
                    <div className="p-1 h-full">
                      <Card className="h-full p-0 gap-0">
                        <CardHeader className="p-4 flex flex-row items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback>
                                {data?.userSent.name.substring(0, 2)}
                              </AvatarFallback>
                              <AvatarImage
                                className="object-cover"
                                src={data?.userSent.image || ""}
                                alt={data?.userSent.name}
                              />
                            </Avatar>

                            <div>
                              <p className="font-semibold">
                                {data?.userSent.name}
                              </p>
                              <span className="lowercase text-sm text-zinc-500 font-normal">
                                @
                                {data.userSent.name
                                  .replace(" ", "")
                                  .substring(0, 10)}
                              </span>
                            </div>
                          </div>
                          <LogoIcon width={48} height={48} />
                        </CardHeader>
                        <CardContent className="flex-1 px-4 flex flex-col gap-4">
                          <p className="text-base">{data.message}</p>

                          <span className="text-sm text-zinc-400">
                            {moment(data.createdAt).format(
                              "hh:mm A - DD MMM YYYY"
                            )}
                          </span>
                        </CardContent>
                        <CardFooter className="p-4 flex items-center gap-2 justify-end border-t !pt-4">
                          {isLikeLoading && (
                            <Loader2
                              className="animate-spin mr-3 text-zinc-500"
                              size={18}
                              strokeWidth={2.5}
                            />
                          )}
                          <button
                            onClick={() => handleLike(data.id)}
                            disabled={isLikeLoading || Boolean(data.liked)}
                          >
                            <Heart
                              size={18}
                              className={cn(
                                "",
                                data.liked
                                  ? "text-red-600 fill-red-600 shadow-2xs"
                                  : ""
                              )}
                            />
                          </button>
                          <span className="font-bold">
                            {data.liked ? 1 : 0}
                          </span>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </React.Fragment>
            ))}

        <CarouselItem className="pt-1 h-96" ref={ref}>
          <Skeleton className="w-full h-full" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Messages;
