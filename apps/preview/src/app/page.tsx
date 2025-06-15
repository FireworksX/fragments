"use client";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import RenderTarget from "@/app/RenderTarget";

const Target = dynamic(() => import("./RenderTarget"), { ssr: true });

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        <Target />
        {/*<div className="cn-frame_xyz"></div>*/}
        {/*<Instance fragmentId={+fragmentId} />*/}
      </div>
    </>
  );
}
