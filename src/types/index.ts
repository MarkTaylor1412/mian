import { ElementType } from "react";

export type INavLink = {
  route: string;
  label: string;
  imageURL: string;
}

export interface ScrambleTextProps {
  text: string;
  as?: ElementType;
  speed?: number;
  increment?: number;
  className?: string;
}
