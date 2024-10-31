import { FC, useState, useEffect } from "react";
import { VisuallyHidden } from "@nextui-org/react";
import { SwitchProps, useSwitch } from "@nextui-org/react";
import { clsx } from "clsx";

import { themeSwitch } from "./ThemeSwitch";

import { SunFilledIcon, MoonFilledIcon } from "../icons/Icons";

export interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps["classNames"];
  }

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
    className,
    classNames,
  }) => {
    const [isMounted, setIsMounted] = useState(false);
  
    const { theme, toggleTheme } = themeSwitch();
  
    const onChange = toggleTheme;
  
    const {
      Component,
      slots,
      isSelected,
      getBaseProps,
      getInputProps,
      getWrapperProps,
    } = useSwitch({
      isSelected: theme === "light",
      onChange,
    });
  
    useEffect(() => {
      setIsMounted(true);
    }, [isMounted]);
  
    // Prevent Hydration Mismatch
    if (!isMounted) return <div className="w-6 h-6" />;
  
    return (
      <Component
        aria-label={isSelected ? "Switch to dark mode" : "Switch to light mode"}
        {...getBaseProps({
          className: clsx(
            "px-px transition-opacity hover:opacity-80",
            className,
            classNames?.base,
          ),
        })}
      >
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: clsx(
              [
                "w-auto h-auto",
                "bg-transparent",
                "rounded-lg",
                "flex items-center justify-center",
                "group-data-[selected=true]:bg-transparent",
                "!text-current",
                "pt-px",
                "px-0",
                "mx-0",
                "cursor-none",
              ],
              classNames?.wrapper,
            ),
          })}
        >
          {isSelected ? (
            <MoonFilledIcon size={22} />
          ) : (
            <SunFilledIcon size={22} />
          )}
        </div>
      </Component>
    );
  };