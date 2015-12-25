/// <reference path="../../base/references.d.ts"/>

/**
 * Class which represents the force graph
 */
/* @Mixin(EventEmitter) */
class ForceGraph {
    private element: JQuery;
    private svg: D3.Selection;
    private vis: D3.Selection;
    private force: D3.Layout.ForceLayout;
    private zoom: D3.Behavior.Zoom;
    private _dimensions: { width: number; height: number; };
    private _configuration = {
        linkDistance: 10,
        linkStrength: 2,
        charge: -120,
        gravity: .1,
        labels: false,
        minZoom: .1,
        maxZoom: 100
    };

    /**
     * The event emitter for this graph
     */
    public events = new EventEmitter();
    // private listeners: { [id: string]: Function[]; } = {};

    /**
     * Constructor for the force graph
     */
    constructor(element: JQuery, width = 500, height = 500) {
        this.element = element;
        this.dimensions = { width: width, height: height };
        this.svg = d3.select(this.element[0]).append("svg")
            .attr("width", width)
            .attr("height", height);
        this.force = d3.layout.force()
            .linkDistance(10)
            .linkStrength(2)
            .gravity(.1)
            .charge(-120)
            .size([width, height]);
        this.vis = this.svg.append('svg:g');
    }

    /**
     * Returns the dimensions of this graph
     */
    public get dimensions() {
        return this._dimensions;
    }

    /**
     * Setter for the dimensions
     */
    public set dimensions(newDimensions) {
        this._dimensions = {
            width: newDimensions.width || this.dimensions.width,
            height: newDimensions.height || this.dimensions.height
        };
        if (this.force) {
            this.force.size([this.dimensions.width, this.dimensions.height]);
            this.force.resume();
            this.element.css({ width: this.dimensions.width, height: this.dimensions.height });
            this.svg.attr({ width: this.dimensions.width, height: this.dimensions.height });
        }
    }

    /**
     * Returns the configuration of this graph
     */
    public get configuration() {
        return this._configuration;
    }

    /**
     * Setter for the configuration
     */
    public set configuration(newConfig) {
        newConfig = $.extend(true, {}, this._configuration, newConfig);
        if (this.force) {
            var runStart;

            /**
             * Updates the config value if necessary, and returns true if it was updated
             */
            var updateForceConfig = (name: string, defaultValue: any) => {
                if (newConfig[name] !== this._configuration[name]) {
                    this.force[name](newConfig[name] || defaultValue);
                    return true;
                }
            };

            runStart = runStart || updateForceConfig("linkDistance", 10);
            runStart = runStart || updateForceConfig("linkStrength", 2);
            runStart = runStart || updateForceConfig("charge", -120);
            runStart = runStart || updateForceConfig("gravity", .1);

            if (newConfig.minZoom !== this._configuration.minZoom ||
                newConfig.maxZoom !== this._configuration.maxZoom) {
                this.zoom.scaleExtent([newConfig.minZoom, newConfig.maxZoom]);
            }

            if (runStart) {
                this.force.start();
            }

            if (newConfig.labels !== this._configuration.labels) {
                this.vis.selectAll(".node text")
                    .style("opacity", newConfig.labels ? 100 : 0);
            }
        }

        this._configuration = newConfig;
    }

    /**
     * Redraws the force graph
     */
    public redraw() {
        if (this.vis && d3.event) {
            this.vis.attr("transform", `translate(${d3.event.translate}) scale(${d3.event.scale})`);
        }
    }

