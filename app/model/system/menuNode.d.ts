class MenuNode {
    code: string;
    parentCode: string;
    path: string;
    name: string;
    isLeaf: number;
    icon: string;
    children: Array<MenuNode>;
}