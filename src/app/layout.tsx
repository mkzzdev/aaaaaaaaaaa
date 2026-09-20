import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ToastProvider } from "@/components/toast";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "ReceitasComIA — Receitas criadas por IA",
  description:
    "Descreva o que você quer comer e a IA Gemini monta a receita completa: ingredientes, modo de preparo e segredos do chef. Salve suas favoritas.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${fraunces.variable} ${instrument.variable} bg-paper font-sans text-ink antialiased`}
      >
        <ToastProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
