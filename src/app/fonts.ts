import {
    Inter,
    Merriweather,
    Merriweather_Sans,
    Montserrat,
    Playfair_Display,
    Bodoni_Moda
} from "next/font/google";

export const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: '--font-inter',
});

// export const merriweather = Merriweather({
//     subsets: ["latin"],
//     display: "swap",
// });

export const merriweather = Merriweather_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: '--font-merriweather',
});

export const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    variable: '--font-montserrat',
});

export const playfair = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: '--font-playfair',
});

export const bodoni = Bodoni_Moda({
    subsets: ["latin"],
    display: "swap",
    variable: '--font-bodoni',
});