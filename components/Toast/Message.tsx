const Message = ({ title, body }: { title: string; body: string }) => {
  return (
    <div className="-mt-1">
      <p className="text-base font-bold text-gray-800">{title}</p>
      <p className="leading-5 text-gray-700">{body}</p>
    </div>
  );
};

export default Message;
