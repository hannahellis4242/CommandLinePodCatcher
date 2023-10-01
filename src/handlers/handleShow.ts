import readConfigFile from "./utils/readConfigFile";

const handleShow = async (
  path: string,
  id: string | undefined,
  title: string | undefined
) => {
  const config = await readConfigFile(path);
};

export default handleShow;
