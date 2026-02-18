import Button from "@/components/ButtonComponents.tsx";
import Logo from "@/images/to-do.png";
import { useAuthStore } from "@/stores/auth/auth.store";
import type { RegisterDto } from "@/types/account/account.type";
import { showError } from "@/utils/error/error.utils";
import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import CheckboxComponent from "./components/CheckboxComponent";
import CustomInput from "./components/CustomInput";

function Signup() {
  const { loading, setRegister } = useAuthStore();
  const navigate = useNavigate();

  const [accepted, setAccepted] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

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

    try {
      // Validation
      if (!form.name || !form.email || !form.password) {
        return toast.error("Please fill in all fields");
      }

      if (form.password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }

      if (!accepted) {
        return toast.error("Please accept the terms and conditions");
      }

      // Assume setRegister throws if it fails
      await setRegister(form);

      toast.success("Account created successfully!");

      // Reset form
      setForm({ name: "", email: "", password: "" });
      setConfirmPassword("");
      setAccepted(false);

      navigate("/login");
    } catch (error) {
      showError(error);
    }
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
              <CheckboxComponent
                id="terms"
                label="I accept the terms and conditions"
                checked={accepted}
                onChange={setAccepted}
              />

              <Button
                type="submit"
                id="signup"
                name="signup"
                label={loading ? "Signing Up..." : "Sign Up"}
                className="mt-5 px-30 py-1.5 w-full"
                disabled={loading || !accepted}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
