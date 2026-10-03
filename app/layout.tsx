import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mazowiecka.vercel.app"),
  title: "Mazowiecka | Kuchnia włoska w Płocku",
  description: "Mazowiecka w Płocku. Kuchnia włoska, przyjemne wnętrze i swobodna atmosfera przy Alei Stanisława Jachowicza 49.",
  keywords: ["Mazowiecka Płock", "restauracja Płock", "kuchnia włoska Płock", "Aleja Stanisława Jachowicza 49"],
  openGraph: {
    title: "Mazowiecka | Kuchnia włoska w Płocku",
    description: "Kuchnia włoska i wieczory przy dobrym stole w centrum Płocka.",
    type: "website",
    locale: "pl_PL"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body>{children}</body></html>;
}