import { changePasswordApi } from "@/api/account/password-reset.api";
import Button from "@/components/ButtonComponents";
import Logo from "@/images/to-do.png";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalPopup from "../../components/ModalPopup";
import InputFields from "./components/InputFields";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const resetToken = location.state?.resetToken;
  const handleChangePassword = async () => {
    try {
      setError("");

      if (!resetToken) {
        setError("Invalid password reset session. Please try again.");
        return;
      }

      if (!newPassword || !confirmPassword) {
        setError("Please fill in all fields");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);

      const response = await changePasswordApi({
        resetToken,
        newPassword,
      });

      setSuccessMessage(response.message || "Password changed successfully.");

      setShowModal(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div className="bg-[#1E319D] w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-white absolute inset-3.5 rounded-4xl">
        <Link to="/send-code">
          <Button
            label="Back"
            name="back"
            className="mt-10.5 w-25.75 h-7.5 mx-10 text-[14px]"
          />
        </Link>

        <div className="flex flex-col gap-2 justify-center items-center pt-30">
          <img src={Logo} alt="Logo" className="w-50.5" />
        </div>

        <div className="flex flex-col gap-7 mt-40 justify-center items-center">
          <span className="font-bold text-2xl">CHANGE PASSWORD</span>

          <InputFields
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            setValue={setNewPassword}
          />

          <InputFields
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />

          {error && <span className="text-red-500 text-sm">{error}</span>}

          <Button
            type="button"
            id="confirm"
            name="confirm"
            label={loading ? "Saving..." : "Save Password"}
            className="px-20 py-1.5"
            onClick={handleChangePassword}
            disabled={loading}
          />
        </div>
      </div>

      {showModal && (
        <ModalPopup
          isOpen={showModal}
          title="Success"
          type="success"
          message={successMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ChangePassword;
