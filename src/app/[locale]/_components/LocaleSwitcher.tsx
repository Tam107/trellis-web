"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, type Locale } from "@/i18n/routing";
import { EventType, track } from "@/shared/lib/analytics";
import { Selector } from "@astryxdesign/core/Selector";

export function LocaleSwitcher() {
  const t = useTranslations("common.locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onChange = (next: Locale) => {
    track({ type: EventType.LocaleChanged, from: locale, to: next });
    startTransition(() => router.replace(pathname, { locale: next }));
  };

  return (
    <Selector
      label={t("label")}
      isLabelHidden
      variant="secondary"
      size="sm"
      width={128}
      value={locale}
      onChange={(next) => onChange(next as Locale)}
      isDisabled={isPending}
      options={LOCALES.map((value) => ({ value, label: t(value) }))}
    />
  );
}
