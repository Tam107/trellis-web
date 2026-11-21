import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { LoginForm } from "@/features/auth/forms/LoginForm";
import { LoginSplitLayout } from "@/features/auth/components/LoginSplitLayout";
import type { Locale } from "@/i18n/routing";
import { Skeleton } from "@astryxdesign/core/Skeleton";

type LoginPageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.login" });
  return { title: t("title"), robots: { index: false } };
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth.login");

  return (
    <LoginSplitLayout
      title={t("title")}
      description={t("description")}
      splitTitle={t("splitTitle")}
      splitDescription={t("splitDescription")}
      imageAlt={t("imageAlt")}
    >
      <Suspense fallback={<Skeleton className="h-48 w-full rounded-control" />}>
        <LoginForm />
      </Suspense>
    </LoginSplitLayout>
  );
}
