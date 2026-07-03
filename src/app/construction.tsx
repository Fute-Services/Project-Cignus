import VideoShowcaseScreen from '../components/VideoShowcaseScreen';

const constructionVideo = require('../../assets/home/construction-progress.mp4');

export default function Construction() {
  return (
    <VideoShowcaseScreen
      title="Construction Progress"
      videoSource={constructionVideo}
      showLeftNavbar
    />
  );
}
