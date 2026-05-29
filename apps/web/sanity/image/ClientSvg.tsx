"use client";
import React, { type ComponentProps } from "react";
import SVG from "react-inlinesvg";

type Props = ComponentProps<typeof SVG>;
const convertToCurrentColor = (code: string) =>
  code
    .replace(/fill=".*?"/g, 'fill="currentColor"')
    .replace(/stroke=".*?"/g, 'stroke="currentColor"');

const ClientSvg = (props: Props) => {
  return <SVG {...props} preProcessor={convertToCurrentColor} />;
};

export default ClientSvg;
