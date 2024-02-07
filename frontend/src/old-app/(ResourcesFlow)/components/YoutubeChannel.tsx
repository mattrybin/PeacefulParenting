export const YoutubeChannel = ({
  name,
  location,
  about,
  subscriber,
  channelImg,
}: any) => (
  <div className="grid gap-4">
    <div className="text-white text-xl font-bold">{name}</div>
    <div className="text-base text-white flex gap-2">
      <img className="w-32 h-32 rounded-lg" src={channelImg}></img>

      <div className=" h-max mt-20 text-base-300">
        <div>
          <i className="ph-bold ph-map-pin"></i>
          {location}
        </div>
        <div>
          <i className="ph-bold ph-users"></i> {subscriber}
        </div>
      </div>
    </div>
    <div className="p-3 text-white">{about}</div>
  </div>
);
