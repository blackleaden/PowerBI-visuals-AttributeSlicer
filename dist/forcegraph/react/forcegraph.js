(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery", "React", "ReactDOM"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jQuery"), require("React"), require("ReactDOM")) : factory(root["jQuery"], root["React"], root["ReactDOM"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar React = __webpack_require__(4);\nvar ReactDOM = __webpack_require__(5);\nvar $ = __webpack_require__(1);\nvar ForceGraph_1 = __webpack_require__(3);\n;\n/**\n * Thin wrapper around LineUp\n */\nvar ForceGraph = (function (_super) {\n    __extends(ForceGraph, _super);\n    function ForceGraph() {\n        _super.apply(this, arguments);\n    }\n    ForceGraph.prototype.componentDidMount = function () {\n        var _this = this;\n        this.node = ReactDOM.findDOMNode(this);\n        this.forcegraph = new ForceGraph_1.ForceGraph($(this.node));\n        this.forcegraph.events.on(\"selectionChanged\", function (node) {\n            if (_this.props.onSelectionChanged) {\n                _this.props.onSelectionChanged(node);\n            }\n        });\n        this.forcegraph.dimensions = { width: $(this.node).width(), height: $(this.node).height() };\n        this.renderContent();\n    };\n    ForceGraph.prototype.componentWillReceiveProps = function (newProps) {\n        this.renderContent(newProps);\n    };\n    /**\n     * Renders this component\n     */\n    ForceGraph.prototype.render = function () {\n        return React.createElement(\"div\", {style: { width: \"100%\", height: \"100%\" }});\n    };\n    ForceGraph.prototype.renderContent = function (props) {\n        // if called from `componentWillReceiveProps`, then we use the new\n        // props, otherwise use what we already have.\n        props = props || this.props;\n        if (this.selectionListener) {\n            this.selectionListener.destroy();\n        }\n        this.forcegraph.data = props.graph;\n        if (props.config) {\n            this.forcegraph.configuration = props.config;\n        }\n        if (props.onSelectionChanged) {\n            this.selectionListener = this.forcegraph.events.on(\"selectionChanged\", function (rows) { return props.onSelectionChanged(rows); });\n        }\n        else if (this.selectionListener) {\n            this.selectionListener.destroy();\n        }\n    };\n    return ForceGraph;\n}(React.Component));\nexports.ForceGraph = ForceGraph;\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./visuals/forcegraph/ForceGraphReact.tsx\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./visuals/forcegraph/ForceGraphReact.tsx?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_1__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"jQuery\"\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n/**\n * A mixin that adds support for event emitting\n */\nvar EventEmitter = (function () {\n    function EventEmitter() {\n        this.listeners = {};\n    }\n    /**\n     * Adds an event listener for the given event\n     */\n    EventEmitter.prototype.on = function (name, handler) {\n        var _this = this;\n        var listeners = this.listeners[name] = this.listeners[name] || [];\n        listeners.push(handler);\n        return {\n            destroy: function () {\n                _this.off(name, handler);\n            }\n        };\n    };\n    /**\n     * Removes an event listener for the given event\n     */\n    EventEmitter.prototype.off = function (name, handler) {\n        var listeners = this.listeners[name];\n        if (listeners) {\n            var idx = listeners.indexOf(handler);\n            if (idx >= 0) {\n                listeners.splice(idx, 1);\n            }\n        }\n    };\n    /**\n     * Raises the given event\n     */\n    /*protected*/ EventEmitter.prototype.raiseEvent = function (name) {\n        var _this = this;\n        var args = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            args[_i - 1] = arguments[_i];\n        }\n        var listeners = this.listeners[name];\n        if (listeners) {\n            listeners.forEach(function (l) {\n                l.apply(_this, args);\n            });\n        }\n    };\n    return EventEmitter;\n}());\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = EventEmitter;\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./base/EventEmitter.ts\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./base/EventEmitter.ts?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\nvar EventEmitter_1 = __webpack_require__(2);\nvar $ = __webpack_require__(1);\n/**\n * Class which represents the force graph\n */\n/* @Mixin(EventEmitter) */\nvar ForceGraph = (function () {\n    /**\n     * Constructor for the force graph\n     */\n    function ForceGraph(element, width, height) {\n        var _this = this;\n        if (width === void 0) { width = 500; }\n        if (height === void 0) { height = 500; }\n        this._configuration = {\n            animate: true,\n            linkDistance: 10,\n            linkStrength: 2,\n            charge: -120,\n            gravity: .1,\n            labels: false,\n            minZoom: .1,\n            maxZoom: 100,\n            defaultLabelColor: \"blue\"\n        };\n        /**\n         * The event emitter for this graph\n         */\n        this.events = new EventEmitter_1.default();\n        /**\n         * My template string\n         */\n        this.template = \"\\n        <div class=\\\"graph-container\\\">\\n            <div class=\\\"button-bar\\\">\\n                <ul>\\n                    <li class=\\\"filter-box\\\" title=\\\"Filter Nodes\\\">\\n                        <input type=\\\"text\\\" placeholder=\\\"Enter text filter\\\" class=\\\"search-filter-box\\\"/>\\n                    </li>\\n                    <li class=\\\"clear-selection\\\" title=\\\"Clear Selection\\\">\\n                        <a>\\n                            <span class=\\\"fa-stack\\\">\\n                                <i class=\\\"fa fa-check fa-stack-1x\\\"></i>\\n                                <i class=\\\"fa fa-ban fa-stack-2x\\\"></i>\\n                            </span>\\n                        </a>\\n                    </li>\\n                </ul>\\n            </div>\\n            <div class=\\\"svg-container\\\">\\n            </div>\\n        </div>\\n    \".trim().replace(/\\n/g, \"\");\n        this.element = $(this.template);\n        element.append(this.element);\n        this.svgContainer = this.element.find(\".svg-container\");\n        this.element.find(\".clear-selection\").on(\"click\", function () {\n            _this.updateSelection(undefined);\n        });\n        var filterBox = this.element.find(\".search-filter-box\");\n        filterBox.on('input', function () {\n            _this.filterNodes(filterBox.val());\n        });\n        this.dimensions = { width: width, height: height };\n        this.svg = d3.select(this.svgContainer[0]).append(\"svg\")\n            .attr(\"width\", width)\n            .attr(\"height\", height);\n        this.force = d3.layout.force()\n            .linkDistance(10)\n            .linkStrength(2)\n            .gravity(.1)\n            .charge(-120)\n            .size([width, height]);\n        this.vis = this.svg.append('svg:g');\n    }\n    Object.defineProperty(ForceGraph.prototype, \"dimensions\", {\n        /**\n         * Returns the dimensions of this graph\n         */\n        get: function () {\n            return this._dimensions;\n        },\n        /**\n         * Setter for the dimensions\n         */\n        set: function (newDimensions) {\n            this._dimensions = {\n                width: newDimensions.width || this.dimensions.width,\n                height: newDimensions.height || this.dimensions.height\n            };\n            if (this.force) {\n                this.force.size([this.dimensions.width, this.dimensions.height]);\n                this.force.resume();\n                this.element.css({ width: this.dimensions.width, height: this.dimensions.height });\n                this.svgContainer.css({ width: this.dimensions.width, height: this.dimensions.height });\n                this.svg.attr({ width: this.dimensions.width, height: this.dimensions.height });\n            }\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(ForceGraph.prototype, \"configuration\", {\n        /**\n         * Returns the configuration of this graph\n         */\n        get: function () {\n            return this._configuration;\n        },\n        /**\n         * Setter for the configuration\n         */\n        set: function (newConfig) {\n            var _this = this;\n            newConfig = $.extend(true, {}, this._configuration, newConfig);\n            if (this.force) {\n                var runStart;\n                /**\n                 * Updates the config value if necessary, and returns true if it was updated\n                 */\n                var updateForceConfig = function (name, defaultValue) {\n                    if (newConfig[name] !== _this._configuration[name]) {\n                        _this.force[name](newConfig[name] || defaultValue);\n                        return true;\n                    }\n                };\n                runStart = runStart || updateForceConfig(\"linkDistance\", 10);\n                runStart = runStart || updateForceConfig(\"linkStrength\", 2);\n                runStart = runStart || updateForceConfig(\"charge\", -120);\n                runStart = runStart || updateForceConfig(\"gravity\", .1);\n                if (newConfig.minZoom !== this._configuration.minZoom ||\n                    newConfig.maxZoom !== this._configuration.maxZoom) {\n                    this.zoom.scaleExtent([newConfig.minZoom, newConfig.maxZoom]);\n                }\n                if (runStart && this.configuration.animate) {\n                    this.force.start();\n                }\n                else if (!this.configuration.animate) {\n                    this.force.stop();\n                }\n                if (newConfig.labels !== this._configuration.labels) {\n                    this.vis.selectAll(\".node text\")\n                        .style(\"opacity\", newConfig.labels ? 100 : 0);\n                }\n            }\n            this._configuration = newConfig;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(ForceGraph.prototype, \"data\", {\n        /**\n         * Alias for getData\n         */\n        get: function () {\n            return this.getData();\n        },\n        /**\n         * Alias for setData\n         */\n        set: function (graph) {\n            this.setData(graph);\n        },\n        enumerable: true,\n        configurable: true\n    });\n    /**\n     * Redraws the force graph\n     */\n    ForceGraph.prototype.redraw = function () {\n        if (this.vis && d3.event) {\n            var zoomEvt = d3.event;\n            this.vis.attr(\"transform\", \"translate(\" + zoomEvt.translate + \") scale(\" + zoomEvt.scale + \")\");\n        }\n    };\n    /**\n     * Gets the data associated with this graph\n     */\n    ForceGraph.prototype.getData = function () {\n        return this.graph;\n    };\n    /**\n     * Sets the data for this force graph\n     */\n    ForceGraph.prototype.setData = function (graph) {\n        var _this = this;\n        var me = this;\n        this.graph = graph;\n        this.zoom = d3.behavior.zoom()\n            .scaleExtent([this._configuration.minZoom, this._configuration.maxZoom])\n            .on(\"zoom\", function () { return _this.redraw(); });\n        var drag = d3.behavior.drag()\n            .origin(function (d) { return d; })\n            .on(\"dragstart\", function (d) {\n            d3.event.sourceEvent.stopPropagation();\n            d3.select(this).classed(\"dragging\", true);\n            me.force.start();\n        })\n            .on(\"drag\", function (d) {\n            var evt = d3.event;\n            d3.select(this).attr(\"cx\", d.x = evt.x).attr(\"cy\", d.y = evt.y);\n        })\n            .on(\"dragend\", function (d) {\n            d3.select(this).classed(\"dragging\", false);\n        });\n        this.svg.remove();\n        this.svg = d3.select(this.svgContainer[0]).append(\"svg\")\n            .attr(\"width\", this.dimensions.width)\n            .attr(\"height\", this.dimensions.height)\n            .attr(\"preserveAspectRatio\", \"xMidYMid meet\")\n            .attr(\"pointer-events\", \"all\")\n            .call(this.zoom);\n        this.vis = this.svg.append('svg:g');\n        var nodes = graph.nodes.slice();\n        var links = [];\n        var bilinks = [];\n        graph.links.forEach(function (link) {\n            var s = nodes[link.source];\n            var t = nodes[link.target];\n            var w = link.value;\n            var i = {}; // intermediate node\n            nodes.push(i);\n            links.push({ source: s, target: i }, { source: i, target: t });\n            bilinks.push([s, i, t, w]);\n        });\n        this.force.nodes(nodes).links(links);\n        // If we have animation on, then start that beast\n        if (this.configuration.animate) {\n            this.force.start();\n        }\n        this.vis.append(\"svg:defs\").selectAll(\"marker\")\n            .data([\"end\"])\n            .enter()\n            .append(\"svg:marker\")\n            .attr(\"id\", String)\n            .attr(\"viewBox\", \"0 -5 10 10\")\n            .attr(\"refX\", 15)\n            .attr(\"refY\", 0)\n            .attr(\"markerWidth\", 7)\n            .attr(\"markerHeight\", 7)\n            .attr(\"orient\", \"auto\")\n            .append(\"svg:path\")\n            .attr(\"d\", \"M0,-5L10,0L0,5\");\n        var link = this.vis.selectAll(\".link\")\n            .data(bilinks)\n            .enter().append(\"line\")\n            .attr(\"class\", \"link\")\n            .style(\"stroke\", \"gray\")\n            .style(\"stroke-width\", function (d) {\n            var w = 0.15 + (d[3] / 500);\n            return (w > 3) ? 3 : w;\n        })\n            .attr(\"id\", function (d) {\n            return d[0].name.replace(/\\./g, '_').replace(/@/g, '_') + '_' +\n                d[2].name.replace(/\\./g, '_').replace(/@/g, '_');\n        });\n        var node = this.vis.selectAll(\".node\")\n            .data(graph.nodes)\n            .enter().append(\"g\")\n            .call(drag)\n            .attr(\"class\", \"node\");\n        node.append(\"svg:circle\")\n            .attr(\"r\", function (d) { return Math.log(((d.num || 1) * 100)); })\n            .style(\"fill\", function (d) { return d.color; })\n            .style(\"stroke\", \"red\")\n            .style(\"stroke-width\", function (d) { return d.selected ? 1 : 0; })\n            .style(\"opacity\", 1);\n        node.on(\"click\", function (n) {\n            _this.events.raiseEvent(\"nodeClicked\", n);\n            _this.updateSelection(n);\n        });\n        node.on(\"mouseover\", function () {\n            d3.select(_this.svgContainer.find(\"svg text\")[0]).style(\"opacity\", \"100\");\n        });\n        node.on(\"mouseout\", function () {\n            if (!_this._configuration.labels) {\n                d3.select(_this.svgContainer.find(\"svg text\")[0]).style(\"opacity\", \"0\");\n            }\n        });\n        link.append(\"svg:text\")\n            .text(function (d) { return 'yes'; })\n            .attr(\"fill\", \"black\")\n            .attr(\"stroke\", \"black\")\n            .attr(\"font-size\", \"5pt\")\n            .attr(\"stroke-width\", \"0.5px\")\n            .attr(\"class\", \"linklabel\")\n            .attr(\"text-anchor\", \"middle\")\n            .style(\"opacity\", function () {\n            return 100;\n        });\n        link.on(\"click\", function (n) { console.log(n); });\n        node.append(\"svg:text\")\n            .attr(\"class\", \"node-label\")\n            .text(function (d) { return d.name; })\n            .attr(\"fill\", function (d) { return d.labelColor || _this.configuration.defaultLabelColor; })\n            .attr(\"stroke\", function (d) { return d.labelColor || _this.configuration.defaultLabelColor; })\n            .attr(\"font-size\", \"5pt\")\n            .attr(\"stroke-width\", \"0.5px\")\n            .style(\"opacity\", this._configuration.labels ? 100 : 0);\n        // If we are not animating, then play the force quickly\n        if (!this.configuration.animate) {\n            var k = 0;\n            this.force.start();\n            // Alpha measures the amount of movement\n            while ((this.force.alpha() > 1e-2) && (k < 150)) {\n                this.force.tick();\n                k = k + 1;\n            }\n            this.force.stop();\n            link.attr(\"x1\", function (d) { return d[0].x; })\n                .attr(\"y1\", function (d) { return d[0].y; })\n                .attr(\"x2\", function (d) { return d[2].x; })\n                .attr(\"y2\", function (d) { return d[2].y; });\n            node.attr(\"transform\", function (d) { return (\"translate(\" + d.x + \",\" + d.y + \")\"); });\n        }\n        this.force.on(\"tick\", function () {\n            if (_this.configuration.animate) {\n                link.attr(\"x1\", function (d) { return d[0].x; })\n                    .attr(\"y1\", function (d) { return d[0].y; })\n                    .attr(\"x2\", function (d) { return d[2].x; })\n                    .attr(\"y2\", function (d) { return d[2].y; });\n                node.attr(\"transform\", function (d) { return (\"translate(\" + d.x + \",\" + d.y + \")\"); });\n            }\n        });\n    };\n    /**\n     * Redraws the selections on the nodes\n     */\n    ForceGraph.prototype.redrawSelection = function () {\n        this.vis.selectAll(\".node circle\")\n            .style(\"stroke-width\", function (d) { return d.selected ? 1 : 0; });\n    };\n    /**\n     * Redraws the node labels\n     */\n    ForceGraph.prototype.redrawLabels = function () {\n        var _this = this;\n        this.vis.selectAll(\".node .node-label\")\n            .attr(\"fill\", function (d) { return d.labelColor || _this.configuration.defaultLabelColor; })\n            .attr(\"stroke\", function (d) { return d.labelColor || _this.configuration.defaultLabelColor; });\n    };\n    /**\n     * Filters the nodes to the given string\n     */\n    ForceGraph.prototype.filterNodes = function (text, animate) {\n        if (animate === void 0) { animate = true; }\n        var test = \"\";\n        var temp = this.vis.selectAll(\".node circle\");\n        if (animate) {\n            temp = temp\n                .transition()\n                .duration(500)\n                .delay(100);\n        }\n        temp.attr(\"transform\", function (d) {\n            var scale = 1;\n            if (text && d.name.indexOf(text) >= 0) {\n                scale = 3;\n            }\n            return \"scale(\" + scale + \")\";\n        });\n    };\n    /**\n     * Updates the selection based on the given node\n     */\n    ForceGraph.prototype.updateSelection = function (n) {\n        if (n !== this._selectedNode) {\n            if (this._selectedNode) {\n                this._selectedNode.selected = false;\n            }\n            if (n) {\n                n.selected = true;\n            }\n            this._selectedNode = n;\n        }\n        else {\n            if (this._selectedNode) {\n                this._selectedNode.selected = false;\n            }\n            this._selectedNode = undefined;\n        }\n        this.events.raiseEvent('selectionChanged', this._selectedNode);\n        this.redrawSelection();\n    };\n    return ForceGraph;\n}());\nexports.ForceGraph = ForceGraph;\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./visuals/forcegraph/ForceGraph.ts\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./visuals/forcegraph/ForceGraph.ts?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_4__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"React\"\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22React%22?");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("module.exports = __WEBPACK_EXTERNAL_MODULE_5__;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"ReactDOM\"\n ** module id = 5\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ }
/******/ ])
});
;