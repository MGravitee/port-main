

const switchColour = (title: string) => {
    switch (title) {
      case "Development Tools":
        return "dev-color";
      case "Design Tools":
        return "design-color";
      case "Other Tools":
        return "other-color";
      default:
        return "";
    }
  };
  
  export default switchColour;