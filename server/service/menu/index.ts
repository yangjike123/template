import { Request, Response } from 'express';
import { HttpCode, HttpCodeMsg } from '../../../types/httpCode';
import MenuModel from '../../models/menu';
import dayjs from 'dayjs';
import { IMenu } from '../../../types/IMenu';
import { combineChildren } from '../../utils';

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
        const tree = combineChildren<IMenu[]>(JSON.parse(JSON.stringify(data)));
        res.status(HttpCode.Ok).json({
            status: HttpCode.Ok,
            message: HttpCodeMsg.Ok,
            data: tree
        })
    } catch (error) {
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