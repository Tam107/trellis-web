import type { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class WelcomePage extends BasePage {
  protected readonly path = "";

  get title(): Locator {
    return this.page.getByRole("heading", { level: 1 });
  }
}
