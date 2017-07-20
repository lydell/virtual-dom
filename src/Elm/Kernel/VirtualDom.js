/*

import Elm.Kernel.Error exposing (throw)
import Elm.Kernel.Json exposing (equality, runHelp)
import Elm.Kernel.List exposing (Cons, Nil)
import Elm.Kernel.Platform exposing (initialize)
import Elm.Kernel.Utils exposing (Tuple0, Tuple2)
import Json.Decode as Json exposing (map, map2, succeed)
import Platform.Cmd as Cmd exposing (none)
import Platform.Sub as Sub exposing (none)
import Tuple exposing (mapFirst)

*/


var elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;


var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: __2_TEXT,
		__text: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		var kids = [];
		var descendantsCount = 0;
		while (kidList.$ !== '[]')
		{
			var kid = kidList.a;
			descendantsCount += (kid.__descendantsCount || 0);
			kids.push(kid);
			kidList = kidList.b;
		}
		descendantsCount += kids.length;

		return {
			$: __2_NODE,
			__tag: tag,
			__facts: _VirtualDom_organizeFacts(factList),
			__kids: kids,
			__namespace: namespace,
			__descendantsCount: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		var kids = [];
		var descendantsCount = 0;
		while (kidList.$ !== '[]')
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.__descendantsCount || 0);
			kids.push(kid);
			kidList = kidList.b;
		}
		descendantsCount += kids.length;

		return {
			$: __2_KEYED_NODE,
			__tag: tag,
			__facts: _VirtualDom_organizeFacts(factList),
			__kids: kids,
			__namespace: namespace,
			__descendantsCount: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


var _VirtualDom_custom = F3(function(factList, model, impl)
{
	return {
		$: __2_CUSTOM,
		__facts: _VirtualDom_organizeFacts(factList),
		__model: model,
		__impl: impl
	};
});



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: __2_TAGGER,
		__tagger: tagger,
		__node: node,
		__descendantsCount: 1 + (node.__descendantsCount || 0)
	};
});



// LAZY


function _VirtualDom_thunk(func, args, thunk)
{
	return {
		$: __2_THUNK,
		__func: func,
		__args: args,
		__thunk: thunk,
		__node: undefined
	};
}

var _VirtualDom_lazy = F2(function(fn, arg1)
{
	return _VirtualDom_thunk(fn, [arg1], function() {
		return fn(arg1);
	});
});

var _VirtualDom_lazy2 = F3(function(fn, arg1, arg2)
{
	return _VirtualDom_thunk(fn, [arg1,arg2], function() {
		return A2(fn, arg1, arg2);
	});
});

var _VirtualDom_lazy3 = F4(function(fn, arg1, arg2, arg3)
{
	return _VirtualDom_thunk(fn, [arg1,arg2,arg3], function() {
		return A3(fn, arg1, arg2, arg3);
	});
});

var _VirtualDom_lazy4 = F5(function(fn, arg1, arg2, arg3, arg4)
{
	return _VirtualDom_thunk(fn, [arg1,arg2,arg3,arg4], function() {
		return A4(fn, arg1, arg2, arg3, arg4);
	});
});

var _VirtualDom_lazy5 = F6(function(fn, arg1, arg2, arg3, arg4, arg5)
{
	return _VirtualDom_thunk(fn, [arg1,arg2,arg3,arg4,arg5], function() {
		return A5(fn, arg1, arg2, arg3, arg4, arg5);
	});
});

var _VirtualDom_lazy6 = F7(function(fn, arg1, arg2, arg3, arg4, arg5, arg6)
{
	return _VirtualDom_thunk(fn, [arg1,arg2,arg3,arg4,arg5,arg6], function() {
		return A6(fn, arg1, arg2, arg3, arg4, arg5, arg6);
	});
});

