import { getTopTracks } from "../../lib/spotify";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_, res) => {
  const response = await getTopTracks();
  const { items } = await response.json();

  const tracks = items.map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  console.log(tracks);

  return res.status(200).json({ tracks });
};
