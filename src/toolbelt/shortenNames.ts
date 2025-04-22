const shortenNames = (str: string, isMobile: boolean): string => {
    if (!isMobile) return str;
  
    return str
      .replace(/\bAdobe\b/g, 'A.')
      .replace(/\bAffinity\b/g, 'Aff.');
};

export default shortenNames;