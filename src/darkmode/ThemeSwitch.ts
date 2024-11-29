// I learned how to do a basic dark mode in my basic portfolio with pure CSS variables, and javascript, but wanted something a bit more robust. took awhile to find one I liked, this was seemed great, found via @imoaazahmed

import { useEffect, useMemo, useState } from "react";

const ThemeProps = {
    key: "theme",
    light: "light",
    dark: "my-theme",
} as const;

type Theme = typeof ThemeProps.light | typeof ThemeProps.dark;

export const themeSwitch = (defaultTheme?: Theme) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem(
            ThemeProps.key
        ) as Theme | null;

        //if no previous theme is stored in local storage, default to dark

        return storedTheme || (defaultTheme ?? ThemeProps.dark);
    });

    const isDark = useMemo(() => {
        return theme === ThemeProps.dark;
    }, [theme]);

    const isLight = useMemo(() => {
        return theme === ThemeProps.light;
    }, [theme]);

    const _setTheme = (theme: Theme) => {
        localStorage.setItem(ThemeProps.key, theme);
        document.documentElement.classList.remove(
            ThemeProps.light,
            ThemeProps.dark
        );
        document.documentElement.classList.add(theme);

        setTheme(theme);
    };

    const setLightTheme = () => _setTheme(ThemeProps.light);

    const setDarkTheme = () => _setTheme(ThemeProps.dark);

    const toggleTheme = () =>
        theme === ThemeProps.dark ? setLightTheme() : setDarkTheme();

    useEffect(() => {
        _setTheme(theme);
    });

    //having these accessible to use in the actual "theme switch button"

    return { theme, isDark, isLight, setLightTheme, setDarkTheme, toggleTheme };
};
