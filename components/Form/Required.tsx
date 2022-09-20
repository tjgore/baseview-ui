const Required = ({ rules }: { rules: string }) => {
  const DOES_NOT_EXIST = -1;

  return rules.indexOf('required') !== DOES_NOT_EXIST ? <span className="text-red-500">*</span> : null;
};

export default Required;
