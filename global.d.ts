declare const __IS_DEV__: boolean;

declare module "*.svg" {
  import * as React from 'react';
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

// swiper
declare module 'swiper/css' {}
declare module 'swiper/css/grid' {}
declare module 'swiper/css/pagination' {}
declare module 'swiper/css/navigation' {}