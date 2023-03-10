const baseUrls = {
  localhost: {
    BASE_URL: "http://localhost:8000",
    API_URL: "http://localhost:8000",
  },
  // arba: {
  //   BASE_URL: "https://sonictempserver.arba-dev.uk",
  //   API_URL: "https://sonictempserver.arba-dev.uk",
  // },
  staging: {
    BASE_URL: "https://amazingserver.arba-dev.uk",
    API_URL: "https://amazingserver.arba-dev.uk",
  },
  production: {
    BASE_URL: "https://apiserver.sonicdata.com",
    API_URL: "https://apiserver.sonicdata.com",
  },
};

export default baseUrls[
  process.env.REACT_APP_ENV === "localhost"
    ? "localhost"
    : process.env.REACT_APP_ENV === "production"
      ? "production"
      : "staging"
];
