import VideoShowcaseScreen from '../components/VideoShowcaseScreen';

const droneVideo2K = require('../../assets/video/cignus-drone-shot-home-page-v1-1080p.mp4');

export default function Droneview() {
  return <VideoShowcaseScreen title="Drone View" videoSource={droneVideo2K} />;
}
