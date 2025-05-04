type Props = { src: string };
const VideoPreview = ({ src }: Props) => <video src={src} controls style={{ maxWidth: "100%", margin: "1rem 0" }} />;
export default VideoPreview;
