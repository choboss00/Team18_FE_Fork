import Title from "../atoms/Title";
import Footer from "../../../layouts/Footer";
import LoginForm from "../organisms/LoginForm";
import LOGIN from "../constants/LOGIN";

const LoginTemplate = () => {
  return (
    <>
      <main className="pb-20 min-h-screen bg-green-100 justify-center items-center flex flex-col">
        <Title>Log In</Title>
        <LoginForm inputProps={LOGIN} />
        <div className="mt-4">
          <p className="text-sm text-blue-900 ml-2">
            No account yet?{" "}
            <a href="/signup" className="text-sm font-bold ml-2 text-blue-900">
              Sign Up
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginTemplate;
