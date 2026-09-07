import { SupportedLanguage } from "./languages";

export interface Conversion {
  _id: string;
  sourceLanguage: SupportedLanguage;
  targetLanguage: SupportedLanguage;
  pythonCode: string;
  variables: string[];
  problemDescription: string;
  createdAt: string;
}

export interface ConversionSearchResponse {
  conversions: Conversion[];
}
