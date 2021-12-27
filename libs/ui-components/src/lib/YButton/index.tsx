type YButtonProps = {
  content: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function YButton(props: YButtonProps) {
  return (
    <button
      {...props}
      className="h-10 px-6 font-semibold rounded-md bg-black text-white"
    >
      {props.content}
    </button>
  );
}

export default YButton;
