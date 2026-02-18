import Button from "@/components/ButtonComponents.tsx";
import TextComponents from "@/components/TextComponents";
import Logo from "@/images/to-do.png";
import { useAuthStore } from "@/stores/auth/auth.store";
import type { LoginDto } from "@/types/account/account.type";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckboxComponent from "./components/CheckboxComponent";
import InputFields from "./components/InputFields";

function Login() {
  // Lazy initialization from localStorage
  const savedEmail = localStorage.getItem("rememberedEmail") || "";
  const [form, setForm] = useState<Partial<LoginDto>>({
    email: savedEmail,
    password: "",
  });
  const [accepted, setAccepted] = useState(!!savedEmail);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const { loading, setLogin } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (accepted && form.email) {
      localStorage.setItem("rememberedEmail", form.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    const success = await setLogin(form as { email: string; password: string });
    const base64Token = btoa(`${form.email}:${form.password}`);
    console.log("ACCESS TOKEN:", localStorage.getItem("accessToken"));
    localStorage.setItem("basicToken", base64Token);
    if (success) {
      navigate("/loading");
    }
  };

  const handleRememberMe = (checked: boolean) => {
    setAccepted(checked);
    if (!checked) localStorage.removeItem("rememberedEmail");
  };

  return (
    <div className="bg-[#1E319D] w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-white absolute inset-3.5 rounded-4xl">
        {/* Logo */}
        <div className="flex flex-col gap-2 justify-center items-center pt-40">
          <span>
            <img src={Logo} alt="Logo" className="w-50.5" />
          </span>
          <span className="text-[12px] px-20.5 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </span>
        </div>

        {/* Login Form */}
        <div className="flex flex-col justify-center items-center gap-2 pt-29">
          <span className="font-bold text-[25px] mx-auto">LOGIN</span>

          <div className="flex flex-col gap-1">
            <form className="flex flex-col gap-2" onSubmit={submitForm}>
              <div className="flex flex-col gap-3.75 justify-center items-center">
                <div className="flex flex-col">
                  <InputFields
                    type="email"
                    name="email"
                    value={form.email || ""}
                    placeholder="Email"
                    setValue={(value) => {
                      setForm({ ...form, email: value });
                      if (errors.email)
                        setErrors({ ...errors, email: undefined });
                    }}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <InputFields
                    type="password"
                    name="password"
                    value={form.password || ""}
                    placeholder="Password"
                    setValue={(value) => {
                      setForm({ ...form, password: value });
                      if (errors.password)
                        setErrors({ ...errors, password: undefined });
                    }}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col text-left gap-1 ml-3 self-start">
                <span className="text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <TextComponents text="Sign-up" />
                  </Link>
                </span>

                <CheckboxComponent
                  id="terms"
                  label="Remember Me?"
                  checked={accepted}
                  onChange={handleRememberMe}
                />
              </div>

              <div className="flex flex-col mx-auto">
                <Button
                  type="submit"
                  id="login"
                  name="login"
                  label={loading ? "Logging in..." : "Login"}
                  className="mt-4 px-30 py-1.5"
                  disabled={loading}
                />

                <span className="mx-auto mt-1">
                  <Link to="/forgot-password">
                    <TextComponents text="Forgot Password?" />
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
