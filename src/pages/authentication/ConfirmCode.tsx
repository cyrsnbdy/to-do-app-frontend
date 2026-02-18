import Button from "@/components/ButtonComponents.tsx";
import Logo from "@/images/to-do.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import OtpInput from "./components/NumberCode";

function ConfirmCode() {
  const [accepted, setAccepted] = useState(false);
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
        {/* Logo, subtext */}
        <div className="flex flex-col gap-2 justify-center items-center pt-30">
          <span>
            <img src={Logo} alt="" className="w-50.5" />
          </span>
        </div>

        <div className="flex flex-col gap-7 mt-40 justify-center items-center">
          <span className="font-bold text-2xl">CONFIRM CODE</span>

          <div className="">
            <OtpInput
              length={6}
              onComplete={(code) => console.log("OTP Code:", code)}
            />
          </div>

          <Link to="/change-password">
            <Button
              type="submit"
              id="confirm"
              name="confirm"
              label="Confirm code"
              className=" px-20 py-1.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCode;
