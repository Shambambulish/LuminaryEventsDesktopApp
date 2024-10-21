import { Palette, PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Palette {
    lumYellow?: string;
    lumPink?: string;
    lumBlue?: string;
    secondaryContrastText?: string;
  }

  interface PaletteOptions {
    lumYellow?: string;
    lumPink?: string;
    lumBlue?: string;
    secondaryContrastText?: string;
  }
}
