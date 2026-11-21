import Image from "next/image";
import { GraduationCap } from "@/ui/icons/lucide";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { Section } from "@astryxdesign/core/Section";
import { Heading, Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Container } from "@/ui/layout/Container";

const IMAGE_SIZES = "(min-width: 1024px) 32rem, 100vw";

export type LoginSplitLayoutProps = {
  title: string;
  description: string;
  splitTitle: string;
  splitDescription: string;
  imageAlt: string;
  children: ReactNode;
};

/** The page owns authentication; this component only supplies the responsive split shell. */
export function LoginSplitLayout({
  title,
  description,
  splitTitle,
  splitDescription,
  imageAlt,
  children,
}: LoginSplitLayoutProps) {
  const tNav = useTranslations("home.nav");

  return (
    <main className="flex flex-1 items-center py-8 md:py-12">
      <Container className="w-full lg:max-w-5xl">
        <Card padding={0} className="overflow-hidden rounded-dialog">
          <Grid columns={{ minWidth: 320, max: 2, repeat: "fit" }} gap={0} align="stretch">
            <Section
              variant="transparent"
              padding={6}
              className="order-2 flex min-w-0 flex-col justify-center lg:order-1"
            >
              <VStack gap={8} className="mx-auto w-full max-w-md">
                <HStack gap={3} vAlign="center">
                  <span
                    aria-hidden
                    className="grid size-10 place-items-center rounded-control bg-info-subtle text-fg-brand"
                  >
                    <Icon icon={GraduationCap} size="md" />
                  </span>
                  <Text type="large" weight="bold">
                    {tNav("brandName")}
                  </Text>
                </HStack>

                <VStack gap={5}>
                  <VStack gap={1}>
                    <Heading level={1} type="display-2" weight="bold">
                      {title}
                    </Heading>
                    <Text as="p" type="body" color="secondary">
                      {description}
                    </Text>
                  </VStack>
                  {children}
                </VStack>
              </VStack>
            </Section>

            <figure className="relative order-1 h-44 overflow-hidden lg:order-2 lg:h-full lg:min-h-96">
              <Image
                src="/images/courses/blossom.jpg"
                alt={imageAlt}
                fill
                sizes={IMAGE_SIZES}
                priority
                className="object-cover"
              />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-card bg-overlay p-5 sm:inset-x-6 sm:bottom-6 sm:p-6">
                <VStack gap={2}>
                  <Heading level={2} type="display-3" weight="semibold" className="text-on-overlay">
                    {splitTitle}
                  </Heading>
                  <Text as="p" type="body" className="text-on-overlay">
                    {splitDescription}
                  </Text>
                </VStack>
              </figcaption>
            </figure>
          </Grid>
        </Card>
      </Container>
    </main>
  );
}
