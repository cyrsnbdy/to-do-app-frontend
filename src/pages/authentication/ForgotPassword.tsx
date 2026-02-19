import { forgotPasswordApi } from "@/api/account/password-reset.api";
import Button from "@/components/ButtonComponents.tsx";
import Logo from "@/images/to-do.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalPopup from "../../components/ModalPopup";
import InputFields from "./components/InputFields";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await forgotPasswordApi({ email });

      // Show popup instead of navigating
      setSuccessMessage(
        response.message || "The reset code has been sent to your email.",
      );

      setShowModal(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/send-code", { state: { email } });
  };

  return (
    <div className="bg-[#1E319D] w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-white absolute inset-3.5 rounded-4xl">
        <Link to="/login">
          <Button
            label="Back"
            name="back"
            className="mt-10.5 w-25.75 h-7.5 mx-10 text-[14px]"
          />
        </Link>
        {/* Logo, subtext */}
        <div className="flex flex-col gap-2 justify-center items-center pt-30">
          <span>
            <img src={Logo} alt="" className="w-50.5" />
          </span>
        </div>

        <div className="flex flex-col gap-7 mt-40 justify-center items-center">
          <span className="font-bold text-2xl">FORGOT PASSWORD</span>

          <InputFields
            type="email"
            name="email"
            value={email}
            setValue={setEmail}
            placeholder="Enter verification email"
          />

          {error && <span className="text-red-500 text-sm">{error}</span>}

          <Button
            type="button"
            id="confirm"
            name="confirm"
            label={loading ? "Sending..." : "Send Code"}
            className="px-20 py-1.5"
            onClick={handleForgotPassword}
            disabled={loading}
          />
        </div>
      </div>

      {/* ✅ Modal Popup */}
      <ModalPopup
        isOpen={showModal}
        title="Email Sent"
        type="success"
        message={successMessage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default ForgotPassword;
