import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import { getProviders, getCsrfToken, signIn } from "next-auth/react";
import type { LiteralUnion, ClientSafeProvider } from "next-auth/react";
import type { BuiltInProviderType } from "next-auth/providers";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { signInSchema } from "../../schemas/dbValidation";
import { useUpdateThemeOnce } from "../../hooks/ThemeContext";
import type { IUserTheme } from "../../hooks/ThemeContext";
import { H2 } from "../../components/styles/Heading.styled";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";

interface ISigninProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
  themeMode: string;
  csrfToken: Promise<string | undefined>;
}

export default function SignIn({
  providers,
  themeMode,
  csrfToken,
}: ISigninProps) {
  //load and preserve user theme settings
  const parsedCookie: IUserTheme = JSON.parse(themeMode);
  useUpdateThemeOnce(parsedCookie);

  const router = useRouter();
  const [credentialsError, setCredentialsError] = useState<
    string | undefined | null
  >(null);
  const [passType, setPassType] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const otherProviders: ClientSafeProvider[] = Object.values(providers).filter(
    (provider) => provider !== providers.credentials
  );

  return (
    <>
      <Header />
      <H2>Sign In</H2>
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={async (values) => {
          //login using next-auth API
          return await signIn<"credentials">("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: `${window.location.origin}`,
          }).then((response) => {
            if (response!.error === "CredentialsSignin") {
              setCredentialsError("The email or password is incorrect");
            } else {
              setCredentialsError(null);
            }
            if (response!.url) router.push(response!.url);
          });
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Field name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div>{credentialsError}</div>

            <div>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                type="text"
                name="email"
                placeholder="Email"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                type={passType ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
              />
              <button onClick={() => setPassType(!passType)}>
                {passType ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>

            <div>
              <ErrorMessage name="email">
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
              <ErrorMessage name="password">
                {(msg) => <div>{msg}</div>}
              </ErrorMessage>
            </div>

            <button type="submit">
              {isSubmitting ? "Please wait.." : "Sign in with Email"}
            </button>
            <button type="button">
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
            </button>
          </Form>
        )}
      </Formik>
      <p>or</p>
      {otherProviders.map((provider) => (
        <div key={provider.name}>
          <button type="submit" onClick={async () => await signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //Get providers
  const providers = await getProviders();
  //Get stored user theme cookie
  const parsedCookie = ctx.req.cookies;
  let { themeMode } = parsedCookie;

  if (themeMode === undefined) {
    themeMode = JSON.stringify({
      theme: { text: "#000", body: "#fff" },
      _storedToggle: "light",
      iconTheme: { color: "#000", size: "1.25em" },
    });
    return {
      props: { providers, themeMode, csrfToken: await getCsrfToken(ctx) },
    };
  }
  return {
    props: { providers, themeMode, csrfToken: await getCsrfToken(ctx) },
  };
};
