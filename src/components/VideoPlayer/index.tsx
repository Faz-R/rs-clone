import ReactPlayer from 'react-player/youtube';

const VideoPlayer = ({ video }: { video: string }) => {
  return (
    <ReactPlayer
      url={video}
      controls
      width="100%"
      height="100%"
      style={{ position: 'absolute', width: '100%' }}
    />
  );
};

export default VideoPlayer;
