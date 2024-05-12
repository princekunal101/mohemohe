import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { FigureMdx } from "./mdx-figures";
import { ChapIntro } from "./mdx-intro";
import * as Icons from "lucide-react";


const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};


const components = {
  Image,
  Icons,
  Callout,
  FigureMdx,
  ChapIntro,
  
  
}


interface MdxProps {
  code: string
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />
}