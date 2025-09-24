import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

export default function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp, isLoading } = useAuthStore();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Get email from location state or fallback
  const email = location.state?.email || "your email";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedOtp = pastedData.slice(0, 6).split("");

    const newOtp = [...otp];
    pastedOtp.forEach((digit, index) => {
      if (index < 6 && /^\d$/.test(digit)) {
        newOtp[index] = digit;
      }
    });

    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
    if (nextEmptyIndex === -1) {
      inputRefs.current[5]?.focus();
    } else {
      inputRefs.current[nextEmptyIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter a complete 6-digit code.");
      return;
    }

    try {
      await verifyOtp(otpCode);
      toast.success("OTP verified successfully!");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      // Simulate resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("New OTP sent to your email!");
      setCanResend(false);
      setCountdown(60);
    } catch {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit verification code to {email}
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="\d{1}"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || otp.some((digit) => !digit)}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">Didn't receive the code?</p>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-sm text-gray-500">Resend in {countdown}s</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Back to sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
