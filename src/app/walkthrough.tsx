import VideoShowcaseScreen from '../components/VideoShowcaseScreen';

const walkthroughVideo = require('../../assets/vedio/POWAI_walkthrough.mp4');

export default function Walkthrough() {
  return (
    <VideoShowcaseScreen
      title="Walkthrough"
      videoSource={walkthroughVideo}
      initialMuted={false}
      showLeftNavbar
    />
  );
}
