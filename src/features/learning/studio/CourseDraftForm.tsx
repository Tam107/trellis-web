"use client";

import { ArrowLeft, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { COURSE_LANGUAGES, type CourseLanguage } from "@/entities/learning/learning.constants";
import { LEVEL_FRAMEWORKS, type LevelFramework } from "@/entities/learning/learning.constants";
import { FRAMEWORK_LEVELS } from "@/entities/learning/studio.fixtures";
import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/ui/primitives/Button";
import { Field } from "@/ui/form/Field";
import { Icon } from "@/ui/primitives/Icon";
import { Input } from "@/ui/form/Input";
import { Select } from "@/ui/form/Select";
import { Textarea } from "@/ui/form/Textarea";

/**
 * M11 — creating a draft. The framework choice comes first and changes the level list outright:
 * CEFR and the Chinese curriculum are separate scales and never convert into each other (BR-12),
 * so offering one merged list would teach the wrong model from the first screen.
 */
export function CourseDraftForm() {
  const t = useTranslations("learning.studio.draft");
  const tLanguages = useTranslations("learning.languages");
  const tFrameworks = useTranslations("learning.levelFrameworks");

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState<CourseLanguage>(COURSE_LANGUAGES.CHINESE);
  const [framework, setFramework] = useState<LevelFramework>(LEVEL_FRAMEWORKS.CHINESE_CURRICULUM);
  const [level, setLevel] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const levels = FRAMEWORK_LEVELS[framework];
  const titleError = isSubmitted && title.trim() === "" ? t("titleRequired") : undefined;
  const levelError = isSubmitted && level === "" ? t("levelRequired") : undefined;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8 md:px-6">
      <Link href={ROUTES.studio} className="flex items-center gap-1 text-sm text-fg-muted hover:text-fg">
        <Icon icon={ArrowLeft} size="sm" />
        {t("cancel")}
      </Link>

      <h1 className="mt-6 text-2xl font-semibold text-fg">{t("title")}</h1>
      <p className="mt-2 text-sm text-fg-muted">{t("description")}</p>

      <form
        className="mt-6 flex flex-col gap-5 rounded-card border border-border bg-surface p-5"
        onSubmit={(event) => {
          event.preventDefault();
          setIsSubmitted(true);
        }}
      >
        <Field label={t("titleLabel")} error={titleError}>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t("titlePlaceholder")}
            isInvalid={titleError !== undefined}
          />
        </Field>

        <Field label={t("languageLabel")}>
          <Select
            value={language}
            onValueChange={setLanguage}
            options={Object.values(COURSE_LANGUAGES).map((value) => ({
              value,
              label: tLanguages(value),
            }))}
          />
        </Field>

        <Field label={t("frameworkLabel")} hint={t("frameworkNote")}>
          <Select
            value={framework}
            onValueChange={(next) => {
              setFramework(next);
              // Levels belong to one scale, so switching scales cannot keep the old choice.
              setLevel("");
            }}
            options={Object.values(LEVEL_FRAMEWORKS).map((value) => ({
              value,
              label: tFrameworks(value),
            }))}
          />
        </Field>

        <Field label={t("levelLabel")} error={levelError}>
          <Select
            value={level}
            onValueChange={setLevel}
            isInvalid={levelError !== undefined}
            options={levels.map((value) => ({ value, label: value }))}
          />
        </Field>

        <Field label={t("summaryLabel")}>
          <Textarea rows={3} placeholder={t("summaryPlaceholder")} />
        </Field>

        <p className="flex items-start gap-2 rounded-control bg-info-subtle p-3 text-xs text-fg-muted">
          <Icon icon={Info} size="md" className="mt-0.5 text-fg-brand" />
          {t("description")}
        </p>

        <div className="flex flex-wrap justify-end gap-2">
          <Button asChild variant="secondary">
            <Link href={ROUTES.studio}>{t("cancel")}</Link>
          </Button>
          <Button type="submit">{t("create")}</Button>
        </div>
      </form>
    </main>
  );
}
