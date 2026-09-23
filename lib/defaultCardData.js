import { COMPANY } from "./cardConfig";

/** Data shape each employee fills in. Branding comes from cardConfig. */
export const defaultCardData = {
  name: "",
  title: "",
  phone: "",
  email: "",
  website: COMPANY.website, // prefilled from company config, still editable
  location: COMPANY.location,
};