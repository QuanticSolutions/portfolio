import Home from "./home";
import { connection } from 'next/server'

export default async function page() {
  await connection();
  return (
    <Home />
  );
}
