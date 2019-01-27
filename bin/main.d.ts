export declare class Mdlinkc {
    private srcDir;
    private listOfMdFiles;
    private sectionToFileHash;
    constructor(srcDir: string);
    getLinks(section: string): Promise<string[]>;
}
