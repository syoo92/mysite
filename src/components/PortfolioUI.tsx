import { createElement, type HTMLAttributes } from "react";

// Small typography primitives shared by the portfolio's editorial pages.
export function Heading({
  level = 2,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 }) {
  return createElement(`h${level}`, props);
}

export function Copy(props: HTMLAttributes<HTMLParagraphElement>) {
  return createElement("p", props);
}

export function Eyebrow({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return createElement("span", { ...props, className: `eyebrow ${className}`.trim() });
}
