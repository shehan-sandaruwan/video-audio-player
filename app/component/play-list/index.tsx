import React from "react";
import { streamItemType } from "../../type/play-list.type";

function PlayList({
  setSelectedItem,
}: {
  setSelectedItem: React.Dispatch<React.SetStateAction<streamItemType | null>>;
}) {
  const streams = [
    {
      id: 1,
      title: "Big Buck Bunny",
      url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      type: "m3u8",
      thumbnail: "https://peach.blender.org/wp-content/uploads/bbb-splash.png",
      description: "Classic open movie by Blender Foundation",
    },
    {
      id: 2,
      title: "Apple Advanced Stream",
      url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8",
      type: "m3u8",
      thumbnail:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=225&fit=crop",
      description: "Apple's advanced HLS test stream",
    },
    {
      id: 3,
      title: "NASA TV Public",
      url: "https://static.france24.com/live/F24_EN_LO_HLS/live_web.m3u8",
      type: "m3u8",
      thumbnail:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=225&fit=crop",
      description: "Live stream from NASA Television",
    },
    {
      id: 4,
      title: "France 24 English Live",
      url: "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8",
      type: "m3u8",
      thumbnail:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=225&fit=crop",
      description: "24/7 international news coverage in English",
    },
    {
      id: 5,
      title: "Arte France Live",
      url: "https://artehls-de.akamaized.net/hls/live/2030994/artelive_fr/master.m3u8",
      type: "m3u8",
      thumbnail:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
      description: "European cultural channel live stream",
    },
    {
      id: 6,
      title: "DW English Live",
      url: "https://dwamdstream102.akamaized.net/hls/live/2015530/dwstream102/index.m3u8",
      type: "m3u8",
      thumbnail:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=225&fit=crop",
      description: "Deutsche Welle English live broadcast",
    },
    {
      id: 7,
      title: "TV5 Monde Live",
      url: "https://static.france24.com/live/F24_EN_LO_HLS/live_web.m3u8",
      type: "m3u8",
      thumbnail:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=225&fit=crop",
      description: "French international television network",
    },
  ];
  return (
    <div className="space-y-2 h-96 overflow-y-auto pr-2 mt-20">
      {streams.map((stream) => (
        <div key={stream.id} onClick={() => setSelectedItem(stream)}>
          <a
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 group focus:bg-gray-100 dark:focus:bg-gray-800/50"
            href="#"
          >
            <div className="relative w-32 aspect-video rounded-md overflow-hidden shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${stream.thumbnail})`,
                }}
              ></div>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                {stream.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {stream.description}
              </p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default PlayList;
