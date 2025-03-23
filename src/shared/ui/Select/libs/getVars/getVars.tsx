export const getVars = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const primaryColor = rootStyles.getPropertyValue("--bg-card-color").trim();
  const fontColor = rootStyles.getPropertyValue("--text-dark-color").trim();

  return {
    primaryColor,
    fontColor
  }
}