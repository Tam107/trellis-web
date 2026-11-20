"use client";

import { useDateLabel } from "@/features/learning/hooks/useDateLabel";
import { MessageSquare, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MESSAGE_THREADS } from "@/entities/learning/library.fixtures";
import type { MessageThread } from "@/entities/learning/library.types";
import { Badge } from "@/ui/primitives/Badge";
import { Button } from "@/ui/primitives/Button";
import { cn } from "@/ui/lib/cn";
import { EmptyState } from "@/ui/feedback/EmptyState";
import { Icon } from "@/ui/primitives/Icon";
import { Textarea } from "@/ui/form/Textarea";
import { SHORT_DATE } from "../shared/learning.format";
import { UNREAD_TONE } from "../shared/learning.tones";
import { PageHeading } from "../shell/PageHeading";

export function MessagesPage() {
  const t = useTranslations("learning.messagesPage");
  const [openId, setOpenId] = useState<string | null>(MESSAGE_THREADS[0]?.id ?? null);
  const open = MESSAGE_THREADS.find((thread) => thread.id === openId);

  return (
    <div className="flex flex-col gap-4">
      <PageHeading title={t("title")} description={t("description")} />

      <div className="grid gap-4 lg:grid-cols-[20rem_1fr]">
        <ul className="flex flex-col gap-2">
          {MESSAGE_THREADS.map((thread) => (
            <li key={thread.id}>
              <ThreadRow thread={thread} isOpen={thread.id === openId} onOpen={() => setOpenId(thread.id)} />
            </li>
          ))}
        </ul>

        {open ? (
          <section className="flex flex-col gap-4 rounded-card border border-border bg-surface p-5">
            <header>
              <h2 className="text-base font-semibold text-fg">{open.correspondent}</h2>
              <p className="text-xs text-fg-muted">{open.courseTitle}</p>
            </header>
            <p className="rounded-card bg-surface-sunken p-4 text-sm text-fg">{open.lastMessage}</p>
            <div className="flex flex-col gap-2">
              <Textarea placeholder={t("replyPlaceholder")} disabled />
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-fg-subtle">{t("readOnlyNote")}</p>
                <Button disabled icon={<Icon icon={Send} size="md" />}>
                  {t("send")}
                </Button>
              </div>
            </div>
          </section>
        ) : (
          <EmptyState
            icon={MessageSquare}
            title={t("pickThreadTitle")}
            description={t("pickThreadDescription")}
          />
        )}
      </div>
    </div>
  );
}

function ThreadRow({
  thread,
  isOpen,
  onOpen,
}: {
  thread: MessageThread;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const t = useTranslations("learning.messagesPage");
  const dateLabel = useDateLabel();
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={t("openThread", { name: thread.correspondent })}
      aria-current={isOpen ? "true" : undefined}
      className={cn(
        "flex w-full flex-col gap-1 rounded-card border p-3 text-left",
        isOpen ? "border-brand bg-info-subtle" : "border-border bg-surface hover:bg-surface-hover",
      )}
    >
      <span className="flex items-center gap-2">
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-fg">{thread.correspondent}</span>
        {thread.unreadCount > 0 ? (
          <Badge tone={UNREAD_TONE} size="sm">
            {t("unread", { count: thread.unreadCount })}
          </Badge>
        ) : null}
      </span>
      <span className="text-xs text-fg-muted">
        {thread.role === "instructor" ? t("roleInstructor") : t("roleSupport")}
      </span>
      <span className="line-clamp-2 text-xs text-fg-subtle">{thread.lastMessage}</span>
      <span className="text-xs text-fg-subtle">{dateLabel(thread.lastMessageAt, SHORT_DATE)}</span>
    </button>
  );
}
