import { Player } from 'video-react';
import '~video-react/dist/video-react.css';

const VideoPlayer = ({ video, poster }: { video: string; poster: string }) => {
  return <Player playsInline poster={poster} src={video} />;
};

export default VideoPlayer;