var _VirtualDom_lazy7 = F8(function(fn, arg1, arg2, arg3, arg4, arg5, arg6, arg7)
{
	return _VirtualDom_thunk(fn, [arg1,arg2,arg3,arg4,arg5,arg6,arg7], function() {
		return A7(fn, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
	});
});

var _VirtualDom_lazy8 = F9(function(fn, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8)
{
	return _VirtualDom_thunk(fn, [arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8], function() {
		return A8(fn, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
	});
});



// FACTS


var _VirtualDom_on = F3(function(useCapture, key, handler)
{
	return {
		$: __1_EVENT,
		__key: key,
		__value: { $: handler.$, __useCapture: useCapture, __decoder: handler.a } };
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: __1_STYLE,
		__key: key,
		__value: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: __1_PROP,
		__key: key,
		__value: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: __1_ATTR,
		__key: key,
		__value: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: __1_ATTR_NS,
		__key: key,
		__value: { __namespace: namespace, __value: value }
	};
});



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === __1_EVENT)
		? _VirtualDom_mapEvent(attr.__key, func, attr.__value)
		: attr;
});

function _VirtualDom_mapEvent(key, func, value)
{
	var tag = value.$;

	return {
		$: __1_EVENT,
		__key: key,
		__value: {
			$: tag,
			__useCapture: value.__useCapture,
			__decoder:
				tag === 'Normal'
					? A2(__Json_map, func, value.__decoder)
					:
				A3(__Json_map2,
					tag !== 'Custom' ? _VirtualDom_mapEventTuple : _VirtualDom_mapEventRecord,
					__Json_succeed(func),
					value.__decoder
				)
		}
	};
}

function _VirtualDom_mapTimed(func, timed)
{
	return {
		$: timed.$,
		a: func(timed.a)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return __Utils_Tuple2(
		_VirtualDom_mapTimed(func, tuple.a),
		tuple.b
	);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		__$message: _VirtualDom_mapTimed(func, record.__$message),
		__$stopPropagation: record.__$stopPropagation,
		__$preventDefault: record.__$preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	var facts = {};

	while (factList.$ !== '[]')
	{
		var entry = factList.a;
		factList = factList.b;

		var tag = entry.$;
		var key = entry.__key;
		var value = entry.__value;

		if (tag === __1_PROP)
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, value)
				: facts[key] = value;

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === __1_ATTR && key === 'class')
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
	switch (vNode.$)
	{
		case __2_THUNK:
			if (!vNode.__node)
			{
				vNode.__node = vNode.__thunk();
			}
			return _VirtualDom_render(vNode.__node, eventNode);

		case __2_TAGGER:
			var subNode = vNode.__node;
			var tagger = vNode.__tagger;

			while (subNode.$ === __2_TAGGER)
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.__tagger]
					: tagger.push(subNode.__tagger);

				subNode = subNode.__node;
			}

			var subEventRoot = { __tagger: tagger, __parent: eventNode };
			var domNode = _VirtualDom_render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case __2_TEXT:
			return _VirtualDom_doc.createTextNode(vNode.__text);

		case __2_NODE:
			var domNode = vNode.__namespace
				? _VirtualDom_doc.createElementNS(vNode.__namespace, vNode.__tag)
				: _VirtualDom_doc.createElement(vNode.__tag);

			_VirtualDom_applyFacts(domNode, eventNode, vNode.__facts);

			var kids = vNode.__kids;

			for (var i = 0; i < kids.length; i++)
			{
				domNode.appendChild(_VirtualDom_render(kids[i], eventNode));
			}

			return domNode;

		case __2_KEYED_NODE:
			var domNode = vNode.__namespace
				? _VirtualDom_doc.createElementNS(vNode.__namespace, vNode.__tag)
				: _VirtualDom_doc.createElement(vNode.__tag);

			_VirtualDom_applyFacts(domNode, eventNode, vNode.__facts);

			var kids = vNode.__kids;

			for (var i = 0; i < kids.length; i++)
			{
				domNode.appendChild(_VirtualDom_render(kids[i].b, eventNode));
			}

			return domNode;

		case __2_CUSTOM:
			var domNode = vNode.__impl.render(vNode.__model);
			_VirtualDom_applyFacts(domNode, eventNode, vNode.__facts);
			return domNode;
	}
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case __1_STYLE:
				_VirtualDom_applyStyles(domNode, value);
				break;

			case __1_EVENT:
				_VirtualDom_applyEvents(domNode, eventNode, value);
				break;

			case __1_ATTR:
				_VirtualDom_applyAttrs(domNode, value);
				break;

			case __1_ATTR_NS:
				_VirtualDom_applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.__namespace;
		var value = pair.__value;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var callbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var cb = callbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, cb);
			callbacks[key] = undefined;
			continue;
		}

		if (!cb)
		{
			cb = _VirtualDom_makeCallback(eventNode, newHandler);
			domNode.addEventListener(key, cb, _VirtualDom_toOptions(newHandler));
			callbacks[key] = cb;
			continue;
		}

		var oldHandler = cb.__handler;
		if (oldHandler.$ === newHandler.$ && oldHandler.__useCapture === newHandler.__useCapture)
		{
			cb.__handler = newHandler;
			continue
		}

		domNode.removeEventListener(key, cb);
		cb = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, cb, _VirtualDom_toOptions(newHandler));
		callbacks[key] = cb;
	}
}


