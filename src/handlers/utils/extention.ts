const extension = (fileType: string): string => {
  switch (fileType) {
    case "audio/mpeg":
      return ".mp3";
    case "audio/x-m4a":
      return ".m4a";
    default:
      console.log(`unknown type ${fileType} defaulting to .mp3`);
      return ".mp3";
  }
};
export default extension;
