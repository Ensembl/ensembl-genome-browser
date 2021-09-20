/* tslint:disable */
/* eslint-disable */
/**
* @param {GenomeBrowser} api
* @returns {any}
*/
export function test(api: GenomeBrowser): any;
/**
*/
export function main(): void;
/**
*/
export function init_panic_hook(): void;
/**
*/
export class GenomeBrowser {
  free(): void;
/**
*/
  constructor();
/**
* @param {any} config_object
*/
  go(config_object: any): void;
/**
* @returns {GenomeBrowser}
*/
  copy(): GenomeBrowser;
/**
* @param {string} stick_id
*/
  set_stick(stick_id: string): void;
/**
* @param {string} location
*/
  jump(location: string): void;
/**
*/
  wait(): void;
/**
* @param {any} message
*/
  static receive_message(message: any): void;
/**
* @param {string} name
* @param {boolean} start
*/
  set_artificial(name: string, start: boolean): void;
/**
* @param {number} left
* @param {number} right
*/
  goto(left: number, right: number): void;
/**
* @param {number} y
*/
  set_y(y: number): void;
/**
* @param {any} path
*/
  set_switch(path: any): void;
/**
* @param {any} path
*/
  clear_switch(path: any): void;
/**
* @param {any} path
* @param {boolean} yn
*/
  radio_switch(path: any, yn: boolean): void;
/**
* @param {Function} f
*/
  set_message_reporter(f: Function): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly test: (a: number) => number;
  readonly __wbg_genomebrowser_free: (a: number) => void;
  readonly genomebrowser_new: () => number;
  readonly genomebrowser_go: (a: number, b: number) => void;
  readonly genomebrowser_copy: (a: number) => number;
  readonly genomebrowser_set_stick: (a: number, b: number, c: number) => void;
  readonly genomebrowser_jump: (a: number, b: number, c: number) => void;
  readonly genomebrowser_wait: (a: number) => void;
  readonly genomebrowser_receive_message: (a: number) => void;
  readonly genomebrowser_set_artificial: (a: number, b: number, c: number, d: number) => void;
  readonly genomebrowser_goto: (a: number, b: number, c: number) => void;
  readonly genomebrowser_set_y: (a: number, b: number) => void;
  readonly genomebrowser_set_switch: (a: number, b: number) => void;
  readonly genomebrowser_clear_switch: (a: number, b: number) => void;
  readonly genomebrowser_radio_switch: (a: number, b: number, c: number) => void;
  readonly genomebrowser_set_message_reporter: (a: number, b: number) => void;
  readonly main: () => void;
  readonly init_panic_hook: () => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h3a2070fa89c7e3b9: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__Fn__A_B___Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbf6ab51d2d9fa861: (a: number, b: number, c: number, d: number) => void;
  readonly _dyn_core__ops__function__Fn_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hc3fa72e56e12cc2b: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1cc0855e16470cfb: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h5022ad4dbbf04340: (a: number, b: number, c: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__hd5733e834136f32a: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
