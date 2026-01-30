import path from 'node:path';
import fs from 'node:fs';

// 文件根目录
const DIR_PATH = path.resolve(process.cwd());
// 白名单,过滤不是文章的文件和文件夹
const WHITE_LIST = ['index.md', '.vitepress', 'node_modules', '.idea', 'assets','public'];

// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

// 取差值
const intersections = (arr1, arr2) => Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

// 递归遍历目录，生成侧边栏菜单
function getList(params, path1, pathname) {
    const res = [];
    // 先处理所有文件，后处理文件夹
    const files = [];
    const dirs = [];
    
    for (let file of params) {
        const dir = path.join(path1, file);
        const isDir = isDirectory(dir);
        if (isDir) {
            dirs.push(file);
        } else {
            const suffix = path.extname(file);
            if (suffix === '.md') {
                files.push(file);
            }
        }
    }
    
    // 对文件进行排序（按文件名排序）
    files.sort((a, b) => a.localeCompare(b, 'zh-CN'));
    
    // 先添加文件
    for (let file of files) {
        const name = path.basename(file, '.md');
        res.push({
            text: name,
            link: `${pathname}${name}`,
        });
    }
    
    // 对文件夹进行排序（按文件夹名排序）
    dirs.sort((a, b) => a.localeCompare(b, 'zh-CN'));
    
    // 再添加文件夹
    for (let dir of dirs) {
        const dirPath = path.join(path1, dir);
        const subFiles = fs.readdirSync(dirPath);
        res.push({
            text: dir,
            collapsible: true,
            items: getList(subFiles, dirPath, `${pathname}${dir}`),
        });
    }
    
    return res;
}

export const set_sidebar = (pathname) => {
    const dirPath = path.join(DIR_PATH, pathname);
    const files = fs.readdirSync(dirPath);
    const items = intersections(files, WHITE_LIST);
    return getList(items, dirPath, pathname);
}
