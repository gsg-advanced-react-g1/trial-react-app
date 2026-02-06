import {
    Button as MantineButton,
    type ButtonProps as MantineButtonProps,
} from "@mantine/core";
import clsx from "clsx";
import {
    type ButtonHTMLAttributes,
    type PropsWithChildren,
    type ReactNode,
} from "react";

import classes from "./style.module.css";

export interface ButtonProps {
    size?: "small" | "regular" | "large";
    label?: ReactNode;
    variant?: "primary" | "secondary" | "danger" | "text";
    loading?: boolean;
    testId?: string;
    className?: string;
    width?: "standard" | "stretched";
    onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const getVariants = (
    variant: NonNullable<ButtonProps["variant"]>,
): {
    variant: MantineButtonProps["variant"];
    loader: ReactNode;
} => {
    switch (variant) {
        case "primary":
            return {
                variant: "filled",
                loader: "white",
            };
        case "secondary":
            return {
                variant: "light",
                loader: "purple",
            };
        case "danger":
            return {
                variant: "filled",
                loader: "white",
            };
        case "text":
            return {
                variant: "subtle",
                loader: "purple",
            };
    }
};

const sizeMap: Record<
    NonNullable<ButtonProps["size"]>,
    MantineButtonProps["size"]
> = {
    small: "sm",
    regular: "md",
    large: "lg",
};

export const Button = ({
    size = "regular",
    label,
    variant = "primary",
    loading,
    onClick,
    type = "button",
    testId,
    className,
    width = "standard",
    disabled = false,
    ...rest
}: PropsWithChildren<ButtonProps>) => {
    const { loader, variant: mantineVariant } = getVariants(variant);
    const mantineProps: MantineButtonProps = {
        children: (
            <span>
                {label}
            </span>
        ),
        size: sizeMap[size],
        variant: mantineVariant,
        loading,
    };

    const props = {
        ...rest,
        ...mantineProps,
        onClick,
        "data-testid": testId,
        type,
    };

    return (
        <MantineButton
            {...props}
            className={clsx(
                classes.button,
                classes[variant],
                classes[size],
                classes[width],
                className,
                {
                    [classes.disabled]: disabled,
                },
            )}
            classNames={{
                root: classes.root,
                label: classes.label,
            }}
            loaderProps={{
                children: loader,
            }}
            disabled={disabled}
        />
    );
};