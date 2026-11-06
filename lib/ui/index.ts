import { backLinks, beforeAfter, copyButtons, images, magnetic } from "./controls";
import { cursor } from "./cursor";
import { folders } from "./folders";
import { layers } from "./layers";
import { nav } from "./nav";

export default function initUI() {
  const offs = [images(), nav(), magnetic(), copyButtons(), backLinks(), beforeAfter(), layers(), folders()];
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) offs.push(cursor());
  return () => offs.forEach((off) => off());
}
