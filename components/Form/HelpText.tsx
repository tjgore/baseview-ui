type HelpTextProps = {
  errorMessages?: string;
  helpText?: string;
};

const HelpText = ({ errorMessages, helpText }: HelpTextProps) => {
  return (
    <>
      {errorMessages && <p className="pt-1 text-xs text-red-500">{errorMessages}</p>}
      {helpText && <p className="pt-1 text-xs text-gray-500">{helpText}</p>}
    </>
  );
};

export default HelpText;
