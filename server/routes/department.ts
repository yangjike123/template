import { Router } from 'express';
import serviceDepartment from '../service/department';
import departmentParamsValidator from '../service/department/paramsValidator';
const route = Router();

//部门列表
route.get('/', departmentParamsValidator.paginatinPayloady, serviceDepartment.getDepartment);
// 部门详情
route.get('/:id', serviceDepartment.getDepartmentById);
// 创建部门
route.post('/', departmentParamsValidator.createDepartment, serviceDepartment.createDepartment);
// 更新部门
route.put('/:id',departmentParamsValidator.updatedDepartment, serviceDepartment.updateDepartment);
// 删除部门
route.delete('/:id', serviceDepartment.deleteDepartment);

export default route;