/*

import Basics exposing (identity)
import Elm.Kernel.Debug exposing (crash)
import Elm.Kernel.Json exposing (equality, runHelp, unwrap, wrap)
import Elm.Kernel.List exposing (Cons, Nil)
import Elm.Kernel.Utils exposing (Tuple2)
import Elm.Kernel.Platform exposing (export)
import Json.Decode as Json exposing (map, map2, succeed)
import Result exposing (isOk)
import VirtualDom exposing (toHandlerInt)

*/



// Double underscore properties are replaced with single letters.
// Exactly which letter is used depends on the order the properties are first mentioned.
// This preserves the letters from v1.0.3 for compatibility with tools that assume those names.
// elm-explorations/test: https://github.com/elm-explorations/test/blob/d5eb84809de0f8bbf50303efd26889092c800609/src/Elm/Kernel/HtmlAsJson.js
// elm-pages: https://github.com/dillonkearns/elm-pages/blob/fa1d0347016e20917b412de5c3657c2e6e095087/generator/src/build.js#L642
// The list of names was extracted using the following command:
// grep --only --extended-regexp '_{2}[a-z]\w+' src/Elm/Kernel/VirtualDom.js | awk '!visited[$0]++'
void { __text: null, __descendantsCount: null, __tag: null, __facts: null, __kids: null, __namespace: null, __model: null, __render: null, __diff: null, __tagger: null, __node: null, __refs: null, __thunk: null, __key: null, __value: null, __parent: null, __handler: null, __index: null, __data: null, __domNode: null, __eventNode: null, __length: null, __patches: null, __inserts: null, __endInserts: null, __vnode: null, __entry: null };



// HELPERS


// Increases by 1 before every render. Used to know if the DOM node index
// on each virtual node needs to be reset.
// Even if you render 10 000 times per second, this counter won't become
// too big until after 50 000 years.
var _VirtualDom_renderCount = Number.MIN_SAFE_INTEGER;

var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

function _VirtualDom_insertBefore(parent, child, reference)
{
	if (!(child.parentNode === parent && child.nextSibling === reference))
	{
		parent.insertBefore(child, reference);
	}
}

function _VirtualDom_insertAfter(parent, child, reference)
{
	if (!(child.parentNode === parent && child.previousSibling === reference))
	{
		parent.insertBefore(child, reference === null ? parent.firstChild : reference.nextSibling);
	}
}

function _VirtualDom_moveBefore_(parent, child, reference)
{
	if (!(child.parentNode === parent && child.nextSibling === reference))
	{
		parent.moveBefore(child, reference);
	}
}

function _VirtualDom_moveAfter_(parent, child, reference)
{
	if (!(child.parentNode === parent && child.previousSibling === reference))
	{
		parent.moveBefore(child, reference === null ? parent.firstChild : reference.nextSibling);
	}
}

var _VirtualDom_supports_moveBefore = typeof Element !== 'undefined' && typeof Element.prototype.moveBefore === 'function';

var _VirtualDom_moveBefore = _VirtualDom_supports_moveBefore ? _VirtualDom_moveBefore_ : _VirtualDom_insertBefore;

