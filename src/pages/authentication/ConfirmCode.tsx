import { verifyResetCodeApi } from "@/api/account/password-reset.api";
import Button from "@/components/ButtonComponents.tsx";
import Logo from "@/images/to-do.png";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalPopup from "../../components/ModalPopup";
import OtpInput from "./components/NumberCode";

function ConfirmCode() {
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resetToken, setResetToken] = useState(""); // ✅ added

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerifyCode = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await verifyResetCodeApi({
        email,
        code: otpCode,
      });

      setSuccessMessage(response.message || "Code verified successfully.");

      setResetToken(response.resetToken); // ✅ store token

      setShowModal(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);

    navigate("/change-password", {
      state: { resetToken }, // ✅ now works
    });
  };

  return (
    <div className="bg-[#1E319D] w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-white absolute inset-3.5 rounded-4xl">
        <Link to="/forgot-password">
          <Button
            label="Back"
            name="back"
            className="mt-10.5 w-25.75 h-7.5 mx-10 text-[14px]"
          />
        </Link>

        <div className="flex flex-col gap-2 justify-center items-center pt-30">
          <img src={Logo} alt="" className="w-50.5" />
        </div>

        <div className="flex flex-col gap-7 mt-40 justify-center items-center">
          <span className="font-bold text-2xl">CONFIRM CODE</span>

          <OtpInput length={6} onComplete={(code) => setOtpCode(code)} />

          {error && <span className="text-red-500 text-sm">{error}</span>}

          <Button
            type="button"
            id="confirm"
            name="confirm"
            label={loading ? "Verifying..." : "Confirm Code"}
            className="px-20 py-1.5"
            onClick={handleVerifyCode}
            disabled={loading || otpCode.length !== 6}
          />
        </div>
      </div>

      <ModalPopup
        isOpen={showModal}
        title="Code Verified"
        type="success"
        message={successMessage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default ConfirmCode;
