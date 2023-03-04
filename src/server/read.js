import { readFile, readdir } from "fs/promises";
import path from "path";

const readTextFile = async (file) => readFile(file, "utf8");
const getDirFiles = async (folder) => readdir(folder);

const readJson = async (file) => JSON.parse(await readTextFile(file));

const readAllJsonFromFolder = async (folder) => {
    const files = await getDirFiles(folder);
    const allContent = await Promise.all(files.map((e) => path.join(folder, e)).map(readJson));
    return allContent;
};

export { readAllJsonFromFolder, readTextFile, readJson };
