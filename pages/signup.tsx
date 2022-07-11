import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "../schemas/dbValidation";
import { H2 } from "../components/styles/Heading.styled";
import Button from "../components/styles/Button.styled";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const register = ({
  setIsOpen,
  isModal = false,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isModal: boolean;
  providers: ClientSafeProvider;
}) => {
  const [error, setError] = useState<string | null | undefined>(null);
  const router = useRouter();

  let initialValues = {
    name: "",
    email: "",
    password: "",
  };
  return (
    <>
      <Header />
      <H2>Sign Up</H2>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          //logic
          const res = await fetch("/api/registration", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          if (data.error) {
            setError(data.error);
          } else {
            setError(null);
          }
          if (data.message === "Registered Successfully") {
            await signIn<"credentials">("credentials", {
              redirect: false,
              email: values.email,
              password: values.password,
            }).then((response) => {
              if (!response?.ok) {
                setError("There was an issue in signing in");
                router.push("/auth/signin");
                return;
              } else {
                setError(null);
              }
              if (response!.url) router.push(response!.url);
            });
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => {
          return (
            <>
              <Form onSubmit={handleSubmit}>
                <div>{error}</div>
                <div>
                  <label htmlFor="name">Name</label>
                  <Field type="text" id="name" name="name" />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field type="text" id="email" name="email" />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <Field type="text" id="password" name="password" />
                </div>

                <div>
                  <ErrorMessage name="name">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                  <ErrorMessage name="email">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                  <ErrorMessage name="password">
                    {(msg) => <div>{msg}</div>}
                  </ErrorMessage>
                </div>

                <button type="submit">
                  {isSubmitting ? "Signing up .." : "Sign Up"}
                </button>
                <button type="button">
                  <Link href="/auth/signin">
                    <a>Sign In</a>
                  </Link>
                </button>
              </Form>
            </>
          );
        }}
      </Formik>
      {isModal && <Button onClick={() => setIsOpen(false)}>Close</Button>}
      <Footer />
    </>
  );
};

export default register;
