import type { ConfigureOptions } from "./types.js";
import { configureAuth } from "./auth.js";
import { configureStorage } from "./storage.js";

export function configure(options: ConfigureOptions): void {
  if (options.keys) {
    configureAuth(options.keys);
  }
  if (options.storage) {
    configureStorage(options.storage);
  }
}
