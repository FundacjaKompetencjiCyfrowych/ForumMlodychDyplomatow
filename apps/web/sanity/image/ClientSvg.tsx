"use client";
import React, { type ComponentProps } from "react";
import SVG from "react-inlinesvg";

type Props = ComponentProps<typeof SVG>;
const convertToCurrentColor = (code: string) =>
  code
    .replace(/fill="(?!transparent|none).*?"/g, 'fill="currentColor"')
    .replace(/stroke="(?!transparent|none).*?"/g, 'stroke="currentColor"')
    .replace(/height=".*?"/g, "")
    .replace(/width=".*?"/g, "");

const compose =
  (...fns: ((code: string) => string)[]) =>
  (code: string) =>
    fns.reduce((acc, fn) => fn(acc), code);

const ClientSvg = ({ preProcessor, ...props }: Props) => {
  return (
    <SVG
      {...props}
      preProcessor={
        preProcessor ? compose(preProcessor, convertToCurrentColor) : convertToCurrentColor
      }
    />
  );
};

export default ClientSvg;
