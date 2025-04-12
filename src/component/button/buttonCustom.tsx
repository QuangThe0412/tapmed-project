import "./buttonCustom.css";

interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

const ButtonCustom: React.FC<ButtonProps> = ({ onClick, label, className }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default ButtonCustom;
