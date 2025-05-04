import { useState } from "react";
import { resizeVideoForAllSocials, SocialPlatform, SOCIALS } from "../../services/videoResizer";
import VideoPreview from "../VideoPreview/VideoPreview";
import DownloadLinks from "../DownloadLinks/DownloadLinks";

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previews, setPreviews] = useState<Record<SocialPlatform, string>>({});
  const [processing, setProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setProcessing(true);
    const results = await resizeVideoForAllSocials(file);
    setPreviews(results);
    setProcessing(false);
  };

  return (
    <div>
      <h1>Upload your iPhone video</h1>
      <input type='file' accept='video/*' onChange={handleFileChange} disabled={processing} />
      {processing && <p>Processing video...</p>}
      {videoFile && <VideoPreview src={URL.createObjectURL(videoFile)} />}
      <DownloadLinks previews={previews} />
    </div>
  );
};

export default VideoUpload;
