"use client";
import { createGlobalManager } from "@fragmentsx/render-core";
import { GlobalManager, Instance } from "@fragmentsx/render-react";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const globalManager = createGlobalManager({
    apiToken:
      "2-534e0ddd2e09c836292ad94436463d45-2ba7423356013cae4bf0c06ab4e22f75ab743caa7367e1256f2ec599587f8c71",
    isSelfHosted: false,
  });

  const params = useSearchParams();
  const fragmentId = params.get("node");

  return (
    <GlobalManager value={globalManager}>
      <div className={styles.page}>
        <Instance fragmentId={+fragmentId} />
      </div>
    </GlobalManager>
  );
}
