import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  console.info(useSelector((state: any) => state.user));
  return <h1>Welcome Home</h1>;
}