var _VirtualDom_moveAfter = _VirtualDom_supports_moveBefore ? _VirtualDom_moveAfter_ : _VirtualDom_insertAfter;

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs __Platform_export available to work

	/**__PROD/
	var node = args['node'];
	//*/
	/**__DEBUG/
	var node = args && args['node'] ? args['node'] : __Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});

function _VirtualDom_wrap(object)
{
	// Add a non-enumerable property to not break Elm's equality checks.
	// You aren’t supposed to compare virtual nodes, but since it’s possible
	// to not break people who do, why not?
	return Object.defineProperty(object, '_', {
		value: {
			// We only read from `x.__oldDomNodes`. Uses `i`. Is set to `__newDomNodes` at each render.
			__oldDomNodes: [],
			// This is set to a new, empty array on each render. We push to `y.__newDomNodes`. The reason we have to have two arrays is because the same virtual node can be used multiple times, so sometimes `x === y`.
			__newDomNodes: [],
			__renderedAt: Number.MIN_SAFE_INTEGER,
			// The index of the next DOM node in `__oldDomNodes` to use.
			i: 0
		}
	});
}






// TEXT


function _VirtualDom_text(string)
{
	return _VirtualDom_wrap({
		$: __2_TEXT,
		__text: string
	});
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = []; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			kids.push(kidList.a);
		}

		return _VirtualDom_wrap({
			$: __2_NODE,
			__tag: tag,
			__facts: _VirtualDom_organizeFacts(factList),
			__kids: kids,
			__namespace: namespace
		});
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], kidsMap = Object.create(null); kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			var key = kid.a;
			// Handle duplicate keys by adding a postfix.
			while (key in kidsMap)
			{
				key += _VirtualDom_POSTFIX;
			}
			kids.push(kid);
			kidsMap[key] = kid.b;
		}

		return _VirtualDom_wrap({
			$: __2_KEYED_NODE,
			__tag: tag,
			__facts: _VirtualDom_organizeFacts(factList),
			// __kids holds the order and length of the kids.
			__kids: kids,
			// __kidsMap is a dict from key to node.
			// Note when iterating JavaScript objects, numeric-looking keys come first.
			__kidsMap: kidsMap,
			__namespace: namespace
		});
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return _VirtualDom_wrap({
		$: __2_CUSTOM,
		__facts: _VirtualDom_organizeFacts(factList),
		__model: model,
		__render: render,
		__diff: diff
	});
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: __2_TAGGER,
		__tagger: tagger,
		__node: node
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: __2_THUNK,
		__refs: refs,
		__thunk: thunk,
		__node: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a__1_EVENT',
		__key: key,
		__value: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a__1_STYLE',
		__key: key,
		__value: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a__1_PROP',
		__key: key,
		__value: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a__1_ATTR',
		__key: key,
		__value: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a__1_ATTR_NS',
		__key: key,
		__value: { __namespace: namespace, __value: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**__PROD/''//*//**__DEBUG/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**__PROD/''//*//**__DEBUG/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof __Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(__Json_unwrap(value)))
		? __Json_wrap(
			/**__PROD/''//*//**__DEBUG/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a__1_EVENT')
		? A2(_VirtualDom_on, attr.__key, _VirtualDom_mapHandler(func, attr.__value))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = __VirtualDom_toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(__Json_map, func, handler.a)
				:
			A3(__Json_map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				__Json_succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return __Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		__$message: func(record.__$message),
		__$stopPropagation: record.__$stopPropagation,
		__$preventDefault: record.__$preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.__key;
		var value = entry.__value;

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a__1_PROP')
			? (key === 'className')
				? _VirtualDom_addClass(subFacts, key, __Json_unwrap(value))
				: subFacts[key] = __Json_unwrap(value)
			:
		(tag === 'a__1_ATTR' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === __2_THUNK)
	{
		return _VirtualDom_render(vNode.__node || (vNode.__node = vNode.__thunk()), eventNode);
	}

	if (tag === __2_TEXT)
	{
		var domNode = _VirtualDom_doc.createTextNode(vNode.__text);
		_VirtualDom_storeDomNode(vNode, domNode)
		return domNode;
	}

	if (tag === __2_TAGGER)
	{
		return _VirtualDom_render(vNode.__node, function (msg) { return eventNode(vNode.__tagger(msg)) });
	}

	if (tag === __2_CUSTOM)
	{
		var domNode = vNode.__render(vNode.__model);
		_VirtualDom_applyFacts(domNode, eventNode, {}, vNode.__facts);
		_VirtualDom_storeDomNode(vNode, domNode);
		return domNode;
	}

	// at this point `tag` must be __2_NODE or __2_KEYED_NODE

	var domNode = vNode.__namespace
		? _VirtualDom_doc.createElementNS(vNode.__namespace, vNode.__tag)
		: _VirtualDom_doc.createElement(vNode.__tag);

	if (_VirtualDom_divertHrefToApp && vNode.__tag == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, {}, vNode.__facts);

	for (var kids = vNode.__kids, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === __2_NODE ? kids[i] : kids[i].b, eventNode));
	}

	_VirtualDom_storeDomNode(vNode, domNode);

	return domNode;
}

// Like `_VirtualDom_render`, but:
// - Assumes that we have already gone through diffing.
// - Only re-renders text nodes and font tags.
function _VirtualDom_renderTranslated(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === __2_THUNK)
	{
		return _VirtualDom_renderTranslated(vNode.__node, eventNode);
	}

	if (tag === __2_TEXT)
	{
		var domNode = _VirtualDom_doc.createTextNode(vNode.__text);
		_VirtualDom_storeDomNodeTranslated(vNode, domNode)
		return domNode;
	}

	if (tag === __2_TAGGER)
	{
		return _VirtualDom_renderTranslated(vNode.__node, function (msg) { return eventNode(vNode.__tagger(msg)) });
	}

	if ((tag === __2_NODE || tag === __2_KEYED_NODE) && vNode.__tag === 'font')
	{
		var domNode = vNode.__namespace
			? _VirtualDom_doc.createElementNS(vNode.__namespace, vNode.__tag)
			: _VirtualDom_doc.createElement(vNode.__tag);

		_VirtualDom_applyFacts(domNode, eventNode, {}, vNode.__facts);

		for (var kids = vNode.__kids, i = 0; i < kids.length; i++)
		{
			_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === __2_NODE ? kids[i] : kids[i].b, eventNode));
		}

		_VirtualDom_storeDomNodeTranslated(vNode, domNode);

		return domNode;
	}

	return vNode._.__newDomNodes[vNode._.__newDomNodes.length - 1];
}

function _VirtualDom_storeDomNode(vNode, domNode)
{
	if (vNode._.__renderedAt !== _VirtualDom_renderCount)
	{
		vNode._.__oldDomNodes = vNode._.__newDomNodes;
		vNode._.__newDomNodes = [];
		vNode._.i = 0;
		vNode._.__renderedAt = _VirtualDom_renderCount;
	}
	vNode._.__newDomNodes.push(domNode);
}

// Like `_VirtualDom_storeDomNode`, but assumes that we have already gone
// through diffing, and increased counters. This means that we should replace
// the “previous” DOM node.
function _VirtualDom_storeDomNodeTranslated(vNode, domNode)
{
	vNode._.__newDomNodes[vNode._.__newDomNodes.length - 1] = domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, prevFacts, facts)
{
	// Since properties and attributes are sometimes linked, we need to remove old
	// ones before setting new ones. Otherwise we might set the `id` attribute and
	// then remove the `id` property, resulting in no id, for example.

	if (prevFacts.a__1_STYLE !== undefined)
	{
		_VirtualDom_removeStyles(domNode, prevFacts.a__1_STYLE, facts.a__1_STYLE || {});
	}

	if (prevFacts.a__1_PROP !== undefined)
	{
		_VirtualDom_removeProps(domNode, prevFacts.a__1_PROP, facts.a__1_PROP || {});
	}

	if (prevFacts.a__1_ATTR !== undefined)
	{
		_VirtualDom_removeAttrs(domNode, prevFacts.a__1_ATTR, facts.a__1_ATTR || {});
	}

	if (prevFacts.a__1_ATTR_NS !== undefined)
	{
		_VirtualDom_removeAttrsNS(domNode, prevFacts.a__1_ATTR_NS, facts.a__1_ATTR_NS || {});
	}

	// Then, apply new facts.

	if (facts.a__1_STYLE !== undefined)
	{
		_VirtualDom_applyStyles(domNode, prevFacts.a__1_STYLE || {}, facts.a__1_STYLE);
	}

	if (facts.a__1_PROP !== undefined)
	{
		_VirtualDom_applyProps(domNode, prevFacts.a__1_PROP || {}, facts.a__1_PROP);
	}

	if (facts.a__1_ATTR !== undefined)
	{
		_VirtualDom_applyAttrs(domNode, prevFacts.a__1_ATTR || {}, facts.a__1_ATTR);
	}

	if (facts.a__1_ATTR_NS !== undefined)
	{
		_VirtualDom_applyAttrsNS(domNode, prevFacts.a__1_ATTR_NS || {}, facts.a__1_ATTR_NS);
	}

	// Finally, apply events. There is no separate phase for removing events.
	// Attributes and properties can't interfere with events, so it's fine.

	if (facts.a__1_EVENT !== undefined || prevFacts.a__1_EVENT !== undefined)
	{
		_VirtualDom_applyEvents(domNode, eventNode, facts.a__1_EVENT || {});
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, prevStyles, styles)
{
	for (var key in styles)
	{
		var value = styles[key];
		if (value !== prevStyles[key])
		{
			// `.setProperty` must be used for `--custom-properties`.
			// Standard properties never start with a dash.
			// `.setProperty` requires for example "border-radius" with a dash,
			// while both `.style["border-radius"]` and `.style["borderRadius"]`.
			// Elm used to only use `.style`. In order to support existing code like
			// `Html.Attributes.style "borderRadius" "5px"` we default to `.style`
			// and only use `.setProperty` if the property name starts with a dash.
			if (key.charCodeAt(0) === 45)
			{
				domNode.style.setProperty(key, value);
			}
			else
			{
				domNode.style[key] = value;
			}
		}
	}
}


function _VirtualDom_removeStyles(domNode, prevStyles, styles)
{
	for (var key in prevStyles)
	{
		if (!(key in styles))
		{
			// See `_VirtualDom_applyStyles`.
			if (key.charCodeAt(0) === 45)
			{
				domNode.style.removeProperty(key);
			}
			else
			{
				domNode.style[key] = '';
			}
		}
	}
}



// APPLY PROPS

function _VirtualDom_applyProps(domNode, prevProps, props)
{
	for (var key in props)
	{
		var value = props[key];
		// `value`, `checked`, `selected` and `selectedIndex` can all change via
		// user interactions, so for those it’s important to compare to the
		// actual DOM value. Because of that we compare against the actual DOM
		// node, rather than `prevProps`. Note that many properties are
		// normalized (to certain values, or to a full URL, for example), so if
		// you use properties the might be set on every render if you don't
		// supply the normalized form. `Html.Attributes` avoids this by
		// primarily using attributes.
		if (value !== domNode[key])
		{
			domNode[key] = value;
		}
	}
}


function _VirtualDom_removeProps(domNode, prevProps, props)
{
	for (var key in prevProps)
	{
		if (!(key in props))
		{
			var value = props[key];
			switch (typeof value)
			{
				// Most string properties default to the empty string.
				case 'string':
					domNode[key] = '';
					break;
				// Most boolean properties default to false.
				case 'boolean':
					domNode[key] = false;
					break;
				// For other types it's unclear what to do.
			}
			// Standard properties cannot be deleted, but it is not an error trying.
			// Non-standard properties can be deleted.
			delete domNode[key];
		}
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, prevAttrs, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (value !== prevAttrs[key])
		{
			domNode.setAttribute(key, value);
		}
	}
}


function _VirtualDom_removeAttrs(domNode, prevAttrs, attrs)
{
	for (var key in prevAttrs)
	{
		if (!(key in attrs))
		{
			domNode.removeAttribute(key);
		}
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, prevNsAttrs, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.__namespace;
		var value = pair.__value;
		var previous = prevNsAttrs[key];
		if (!previous)
		{
			domNode.setAttributeNS(namespace, key, value);
		}
		else if (previous.__namespace !== namespace)
		{
			domNode.removeAttributeNS(previous.__namespace, key);
			domNode.setAttributeNS(namespace, key, value);
		}
		else if (previous.__value !== value)
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}


function _VirtualDom_removeAttrsNS(domNode, prevNsAttrs, nsAttrs)
{
	for (var key in prevNsAttrs)
	{
		if (!(key in nsAttrs))
		{
			domNode.removeAttributeNS(prevNsAttrs[key].__namespace, key);
		}
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			delete allCallbacks[key];
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.__handler;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.__handler = newHandler;
				oldCallback.__eventNode = eventNode;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: __VirtualDom_toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}

	for (key in allCallbacks)
	{
		if (!(key in events))
		{
			domNode.removeEventListener(key, allCallbacks[key]);
			delete allCallbacks[key];
		}
	}
}

function _VirtualDom_lazyUpdateEvents(domNode, eventNode)
{
	var allCallbacks = domNode.elmFs;

	if (allCallbacks)
	{
		for (var key in allCallbacks)
		{
			var oldCallback = allCallbacks[key];
			oldCallback.__eventNode = eventNode;
		}
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(initialEventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.__handler;
		var eventNode = callback.__eventNode;
		var result = __Json_runHelp(handler.a, event);

		if (!__Result_isOk(result))
		{
			return;
		}

		var tag = __VirtualDom_toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.__$message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.__$stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.__$preventDefault) && event.preventDefault(),
			eventNode
		);
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.__handler = initialHandler;
	callback.__eventNode = initialEventNode;

	return callback;
}



// DIFF


function _VirtualDom_diff(_x, y)
{
	// Hack to provide the new virtual dom node to `_VirtualDom_applyPatches` without
	// making breaking changes to elm/browser.
	return y;
}

function _VirtualDom_diffHelp(x, y, eventNode)
{
	if (x === y)
	{
		return [_VirtualDom_quickVisit(x, y, eventNode), false];
	}

	// Remember: When virtualizing already existing DOM, we can’t know
	// where `map` and `lazy` nodes should be, and which ones are `Keyed`.
	// So it’s important to not redraw fully when just the new virtual dom node
	// is a `map` or `lazy` or `Keyed`, to avoid unnecessary DOM changes on startup.

	while (x.$ === __2_TAGGER)
	{
		x = x.__node;
	}

	if (y.$ === __2_TAGGER)
	{
		return _VirtualDom_diffHelp(x, y.__node, function (msg) { return eventNode(y.__tagger(msg)) });
	}

	if (x.$ === __2_THUNK)
	{
		if (y.$ === __2_THUNK)
		{
			var xRefs = x.__refs;
			var yRefs = y.__refs;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.__node = x.__node;
				// We still need to visit every node inside the lazy node, to
				// make sure that the event listeners get the current
				// `eventNode`, and to increase and reset counters. This is
				// cheaper than calling `view`, diffing and rendering at least.
				return [_VirtualDom_quickVisit(x, y, eventNode), false];
			}
			y.__node = y.__thunk();
			return _VirtualDom_diffHelp(x.__node, y.__node, eventNode);
		}
		else
		{
			return _VirtualDom_diffHelp(x.__node, y, eventNode);
		}
	}

	if (y.$ === __2_THUNK)
	{
		y.__node = y.__thunk();
		return _VirtualDom_diffHelp(x, y.__node, eventNode);
	}

	var domNode = _VirtualDom_consumeDomNode(x, y);

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === __2_NODE && yType === __2_KEYED_NODE)
		{
			y = _VirtualDom_dekey(y);
			yType = __2_NODE;
		}
		else if (xType === __2_KEYED_NODE && yType === __2_NODE)
		{
			x = _VirtualDom_dekey(x);
			xType = __2_NODE;
		}
		else
		{
			return [_VirtualDom_applyPatchRedraw(y, eventNode), false];
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case __2_TEXT:
			if (x.__text !== y.__text)
			{
				// Text replaced or changed by translation plugins.
				if (!domNode.parentNode || domNode.data !== x.__text)
				{
					return [domNode, true];
				}
				domNode.replaceData(0, domNode.length, y.__text);
			}
			return [domNode, false];

		case __2_NODE:
			return [_VirtualDom_diffNodes(domNode, x, y, eventNode, _VirtualDom_diffKids), false];

		case __2_KEYED_NODE:
			return [_VirtualDom_diffNodes(domNode, x, y, eventNode, _VirtualDom_diffKeyedKids), false];

		case __2_CUSTOM:
			if (x.__render !== y.__render)
			{
				return [_VirtualDom_applyPatchRedraw(y, eventNode), false];
			}

			_VirtualDom_applyFacts(domNode, eventNode, x.__facts, y.__facts);

			var patch = y.__diff(x.__model, y.__model);
			patch && patch(domNode);

			return [domNode, false];
	}
}

// When we know that a node does not need updating, just quickly visit its children to:
// - Update event listeners’ reference to the current `eventNode`.
// - Increase or reset `.i`.
function _VirtualDom_quickVisit(x, y, eventNode)
{
	switch (y.$)
	{
		case __2_TAGGER:
			return _VirtualDom_quickVisit(x.__node, y.__node, function (msg) { return eventNode(y.__tagger(msg)) });

		case __2_THUNK:
			return _VirtualDom_quickVisit(x.__node, y.__node, eventNode);
	}

	var domNode = _VirtualDom_consumeDomNode(x, y);

	switch (y.$)
	{
		case __2_TEXT:
			return domNode;

		case __2_NODE:
			_VirtualDom_lazyUpdateEvents(domNode, eventNode);
			for (var xKids = x.__kids, yKids = y.__kids, i = 0; i < yKids.length; i++)
			{
				_VirtualDom_quickVisit(xKids[i], yKids[i], eventNode);
			}
			return domNode;

		case __2_KEYED_NODE:
			_VirtualDom_lazyUpdateEvents(domNode, eventNode);
			for (var xKids = x.__kids, yKids = y.__kids, i = 0; i < yKids.length; i++)
			{
				_VirtualDom_quickVisit(xKids[i].b, yKids[i].b, eventNode);
			}
			return domNode;

		case __2_CUSTOM:
			_VirtualDom_lazyUpdateEvents(domNode, eventNode);
			return domNode;
	}
}

// When we remove a node, quickly visit its children to remove dom nodes from the virtual nodes.
function _VirtualDom_removeVisit(x, shouldRemoveFromDom)
{
	switch (x.$)
	{
		case __2_TAGGER:
			_VirtualDom_removeVisit(x.__node, shouldRemoveFromDom);
			return;

		case __2_THUNK:
			_VirtualDom_removeVisit(x.__node, shouldRemoveFromDom);
			return;
	}

	var domNode;

	if (x._.__renderedAt === _VirtualDom_renderCount)
	{
		domNode = x._.__oldDomNodes[x._.i];
		x._.i++;
	}
	else
	{
		x._.__oldDomNodes = x._.__newDomNodes;
		domNode = x._.__oldDomNodes[0];
		x._.i = 1;
		x._.__renderedAt = _VirtualDom_renderCount;
	}
	if (shouldRemoveFromDom) {
		// An extension might have (re-)moved the element, so we can’t just
		// call `parentDomNode.removeChild(domNode)`. That throws an error if
		// the node is not a child of `parentDomNode`.
		var parentNode = domNode.parentNode;
		if (parentNode)
		{
			parentNode.removeChild(domNode);
		}
	}

	switch (x.$)
	{
		case __2_TEXT:
			return;

		case __2_NODE:
			for (var kids = x.__kids, i = 0; i < kids.length; i++)
			{
				_VirtualDom_removeVisit(kids[i], false);
			}
			return;

		case __2_KEYED_NODE:
			for (var kids = x.__kids, i = 0; i < kids.length; i++)
			{
				_VirtualDom_removeVisit(kids[i].b, false);
			}
			return;

		case __2_CUSTOM:
			return;
	}
}

// Consume DOM node number `i` from `x`:s "old" nodes, push it to `y`:s "new" nodes, and return the DOM node. Reset things if from a different render.
function _VirtualDom_consumeDomNode(x, y)
{
	if (y._.__renderedAt !== _VirtualDom_renderCount)
	{
		y._.__oldDomNodes = y._.__newDomNodes;
		y._.__newDomNodes = [];
		y._.i = 0;
		y._.__renderedAt = _VirtualDom_renderCount;
	}
	if (x._.__renderedAt === _VirtualDom_renderCount)
	{
		var domNode = x._.__oldDomNodes[x._.i];
		y._.__newDomNodes.push(domNode);
		x._.i++;
		return domNode;
	}
	else
	{
		x._.__oldDomNodes = x._.__newDomNodes;
		var domNode = x._.__oldDomNodes[0];
		y._.__newDomNodes.push(domNode);
		x._.i = 1;
		x._.__renderedAt = _VirtualDom_renderCount;
		return domNode;
	}
}

function _VirtualDom_diffNodes(domNode, x, y, eventNode, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.__tag !== y.__tag || x.__namespace !== y.__namespace)
	{
		return _VirtualDom_applyPatchRedraw(y, eventNode);
	}

	_VirtualDom_applyFacts(domNode, eventNode, x.__facts, y.__facts);

	var translated = diffKids(domNode, x, y, eventNode);

	if (translated)
	{
		for (var i = domNode.childNodes.length - 1; i >= 0; i--)
		{
			var child = domNode.childNodes[i];
			// Remove all text nodes, and font tags (Google Translate).
			if (child.nodeType === 3 || child.localName === 'font')
			{
				domNode.removeChild(child);
			}
		}

		for (var current = domNode.firstChild, i = 0; i < y.__kids.length; i++)
		{
			var kid = y.__kids[i];
			var vNode = y.$ === __2_KEYED_NODE ? kid.b : kid;
			// Re-render text nodes and font tags. (It returns the already
			// existing DOM node for the rest.) Then make sure everything is in
			// the correct order.
			var child = _VirtualDom_renderTranslated(vNode, eventNode);
			if (child === current)
			{
				current = current.nextSibling;
			}
			else
			{
				_VirtualDom_insertBefore(domNode, child, current)
			}
		}
	}

	return domNode;
}



// DIFF KIDS


function _VirtualDom_diffKids(parentDomNode, xParent, yParent, eventNode)
{
	var xKids = xParent.__kids;
	var yKids = yParent.__kids;

	var xLen = xKids.length;
	var yLen = yKids.length;

	var translated = false;

	// PAIRWISE DIFF COMMON KIDS

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var diffReturn = _VirtualDom_diffHelp(xKids[i], yKids[i], eventNode);
		if (diffReturn[1])
		{
			translated = true;
		}
	}

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		for (var i = yLen; i < xLen; i++)
		{
			_VirtualDom_removeVisit(xKids[i], true);
		}
	}
	else if (xLen < yLen)
	{
		for (var i = xLen; i < yLen; i++)
		{
			var y = yKids[i];
			var domNode = _VirtualDom_render(y, eventNode);
			_VirtualDom_appendChild(parentDomNode, domNode);
		}
	}

	return translated;
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(parentDomNode, xParent, yParent, eventNode)
{
	var xKids = xParent.__kids;
	var yKids = yParent.__kids;

	var xKidsMap = xParent.__kidsMap;
	var yKidsMap = yParent.__kidsMap;

	var xIndexLower = 0;
	var yIndexLower = 0;
	var xIndexUpper = xKids.length - 1;
	var yIndexUpper = yKids.length - 1;

	var domNodeLower = null;
	var domNodeUpper = null;

	var translated = false;

	var handleDiffReturnLower = function (diffReturn)
	{
		if (diffReturn[1])
		{
			translated = true;
		}

		// An extension might have removed an element we have rendered before,
		// or moved it to another parent. In such cases, `parentDomNode.insertBefore(x, domNode)`
		// and `parentDomNode.moveBefore(x, domNode)` would throw errors. Keep the
		// previous reference element in those cases – that should still result in the correct
		// element order, just with some element missing.
		var domNode = diffReturn[0];
		if (domNode.parentNode === parentDomNode)
		{
			domNodeLower = domNode;
		}
	};

	var handleDiffReturnUpper = function (diffReturn)
	{
		if (diffReturn[1])
		{
			translated = true;
		}

		// Same as `handleDiffReturnLower`, but for `domNodeUpper` instead of `domNodeLower`.
		var domNode = diffReturn[0];
		if (domNode.parentNode === parentDomNode)
		{
			domNodeUpper = domNode;
		}
	};

	while (true)
	{
		// Consume from the start until we get stuck.
		while (xIndexLower <= xIndexUpper && yIndexLower <= yIndexUpper)
		{
			var xKid = xKids[xIndexLower];
			var yKid = yKids[yIndexLower];
			var xKey = xKid.a;
			var yKey = yKid.a;
			var x = xKid.b;
			var y = yKid.b;

			if (xKey === yKey)
			{
				var diffReturn = _VirtualDom_diffHelp(x, y, eventNode);
				xIndexLower++;
				yIndexLower++;
				handleDiffReturnLower(diffReturn);
				continue;
			}

			var xMoved = false;

			if (xKey in yKidsMap)
			{
				xMoved = true;
			}
			else
			{
				_VirtualDom_removeVisit(x, true);
				xIndexLower++;
			}

			if (yKey in xKidsMap)
			{
				if (xMoved)
				{
					break;
				}
			}
			else
			{
				var domNode = _VirtualDom_render(y, eventNode);
				_VirtualDom_insertAfter(parentDomNode, domNode, domNodeLower);
				yIndexLower++;
				domNodeLower = domNode;
			}
		}

		// Consume from the end until we get stuck.
		while (xIndexUpper > xIndexLower && yIndexUpper > yIndexLower)
		{
			var xKid = xKids[xIndexUpper];
			var yKid = yKids[yIndexUpper];
			var xKey = xKid.a;
			var yKey = yKid.a;
			var x = xKid.b;
			var y = yKid.b;

			if (xKey === yKey)
			{
				var diffReturn = _VirtualDom_diffHelp(x, y, eventNode);
				xIndexUpper--;
				yIndexUpper--;
				handleDiffReturnUpper(diffReturn);
				continue;
			}

			var xMoved = false;

			if (xKey in yKidsMap)
			{
				xMoved = true;
			}
			else
			{
				_VirtualDom_removeVisit(x, true);
				xIndexUpper--;
			}

			if (yKey in xKidsMap)
			{
				if (xMoved)
				{
					break;
				}
			}
			else
			{
				var domNode = _VirtualDom_render(y, eventNode);
				_VirtualDom_insertBefore(parentDomNode, domNode, domNodeUpper);
				yIndexUpper--;
				domNodeUpper = domNode;
			}
		}

		var swapped = false;

		// Check if the start or end can be unstuck by a swap.
		if (xIndexLower < xIndexUpper && yIndexLower < yIndexUpper)
		{
			var xKidLower = xKids[xIndexLower];
			var yKidLower = yKids[yIndexLower];
			var xKidUpper = xKids[xIndexUpper];
			var yKidUpper = yKids[yIndexUpper];

			var xKeyLower = xKidLower.a;
			var yKeyLower = yKidLower.a;
			var xKeyUpper = xKidUpper.a;
			var yKeyUpper = yKidUpper.a;

			if (xKeyLower === yKeyUpper)
			{
				var diffReturn = _VirtualDom_diffHelp(xKidLower.b, yKidUpper.b, eventNode);
				xIndexLower++;
				yIndexUpper--;
				_VirtualDom_moveBefore(parentDomNode, diffReturn[0], domNodeUpper);
				handleDiffReturnUpper(diffReturn);
				swapped = true;
			}

			if (xKeyUpper == yKeyLower)
			{
				var diffReturn = _VirtualDom_diffHelp(xKidUpper.b, yKidLower.b, eventNode);
				yIndexLower++;
				xIndexUpper--;
				_VirtualDom_moveAfter(parentDomNode, diffReturn[0], domNodeLower);
				handleDiffReturnLower(diffReturn);
				swapped = true;
			}
		}

		// If no swap, stop consuming from start and end.
		if (!swapped)
		{
			break;
		}
	}

	// For the remaining items in the new virtual DOM, diff with the corresponding
	// old virtual DOM node (if any) and move it into the correct place.
	// This might result in more moves than technically needed, but:
	// - Moving nodes isn’t that slow. Diffing algorithms aren’t free either.
	// - In browsers supporting `.moveBefore()` unnecessary moves have no unwanted side effects.
	// - Elm has never had a “perfect” implementation for Keyed, and this should not
	//   be worse than the previous implementation.
	for (; yIndexLower <= yIndexUpper; yIndexLower++)
	{
		var yKid = yKids[yIndexLower];
		var yKey = yKid.a;
		var y = yKid.b;
		if (yKey in xKidsMap)
		{
			var x = xKidsMap[yKey];
			var diffReturn = _VirtualDom_diffHelp(x, y, eventNode);
			_VirtualDom_moveAfter(parentDomNode, diffReturn[0], domNodeLower);
			handleDiffReturnLower(diffReturn);
		}
		else
		{
			var domNode = _VirtualDom_render(y, eventNode);
			_VirtualDom_insertAfter(parentDomNode, domNode, domNodeLower);
			domNodeLower = domNode;
		}
	}

	// Remove the remaining old virtual DOM nodes that aren’t present in the new virtual DOM.
	for (; xIndexLower <= xIndexUpper; xIndexLower++)
	{
		var xKid = xKids[xIndexLower];
		var xKey = xKid.a;
		if (!(xKey in yKidsMap)) {
			_VirtualDom_removeVisit(xKid.b, true);
		}
	}

	return translated;
}

var _VirtualDom_POSTFIX = '_elmW6BL';

// See `_VirtualDom_diff`.
function _VirtualDom_applyPatches(_rootDomNode, oldVirtualNode, newVirtualNode, eventNode)
{
	_VirtualDom_renderCount++;
	var diffReturn = _VirtualDom_diffHelp(oldVirtualNode, newVirtualNode, eventNode);
	return diffReturn[0];
}

function _VirtualDom_applyPatchRedraw(vNode, eventNode)
{
	// We have already pushed the DOM node for this virtual node in `_VirtualDom_diffHelp`. Pop it off.
	// The `_VirtualDom_render` call below will push a new DOM node.
	var domNode = vNode._.__newDomNodes.pop();
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}

	return newNode;
}

/*
This is a mapping between attribute names and their corresponding boolean properties,
and only the ones where the attribute name is different from the property name
(usually in casing – attributes are case insensitive, and returned lowercase).

The mapping currently only lists the ones that have dedicated functions in elm/html.

There are more though! Running the following code in the console gives more results:

[...new Set(Object.getOwnPropertyNames(window).filter(d => d.startsWith("HTML") || d === "Node" || d === "Element" || d === "EventTarget").flatMap(d => {c = window[d]; m = c.name.match(/^HTML(\w+)Element$/); e = document.createElement(m ? m[1].replace("Anchor", "a").replace("Paragraph", "p").replace("Image", "img").replace("Media", "video").replace(/^([DOU])List$/, "$1l").toLowerCase() : "div"); return Object.getOwnPropertyNames(c.prototype).filter(n => typeof e[n] === "boolean")}))].filter(n => /[A-Z]/.test(n)).sort()

Potential candidates to support (should probably add to elm/html first):
disablePictureInPicture – video
playsInline – video
formNoValidate – button, input

Not useful with Elm:
noModule – script
shadowRootClonable – template
shadowRootDelegatesFocus – template
shadowRootSerializable – template

Legacy/deprecated:
allowFullscreen – iframe (use allow="fullscreen" instead)
allowPaymentRequest – iframe (use allow="payment" instead)
noHref - area (image maps)
noResize – frame (not iframe)
noShade – hr
trueSpeed – marquee

Special:
defaultChecked
defaultMuted
defaultSelected

No corresponding attribute:
disableRemotePlayback
isConnected
isContentEditable
preservesPitch
sharedStorageWritable
willValidate

Unclear:
adAuctionHeaders
browsingTopics

Regarding the special ones: `<input checked>` results in `.defaultChecked === true`. Similarly, setting `input.defaultChecked = true` results in `input.outerHTML === '<input checked="">'`. `input.checked = true` does _not_ result in an attribute though: `.checked` has no corresponding attribute. However, when serializing
`Html.input [ Html.Attributes.checked True ] []` to HTML, `<input checked>` is the most reasonable choice.
So when virtualizing, we actually want to turn the `checked` attribute back into a boolean "checked" property in Elm
(even if according to the DOM, it's `.defaultChecked`). Same thing for `muted` and `selected`.
*/
var _VirtualDom_camelCaseBoolProperties = {
	novalidate: "noValidate",
	readonly: "readOnly",
	ismap: "isMap"
};


