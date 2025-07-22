import { isBrowser } from "@fragmentsx/utils";
import { boot } from "@/boot";

(async function () {
  if (isBrowser) {
    window.fgx = boot();
  }
})();
