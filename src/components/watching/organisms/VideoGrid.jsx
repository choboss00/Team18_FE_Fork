import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VideoCard from "../molecules/VideoCard";
import Error from "../../account/atoms/Error";
import Grid from "../atoms/Grid";
import VideoSkeleton from "../atoms/Skeleton";
import Toast from "../../common/Toast";
import Button from "@mui/material/Button";
import Title from "../../account/atoms/Title";

const VideoGrid = React.forwardRef(
  ({ videos, hasNextPage, isFetchingNextPage, error }, ref) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    console.log(videos?.length == 0);

    // useEffect(() => {
    //   setOpen(videos[0]?.success === false);
    // }, [videos]);

    // const handleOk = () => {
    //   navigate("/", { replace: true });
    // };

    // const handleClose = (event, reason) => {
    //   if (reason !== "clickaway") {
    //     setOpen(false);
    //     navigate("/");
    //   }
    // };
    if (!videos || videos?.length == 0) {
      return (
        <Title className="text-base text-paragraph mb-20">
          No Category video information!{" "}
        </Title>
      );
    }
    if (error) {
      return <Error errorMessage={error.errorMessage} />;
    }

    // if (videos[0]?.success === false) {
    //   return (
    //     <Toast
    //       open={open}
    //       severity="info"
    //       handleOk={handleOk}
    //       handleClose={handleClose}
    //       message="No video information for that category. Please check and try again."
    //     >
    //       <Button color="inherit" size="small" onClick={handleOk}>
    //         OKAY
    //       </Button>
    //     </Toast>
    //   );
    // }

    return (
      <>
        <Grid>
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </Grid>
        <div ref={ref} style={{ height: "100px" }}>
          {isFetchingNextPage || hasNextPage ? (
            <VideoSkeleton />
          ) : (
            !isFetchingNextPage && !hasNextPage
          )}
        </div>
      </>
    );
  }
);

export default VideoGrid;
