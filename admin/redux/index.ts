// import { init } from '@rematch/core';
// import { useSelector } from 'react-redux'
// import models from '../src/model/index';
// export default function initModel() {
//     return init({
//         models: createModel(),
//     });
// };

// function createModel() {
//     const obj = {};
//     for (let index = 0; index < models.length; index++) {
//         const item = models[index];
//         Object.assign(obj, { [item.name as string]: item });
//     }

//     return obj; // 返回一个对象
// }

// export async function useDispaatchFunc(key: string, fnKey: string, payload?: any) {
//     const { dispatch } = initModel();
//     // console.log('getState: ', getState());
//     return dispatch({
//         type: [key, fnKey].join('/'),
//         payload
//     });
// }

// export function getState(key: string) {
//     const result = useSelector((state: any) => state[key])
//     return result;
// }

