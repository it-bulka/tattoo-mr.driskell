declare const __IS_DEV__: boolean;

declare module "*.svg" {
  import React from 'react';
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}