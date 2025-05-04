import { SOCIALS, SocialPlatform } from "../../services/videoResizer";

type Props = { previews: Record<SocialPlatform, string> };
const DownloadLinks = ({ previews }: Props) => (
  <div>
    <h2>Download for each social:</h2>
    <ul>
      {Object.entries(SOCIALS).map(([platform, { label }]) =>
        previews[platform as SocialPlatform] ? (
          <li key={platform}>
            <a href={previews[platform as SocialPlatform]} download={`${platform}.mp4`}>
              Download {label}
            </a>
          </li>
        ) : null
      )}
    </ul>
  </div>
);
export default DownloadLinks;
