/**
 * 验证是否为空
 * @param val
 */
export function validatenull(val: unknown) {
	if (typeof val == 'boolean') {
		return false;
	}
	if (typeof val == 'number') {
		return false;
	}
	if (val instanceof Array) {
		if (val.length == 0) return true;
	} else if (val instanceof Object) {
		if (JSON.stringify(val) === '{}') return true;
	} else {
		if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
		return false;
	}
	return false;
}
