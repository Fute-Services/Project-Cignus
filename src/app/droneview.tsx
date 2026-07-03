import VideoShowcaseScreen from '../components/VideoShowcaseScreen';

const droneVideo2K = require('../../assets/vedio/cignus_drone_shot_home_page_v1 (1080p).mp4');

export default function Droneview() {
  return <VideoShowcaseScreen title="Drone View" videoSource={droneVideo2K} />;
}
