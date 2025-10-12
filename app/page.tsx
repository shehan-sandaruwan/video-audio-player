"use client";

import { useState } from "react";
import MediaPlayer from "./component/media-player";
import PlayList from "./component/play-list";
import { streamItemType } from "./type/play-list.type";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<streamItemType | null>(null);

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-4 lg:px-8 py-8">
      <MediaPlayer
        title={selectedItem?.title || ""}
        url={selectedItem?.url || null}
        description={selectedItem?.description || ""}
      />
      <PlayList setSelectedItem={setSelectedItem} />
    </main>
  );
}