// EVENT OPTIONS

function _VirtualDom_toOptions(handler)
{
	return handler.__useCapture;
}

try
{
	window.addEventListener("test", null, Object.defineProperty({}, "passive", {
		get: function()
		{
			_VirtualDom_toOptions = function(handler)
			{
				var tag = handler.$;
				return {
					passive: tag === 'Normal' || tag === 'MayStopPropagation',
					capture: handler.__useCapture
				};
			}
		}
	}));
}
catch(e) {}


// EVENT HANDLERS

function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function eventHandler(event)
	{
		var handler = eventHandler.__handler;
		var result = __Json_runHelp(handler.__decoder, event);

		if (result.$ !== 'Ok')
		{
			return;
		}

		var timedMsg = result.a;
		var message = _VirtualDom_eventToMessage(event, handler.$, timedMsg.a);
		var currentEventNode = eventNode;
		var tagger;
		var i;
		while (tagger = currentEventNode.__tagger)
		{
			if (i = tagger.length)
			{
				while (i--) { message = tagger[i](message); }
			}
			else
			{
				message = tagger(message);
			}

			currentEventNode = currentEventNode.__parent;
		}
		currentEventNode(message, timedMsg.$ === 'Sync');
	}

	eventHandler.__handler = initialHandler;

	return eventHandler;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ === y.$
		&& x.__useCapture === y.__useCapture
		&& __Json_equality(x.__decoder, y.__decoder);
}

