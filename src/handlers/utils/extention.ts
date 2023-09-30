const extension = (fileType: string): string => {
  switch (fileType) {
    case "audio/mpeg":
      return ".mp3";
    default:
      return ".mp3";
  }
};
export default extension;
