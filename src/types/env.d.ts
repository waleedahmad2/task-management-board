declare module '#env' {
  type EnvValue = string | number | boolean | null | undefined;

  interface EnvShape {
    VITE_BACKEND_BASE_URL?: string;
    [key: string]: EnvValue;
  }

  const value: EnvShape;
  export default value;
}