function _VirtualDom_virtualize(node)
{
	// The debugger has always done `_VirtualDom_virtualize(document)` instead of
	// `_VirtualDom_virtualize(document.body)` by mistake. To be backwards compatible
	// with elm/browser, support that here.
	if (node === _VirtualDom_doc)
	{
		node = _VirtualDom_doc.body;
	}

	var vNode = _VirtualDom_virtualizeHelp(node);
	if (vNode)
	{
		return vNode;
	}

	// Backwards compatibility: Elm has always supported mounting onto any node,
	// even comment nodes.
	vNode = _VirtualDom_text('');
	vNode._.__newDomNodes.push(node);
	return vNode;
}

function _VirtualDom_virtualizeHelp(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		var vNode = _VirtualDom_text(node.textContent);
		vNode._.__newDomNodes.push(node);
		return vNode;
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return undefined;
	}


	// ELEMENT NODES

	var tag = node.localName;

	// It’s common to put script tags in the body, and it’s not possible
	// to render a meaningful script tag using Elm, so skip them.
	// The only other element I can think of that you might add to the body
	// is a noscript tag.
	switch (tag)
	{
		case 'script':
		case 'noscript':
			return undefined;
	}

	var attrList = __List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var namespaceURI = attr.namespaceURI;
		var name = attr.name;
		var value = attr.value;
		var propertyName = _VirtualDom_camelCaseBoolProperties[name] || name;
		var propertyValue = node[propertyName];
		// Turning attributes into virtual DOM representations is not an exact science.
		// If someone runs an Elm `view` function and then serializes it to HTML, we need to guess:
		//
		// - how they chose to serialize it
		// - what the most likely virtual DOM representation is
		//
		// In elm/html, the convention is to use attributes rather than properties where possible,
		// which is good for virtualization – we can just turn most HTML attributes we find as-is
		// into virtual DOM attributes. But when we encounter `foo="bar"` we can’t know if it was
		// created using `Html.Attributes.attribute "foo" "bar"` or
		// `Html.Attributes.property "foo" (Json.Encode.string "bar")`.
		//
		// It's not the end of the world if we guess wrong, though, it just leads to a bit of
		// unnecessary DOM mutations on the first render.
		attrList = __List_Cons(
			// `Html.Attributes.value` sets the `.value` property to a string, because that’s the
			// only way to set the value of an input element. The `.value` property has no corresponding
			// attribute; the `value` attribute maps to the `.defaultValue` property. But when serializing,
			// the most likely way to do it is to serialize the `.value` property to the `value` attribute.
			name === 'value'
				? A2(_VirtualDom_property, name, value)
				:
			// Try to guess if the attribute comes from one of the functions
			// implemented using `boolProperty` in `Html.Attributes`.
			// See `Html.Attributes.spellcheck` for that exception.
			typeof propertyValue === 'boolean' && name !== 'spellcheck'
				? A2(_VirtualDom_property, propertyName, propertyValue)
				:
			// Otherwise, guess that it is an attribute. The user might have used `Html.Attributes.property`,
			// but there’s no way for us to know that.
			namespaceURI
			 	? A3(_VirtualDom_attributeNS, namespaceURI, name, value)
				: A2(_VirtualDom_attribute, name, value),
			attrList
		);
	}

	var namespace =
		node.namespaceURI === 'http://www.w3.org/1999/xhtml'
			? undefined
			: node.namespaceURI;
	var kidList = __List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		var kidNode = _VirtualDom_virtualizeHelp(kids[i]);
		if (kidNode)
		{
			kidList = __List_Cons(kidNode, kidList);
		}
	}

	if (_VirtualDom_divertHrefToApp && node.localName === 'a')
	{
		node.addEventListener('click', _VirtualDom_divertHrefToApp(node));
	}

	var vNode = A4(_VirtualDom_nodeNS, namespace, tag, attrList, kidList);
	vNode._.__newDomNodes.push(node);
	return vNode;
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.__kids;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return Object.defineProperty({
		$: __2_NODE,
		__tag: keyedNode.__tag,
		__facts: keyedNode.__facts,
		__kids: kids,
		__namespace: keyedNode.__namespace
	}, '_', {
		value: keyedNode._
	});
}
