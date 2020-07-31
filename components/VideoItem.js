const VideoItem = ({video}) => {
  return (
    <div className="video-item">
      <h3>{video.thumbnailURL}</h3>
      <h3>{video.title}</h3>
      <h3>{video.videoURL}</h3>

      
      
      <style jsx>{`

        .video-item {
          display: flex;
          justify-content: space-between;
          background-color: #cc22c9;
          border-radius: 5px;
          margin-top: 1rem;
          padding: 1rem;
        }
      
      
      `}
      </style>
    </div>
  );
}

export default VideoItem;