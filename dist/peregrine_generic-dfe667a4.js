'use strict';

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

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

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
function __wbg_adapter_28(arg0, arg1, arg2, arg3) {
    wasm._dyn_core__ops__function__Fn__A_B___Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h7b49a07dceeed8fa(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
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
function __wbg_adapter_31(arg0, arg1) {
    wasm._dyn_core__ops__function__Fn_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0c11da727e27394e(arg0, arg1);
}

function __wbg_adapter_34(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb618b785939c9dbe(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_37(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__Fn__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb618b785939c9dbe(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_40(arg0, arg1) {
    wasm._dyn_core__ops__function__Fn_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h0c11da727e27394e(arg0, arg1);
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
* @param {GenomeBrowser} api
* @returns {any}
*/
function test(api) {
    _assertClass(api, GenomeBrowser);
    var ptr0 = api.ptr;
    api.ptr = 0;
    var ret = wasm.test(ptr0);
    return takeObject(ret);
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
*/
function main() {
    wasm.main();
}

/**
*/
function init_panic_hook() {
    wasm.init_panic_hook();
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
function __wbg_adapter_86(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h7f723d19c58d521b(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }

let cachegetFloat32Memory0 = null;
function getFloat32Memory0() {
    if (cachegetFloat32Memory0 === null || cachegetFloat32Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat32Memory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachegetFloat32Memory0;
}

function getArrayF32FromWasm0(ptr, len) {
    return getFloat32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
/**
*/
class GenomeBrowser {

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
        var ret = wasm.genomebrowser_new();
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
        var ret = wasm.genomebrowser_copy(this.ptr);
        return GenomeBrowser.__wrap(ret);
    }
    /**
    * @param {string} stick_id
    */
    set_stick(stick_id) {
        var ptr0 = passStringToWasm0(stick_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.genomebrowser_set_stick(this.ptr, ptr0, len0);
    }
    /**
    * @param {string} location
    */
    jump(location) {
        var ptr0 = passStringToWasm0(location, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
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
        var ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
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

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('peregrine_generic_bg.wasm', (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('peregrine_generic-dfe667a4.js', document.baseURI).href)));
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_new_119f8177d8717c43 = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_86(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            var ret = new Promise(cb0);
            return addHeapObject(ret);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_ownKeys_1e941d117f37bfa7 = function() { return handleError(function (arg0) {
        var ret = Reflect.ownKeys(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_length_c5fa152b8c3f311f = function(arg0) {
        var ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_get_73c087db0a496c21 = function(arg0, arg1) {
        var ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_6d26c712aa73c8b2 = function() { return handleError(function (arg0, arg1) {
        var ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        var ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Window_fac4f1f8e3c61c1f = function(arg0) {
        var ret = getObject(arg0) instanceof Window;
        return ret;
    };
    imports.wbg.__wbg_document_29fb71d7cea23553 = function(arg0) {
        var ret = getObject(arg0).document;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_getElementById_8ef24477d541ac87 = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        var ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_log_4989d5b00a0cc297 = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        var ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(arg0, arg1) {
        var ret = getObject(arg1).stack;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbg_self_b4546ea7b590539e = function() { return handleError(function () {
        var ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_c279fea81f426a68 = function() { return handleError(function () {
        var ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_038a6ea0ff17789f = function() { return handleError(function () {
        var ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_4f93ce884bcee597 = function() { return handleError(function () {
        var ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        var ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_newnoargs_1a11e7e8c906996c = function(arg0, arg1) {
        var ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_e91f71ddf1f45cff = function() { return handleError(function (arg0, arg1) {
        var ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_deleteTexture_d01966b7c40e021c = function(arg0, arg1) {
        getObject(arg0).deleteTexture(getObject(arg1));
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        var ret = false;
        return ret;
    };
    imports.wbg.__wbg_disconnect_971b038366e5c923 = function(arg0) {
        getObject(arg0).disconnect();
    };
    imports.wbg.__wbg_getBoundingClientRect_18745abec7ca4344 = function(arg0) {
        var ret = getObject(arg0).getBoundingClientRect();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_width_b71369c36942e876 = function(arg0) {
        var ret = getObject(arg0).width;
        return ret;
    };
    imports.wbg.__wbg_height_32ced313c9702334 = function(arg0) {
        var ret = getObject(arg0).height;
        return ret;
    };
    imports.wbg.__wbg_screen_b7cfb552273beeb1 = function() { return handleError(function (arg0) {
        var ret = getObject(arg0).screen;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_width_9e425f92e4561f28 = function() { return handleError(function (arg0) {
        var ret = getObject(arg0).width;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_height_8ed53c0b1b63b284 = function() { return handleError(function (arg0) {
        var ret = getObject(arg0).height;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setwidth_6ffbc02dcd566284 = function(arg0, arg1) {
        getObject(arg0).width = arg1 >>> 0;
    };
    imports.wbg.__wbg_setheight_dade0779787da2d7 = function(arg0, arg1) {
        getObject(arg0).height = arg1 >>> 0;
    };
    imports.wbg.__wbg_disable_17f1c6c5eb2ce0cc = function(arg0, arg1) {
        getObject(arg0).disable(arg1 >>> 0);
    };
    imports.wbg.__wbg_enable_7c4e3edc5f949467 = function(arg0, arg1) {
        getObject(arg0).enable(arg1 >>> 0);
    };
    imports.wbg.__wbg_viewport_22eb522b17716ae0 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).viewport(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_scissor_9dea0ce04835102f = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).scissor(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_clearColor_c5ff7c53725cd770 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).clearColor(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_depthMask_1b7cbecb4f7a77e0 = function(arg0, arg1) {
        getObject(arg0).depthMask(arg1 !== 0);
    };
    imports.wbg.__wbg_clear_fb32592cc59d7486 = function(arg0, arg1) {
        getObject(arg0).clear(arg1 >>> 0);
    };
    imports.wbg.__wbg_blendFuncSeparate_924f08ee284d41d9 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
    };
    imports.wbg.__wbg_new_4ceeb9be31a13059 = function() { return handleError(function (arg0) {
        var ret = new ResizeObserver(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_observe_008267f77ff4d317 = function(arg0, arg1, arg2) {
        getObject(arg0).observe(getObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_new_e188e2b7b0fb9c29 = function() { return handleError(function () {
        var ret = new lAudioContext();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_resume_5fb2a0923f0c3e72 = function() { return handleError(function (arg0) {
        var ret = getObject(arg0).resume();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_fc132cd6e1148c51 = function() { return handleError(function (arg0) {
        var ret = new AudioBufferSourceNode(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_state_fd72e108b82b5954 = function(arg0) {
        var ret = getObject(arg0).state;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_memory = function() {
        var ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_79a3294266d4e783 = function(arg0) {
        var ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_22a36e6023ad3cd0 = function(arg0, arg1, arg2) {
        var ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_945397fb09fec0b8 = function(arg0) {
        var ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_4c09b94094b6c48a = function(arg0) {
        var ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_decodeAudioData_3596998a047e0b76 = function() { return handleError(function (arg0, arg1) {
        var ret = getObject(arg0).decodeAudioData(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_instanceof_AudioBuffer_d8339a833b51c3f1 = function(arg0) {
        var ret = getObject(arg0) instanceof AudioBuffer;
        return ret;
    };
    imports.wbg.__wbg_setbuffer_eee6b16c18bd0211 = function(arg0, arg1) {
        getObject(arg0).buffer = getObject(arg1);
    };
    imports.wbg.__wbg_createGain_ed06249f6d261787 = function() { return handleError(function (arg0) {
        var ret = getObject(arg0).createGain();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_gain_c39530be2060ba2a = function(arg0) {
        var ret = getObject(arg0).gain;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setvalue_024e0aa538d768e9 = function(arg0, arg1) {
        getObject(arg0).value = arg1;
    };
    imports.wbg.__wbg_connect_df90f4d669ac6f1f = function() { return handleError(function (arg0, arg1) {
        var ret = getObject(arg0).connect(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_destination_71f0858ad0b542e2 = function(arg0) {
        var ret = getObject(arg0).destination;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setonended_068e40c5ca0b7edb = function(arg0, arg1) {
        getObject(arg0).onended = getObject(arg1);
    };
    imports.wbg.__wbg_start_e867508db9e07608 = function() { return handleError(function (arg0) {
        getObject(arg0).start();
    }, arguments) };
    imports.wbg.__wbg_stop_5612ad8314455938 = function() { return handleError(function (arg0) {
        getObject(arg0).stop();
    }, arguments) };
    imports.wbg.__wbg_disconnect_84ac3f5e0f15ab38 = function() { return handleError(function (arg0) {
        getObject(arg0).disconnect();
    }, arguments) };
    imports.wbg.__wbg_suspend_705e18797a56e83d = function() { return handleError(function (arg0) {
        var ret = getObject(arg0).suspend();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_then_4f3c7f6f3d36634a = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_4b48f9f8159fea77 = function() {
        var ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_d29a397c9cc5d746 = function() { return handleError(function (arg0, arg1, arg2) {
        var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_bc38aee0c7628305 = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).slice(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_147122b15d293e6e = function() { return handleError(function () {
        var ret = new AbortController();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_signal_5c5a9fa291d177d7 = function(arg0) {
        var ret = getObject(arg0).signal;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setTimeout_56c7fbf887ce45de = function() { return handleError(function (arg0, arg1, arg2) {
        var ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithstrandinit_99b3f2fe783c1e36 = function() { return handleError(function (arg0, arg1, arg2) {
        var ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_headers_5d596461dd0eb578 = function(arg0) {
        var ret = getObject(arg0).headers;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_e9985c5cb9fe73e2 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).set(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_fetch_825f0bc35b153806 = function(arg0, arg1) {
        var ret = getObject(arg0).fetch(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_Response_4e568b2aa3949591 = function(arg0) {
        var ret = getObject(arg0) instanceof Response;
        return ret;
    };
    imports.wbg.__wbg_arrayBuffer_9c07533b14ac31e9 = function() { return handleError(function (arg0) {
        var ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_length_68e13e7bbd918464 = function(arg0) {
        var ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_set_223873223acf6d07 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_now_d89e184b3e3c06ec = function() {
        var ret = Date.now();
        return ret;
    };
    imports.wbg.__wbg_addEventListener_de2304ba2cd4ae89 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments) };
    imports.wbg.__wbg_style_4495258c34c8479e = function(arg0) {
        var ret = getObject(arg0).style;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setProperty_27800a80982863e0 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_new_4d13de00bc466ec7 = function() { return handleError(function () {
        var ret = new Image();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setsrc_a4945588e506f152 = function(arg0, arg1, arg2) {
        getObject(arg0).src = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setonload_2c8d312ae470c3dc = function(arg0, arg1) {
        getObject(arg0).onload = getObject(arg1);
    };
    imports.wbg.__wbg_createProgram_cb87410d7953886a = function(arg0) {
        var ret = getObject(arg0).createProgram();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_attachShader_59c48985cebb7e05 = function(arg0, arg1, arg2) {
        getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
    };
    imports.wbg.__wbg_linkProgram_8f08623b5e4defde = function(arg0, arg1) {
        getObject(arg0).linkProgram(getObject(arg1));
    };
    imports.wbg.__wbg_getProgramParameter_997b1d908df119e6 = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        var ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbg_getProgramInfoLog_85f178a2537873e4 = function(arg0, arg1, arg2) {
        var ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_abort_7b87cd42b53665b4 = function(arg0) {
        getObject(arg0).abort();
    };
    imports.wbg.__wbg_length_dc4406e1e327b5c1 = function(arg0) {
        var ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_newwithlength_7c62a7ef7bc51ec5 = function(arg0) {
        var ret = new Float32Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_43381b9f511c0022 = function(arg0, arg1, arg2) {
        var ret = new Float32Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_f8e82ecea29338a7 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_bindBuffer_a2638a5e0667e694 = function(arg0, arg1, arg2) {
        getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
    };
    imports.wbg.__wbg_subarray_0ecf6888a1f88e8f = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_9030a17a88d465da = function(arg0) {
        var ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_bufferData_3d8fa81d662f42a6 = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
    };
    imports.wbg.__wbg_deleteBuffer_8c4f7249107edcd4 = function(arg0, arg1) {
        getObject(arg0).deleteBuffer(getObject(arg1));
    };
    imports.wbg.__wbg_removeEventListener_cb28b2b1c2746766 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).removeEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments) };
    imports.wbg.__wbg_pointerId_f3b186037b20027e = function(arg0) {
        var ret = getObject(arg0).pointerId;
        return ret;
    };
    imports.wbg.__wbg_clientX_2683f412434970b1 = function(arg0) {
        var ret = getObject(arg0).clientX;
        return ret;
    };
    imports.wbg.__wbg_left_0979c3bcc2e2c7a6 = function(arg0) {
        var ret = getObject(arg0).left;
        return ret;
    };
    imports.wbg.__wbg_clientY_99740677fc53452d = function(arg0) {
        var ret = getObject(arg0).clientY;
        return ret;
    };
    imports.wbg.__wbg_top_dc64d0d4addbf5ad = function(arg0) {
        var ret = getObject(arg0).top;
        return ret;
    };
    imports.wbg.__wbg_deltaMode_e5f4db662363d971 = function(arg0) {
        var ret = getObject(arg0).deltaMode;
        return ret;
    };
    imports.wbg.__wbg_deltaY_48411dcaf81863cf = function(arg0) {
        var ret = getObject(arg0).deltaY;
        return ret;
    };
    imports.wbg.__wbg_stopPropagation_36adf718596c5abf = function(arg0) {
        getObject(arg0).stopPropagation();
    };
    imports.wbg.__wbg_preventDefault_7a8483e2b1a95a37 = function(arg0) {
        getObject(arg0).preventDefault();
    };
    imports.wbg.__wbg_random_727732de4695ec15 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
    imports.wbg.__wbg_ownerDocument_0db41bf5c9886695 = function(arg0) {
        var ret = getObject(arg0).ownerDocument;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_createElement_8a4eea3a05d8804d = function() { return handleError(function (arg0, arg1, arg2) {
        var ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_settextContent_68b1b04017e68705 = function(arg0, arg1, arg2) {
        getObject(arg0).textContent = arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setAttribute_936a229ff5ccc5c9 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_body_3f92bb47323529c7 = function(arg0) {
        var ret = getObject(arg0).body;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_append_56f13655a1928de8 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).append(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_setinnerHTML_5779e0f1b53c018b = function(arg0, arg1, arg2) {
        getObject(arg0).innerHTML = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_getElementsByClassName_dd89fbddf63d0a6e = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).getElementsByClassName(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_parentElement_66b17bdb7116a997 = function(arg0) {
        var ret = getObject(arg0).parentElement;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_HtmlCanvasElement_f6c37daa8caa628a = function(arg0) {
        var ret = getObject(arg0) instanceof HTMLCanvasElement;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlElement_b7ca85c835f5fa1b = function(arg0) {
        var ret = getObject(arg0) instanceof HTMLElement;
        return ret;
    };
    imports.wbg.__wbg_length_8e540e6f4bdd185c = function(arg0) {
        var ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_item_c99510fe6e9cf0fc = function(arg0, arg1) {
        var ret = getObject(arg0).item(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_getContext_591a34067d6e74f2 = function() { return handleError(function (arg0, arg1, arg2) {
        var ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_instanceof_WebGlRenderingContext_993375e8e3c89d8a = function(arg0) {
        var ret = getObject(arg0) instanceof WebGLRenderingContext;
        return ret;
    };
    imports.wbg.__wbg_target_5273b5acdb2003a1 = function(arg0) {
        var ret = getObject(arg0).target;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_createShader_6e53b06f8246dd4e = function(arg0, arg1) {
        var ret = getObject(arg0).createShader(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_shaderSource_da40079957cc7b9d = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_compileShader_a0529af8bd8f75e8 = function(arg0, arg1) {
        getObject(arg0).compileShader(getObject(arg1));
    };
    imports.wbg.__wbg_getShaderParameter_799c4bb49e4ed18a = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).getShaderParameter(getObject(arg1), arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getShaderInfoLog_610d23dc5ecea600 = function(arg0, arg1, arg2) {
        var ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_getParameter_35dde2d34db469d8 = function() { return handleError(function (arg0, arg1) {
        var ret = getObject(arg0).getParameter(arg1 >>> 0);
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_getShaderPrecisionFormat_85199651439f7049 = function(arg0, arg1, arg2) {
        var ret = getObject(arg0).getShaderPrecisionFormat(arg1 >>> 0, arg2 >>> 0);
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_rangeMin_1bfbaa2ff85b1d0f = function(arg0) {
        var ret = getObject(arg0).rangeMin;
        return ret;
    };
    imports.wbg.__wbg_rangeMax_9e23e0c4f5f67c19 = function(arg0) {
        var ret = getObject(arg0).rangeMax;
        return ret;
    };
    imports.wbg.__wbg_precision_8a6b3cf84956d995 = function(arg0) {
        var ret = getObject(arg0).precision;
        return ret;
    };
    imports.wbg.__wbg_shiftKey_2332cc226cb1d7ba = function(arg0) {
        var ret = getObject(arg0).shiftKey;
        return ret;
    };
    imports.wbg.__wbg_ctrlKey_69295095147bf188 = function(arg0) {
        var ret = getObject(arg0).ctrlKey;
        return ret;
    };
    imports.wbg.__wbg_altKey_ae9c9006368ae133 = function(arg0) {
        var ret = getObject(arg0).altKey;
        return ret;
    };
    imports.wbg.__wbg_metaKey_e14a5ae90d7f57f3 = function(arg0) {
        var ret = getObject(arg0).metaKey;
        return ret;
    };
    imports.wbg.__wbg_measureText_ce8ad05917b839f6 = function() { return handleError(function (arg0, arg1, arg2) {
        var ret = getObject(arg0).measureText(getStringFromWasm0(arg1, arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_width_296bc37edeb65c1e = function(arg0) {
        var ret = getObject(arg0).width;
        return ret;
    };
    imports.wbg.__wbg_clearTimeout_60252f615c569bcf = function(arg0, arg1) {
        getObject(arg0).clearTimeout(arg1);
    };
    imports.wbg.__wbg_requestAnimationFrame_4614b7cdb59d7a59 = function() { return handleError(function (arg0, arg1) {
        var ret = getObject(arg0).requestAnimationFrame(getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_dispatchEvent_2516bd8370e15440 = function() { return handleError(function (arg0, arg1) {
        var ret = getObject(arg0).dispatchEvent(getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createBuffer_d2eacb77df030839 = function(arg0) {
        var ret = getObject(arg0).createBuffer();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_useProgram_46c3da2c4f63a450 = function(arg0, arg1) {
        getObject(arg0).useProgram(getObject(arg1));
    };
    imports.wbg.__wbg_enableVertexAttribArray_c3a081cad68729b3 = function(arg0, arg1) {
        getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
    };
    imports.wbg.__wbg_vertexAttribPointer_d38a321eb7d5cca0 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
    };
    imports.wbg.__wbg_createTexture_5ef109c6273dc022 = function(arg0) {
        var ret = getObject(arg0).createTexture();
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_bindTexture_2b5f790e7d4cd749 = function(arg0, arg1, arg2) {
        getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
    };
    imports.wbg.__wbg_texImage2D_9355f4f5188e6bfd = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0, getObject(arg6));
    }, arguments) };
    imports.wbg.__wbg_texParameteri_ad91ced205a29d7a = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
    };
    imports.wbg.__wbg_activeTexture_bd38595c7597a4cf = function(arg0, arg1) {
        getObject(arg0).activeTexture(arg1 >>> 0);
    };
    imports.wbg.__wbg_uniform1i_98c4fe8017f33762 = function(arg0, arg1, arg2) {
        getObject(arg0).uniform1i(getObject(arg1), arg2);
    };
    imports.wbg.__wbg_uniform2f_55ac056501399297 = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).uniform2f(getObject(arg1), arg2, arg3);
    };
    imports.wbg.__wbg_uniform1f_f876d55a7738d36d = function(arg0, arg1, arg2) {
        getObject(arg0).uniform1f(getObject(arg1), arg2);
    };
    imports.wbg.__wbg_uniform3f_ebab3e169a0d4c85 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).uniform3f(getObject(arg1), arg2, arg3, arg4);
    };
    imports.wbg.__wbg_uniform4f_dedb611c7e278a0c = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        getObject(arg0).uniform4f(getObject(arg1), arg2, arg3, arg4, arg5);
    };
    imports.wbg.__wbg_uniformMatrix4fv_862ba2b3eff8d82f = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).uniformMatrix4fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_drawElements_d9dbaeb560ae708e = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
    };
    imports.wbg.__wbg_drawArrays_8af3d9732ebff966 = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).drawArrays(arg1 >>> 0, arg2, arg3);
    };
    imports.wbg.__wbg_disableVertexAttribArray_ec660169a7ca6236 = function(arg0, arg1) {
        getObject(arg0).disableVertexAttribArray(arg1 >>> 0);
    };
    imports.wbg.__wbg_error_009e67eab9c16665 = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__wbg_drawImage_4d857e265aafb4e2 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        getObject(arg0).drawImage(getObject(arg1), arg2, arg3, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_instanceof_CanvasRenderingContext2d_c3096464126a8635 = function(arg0) {
        var ret = getObject(arg0) instanceof CanvasRenderingContext2D;
        return ret;
    };
    imports.wbg.__wbg_setfillStyle_09025fd29a1a7bfc = function(arg0, arg1) {
        getObject(arg0).fillStyle = getObject(arg1);
    };
    imports.wbg.__wbg_fillRect_eb3bd0523bbeb872 = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_setfont_fdcb14b8ae26fa31 = function(arg0, arg1, arg2) {
        getObject(arg0).font = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_beginPath_09b3a1cd1e7b6602 = function(arg0) {
        getObject(arg0).beginPath();
    };
    imports.wbg.__wbg_moveTo_7f5f36e2abfa38a6 = function(arg0, arg1, arg2) {
        getObject(arg0).moveTo(arg1, arg2);
    };
    imports.wbg.__wbg_lineTo_8fb484a3623af781 = function(arg0, arg1, arg2) {
        getObject(arg0).lineTo(arg1, arg2);
    };
    imports.wbg.__wbg_closePath_494eea7cbe647f9d = function(arg0) {
        getObject(arg0).closePath();
    };
    imports.wbg.__wbg_fill_89eb4ae1e9f43fdd = function(arg0) {
        getObject(arg0).fill();
    };
    imports.wbg.__wbg_settextBaseline_5732c598422c4e19 = function(arg0, arg1, arg2) {
        getObject(arg0).textBaseline = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_fillText_a90902ed37c09fe6 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_getUniformLocation_3bdf262b7c9e6b9c = function(arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_getAttribLocation_dffd2ef66035bc53 = function(arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).getAttribLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_5ec4f877349ca212 = function(arg0, arg1, arg2) {
        var ret = new Uint16Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_bufferData_fe39dd8c7189f533 = function(arg0, arg1, arg2, arg3) {
        getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
    };
    imports.wbg.__wbg_warn_f9b80af3c73d7193 = function(arg0) {
        console.warn(getObject(arg0));
    };
    imports.wbg.__wbg_newwitheventinitdict_102f11461924f344 = function() { return handleError(function (arg0, arg1, arg2) {
        var ret = new CustomEvent(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_e3c72355d091d5d4 = function() { return handleError(function (arg0, arg1, arg2) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_c143b19d87139944 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        var ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_ec75d0d5815be736 = function() {
        var ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_5fb34279c9df6c77 = function(arg0, arg1, arg2) {
        getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
    };
    imports.wbg.__wbg_apply_86d95332399ce038 = function() { return handleError(function (arg0, arg1, arg2) {
        var ret = getObject(arg0).apply(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
        var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = JSON.stringify(obj === undefined ? null : obj);
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        var ret = debugString(getObject(arg1));
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_then_6d5072fec3fdb237 = function(arg0, arg1) {
        var ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_resolve_7161ec6fd5b1cd29 = function(arg0) {
        var ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_key_06d094c95d0b3a39 = function(arg0, arg1) {
        var ret = getObject(arg1).key;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_code_775ef09c147cac9e = function(arg0, arg1) {
        var ret = getObject(arg1).code;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_closure_wrapper2733 = function(arg0, arg1, arg2) {
        var ret = makeClosure(arg0, arg1, 90, __wbg_adapter_28);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper2744 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 90, __wbg_adapter_31);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper2746 = function(arg0, arg1, arg2) {
        var ret = makeMutClosure(arg0, arg1, 90, __wbg_adapter_34);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper2865 = function(arg0, arg1, arg2) {
        var ret = makeClosure(arg0, arg1, 90, __wbg_adapter_37);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper3047 = function(arg0, arg1, arg2) {
        var ret = makeClosure(arg0, arg1, 90, __wbg_adapter_40);
        return addHeapObject(ret);
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    wasm.__wbindgen_start();
    return wasm;
}

exports.GenomeBrowser = GenomeBrowser;
exports.default = init;
exports.init_panic_hook = init_panic_hook;
exports.main = main;
exports.test = test;
