import Head from "next/head";
import Image from "next/image";
import {
  Button,
  Footer,
  Header,
  Loading,
  Text,
  TopTracks,
} from "../components";
import { useState, useEffect } from "react";
import useUser from "../hooks/use-user";
import Container from "../components/Container";
import { useMedia } from "react-use";
import { config } from "../stitches.config";

export default function Home() {
  const [user, fetchUser] = useState(null);

  const { data, isLoading } = useUser();
  const songs = user ? user.tracks : data?.tracks;

  return (
    <>
      <Head>
        <title>TOP40.FM</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        as="main"
        css={{
          padding: "1rem",
          position: "relative",
        }}
      >
        <Header />
        <Container
          css={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            marginBottom: "3rem",
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          <Text style="subhead">
            This is what{" "}
            {user ? (
              <Text
                as="span"
                css={{ textDecoration: "underline", fontWeight: "600" }}
              >
                YOU
              </Text>
            ) : (
              "I"
            )}{" "}
            have been listening to the last 6 months
          </Text>
        </Container>
        <Container
          css={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            marginBottom: "4rem",
          }}
        >
          <Button fetchUser={fetchUser} />
        </Container>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <TopTracks songs={songs} />
          </>
        )}
        <Footer />
      </Container>
    </>
  );
}
