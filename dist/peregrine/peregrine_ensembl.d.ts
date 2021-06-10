/* tslint:disable */
/* eslint-disable */
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
*/
  go(): void;
/**
* @param {string} stick_id
*/
  set_stick(stick_id: string): void;
/**
* @param {any} message
*/
  static receive_message(message: any): void;
/**
* @param {number} bp_per_screen
*/
  set_bp_per_screen(bp_per_screen: number): void;
/**
* @param {number} pos
*/
  set_x(pos: number): void;
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
* @param {Function} f
*/
  set_message_reporter(f: Function): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_genomebrowser_free: (a: number) => void;
  readonly genomebrowser_new: () => number;
  readonly genomebrowser_go: (a: number) => void;
  readonly genomebrowser_set_stick: (a: number, b: number, c: number) => void;
  readonly genomebrowser_receive_message: (a: number) => void;
  readonly genomebrowser_set_bp_per_screen: (a: number, b: number) => void;
  readonly genomebrowser_set_x: (a: number, b: number) => void;
  readonly genomebrowser_set_y: (a: number, b: number) => void;
  readonly genomebrowser_set_switch: (a: number, b: number) => void;
  readonly genomebrowser_clear_switch: (a: number, b: number) => void;
  readonly genomebrowser_set_message_reporter: (a: number, b: number) => void;
  readonly init_panic_hook: () => void;
  readonly main: () => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__Fn_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h104d4ffbf6f999ea: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbdd24a3fc63c8719: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__Fn__A_B___Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hfd1189ba57b7e2df: (a: number, b: number, c: number, d: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0dafd344521636c4: (a: number, b: number, c: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
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
