import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../../redux/slices/authSlice";
import { doLogin, sendOTP } from "../../services/auth";
import FormWrapper from "../../components/Atoms/FormWrapper";
import FormInput from "../../components/Atoms/FormInput";
import useToken from "../../hooks/useToken";
import { getCompanyIdsByEmail } from "../../utils/companyIdentification";

const LoginPage = () => {
  const [mail, setMail] = useState("");
  const [otp, setOtp] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setAccessToken] = useState(null);

  const { authenticated } = useSelector((state) => state.auth);
  const { setToken } = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (authenticated) {
      state?.from ? navigate(state.from) : navigate("/");
    }
  }, [authenticated, state, navigate]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!mail) return toast.error("Please enter your email.");

    try {
      setLoading(true);

      // Mocking the response for testing purposes
      // Remove this block after integrating with the actual API
      const data = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRPTExBUkRVQkFJIiwic3ViIjoiTWlsZVBvd2VyIiwiUm9sZSI6IkFkbWluIiwianRpIjoiNTUxNmUyNDQtNDk4OC00MmNiLThjYTAtZDhkNTQ3YTU1ZDViIiwiZXhwIjoxNzYwNTYyNzkxLCJpc3MiOiJ0b2tlbmlzc3VlciIsImF1ZCI6InRva2VuaXNzdWVyIn0.Vkiy-np_wJSvUA2EcWj4KkseVjUFkx81yB4GNxqZB3Y", otp: 123456 }; // Remove this line after testing

      // const { data } = await sendOTP({ email: mail });
      if (data.otp) {
        toast.success("OTP sent successfully to your email!");
        setReceivedOtp(data.otp);
        setAccessToken(data.token);
        setOtpSent(true);
      } else {
        toast.error("Failed to send OTP. Try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong while sending OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (otp.toString().trim() === receivedOtp.toString().trim()) {
      const company = getCompanyIdsByEmail(mail);
      
      if (company) {
        toast.success("OTP verified successfully!");
        setToken(token);
        dispatch(setAuthenticated(true));
        localStorage.setItem('selectedCompanyId', JSON.stringify(company));
        navigate("/");
      } else {
        toast.error("Company not found for this email.");
      }
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };


  return (
    <>
      <Toaster />
      <FormWrapper
        formTitle="Login"
        formDescription="Please login to access your dashboard."
        formFields={
          <>
            <FormInput
              id="email"
              type="email"
              placeholder="Email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              disabled={otpSent}
            />

            {otpSent && (
              <FormInput
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}
          </>
        }
        formSubmitButtonText={otpSent ? "Verify OTP" : "Send OTP"}
        formLink="/register"
        formButton="Register"
        onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
        disabled={loading}
      />
    </>
  );
};

export default LoginPage;
