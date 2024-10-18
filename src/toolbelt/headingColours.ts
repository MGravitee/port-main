

const switchColour = (title: string) => {
    switch (title) {
      case "Development Tricks":
        return "dev-color";
      case "Design Tricks":
        return "design-color";
      case "Other Tricks":
        return "other-color";
      default:
        return "";
    }
  };
  
  export default switchColour;