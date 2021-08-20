import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { styled, useTheme } from "@material-ui/core/styles";
import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
const StyledButton = styled(Button)({
  borderRadius: ({ roundness, rounded }) => (rounded ? roundness : "default"),
  textTransform: ({ textTransform }) => textTransform,
});
StyledButton.defaultProps = {
  variant: "contained",
  // color: "primary",
  roundness: 15,
  rounded: false,
  textTransform: "uppercase",
};

const AppButton = ({
  children,
  loading = false,
  loadingText = "Loading...",
  onClick,
  startIcon,
  endIcon,
  type,
  color = "primary",
  style,
  asIconButton = false,
  ...props
}) => {
  const theme = useTheme();
  if (asIconButton) {
    return (
      <IconButton
        style={{
          cursor: loading ? "default" : "pointer",
          color: theme.palette[color].main,
          ...style,
        }}
        type={loading ? "button" : type}
        onClick={loading ? () => {} : onClick}
        color={color}
        {...props}
      >
        {loading ? <CircularProgress size={15} color="inherit" /> : children}
      </IconButton>
    );
  }
  return (
    <StyledButton
      style={{
        cursor: loading ? "default" : "pointer",
        backgroundColor: theme.palette[color].main,
        color: theme.palette[color].contrastText,
        ...style,
      }}
      startIcon={
        loading ? <CircularProgress size={15} color="inherit" /> : startIcon
      }
      endIcon={endIcon}
      type={loading ? "button" : type}
      onClick={loading ? () => {} : onClick}
      color={color}
      {...props}
    >
      {loading ? loadingText : children}
    </StyledButton>
  );
};

const CustomButton = ({
  children,
  loading = false,
  loadingText = "Loading...",
  startIcon,
  style,
  ...props
}) => {
  return (
    <Button
      style={{ ...style }}
      startIcon={
        loading ? <CircularProgress size={15} color="inherit" /> : startIcon
      }
      {...props}
    >
      {loading ? loadingText : children}
    </Button>
  );
};

AppButton.CustomButton = CustomButton;

export default AppButton;

AppButton.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
    "purple",
  ]),
  roundness: PropTypes.number,
  rounded: PropTypes.bool,
  icon: PropTypes.bool,
  textTransform: PropTypes.string,
  ...Button.propTypes,
};
