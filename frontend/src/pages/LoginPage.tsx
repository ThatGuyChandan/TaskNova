import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOTP = async () => {
    setError("");
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      await axiosInstance.post("auth/send-otp", { email });
      setStep(2);
    } catch (err) {
      console.error("Error sending OTP", err);
      const axiosError = err as any;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        setError(axiosError.response.data.message);
      } else {
        setError("An error occurred while sending the OTP. Please try again.");
      }
    }
  };

  const handleVerifyOTP = async () => {
    setError("");
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await axiosInstance.post("auth/verify-otp", {
        email,
        otp,
      });
      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      navigate("/dashboard");
    } catch (err) {
      console.error("Error verifying OTP", err);
      const axiosError = err as any;
      if (
        axiosError.response &&
        axiosError.response.data &&
        axiosError.response.data.message
      ) {
        setError(axiosError.response.data.message);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>🔒</div>
        <div className={styles.title}>TaskNova Login</div>
        {step === 1 ? (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <button
                className={styles.button}
                type="button"
                onClick={handleSendOTP}
              >
                Send OTP
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="otp">
                OTP
              </label>
              <input
                className={styles.input}
                id="otp"
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setError("");
                }}
              />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <button
                className={styles.button}
                type="button"
                onClick={handleVerifyOTP}
              >
                Verify OTP
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
