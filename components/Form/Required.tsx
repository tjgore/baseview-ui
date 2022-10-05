const Required = ({ rules, className }: { rules: string; className?: string }) => {
  const DOES_NOT_EXIST = -1;

  return rules.indexOf('required') !== DOES_NOT_EXIST ? <span className={`text-red-500 ${className}`}>*</span> : null;
};

export default Required;
