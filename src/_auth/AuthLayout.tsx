import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 items-center flex-col overflow-scroll px-5 pb-9 custom-scrollbar">
            <Outlet />
          </section>
          <img
            src="assets/images/bg.jpg"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 bg-no-repeat object-cover"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
