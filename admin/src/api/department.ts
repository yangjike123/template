import { requestGet } from "../../utils/request";

export function getDepartmentList() {
  return requestGet('department');
}