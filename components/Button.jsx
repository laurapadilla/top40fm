import { useEffect, useState } from "react";

export default function Button({ fetchUser }) {
  const [button, showButton] = useState(true);
  const client_id = `ad2c7654ff92405c949de032535da426`;
  const redirect_uri = `https%3A%2F%2Fspotify-crushes.vercel.app%2F`;
  const scopes = `user-top-read`;
  const AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes}&show_dialog=true`;
  const login = () => {
    let popup = window.open(
      AUTHORIZATION_URL,
      "Login with Spotify",
      "width=800,height=600"
    );
    window.spotifyCallback = (payload) => {
      console.log("there");
      popup.close();
      fetch("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { items } = data;
          showButton(false);
          const tracks = items.map((track) => ({
            artist: track.artists.map((_artist) => _artist.name).join(", "),
            songUrl: track.external_urls.spotify,
            title: track.name,
          }));
          console.log(items);
          console.log("hi");
          fetchUser(tracks);
        });
    };
  };

  useEffect(() => {
    const token = window.location.hash.substr(1).split("&")[0].split("=")[1];
    if (token) {
      window.opener.spotifyCallback(token);
    }
  }, []);

  return (
    <>
      {button && <button onClick={login}>Login to see your top songs!</button>}
    </>
  );
}
