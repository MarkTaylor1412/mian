import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="common-container">
      <SignIn />
    </div>
  );
};

export default SignInPage;
