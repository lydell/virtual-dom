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



// HELPERS


// Flips between true and false every render.
var _VirtualDom_even = true;

var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

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
			__domNodes: [],
			i: 0,
			j: 0,
		}
	});
}






// TEXT


function _VirtualDom_text(string)
{
	return _VirtualDom_wrap({
		$: __2_TEXT,
		__text: string,
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
		for (var kids = []; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			kids.push(kidList.a);
		}

		return _VirtualDom_wrap({
			$: __2_KEYED_NODE,
			__tag: tag,
			__facts: _VirtualDom_organizeFacts(factList),
			__kids: kids,
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

	return vNode._.__domNodes[_VirtualDom_even ? vNode._.i - 1 : vNode._.j - 1];
}

function _VirtualDom_storeDomNode(vNode, domNode)
{
	if (_VirtualDom_even)
	{
		vNode._.__domNodes.splice(vNode._.i, 0, domNode);
		vNode._.i++;
	}
	else
	{
		vNode._.__domNodes.splice(vNode._.j, 0, domNode);
		vNode._.j++;
	}
}

// Like `_VirtualDom_storeDomNode`, but assumes that we have already gone
// through diffing, and increased counters. This means that we should replace
// the “previous” DOM node.
function _VirtualDom_storeDomNodeTranslated(vNode, domNode)
{
	if (_VirtualDom_even)
	{
		vNode._.__domNodes[vNode._.i - 1] = domNode;
	}
	else
	{
		vNode._.__domNodes[vNode._.j - 1] = domNode;
	}
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, prevFacts, facts)
{
	if (facts.a__1_STYLE !== undefined || prevFacts.a__1_STYLE !== undefined)
	{
		_VirtualDom_applyStyles(domNode, prevFacts.a__1_STYLE || {}, facts.a1 || {});
	}

	if (facts.a__1_EVENT !== undefined || prevFacts.a__1_EVENT !== undefined)
	{
		_VirtualDom_applyEvents(domNode, eventNode, facts.a__1_EVENT || {});
	}

	if (facts.a__1_PROP !== undefined || prevFacts.a__1_PROP !== undefined)
	{
		_VirtualDom_applyProps(domNode, prevFacts.a__1_PROP || {}, facts.a__1_PROP || {});
	}

	if (facts.a__1_ATTR !== undefined || prevFacts.a__1_ATTR !== undefined)
	{
		_VirtualDom_applyAttrs(domNode, prevFacts.a__1_ATTR || {}, facts.a__1_ATTR || {});
	}

	if (facts.a__1_ATTR_NS !== undefined || prevFacts.a__1_ATTR_NS !== undefined)
	{
		_VirtualDom_applyAttrsNS(domNode, prevFacts.a__1_ATTR_NS || {}, facts.a__1_ATTR_NS || {});
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
			// Support `Html.Attributes.style "borderRadius" "5px"`.
			// `.setProperty` requires "border-radius" with a dash.
			// TODO: Measure if `key[0] === '-'` is faster. (And is correct?)
			if (key in domNode.style)
			{
				domNode.style[key] = value;
			}
			else
			{
				domNode.style.setProperty(key, value);
			}
		}
	}

	for (key in prevStyles)
	{
		if (!(key in styles))
		{
			if (key in domNode.style)
			{
				domNode.style[key] = '';
			}
			else
			{
				domNode.style.removeProperty(key);
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
		// actual DOM value. Other properties, such as `type`, is normalized, so
		// a bad `type` property causes re-assignment every re-render. If this
		// becomes a performance problem you could just set the
		// normalized/correct value from the start.
		// As an example, `.type = "foo"` is normalized to `"text"`.
		// For the above reasons, we compare against the actual DOM node, rather
		// than `prevProps`.
		if (value !== domNode[key])
		{
			domNode[key] = value;
		}
	}

	var defaultDomNode = undefined;

	for (key in prevProps)
	{
		if (!(key in props))
		{
			if (!defaultDomNode)
			{
				defaultDomNode = _VirtualDom_doc.createElementNS(domNode.namespaceURI, domNode.localName);
			}
			domNode[key] = defaultDomNode[key];
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

	for (key in prevAttrs)
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

	for (key in prevNsAttrs)
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


function _VirtualDom_diffHelp(x, y, eventNode)
{
	if (x === y)
	{
		_VirtualDom_quickVisit(y, eventNode);
		return false;
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
				_VirtualDom_quickVisit(y, eventNode);
				return false;
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
		return _VirtualDom_diffHelp(x, y.__thunk(), eventNode);
	}

	y._.__domNodes = x._.__domNodes;

	var domNode;

	// Get DOM node, increase counter, and reset the counter not used during this render.
	if (_VirtualDom_even)
	{
		domNode = y._.__domNodes[y._.i];
		x._.i++;
		x._.j = 0;
		y._.i++;
		y._.j = 0;
	}
	else
	{
		domNode = y._.__domNodes[y._.j];
		x._.j++;
		x._.i = 0;
		y._.j++;
		y._.i = 0;
	}

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
			_VirtualDom_applyPatchRedraw(domNode, y, eventNode);
			return false;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case __2_TEXT:
			if (x.__text !== y.__text)
			{
				// Text replaced or changed by translation plugins.
				if (!domNode.parentNode || domNode.data !== y.__text)
				{
					return true;
				}
				domNode.replaceData(0, domNode.length, y.__text);
			}
			return false;

		case __2_NODE:
			_VirtualDom_diffNodes(domNode, x, y, eventNode, _VirtualDom_diffKids);
			return false;

		case __2_KEYED_NODE:
			_VirtualDom_diffNodes(domNode, x, y, eventNode, _VirtualDom_diffKeyedKids);
			return false;

		case __2_CUSTOM:
			if (x.__render !== y.__render)
			{
				_VirtualDom_applyPatchRedraw(domNode, y, eventNode);
				return;
			}

			_VirtualDom_applyFacts(domNode, eventNode, x.__facts, y.__facts);

			var patch = y.__diff(x.__model, y.__model);
			patch && patch(domNode);

			return false;
	}
}

// When we know that a node does not need updating, just quickly visit its children to:
// - Update event listeners’ reference to the current `eventNode`.
// - Reset .i or .j.
function _VirtualDom_quickVisit(y, eventNode)
{
	switch (y.$)
	{
		case __2_TAGGER:
			_VirtualDom_quickVisit(y.__node, function (msg) { return eventNode(y.__tagger(msg)) });
			return;

		case __2_THUNK:
			_VirtualDom_quickVisit(y.__node, eventNode);
			return;
	}

	var domNode;

	// Get DOM node, increase counter, and reset the counter not used during this render.
	if (_VirtualDom_even)
	{
		domNode = y._.__domNodes[y._.i];
		y._.i++;
		y._.j = 0;
	}
	else
	{
		domNode = y._.__domNodes[y._.j];
		y._.j++;
		y._.i = 0;
	}

	switch (y.$)
	{
		case __2_TEXT:
			return;

		case __2_NODE:
			_VirtualDom_lazyUpdateEvents(domNode, eventNode);
			for (var i = 0; i < y.__kids.length; i++)
			{
				_VirtualDom_quickVisit(y.__kids[i], eventNode);
			}
			return;

		case __2_KEYED_NODE:
			_VirtualDom_lazyUpdateEvents(domNode, eventNode);
			for (var i = 0; i < y.__kids.length; i++)
			{
				_VirtualDom_quickVisit(y.__kids[i].b, eventNode);
			}
			return;

		case __2_CUSTOM:
			_VirtualDom_lazyUpdateEvents(domNode, eventNode);
			return;
	}
}

// When we remove a node, quickly visit its children to remove dom nodes from the virtual nodes.
function _VirtualDom_removeVisit(x)
{
	switch (x.$)
	{
		case __2_TAGGER:
			_VirtualDom_removeVisit(x.__node);
			return;

		case __2_THUNK:
			_VirtualDom_removeVisit(x.__node);
			return;
	}

	// This line is the reason we need to increment .i and .j also for the old virtual nodes.
	x._.__domNodes.splice(_VirtualDom_even ? x._.i : x._.j, 1);

	switch (x.$)
	{
		case __2_TEXT:
			return;

		case __2_NODE:
			for (var i = 0; i < x.__kids.length; i++)
			{
				_VirtualDom_removeVisit(x.__kids[i]);
			}
			return;

		case __2_KEYED_NODE:
			for (var i = 0; i < x.__kids.length; i++)
			{
				_VirtualDom_removeVisit(x.__kids[i].b);
			}
			return;

		case __2_CUSTOM:
			return;
	}
}

function _VirtualDom_diffNodes(domNode, x, y, eventNode, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.__tag !== y.__tag || x.__namespace !== y.__namespace)
	{
		_VirtualDom_applyPatchRedraw(domNode, y, eventNode);
		return;
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
				domNode.insertBefore(child, current);
			}
		}
	}
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
		var thisTranslated = _VirtualDom_diffHelp(xKids[i], yKids[i], eventNode);
		if (thisTranslated)
		{
			translated = true;
		}
	}

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		for (var i = yLen; i < xLen; i++)
		{
			var x = xKids[i];
			var domNode = x._.__domNodes[_VirtualDom_even ? x._.i : x._.j];
			// An extension might have (re-)moved the element, so we can’t just
			// call `parentDomNode.removeChild(domNode)`. That throws an error if
			// the node is not a child of `parentDomNode`.
			var parentNode = domNode.parentNode;
			if (parentNode)
			{
				parentNode.removeChild(domNode);
			}
			_VirtualDom_removeVisit(x);
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


// TODO: Keyed kids.
function _VirtualDom_diffKeyedKids(parentDomNode, xParent, yParent, eventNode)
{
	// Temporary implementation:
	_VirtualDom_diffKids(
		parentDomNode,
		{...xParent, __kids: xParent.__kids.map(kid => kid.b)},
		{...yParent, __kids: yParent.__kids.map(kid => kid.b)},
		eventNode
	);
	return;

	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.__kids;
	var yKids = yParent.__kids;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.__descendantsCount || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.__descendantsCount || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.__descendantsCount || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.__descendantsCount || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.__descendantsCount || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.__descendantsCount || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.__descendantsCount || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.__descendantsCount || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.__descendantsCount || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, __3_REORDER, rootIndex, {
			__patches: localPatches,
			__inserts: inserts,
			__endInserts: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			__tag: __5_INSERT,
			__vnode: vnode,
			__index: yIndex,
			__data: undefined
		};

		inserts.push({ __index: yIndex, __entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.__tag === __5_REMOVE)
	{
		inserts.push({ __index: yIndex, __entry: entry });

		entry.__tag = __5_MOVE;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.__vnode, vnode, subPatches, entry.__index);
		entry.__index = yIndex;
		entry.__data.__data = {
			__patches: subPatches,
			__entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, __3_REMOVE, index, undefined);

		changes[key] = {
			__tag: __5_REMOVE,
			__vnode: vnode,
			__index: index,
			__data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.__tag === __5_INSERT)
	{
		entry.__tag = __5_MOVE;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.__vnode, subPatches, index);

		_VirtualDom_pushPatch(localPatches, __3_REMOVE, index, {
			__patches: subPatches,
			__entry: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.__descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.__index;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === __3_THUNK)
		{
			_VirtualDom_addDomNodes(domNode, vNode.__node, patch.__data, eventNode);
		}
		else if (patchType === __3_REORDER)
		{
			patch.__domNode = domNode;
			patch.__eventNode = eventNode;

			var subPatches = patch.__data.__patches;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === __3_REMOVE)
		{
			patch.__domNode = domNode;
			patch.__eventNode = eventNode;

			var data = patch.__data;
			if (data)
			{
				data.__entry.__data = domNode;
				var subPatches = data.__patches;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.__domNode = domNode;
			patch.__eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.__index) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === __2_TAGGER)
	{
		var subNode = vNode.__node;

		while (subNode.$ === __2_TAGGER)
		{
			subNode = subNode.__node;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be __2_NODE or __2_KEYED_NODE at this point

	var vKids = vNode.__kids;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === __2_NODE ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.__descendantsCount || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.__index) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


// TODO: Remove
function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.__domNode
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

// TODO: Remove
function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case __3_REDRAW:
			return _VirtualDom_applyPatchRedraw(domNode, patch.__data, patch.__eventNode);

		case __3_FACTS:
			_VirtualDom_applyFacts(domNode, patch.__eventNode, patch.__data);
			return domNode;

		case __3_TEXT:
			domNode.replaceData(0, domNode.length, patch.__data);
			return domNode;

		case __3_THUNK:
			return _VirtualDom_applyPatchesHelp(domNode, patch.__data);

		case __3_TAGGER:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.__tagger = patch.__data;
			}
			else
			{
				domNode.elm_event_node_ref = { __tagger: patch.__data, __parent: patch.__eventNode };
			}
			return domNode;

		case __3_REMOVE_LAST:
			var data = patch.__data;
			for (var i = 0; i < data.__diff; i++)
			{
				domNode.removeChild(domNode.childNodes[data.__length]);
			}
			return domNode;

		case __3_APPEND:
			var data = patch.__data;
			var kids = data.__kids;
			var i = data.__length;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.__eventNode), theEnd);
			}
			return domNode;

		case __3_REMOVE:
			var data = patch.__data;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.__entry;
			if (typeof entry.__index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.__data = _VirtualDom_applyPatchesHelp(domNode, data.__patches);
			return domNode;

		case __3_REORDER:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case __3_CUSTOM:
			return patch.__data(domNode);

		default:
			__Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	// `.i` or `.j` has already been incremented at this point, in `_VirtualDom_diffHelp`.
	// Go back to the current node, and remove it.
	// The `_VirtualDom_render` call below will insert the new node at the same position,
	// and advance `.i` or `.j` again.
	if (_VirtualDom_even)
	{
		vNode._.i--;
		vNode._.__domNodes.splice(vNode._.i, 1);
	}
	else
	{
		vNode._.j--;
		vNode._.__domNodes.splice(vNode._.j, 1);
	}

	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.__data;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.__endInserts, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.__patches);

	// inserts
	var inserts = data.__inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.__entry;
		var node = entry.__tag === __5_MOVE
			? entry.__data
			: _VirtualDom_render(entry.__vnode, patch.__eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.__index]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.__entry;
		_VirtualDom_appendChild(frag, entry.__tag === __5_MOVE
			? entry.__data
			: _VirtualDom_render(entry.__vnode, patch.__eventNode)
		);
	}
	return frag;
}


// These are things in the elm/html package that are set using DOM properties
// rather than attributes. We need to know if we should virtualize to properties
// or attributes. This isn’t perfect, but should avoid most unnecessary re-renders.
var _VirtualDom_properties = {
	accept: 'accept',
	'accept-charset': 'acceptCharset',
	accesskey: 'accessKey',
	action: 'action',
	align: 'align',
	alt: 'alt',
	autocomplete: 'autoComplete',
	autofocus: 'autoFocus',
	autoplay: 'autoPlay',
	checked: 'checked',
	cite: 'cite',
	class: 'className',
	contenteditable: 'contentEditable',
	controls: 'controls',
	coords: 'coords',
	default: 'default',
	dir: 'dir',
	disabled: 'disabled',
	download: 'download',
	dropzone: 'dropzone',
	enctype: 'encType',
	headers: 'headers',
	hidden: 'hidden',
	href: 'href',
	hreflang: 'hrefLang',
	for: 'htmlFor',
	id: 'id',
	ismap: 'isMap',
	kind: 'kind',
	label: 'label',
	lang: 'lang',
	loop: 'loop',
	max: 'max',
	method: 'method',
	min: 'min',
	multiple: 'multiple',
	name: 'name',
	novalidate: 'noValidate',
	pattern: 'pattern',
	ping: 'ping',
	placeholder: 'placeholder',
	poster: 'poster',
	preload: 'preload',
	readonly: 'readOnly',
	required: 'required',
	reversed: 'reversed',
	sandbox: 'sandbox',
	scope: 'scope',
	selected: 'selected',
	shape: 'shape',
	spellcheck: 'spellCheck',
	src: 'src',
	srcdoc: 'srcDoc',
	srclang: 'srcLang',
	start: 'start',
	step: 'step',
	target: 'target',
	title: 'title',
	type: 'type',
	usemap: 'useMap',
	value: 'value',
	wrap: 'wrap'
};


function _VirtualDom_virtualize(node)
{
	var vNode = _VirtualDom_virtualizeHelp(node);
	if (vNode)
	{
		return vNode;
	}

	// Backwards compatibility: Elm has always supported mounting onto any node,
	// even comment nodes.
	vNode = _VirtualDom_text('');
	vNode._.__domNodes.push(node);
	return vNode;
}

function _VirtualDom_virtualizeHelp(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		var vNode = _VirtualDom_text(node.textContent);
		vNode._.__domNodes.push(node);
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
		var name = attr.name;
		var value = attr.value;
		var property = _VirtualDom_properties[name];
		attrList = __List_Cons(
			property
				? A2(_VirtualDom_property, property, node[property])
				:
			attr.namespaceURI
			 	? A3(_VirtualDom_attributeNS, attr.namespaceURI, attr.name, attr.value)
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
	vNode._.__domNodes.push(node);
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
