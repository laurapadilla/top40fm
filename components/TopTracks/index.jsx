import Container from "../Container";
import Image from "next/image";
import { Text } from "../Text";
import { keyframes } from "../../stitches.config";

const changeGB = keyframes({
  "0%": {
    boxShadow: "#ff1312 0 0 20px 5px",
  },
  "25%": {
    boxShadow: "#fbff12 0 0 20px 5px",
  },
  "50%": {
    boxShadow: "#12ff12 0 0 20px 5px",
  },
  "75%": {
    boxShadow: "#1038ff 0 0 20px 5px",
  },
  "95%": {
    boxShadow: "#d010ff 0 0 20px 5px",
  },
  "100%": {
    boxShadow: "#ff1312 0 0 20px 5px",
  },
});

export function TopTracks({ songs }) {
  return (
    <Container
      as="section"
      css={{
        background: "#eee",
        border: "1px solid black",
        boxShadow: "0 0 20px 5px #093CF2",
        display: "grid",
        gridTemplateColumns: "1fr",
        justifyItems: "center",
        maxHeight: "800px",
        overflow: "auto",
        paddingY: "1rem",
        marginX: "1rem",
        marginBottom: "4rem",
        animation: `${changeGB} 8s ease infinite`,
        "@bp1": {
          marginX: "2rem",
          gridTemplateColumns: "repeat(2, minmax(0px, 1fr))",
        },
        "@bp3": {
          gridTemplateColumns: "repeat(3, minmax(0px, 1fr))",
        },
        "@bp5": {
          gridTemplateColumns: "repeat(4, minmax(0px, 1fr))",
        },
        "@bp6": {
          gridTemplateColumns: "repeat(5, minmax(0px, 1fr))",
        },
      }}
    >
      {songs.map((song, index) => {
        return (
          <Container
            as="article"
            key={song.id}
            css={{
              minWidth: "fit-content",
              position: "relative",
              width: "240px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <Container
              as="a"
              href={song.albumURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt={song.album}
                src={song.albumImg.url}
                width={350}
                height={350}
              />
            </Container>
            <Container
              css={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                marginTop: "0.25rem",
              }}
            >
              <Text as="p" style="songTitle" size={1.75}>
                <a
                  href={song.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {song.title}
                </a>
              </Text>
              <Text as="span" style="songArtist">
                <a
                  href={song.artistURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {song.artist}
                </a>
              </Text>{" "}
            </Container>
          </Container>
        );
      })}
    </Container>
  );
}
