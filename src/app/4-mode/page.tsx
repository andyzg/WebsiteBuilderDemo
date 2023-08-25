"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import Website from "./components/website";

export default function Home() {
  const [mode, setMode] = useState("edit");
  const [websiteData, setWebsiteData] = useState([{
    text: "Hello World"
  }]);

  return (
    <main>
      <Website setMode={setMode} mode={mode} websiteData={websiteData} setWebsiteData={setWebsiteData} />
    </main>
  )
}
