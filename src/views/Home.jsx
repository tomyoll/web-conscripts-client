import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import poster from "../assets/images/Вояк.jpg";

export default function HomePage() {
  return (
    <Container sx={{ mt: 20 }}>
      <Stack spacing={60} justifyContent="center" alignItems="center">
        <Typography variant="h2">Сайт-облік воєннозобов&apos;язаних</Typography>
        <img style={{ marginTop: 20 }} src={poster} alt="Poster" />
      </Stack>
    </Container>
  );
}
