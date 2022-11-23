import { backgroundColor, buttonColor, fontColor } from "../config";

export const SelectStyle = {
  control: (base: any, state: any) => ({
    ...base,
    background: backgroundColor,
    // match with the menu
    borderRadius: "4px",
    // Overwrittes the different states of border
    borderColor: "black",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: buttonColor,
    },
  }),
  menu: (base: any) => ({
    ...base,
    background: backgroundColor,
    border: "1px",
    // override border radius to match the box
    borderRadius: "4px",
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base: any) => ({
    ...base,
    padding: 0,
  }),
  option: (base: any, state: any) => ({
    ...base,
    background: state.isFocused ? buttonColor : backgroundColor,
    color: fontColor,
  }),
  valueContainer: (base: any) => ({
    ...base,
  }),
  downChevron: (base: any) => ({
    ...base,
    background: backgroundColor,
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    background: backgroundColor,
  }),
};
