
const lAudioContext = (typeof AudioContext !== 'undefined' ? AudioContext : (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : undefined));
let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0;
function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0;
function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedFloat64Memory0;
function getFloat64Memory0() {
    if (cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_34(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h90ed7e78e6ae90b0(arg0, arg1);
}

function makeClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        try {
            return f(state.a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
                state.a = 0;

            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_37(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h3d5cb2d5b11ea8dd(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_40(arg0, arg1, arg2, arg3) {
    wasm._dyn_core__ops__function__Fn__A_B___Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h5d5665d89f5ee1ba(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

function __wbg_adapter_43(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h477d9c5ae7e8d4d5(arg0, arg1, addHeapObject(arg2));
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
*/
export function main() {
    wasm.main();
}

/**
*/
export function init_panic_hook() {
    wasm.init_panic_hook();
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

let cachedFloat32Memory0;
function getFloat32Memory0() {
    if (cachedFloat32Memory0.byteLength === 0) {
        cachedFloat32Memory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32Memory0;
}

function getArrayF32FromWasm0(ptr, len) {
    return getFloat32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }
/**
*/
export class GenomeBrowser {

    static __wrap(ptr) {
        const obj = Object.create(GenomeBrowser.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_genomebrowser_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.genomebrowser_new();
        return GenomeBrowser.__wrap(ret);
    }
    /**
    * @param {any} config_object
    */
    go(config_object) {
        try {
            wasm.genomebrowser_go(this.ptr, addBorrowedObject(config_object));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @returns {GenomeBrowser}
    */
    copy() {
        const ret = wasm.genomebrowser_copy(this.ptr);
        return GenomeBrowser.__wrap(ret);
    }
    /**
    * @param {string} stick_id
    */
    set_stick(stick_id) {
        const ptr0 = passStringToWasm0(stick_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.genomebrowser_set_stick(this.ptr, ptr0, len0);
    }
    /**
    * @param {string} location
    */
    jump(location) {
        const ptr0 = passStringToWasm0(location, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.genomebrowser_jump(this.ptr, ptr0, len0);
    }
    /**
    */
    wait() {
        wasm.genomebrowser_wait(this.ptr);
    }
    /**
    * @param {any} message
    */
    static receive_message(message) {
        try {
            wasm.genomebrowser_receive_message(addBorrowedObject(message));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {string} name
    * @param {boolean} start
    */
    set_artificial(name, start) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.genomebrowser_set_artificial(this.ptr, ptr0, len0, start);
    }
    /**
    * @param {number} left
    * @param {number} right
    */
    goto(left, right) {
        wasm.genomebrowser_goto(this.ptr, left, right);
    }
    /**
    * @param {number} y
    */
    set_y(y) {
        wasm.genomebrowser_set_y(this.ptr, y);
    }
    /**
    * @param {any} path
    */
    set_switch(path) {
        try {
            wasm.genomebrowser_set_switch(this.ptr, addBorrowedObject(path));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {any} path
    */
    clear_switch(path) {
        try {
            wasm.genomebrowser_clear_switch(this.ptr, addBorrowedObject(path));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {any} path
    * @param {any} value
    */
    switch(path, value) {
        try {
            wasm.genomebrowser_switch(this.ptr, addBorrowedObject(path), addBorrowedObject(value));
        } finally {
            heap[stack_pointer++] = undefined;
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {any} path
    * @param {boolean} yn
    */
    radio_switch(path, yn) {
        try {
            wasm.genomebrowser_radio_switch(this.ptr, addBorrowedObject(path), yn);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * @param {Function} f
    */
    set_message_reporter(f) {
        wasm.genomebrowser_set_message_reporter(this.ptr, addHeapObject(f));
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = JSON.stringify(obj === undefined ? null : obj);
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_693216e109162396 = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_0ddaca5d1abfb52f = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_09919627ac0992f5 = function(arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbg_new_4ceeb9be31a13059 = function() { return handleError(function (arg0) {
        const ret = new ResizeObserver(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_observe_008267f77ff4d317 = function(arg0, arg1, arg2) {
        getObject(arg0).observe(getObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_disconnect_971b038366e5c923 = function(arg0) {
        getObject(arg0).disconnect();
    };
    imports.wbg.__wbg_target_5273b5acdb2003a1 = function(arg0) {
        const ret = getObject(arg0).target;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_instanceof_Window_a2a08d3918d7d4d0 = function(arg0) {
        const ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__wbg_document_14a383364c173445 = function(arg0) {
        const ret = getObject(arg0).document;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_screen_d2e4880443d6ff34 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).screen;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_devicePixelRatio_85ae9a993f96e777 = function(arg0) {
        const ret = getObject(arg0).devicePixelRatio;
        return ret;
    };
    imports.wbg.__wbg_crypto_5ed7a70f01a5bd71 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_cancelAnimationFrame_0751dd622bd4f521 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).cancelAnimationFrame(arg1);
    }, arguments) };
    imports.wbg.__wbg_requestAnimationFrame_61bcf77211b282b7 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).requestAnimationFrame(getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_clearTimeout_67fa01a60fce7769 = function(arg0, arg1) {
        getObject(arg0).clearTimeout(arg1);
    };
    imports.wbg.__wbg_fetch_23507368eed8d838 = function(arg0, arg1) {
        const ret = getObject(arg0).fetch(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setTimeout_7d328aba48109be9 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_body_36a11f2467926b2b = function(arg0) {
        const ret = getObject(arg0).body;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_fonts_0117715a3263c78f = function(arg0) {
        const ret = getObject(arg0).fonts;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_createElement_2d8b75cffbd32c70 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getElementById_0c9415d96f5b9ec6 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_signal_b15126622f1b0fc8 = function(arg0) {
        const ret = getObject(arg0).signal;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_e74cd4cbe097a98b = function() { return handleError(function () {
        const ret = new AbortController();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_abort_99a70fbeac6cd75f = function(arg0) {
        getObject(arg0).abort();
    };
    imports.wbg.__wbg_headers_3618f72dcec019b7 = function(arg0) {
        const ret = getObject(arg0).headers;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithstrandinit_41c86e821f771b24 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_rangeMin_f3630c55f9170833 = function(arg0) {
        const ret = getObject(arg0).rangeMin;
        return ret;
    };
    imports.wbg.__wbg_rangeMax_effab01a7ad1c50d = function(arg0) {
        const ret = getObject(arg0).rangeMax;
        return ret;
    };
    imports.wbg.__wbg_precision_df287ac94fee2ec6 = function(arg0) {
        const ret = getObject(arg0).precision;
        return ret;
    };
    imports.wbg.__wbg_setsrc_9bc5e1e5a71b191f = function(arg0, arg1, arg2) {
        getObject(arg0).src = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_new_7b1587cf2acba6fc = function() { return handleError(function () {
        const ret = new Image();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_preventDefault_2e92eb64f38efc0d = function(arg0) {
        getObject(arg0).preventDefault();
    };
    imports.wbg.__wbg_stopPropagation_ce13166e3a9d23c9 = function(arg0) {
        getObject(arg0).stopPropagation();
    };
    imports.wbg.__wbg_altKey_bca103a22083fb54 = function(arg0) {
        const ret = getObject(arg0).altKey;
        return ret;
    };
    imports.wbg.__wbg_ctrlKey_20cdd37998ea7a96 = function(arg0) {
        const ret = getObject(arg0).ctrlKey;
        return ret;
    };
    imports.wbg.__wbg_shiftKey_a4b7a145ce342240 = function(arg0) {
        const ret = getObject(arg0).shiftKey;
        return ret;
    };
    imports.wbg.__wbg_metaKey_44b29aac55225588 = function(arg0) {
        const ret = getObject(arg0).metaKey;
        return ret;
    };
    imports.wbg.__wbg_key_6e807abe0dbacdb8 = function(arg0, arg1) {
        const ret = getObject(arg1).key;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_code_ec695f278753de4d = function(arg0, arg1) {
        const ret = getObject(arg1).code;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_load_a2b75848f23f6c12 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).load(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_HtmlCanvasElement_7b561bd94e483f1d = function(arg0) {
        const ret = getObject(arg0) instanceof HTMLCanvasElement;
        return ret;
    };
    imports.wbg.__wbg_setwidth_59ddc312219f205b = function(arg0, arg1) {
        getObject(arg0).width = arg1 >>> 0;
    };
    imports.wbg.__wbg_setheight_70833966b4ed584e = function(arg0, arg1) {
        getObject(arg0).height = arg1 >>> 0;
    };
    imports.wbg.__wbg_getContext_b506f48cb166bf26 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getContext_686f3aabd97ba151 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2), getObject(arg3));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setvalue_bfcadde2faa3d3c4 = function(arg0, arg1) {
        getObject(arg0).value = arg1;
    };
    imports.wbg.__wbg_top_c3268771d517df8a = function(arg0) {
        const ret = getObject(arg0).top;
        return ret;
    };
    imports.wbg.__wbg_left_eb3ce4311db982e7 = function(arg0) {
        const ret = getObject(arg0).left;
        return ret;
    };
    imports.wbg.__wbg_gain_5e5d2cf1c54d4198 = function(arg0) {
        const ret = getObject(arg0).gain;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_width_4ecb804bc85e4d55 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).width;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_height_372fe9e5f7512b45 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).height;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setProperty_88447bf87ac638d7 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_width_ca58634ccc8c621a = function(arg0) {
        const ret = getObject(arg0).width;
        return ret;
    };
    imports.wbg.__wbg_height_8bcaf2b909fefe9b = function(arg0) {
        const ret = getObject(arg0).height;
        return ret;
    };
    imports.wbg.__wbg_addEventListener_5822223857fe82cb = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments) };
    imports.wbg.__wbg_dispatchEvent_ae25f9bf88337b6f = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).dispatchEvent(getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_removeEventListener_0e2fd54517fc188b = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments) };
    imports.wbg.__wbg_isConnected_5d38ead641724eb8 = function(arg0) {
        const ret = getObject(arg0).isConnected;
        return ret;
    };
    imports.wbg.__wbg_ownerDocument_b690e1b9478673ac = function(arg0) {
        const ret = getObject(arg0).ownerDocument;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_parentElement_479f575ed7e67715 = function(arg0) {
        const ret = getObject(arg0).parentElement;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_settextContent_ce0ac980cbb8c820 = function(arg0, arg1, arg2) {
        getObject(arg0).textContent = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_width_41490e574968bc05 = function(arg0) {
        const ret = getObject(arg0).width;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Element_9a257409019cee1b = function(arg0) {
        const ret = getObject(arg0) instanceof Element;
        return ret;
    };
    imports.wbg.__wbg_id_5ce3823737592465 = function(arg0, arg1) {
        const ret = getObject(arg1).id;
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_setinnerHTML_c3959ab1092c9bae = function(arg0, arg1, arg2) {
        getObject(arg0).innerHTML = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_getBoundingClientRect_16c7230cb788ec1e = function(arg0) {
        const ret = getObject(arg0).getBoundingClientRect();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getElementsByClassName_7f8b947e8e502124 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).getElementsByClassName(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setAttribute_6091f6f3602fc299 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_append_9c69f134e096e4f0 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).append(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_instanceof_WebGlRenderingContext_79048c0314cf40c7 = function(arg0) {
        const ret = getObject(arg0) instanceof WebGLRenderingContext;
        return ret;
    };
    imports.wbg.__wbg_bufferData_b099714639b03843 = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
    };
    imports.wbg.__wbg_bufferData_2db197ac6251395a = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
    };
    imports.wbg.__wbg_texImage2D_2238d3fb7d3bd583 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0, getObject(arg6));
    }, arguments) };
    imports.wbg.__wbg_uniformMatrix4fv_350ada82fee5cc68 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).uniformMatrix4fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_activeTexture_c32bcd0a63a09c15 = function(arg0, arg1) {
        getObject(arg0).activeTexture(arg1 >>> 0);
    };
    imports.wbg.__wbg_attachShader_772486952587993d = function(arg0, arg1, arg2) {
        getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_bindBuffer_6cd1a268e0421a46 = function(arg0, arg1, arg2) {
        getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
    };
    imports.wbg.__wbg_bindTexture_b3162b3f55caf7eb = function(arg0, arg1, arg2) {
        getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
    };
    imports.wbg.__wbg_blendFuncSeparate_7b5ab5663d1a17c6 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
    };
    imports.wbg.__wbg_clear_fe06235bcda1a904 = function(arg0, arg1) {
        getObject(arg0).clear(arg1 >>> 0);
    };
    imports.wbg.__wbg_clearColor_53d69d875a21f3f3 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).clearColor(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_compileShader_4b64c51ce6f0d0be = function(arg0, arg1) {
        getObject(arg0).compileShader(getObject(arg1));
    };
    imports.wbg.__wbg_createBuffer_ae5a57822b3d261c = function(arg0) {
        const ret = getObject(arg0).createBuffer();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_createProgram_97d3ab796f2e4f2a = function(arg0) {
        const ret = getObject(arg0).createProgram();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_createShader_47c8c7b5a08a528d = function(arg0, arg1) {
        const ret = getObject(arg0).createShader(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_createTexture_ce8ff62039834d9c = function(arg0) {
        const ret = getObject(arg0).createTexture();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_deleteBuffer_a4a4bdb0aca0b896 = function(arg0, arg1) {
        getObject(arg0).deleteBuffer(getObject(arg1));
    };
    imports.wbg.__wbg_deleteTexture_d130c5fa2e239659 = function(arg0, arg1) {
        getObject(arg0).deleteTexture(getObject(arg1));
    };
    imports.wbg.__wbg_depthFunc_b08fe1b328ed809b = function(arg0, arg1) {
        getObject(arg0).depthFunc(arg1 >>> 0);
    };
    imports.wbg.__wbg_depthMask_6a37056b2bedc6f0 = function(arg0, arg1) {
        getObject(arg0).depthMask(arg1 !== 0);
    };
    imports.wbg.__wbg_disableVertexAttribArray_37add1973be851f6 = function(arg0, arg1) {
        getObject(arg0).disableVertexAttribArray(arg1 >>> 0);
    };
    imports.wbg.__wbg_drawArrays_31ae6a072f3195be = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).drawArrays(arg1 >>> 0, arg2, arg3);
    };
    imports.wbg.__wbg_drawElements_c18d01e29e69ee7f = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
    };
    imports.wbg.__wbg_enable_74fb1401e1f17f16 = function(arg0, arg1) {
        getObject(arg0).enable(arg1 >>> 0);
    };
    imports.wbg.__wbg_enableVertexAttribArray_0c2fc2819912f6b3 = function(arg0, arg1) {
        getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
    };
    imports.wbg.__wbg_getAttribLocation_b2bad8a5b6116f1f = function(arg0, arg1, arg2, arg3) {
        const ret = getObject(arg0).getAttribLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
        return ret;
    };
    imports.wbg.__wbg_getParameter_d30fc1ac9ac34ffc = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).getParameter(arg1 >>> 0);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getShaderPrecisionFormat_b33fc4b87ec448d8 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).getShaderPrecisionFormat(arg1 >>> 0, arg2 >>> 0);
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_getUniformLocation_c6dfe99dcd260a55 = function(arg0, arg1, arg2, arg3) {
        const ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_linkProgram_23751aba930c7f0c = function(arg0, arg1) {
        getObject(arg0).linkProgram(getObject(arg1));
    };
    imports.wbg.__wbg_scissor_165f9f71fb7b0a62 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).scissor(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_shaderSource_580a31413cee6156 = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_texParameteri_4774c5a61d70319d = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
    };
    imports.wbg.__wbg_uniform1f_f4314cbaa988e283 = function(arg0, arg1, arg2) {
        getObject(arg0).uniform1f(getObject(arg1), arg2);
    };
    imports.wbg.__wbg_uniform1i_096d23b3f6d35c5e = function(arg0, arg1, arg2) {
        getObject(arg0).uniform1i(getObject(arg1), arg2);
    };
    imports.wbg.__wbg_uniform2f_93293456cc5b2730 = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).uniform2f(getObject(arg1), arg2, arg3);
    };
    imports.wbg.__wbg_uniform3f_6c1b37caf32078e2 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).uniform3f(getObject(arg1), arg2, arg3, arg4);
    };
    imports.wbg.__wbg_uniform4f_3406702247d38f50 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        getObject(arg0).uniform4f(getObject(arg1), arg2, arg3, arg4, arg5);
    };
    imports.wbg.__wbg_useProgram_85e8d43a8983270e = function(arg0, arg1) {
        getObject(arg0).useProgram(getObject(arg1));
    };
    imports.wbg.__wbg_vertexAttribPointer_9cf4ab7e9c31e68d = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
    };
    imports.wbg.__wbg_viewport_02810f5f49295b55 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).viewport(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_error_e2677af4c7f31a14 = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__wbg_log_7761a8b8a8c1864e = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__wbg_warn_8b29c6b80217b0e4 = function(arg0) {
        console.warn(getObject(arg0));
    };
    imports.wbg.__wbg_instanceof_HtmlElement_d2b7afdac18ee070 = function(arg0) {
        const ret = getObject(arg0) instanceof HTMLElement;
        return ret;
    };
    imports.wbg.__wbg_style_3fb37aa4b3701322 = function(arg0) {
        const ret = getObject(arg0).style;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setonload_8fda3afa75bfeb0d = function(arg0, arg1) {
        getObject(arg0).onload = getObject(arg1);
    };
    imports.wbg.__wbg_instanceof_CanvasRenderingContext2d_9037c3eea625e27b = function(arg0) {
        const ret = getObject(arg0) instanceof CanvasRenderingContext2D;
        return ret;
    };
    imports.wbg.__wbg_setfillStyle_a0bd3a7496c1c5ae = function(arg0, arg1) {
        getObject(arg0).fillStyle = getObject(arg1);
    };
    imports.wbg.__wbg_setfont_82970f5214a91062 = function(arg0, arg1, arg2) {
        getObject(arg0).font = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_settextBaseline_839228178275498a = function(arg0, arg1, arg2) {
        getObject(arg0).textBaseline = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_drawImage_565b9cb9006e09aa = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        getObject(arg0).drawImage(getObject(arg1), arg2, arg3, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_beginPath_996aa2e0e610ea8f = function(arg0) {
        getObject(arg0).beginPath();
    };
    imports.wbg.__wbg_fill_86ef462953b4d991 = function(arg0) {
        getObject(arg0).fill();
    };
    imports.wbg.__wbg_arc_1e4d496206f232b6 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        getObject(arg0).arc(arg1, arg2, arg3, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_closePath_9b491c3521e7984c = function(arg0) {
        getObject(arg0).closePath();
    };
    imports.wbg.__wbg_lineTo_353b6fb86b5f4517 = function(arg0, arg1, arg2) {
        getObject(arg0).lineTo(arg1, arg2);
    };
    imports.wbg.__wbg_moveTo_551e83e6728c3a72 = function(arg0, arg1, arg2) {
        getObject(arg0).moveTo(arg1, arg2);
    };
    imports.wbg.__wbg_clearRect_7d73f724a3fc825c = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).clearRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_fillRect_37d4341db168ab0f = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_fillText_a7a551c0e8034440 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_measureText_8df3dd0cf8f666b8 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).measureText(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_instanceof_AudioBuffer_c74003a7d21effea = function(arg0) {
        const ret = getObject(arg0) instanceof AudioBuffer;
        return ret;
    };
    imports.wbg.__wbg_set_23d56ff06768e13b = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).set(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_length_2c074182e565b967 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_item_e9de93d9a7489e03 = function(arg0, arg1) {
        const ret = getObject(arg0).item(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_clientX_6b0b436b9d080ac5 = function(arg0) {
        const ret = getObject(arg0).clientX;
        return ret;
    };
    imports.wbg.__wbg_clientY_ad822da59bec5850 = function(arg0) {
        const ret = getObject(arg0).clientY;
        return ret;
    };
    imports.wbg.__wbg_deltaY_e3158374108000c8 = function(arg0) {
        const ret = getObject(arg0).deltaY;
        return ret;
    };
    imports.wbg.__wbg_deltaMode_78fa2eac67504e1e = function(arg0) {
        const ret = getObject(arg0).deltaMode;
        return ret;
    };
    imports.wbg.__wbg_connect_633555bc7344598d = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).connect(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_disconnect_64bab0efac0feedc = function() { return handleError(function (arg0) {
        getObject(arg0).disconnect();
    }, arguments) };
    imports.wbg.__wbg_instanceof_Response_e928c54c1025470c = function(arg0) {
        const ret = getObject(arg0) instanceof Response;
        return ret;
    };
    imports.wbg.__wbg_status_5b4a574de7c5bbfe = function(arg0) {
        const ret = getObject(arg0).status;
        return ret;
    };
    imports.wbg.__wbg_ok_2e44e661aa8fedb0 = function(arg0) {
        const ret = getObject(arg0).ok;
        return ret;
    };
    imports.wbg.__wbg_arrayBuffer_9c26a73988618f92 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setbuffer_268b8e029383d924 = function(arg0, arg1) {
        getObject(arg0).buffer = getObject(arg1);
    };
    imports.wbg.__wbg_setonended_519c00ee657450cf = function(arg0, arg1) {
        getObject(arg0).onended = getObject(arg1);
    };
    imports.wbg.__wbg_new_cc396d3bfb759457 = function() { return handleError(function (arg0) {
        const ret = new AudioBufferSourceNode(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_start_27104226d655d8de = function() { return handleError(function (arg0) {
        getObject(arg0).start();
    }, arguments) };
    imports.wbg.__wbg_stop_c7ec9063415a420c = function() { return handleError(function (arg0) {
        getObject(arg0).stop();
    }, arguments) };
    imports.wbg.__wbg_destination_5bc469ae2192967b = function(arg0) {
        const ret = getObject(arg0).destination;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_state_a030384a8c518869 = function(arg0) {
        const ret = getObject(arg0).state;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_e2e737399e087a85 = function() { return handleError(function () {
        const ret = new lAudioContext();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_suspend_cd50f19e2a5135a2 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).suspend();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_createGain_f0c35f309aa98acc = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).createGain();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_decodeAudioData_951bd64aed8090f3 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).decodeAudioData(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_resume_4b659cb2e2765df8 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).resume();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_8e67715e9a34e663 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).getRandomValues(getArrayU8FromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newwitheventinitdict_b5e214d400efb31f = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new CustomEvent(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_pointerId_3517dc72b60101cb = function(arg0) {
        const ret = getObject(arg0).pointerId;
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_typeof = function(arg0) {
        const ret = typeof getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbg_get_f0f4f1608ebf633e = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_93debb0e2e184ab6 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_2ab697f1555e0dbc = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newnoargs_fc5356289219b93b = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_f0540490a24a79bb = function() {
        const ret = new Map();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_89247d3aeaa38cc5 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_4573f605ca4b5f10 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_306ce8d57919e6ae = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_ba1ddafe9ea7a3a2 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_be3cc430364fd32c = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_56d9c9f814daeeee = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_8c35aeee4ac77f2b = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_set_c1d04f8b45a036e7 = function(arg0, arg1, arg2) {
        getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
    };
    imports.wbg.__wbg_from_7ff9036e9b5c3ccb = function(arg0) {
        const ret = Array.from(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_isArray_628aca8c24017cde = function(arg0) {
        const ret = Array.isArray(getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_apply_5db7f1649d649fe3 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).apply(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_8e1338b908441bd2 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_set_e44d2fe94a18567f = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_now_513c8208bd94c09b = function() {
        const ret = Date.now();
        return ret;
    };
    imports.wbg.__wbg_instanceof_Object_0c703ab7113e61ec = function(arg0) {
        const ret = getObject(arg0) instanceof Object;
        return ret;
    };
    imports.wbg.__wbg_entries_b24687f151d83be3 = function(arg0) {
        const ret = Object.entries(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_4debc41d4fc92ce5 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_de1150f91b23aa89 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_9ca61320599a2c84 = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_97cf52648830a70d = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_a0172b213e2469e9 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_e09c0b925ab8de5d = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_ba29f3d9e79e44a3 = function(arg0, arg1, arg2) {
        const ret = new Uint16Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_b0ff18b468a0d3f8 = function(arg0, arg1, arg2) {
        const ret = new Float32Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_66067e08ab6cefb5 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_211080f5c116c01f = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_buffer_deb8de1785238b3d = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_slice_b70ecf4df9a7f261 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).slice(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithlength_f28ac7a9191c7e26 = function(arg0) {
        const ret = new Float32Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_fef5d6f48ab38db8 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_a82b513315f16ea4 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_has_ded5f0e31f1ff6ad = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_ownKeys_5a935243d98fcf13 = function() { return handleError(function (arg0) {
        const ret = Reflect.ownKeys(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_set_b12cd0ab82903c2f = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_random_9f33d5bdc74069f8 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
    imports.wbg.__wbg_parse_5b823b8686817eb8 = function() { return handleError(function (arg0, arg1) {
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper872 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 169, __wbg_adapter_34);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper874 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 169, __wbg_adapter_37);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper876 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 169, __wbg_adapter_40);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper878 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 169, __wbg_adapter_43);
        return addHeapObject(ret);
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedFloat32Memory0 = new Float32Array(wasm.memory.buffer);
    cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);

    wasm.__wbindgen_start();
    return wasm;
}

function initSync(bytes) {
    const imports = getImports();

    initMemory(imports);

    const module = new WebAssembly.Module(bytes);
    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('peregrine_ensembl_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
