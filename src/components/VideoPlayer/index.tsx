import { Player } from 'video-react';

const VideoPlayer = ({ video, poster }: { video: string; poster: string }) => {
  return <Player playsInline poster={poster} src={video} />;
};

export default VideoPlayer;
