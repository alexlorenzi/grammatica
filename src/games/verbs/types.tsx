export type VerbQuestion = {
  target: { verb: string; translation: string };
  form: {
    display: "Io" | "Tu" | "Lei" | "Noi" | "Voi" | "Loro";
    description: [1 | 2 | 3, "S" | "P"];
  };
};
