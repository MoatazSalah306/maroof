
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth.context";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <Link to="/" className="flex justify-center mb-4">
           <img
                src="/images/logo.png"
                alt="Ma'roof Logo"
                className="h-10 w-auto" // Adjust size as needed
              />
        </Link>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
