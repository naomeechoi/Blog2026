import { useNavigate } from "react-router-dom";
import "../styles/main.css";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="button-grid">
        <button onClick={() => window.open("이력서_링크")}>
          Resume
        </button>

        <button onClick={() => navigate("/portfolio")}>
          Portfolio
        </button>

        <button onClick={() => window.open("https://github.com/yourname")}>
          GitHub
        </button>

        <button onClick={() => navigate("/tech")}>
          Tech Blog
        </button>

        <button onClick={() => navigate("/blog")}>
          Personal Blog
        </button>
      </div>
    </div>
  );
}