function _VirtualDom_eventToMessage(event, tag, value)
{
	var isCustom = tag === 'Custom';

	if (tag === 'Normal')
	{
		return value;
	}

	if (tag === 'MayStopPropagation' ? value.b : isCustom && value.__$stopPropagation) event.stopPropagation();
	if (tag === 'MayPreventDefault' ? value.b : isCustom && value.__$preventDefault) event.preventDefault();

	return isCustom ? value.__$message : value.a;
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_makePatch(type, index, data)
{
	return {
		$: type,
		__index: index,
		__data: data,
		__domNode: undefined,
		__eventNode: undefined
	};
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
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
		else
		{
			patches.push(_VirtualDom_makePatch(__3_REDRAW, index, y));
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case __2_THUNK:
			var xArgs = x.__args;
			var yArgs = y.__args;
			var i = xArgs.length;
			var same = x.__func === y.__func && i === yArgs.length;
			while (same && i--)
			{
				same = xArgs[i] === yArgs[i];
			}
			if (same)
			{
				y.__node = x.__node;
				return;
			}
			y.__node = y.__thunk();
			var subPatches = [];
			_VirtualDom_diffHelp(x.__node, y.__node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(_VirtualDom_makePatch(__3_THUNK, index, subPatches));
			}
			return;

		case __2_TAGGER:
			// gather nested taggers
			var xTaggers = x.__tagger;
			var yTaggers = y.__tagger;
			var nesting = false;

			var xSubNode = x.__node;
			while (xSubNode.$ === __2_TAGGER)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.__tagger]
					: xTaggers.push(xSubNode.__tagger);

				xSubNode = xSubNode.__node;
			}

			var ySubNode = y.__node;
			while (ySubNode.$ === __2_TAGGER)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.__tagger]
					: yTaggers.push(ySubNode.__tagger);

				ySubNode = ySubNode.__node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				patches.push(_VirtualDom_makePatch(__3_REDRAW, index, y));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				patches.push(_VirtualDom_makePatch(__3_TAGGER, index, yTaggers));
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case __2_TEXT:
			if (x.__text !== y.__text)
			{
				patches.push(_VirtualDom_makePatch(__3_TEXT, index, y.__text));
				return;
			}

			return;

		case __2_NODE:
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (x.__tag !== y.__tag || x.__namespace !== y.__namespace)
			{
				patches.push(_VirtualDom_makePatch(__3_REDRAW, index, y));
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.__facts, y.__facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(_VirtualDom_makePatch(__3_FACTS, index, factsDiff));
			}

			_VirtualDom_diffKids(x, y, patches, index);
			return;

		case __2_KEYED_NODE:
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (x.__tag !== y.__tag || x.__namespace !== y.__namespace)
			{
				patches.push(_VirtualDom_makePatch(__3_REDRAW, index, y));
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.__facts, y.__facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(_VirtualDom_makePatch(__3_FACTS, index, factsDiff));
			}

			_VirtualDom_diffKeyedKids(x, y, patches, index);
			return;

		case __2_CUSTOM:
			if (x.__impl !== y.__impl)
			{
				patches.push(_VirtualDom_makePatch(__3_REDRAW, index, y));
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.__facts, y.__facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(_VirtualDom_makePatch(__3_FACTS, index, factsDiff));
			}

			var patch = y.__impl.diff(x,y);
			if (patch)
			{
				patches.push(_VirtualDom_makePatch(__3_CUSTOM, index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === __1_STYLE || xKey === __1_EVENT || xKey === __1_ATTR || xKey === __1_ATTR_NS)
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === __1_STYLE)
					? ''
					:
				(category === __1_EVENT || category === __1_ATTR)
					? undefined
					:
				{ __namespace: x[xKey].__namespace, __value: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value'
			|| category === __1_EVENT && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, rootIndex)
{
	var xKids = xParent.__kids;
	var yKids = yParent.__kids;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		patches.push(_VirtualDom_makePatch(__3_REMOVE_LAST, rootIndex, xLen - yLen));
	}
	else if (xLen < yLen)
	{
		patches.push(_VirtualDom_makePatch(__3_APPEND, rootIndex, yKids.slice(xLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = xLen < yLen ? xLen : yLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, index);
		index += xKid.__descendantsCount || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
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

		var xLookAhead = xIndex + 1 < xLen;
		var yLookAhead = yIndex + 1 < yLen;

		if (xLookAhead)
		{
			var xNext = xKids[xIndex + 1];
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yLookAhead)
		{
			var yNext = yKids[yIndex + 1];
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (xLookAhead && yLookAhead && newMatch && oldMatch)
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
		if (yLookAhead && newMatch)
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
		if (xLookAhead && oldMatch)
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
		if (xLookAhead && yLookAhead && xNextKey === yNextKey)
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

	var endInserts;
	while (yIndex < yLen)
	{
		endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(_VirtualDom_makePatch(__3_REORDER, rootIndex, {
			__patches: localPatches,
			__inserts: inserts,
			__endInserts: endInserts
		}));
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			__tag: 'insert',
			__vnode: vnode,
			__index: yIndex,
			__data: undefined
		};

		inserts.push({ __index: yIndex, __entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.__tag === 'remove')
	{
		inserts.push({ __index: yIndex, __entry: entry });

		entry.__tag = 'move';
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
	if (typeof entry === 'undefined')
	{
		var patch = _VirtualDom_makePatch(__3_REMOVE, index, undefined);
		localPatches.push(patch);

		changes[key] = {
			__tag: 'remove',
			__vnode: vnode,
			__index: index,
			__data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.__tag === 'insert')
	{
		entry.__tag = 'move';
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.__vnode, subPatches, index);

		var patch = _VirtualDom_makePatch(__3_REMOVE, index, {
			__patches: subPatches,
			__entry: entry
		});
		localPatches.push(patch);

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
			if (typeof data !== 'undefined')
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

	switch (vNode.$)
	{
		case __2_TAGGER:
			var subNode = vNode.__node;

			while (subNode.$ === __2_TAGGER)
			{
				subNode = subNode.__node;
			}

			return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case __2_NODE:
			var vKids = vNode.__kids;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vKids.length; j++)
			{
				low++;
				var vKid = vKids[j];
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

		case __2_KEYED_NODE:
			var vKids = vNode.__kids;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vKids.length; j++)
			{
				low++;
				var vKid = vKids[j].b;
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

		case __2_TEXT:
		case __2_THUNK:
			__Error_throw(10); // 'should never traverse `text` or `thunk` nodes like this'
	}
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

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
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.__tagger = patch.__data;
			}
			else
			{
				domNode.elm_event_node_ref = { __tagger: patch.__data, __parent: patch.__eventNode };
			}
			return domNode;

		case __3_REMOVE_LAST:
			var i = patch.__data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case __3_APPEND:
			var newNodes = patch.__data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(_VirtualDom_render(newNodes[i], patch.__eventNode));
			}
			return domNode;

		case __3_REMOVE:
			var data = patch.__data;
			if (typeof data === 'undefined')
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
			var impl = patch.__data;
			return impl.applyPatch(domNode, impl.__data);

		default:
			__Error_throw(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
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
		var node = entry.__tag === 'move'
			? entry.__data
			: _VirtualDom_render(entry.__vnode, patch.__eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.__index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.__entry;
		frag.appendChild(entry.__tag === 'move'
			? entry.__data
			: _VirtualDom_render(entry.__vnode, patch.__eventNode)
		);
	}
	return frag;
}



// PROGRAMS


var _VirtualDom_program = _VirtualDom_makeProgram(_VirtualDom_checkNoFlags);
var _VirtualDom_programWithFlags = _VirtualDom_makeProgram(_VirtualDom_checkYesFlags);

function _VirtualDom_makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					_VirtualDom_setup(impl, object, moduleName, checker);
				}
				else
				{
					_Degug_setup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function _VirtualDom_staticProgram(vNode)
{
	var nothing = __Utils_Tuple2( __Utils_Tuple0, __Cmd_none );
	return A2(_VirtualDom_program, elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		__$init: nothing,
		__$view: function() { return vNode; },
		__$update: F2(function() { return nothing; }),
		__$subscriptions: function() { return __Sub_none; }
	})();
}



// FLAG CHECKERS


function _VirtualDom_checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		__Error_throw(0);
	};
}

function _VirtualDom_checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			__Error_throw(1);
		}

		var result = __Json_runHelp(flagDecoder, flags);
		if (result.$ === 'Ok')
		{
			return init(result.a);
		}

		__Error_throw(2);
	};
}



