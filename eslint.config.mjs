import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextCoreWebVitals,
  // legacy/ holds the previous (Next 12) site, kept for reference only.
  { ignores: [".next/**", "node_modules/**", "legacy/**"] },
];

export default config;
