import React from "react";
import { Text as PaperText, TextProps as PaperTextProps } from "react-native-paper";

type AppTextProps = PaperTextProps<{}> & {
  children: React.ReactNode;
};

export default function AppText({ children, style, ...rest }: AppTextProps) {
  return (
    <PaperText
      {...rest}
      style={[{ fontFamily: "MyFont" }, style]}
    >
      {children}
    </PaperText>
  );
}