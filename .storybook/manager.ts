import { addons } from "storybook/manager-api";

import portfolioTheme from "./PortfolioTheme";

addons.setConfig({
  theme: portfolioTheme,
});
