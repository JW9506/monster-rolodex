declare module "*.css" {
  const src: string;
  export default src;
}

declare module "*.less" {
  const src: string;
  export default src;
}

declare module "*.scss" {
  const src: string;
  export default src;
}

declare module "Config" {
  export const PUBLIC_URL: string;
  export const TITLE: string;
}
