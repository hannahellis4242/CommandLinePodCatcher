const extension = (fileType: string): string => {
  switch (fileType) {
    case "audio/mpeg":
    case "audio/mp3":
      return ".mp3";
    case "audio/x-m4a":
      return ".m4a";
    case "video/mp4":
      return ".mp4";
    default:
      console.log(`unknown type ${fileType} defaulting to .mp3`);
      return ".mp3";
  }
};
export default extension;
