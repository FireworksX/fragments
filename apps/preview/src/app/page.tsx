"use client";
import { createGlobalManager } from "@fragmentsx/render-core";
import { GlobalManager, Instance } from "@fragmentsx/render-react";
import styles from "./page.module.css";
import { useSearchParams, useServerInsertedHTML } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const params = useSearchParams();
  const fragmentId = params.get("node");

  return (
    <>
      <div className={styles.page}>
        {/*<div className="cn-frame_xyz"></div>*/}
        <Instance fragmentId={+fragmentId} />
      </div>
    </>
  );
}