//  NORMAL SETUP


function _VirtualDom_setup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		return __Platform_initialize(
			flagChecker(impl.__$init, flags, node),
			impl.__$update,
			impl.__$subscriptions,
			_VirtualDom_renderer(node, impl.__$view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return __Platform_initialize(
			flagChecker(impl.__$init, flags, document.body),
			impl.__$update,
			impl.__$subscriptions,
			_VirtualDom_renderer(document.body, impl.__$view)
		);
	};
}



// RENDERER


var _VirtualDom_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function _VirtualDom_renderer(domNode, view)
{
	return function(sendToApp, nextModel)
	{
		// initial setup

		var currNode = virtualize(domNode);

		function draw(model)
		{
			var nextNode = view(model);
			var patches = _VirtualDom_diff(currNode, nextNode);
			domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
			currNode = nextNode;
		}

		draw(nextModel);

		// create stepper

		var state = __4_NO_REQUEST;

		function updateIfNeeded()
		{
			if (state === __4_EXTRA_REQUEST)
			{
				state = __4_NO_REQUEST;
				return;
			}

			_VirtualDom_requestAnimationFrame(updateIfNeeded);
			state = __4_EXTRA_REQUEST;
			draw(nextModel);
		}

		return function(model, isSync)
		{
			if (isSync)
			{
				draw(model);
				if (state === __4_PENDING_REQUEST)
				{
					state = __4_EXTRA_REQUEST;
				}
				return;
			}

			if (state === __4_NO_REQUEST)
			{
				_VirtualDom_requestAnimationFrame(updateIfNeeded);
			}
			state = __4_PENDING_REQUEST;
			nextModel = model;
		};
	};
}

function virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}
	// else is normal NODE


	// ATTRIBUTES

	var attrList = __List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = __List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = __List_Nil;
	var kids = node.childNodes;

	// NODES

	for (var i = kids.length; i--; )
	{
		kidList = __List_Cons(virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
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

	return {
		$: __2_NODE,
		__tag: keyedNode.__tag,
		__facts: keyedNode.__facts,
		__kids: kids,
		__namespace: keyedNode.__namespace,
		__descendantsCount: keyedNode.__descendantsCount
	};
}