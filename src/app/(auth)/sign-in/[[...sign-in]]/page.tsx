import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="form-container">
      <SignIn />
    </div>
  );
};

export default SignInPage;
