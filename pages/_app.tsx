import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

interface CustomAppProps extends AppProps {}

function App({ Component, pageProps }: CustomAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
