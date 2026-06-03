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

const ClientSvg = (props: Props) => {
  return <SVG {...props} preProcessor={convertToCurrentColor} />;
};

export default ClientSvg;
