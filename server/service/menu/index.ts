import { Request, Response } from 'express';
import { HttpCode, HttpCodeMsg } from '../../../types/httpCode';
import MenuModel from '../../models/menu';
import dayjs from 'dayjs';
import { IMenu } from '../../../types/IMenu';

// 创建菜单
async function createMenu(req: Request, res: Response) {
    try {
        const data = await MenuModel.create(req.body);
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.CreatedSuccess,
            data
        })
    } catch (error) {
        res.status(HttpCode.Error).json({
            status: HttpCode.Error,
            message: error
        });
    }
}

// 查询菜单
async function getMenu(req: Request, res: Response) {
    try {
        const data = await MenuModel.findAll();
        function combineChildren(data: IMenu[]) {
            const tree: IMenu[] = [];
            const fn = (list: IMenu[]) => {
                for (let index = 0; index < list.length; index++) {
                    const item = list[index];
                    const findItem = list.find(v => v.id === item.parentId);
                    if (findItem) {
                        if (!findItem.children) findItem.children = [];
                        findItem.children.push(item);
                    } else {
                        tree.push(item);
                    }
                }
                return list;
            }
            fn(data);
            return tree;
        }
        const tree = combineChildren(JSON.parse(JSON.stringify(data)));
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.Ok,
            data: tree
        })
    } catch (error) {
        console.log('error: ', error);
        res.status(HttpCode.Error).json({
            status: HttpCode.Error,
            message: error
        });
    }

}

async function getMenuById(req: Request, res: Response) {

}

// 更新菜单
async function updateMenu(req: Request, res: Response) {
    try {
        const data = await MenuModel.findByPk(req.params.id);
        req.body['updatedAt'] = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
        await data.update(req.body);
        // const data = await MenuModel.create(req.body);
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.UpdatedSuccess,
            data
        })
    } catch (error) {
        res.status(HttpCode.Error).json({
            status: HttpCode.Error,
            message: error
        });
    }
}

// 删除菜单
async function deleteMenu(req: Request, res: Response) {

}

export default { createMenu, getMenu, updateMenu, deleteMenu, getMenuById };