    /**
     * Sets the data for this force graph
     */
    public setData(graph: IForceGraphData<IForceGraphNode>) {
        var me = this;

        this.zoom = d3.behavior.zoom()
            .scaleExtent([this._configuration.minZoom, this._configuration.maxZoom])
            .on("zoom", () => this.redraw());

        var drag = d3.behavior.drag()
            .origin(function(d) { return d; })
        // Function is important here
            .on("dragstart", function(d) {
                d3.event.sourceEvent.stopPropagation();
                d3.select(this).classed("dragging", true);
                me.force.start();
            })
            .on("drag", function(d) {
                d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
            })
            .on("dragend", function(d) {
                d3.select(this).classed("dragging", false);
            });

        this.svg.remove();

        this.svg = d3.select(this.element[0]).append("svg")
            .attr("width", this.dimensions.width)
            .attr("height", this.dimensions.height)
        //  .attr("viewBox", "0 0 " + width + " " + height )
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("pointer-events", "all")
        // Function is important here
            .call(this.zoom);
        this.vis = this.svg.append('svg:g');

        var nodes = graph.nodes.slice();
        var links = [];
        var bilinks = [];

        graph.links.forEach(function(link) {
            var s = nodes[link.source];
            var t = nodes[link.target];
            var w = link.value;
            var i = {}; // intermediate node
            nodes.push(<any>i);
            links.push({ source: s, target: i }, { source: i, target: t });
            bilinks.push([s, i, t, w]);
        });

        this.force.nodes(nodes).links(links).start();

        this.vis.append("svg:defs").selectAll("marker")
            .data(["end"])
            .enter()
            .append("svg:marker")
            .attr("id", String)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", 0)
            .attr("markerWidth", 7)
            .attr("markerHeight", 7)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");

        var link = this.vis.selectAll(".link")
            .data(bilinks)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke", "gray")
            .style("stroke-width", function(d) {
                var w = 0.15 + (d[3] / 500);
                return (w > 3) ? 3 : w;
            })
            .attr("id", function(d) {
                return d[0].name.replace(/\./g, '_').replace(/@/g, '_') + '_' +
                    d[2].name.replace(/\./g, '_').replace(/@/g, '_');
            });

        var node = this.vis.selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .call(drag)
            .attr("class", "node");

        node.append("svg:circle")
            .attr("r", (d) => Math.log((d.num * 100)))
            .style("fill", (d) => d.color)
            .style("stroke", "red")
            .style("stroke-width", (d) => d.selected ? 1 : 0)
            .style("opacity", 1);

        node.on("click", (n) => {
            this.events.raiseEvent("nodeClicked", n);
        });

        node.on("mouseover", () => {
            console.log("mouseover");
            d3.select(this.element.find("svg text")[0]).style("opacity", "100");
        });
        node.on("mouseout", () => {
            if (!this._configuration.labels) {
                d3.select(this.element.find("svg text")[0]).style("opacity", "0");
            }
        });

        link.append("svg:text")
            .text(function(d) { return 'yes'; })
            .attr("fill", "black")
            .attr("stroke", "black")
            .attr("font-size", "5pt")
            .attr("stroke-width", "0.5px")
            .attr("class", "linklabel")
            .attr("text-anchor", "middle")
            .style("opacity", function() {
                return 100;
            });

        link.on("click", function(n) { console.log(n); });

        node.append("svg:text")
            .text(function(d) { return d.name; })
            .attr("fill", "blue")
            .attr("stroke", "blue")
            .attr("font-size", "5pt")
            .attr("stroke-width", "0.5px")
            .style("opacity", this._configuration.labels ? 100 : 0);

        this.force.on("tick", function() {
            link.attr("x1", (d) => d[0].x)
                .attr("y1", (d) => d[0].y)
                .attr("x2", (d) => d[2].x)
                .attr("y2", (d) => d[2].y);
            node.attr("transform", (d) => `translate(${d.x},${d.y})`);
        });
    }

    /**
     * Redraws the selections on the nodes
     */
    public redrawSelection() {
        this.vis.selectAll(".node circle")
            .style("stroke-width", (d) => d.selected ? 1 : 0);
    }
}

/**
 * The node in a force graph
 */
interface IForceGraphNode {
    /**
     * The name of the node
     */
    name?: string;

    /**
     * The color of the node
     */
    color?: string;

    /**
     * Whether or not the given node is selected
     */
    selected: boolean;
}

/**
 * Represents a link in the force graph
 */
interface IForceGraphLink {
    /**
     * The source node, index into the nodes list
     */
    source?: number;

    /**
     * The target node, index into the nodes list
     */
    target?: number;

    /**
     * The value of the link, basically the weight of the edge
     */
    value?: number;
}

/**
 * The data for the force graph
 */
interface IForceGraphData<NodeType> {

    /**
     * The list of the nodes in the force graph
     */
    nodes?: NodeType[];

    /**
     * The links in the force graph
     */
    links?: IForceGraphLink[];
}