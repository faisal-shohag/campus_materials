import { writable } from "svelte/store";

export const appStore = writable({
  title: "Campus Materials",
});

export const database = writable({
  assignments: [],
});
