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
* @param {any} value
*/
  switch(path: any, value: any): void;
/**
* @param {string} name
* @param {any} payload
*/
  add_jsapi_channel(name: string, payload: any): void;
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
  readonly genomebrowser_switch: (a: number, b: number, c: number) => void;
  readonly genomebrowser_add_jsapi_channel: (a: number, b: number, c: number, d: number) => void;
  readonly genomebrowser_radio_switch: (a: number, b: number, c: number) => void;
  readonly genomebrowser_set_message_reporter: (a: number, b: number) => void;
  readonly main: () => void;
  readonly init_panic_hook: () => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7ed39fe0bbbafefc: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__Fn__A_B___Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hdc0783897fb41e37: (a: number, b: number, c: number, d: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0fb16bc14e48bcf9: (a: number, b: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
