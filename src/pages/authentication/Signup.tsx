import Button from "@/components/ButtonComponents.tsx";
import Logo from "@/images/to-do.png";
import { useAuthStore } from "@/stores/auth/auth.store";
import type { RegisterDto } from "@/types/account/account.type";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalPopup from "../../components/ModalPopup";
import CustomInput from "./components/CustomInput";
import TermsModal from "./components/TermsModal";

function Signup() {
  const { loading, setRegister } = useAuthStore();
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Notice");

  const [form, setForm] = useState<RegisterDto>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.email || !form.password) {
      setModalTitle("Validation Error");
      setModalMessage("Please fill in all fields.");
      setShowPopup(true);
      return;
    }

    if (form.password !== confirmPassword) {
      setModalTitle("Validation Error");
      setModalMessage("Passwords do not match.");
      setShowPopup(true);
      return;
    }

    if (!accepted) {
      setModalTitle("Terms Required");
      setModalMessage(
        "You must accept the terms and conditions before signing up.",
      );
      setShowPopup(true);
      return;
    }

    try {
      await setRegister(form);

      setModalTitle("Success 🎉");
      setModalMessage("Account created successfully!");
      setShowPopup(true);

      // Reset form
      setForm({ name: "", email: "", password: "" });
      setConfirmPassword("");
      setAccepted(false);
    } catch (error) {
      setModalTitle("Registration Failed");
      setModalMessage("Something went wrong. Please try again.");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (!showPopup && modalTitle === "Success 🎉") {
      navigate("/login");
    }
  }, [showPopup, modalTitle, navigate]);

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

        {/* Logo */}
        <div className="flex flex-col gap-2 justify-center items-center pt-30">
          <img src={Logo} alt="Todo App Logo" className="w-50.5" />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-2 justify-center items-center pt-4.75">
          <span className="font-bold text-[25px]">SIGN UP</span>

          <form onSubmit={submitForm} className="flex flex-col gap-3.75">
            <CustomInput
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <CustomInput
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <CustomInput
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />

            <CustomInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

            <div className="my-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />

                <label className="text-sm">
                  I accept the{" "}
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // 🚀 prevents checkbox toggle
                      setShowTerms(true);
                    }}
                    className="text-[#1E319D] font-semibold cursor-pointer hover:underline"
                  >
                    terms and conditions
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                id="signup"
                name="signup"
                label={loading ? "Signing Up..." : "Sign Up"}
                className="mt-5 px-30 py-1.5 w-full"
                disabled={loading}
              />
            </div>

            <div className="text-center mt-2">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#1E319D] font-semibold hover:underline"
                >
                  Login
                </Link>
              </span>
              <TermsModal
                isOpen={showTerms}
                onClose={() => setShowTerms(false)}
              />
            </div>
          </form>
        </div>
      </div>
      <ModalPopup
        isOpen={showPopup}
        title={modalTitle}
        message={modalMessage}
        type={modalTitle === "Success 🎉" ? "success" : "warning"}
        autoCloseTime={3000}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}

export default Signup;
