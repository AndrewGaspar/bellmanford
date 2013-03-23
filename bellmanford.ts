export interface IList {
    forEach(op: () => void ): void;
    toArray(): any[];
}

export interface INode {
    id: number;
}

interface INodeHash {
    [id: number]: INode;
}

interface ResultMap {
    [id: number]: DistanceResult;
}

var id = 0;
export class Node implements INode {
    private _id = id++;
    
    public get id(): number {
        return this._id;
    }
}

export class NodeList implements IList {
    private _nodes = <INodeHash>{};
    private _length = 0;

    public getNode(id: string): INode;
    public getNode(id: number): INode;

    public getNode(id: any): INode {
        if (!this._nodes[id]) return null;
        else return this._nodes[id];
    }

    public addNode(node: INode): void {
        this._nodes[node.id] = node;
        this._length++;
    }

    public removeNode(node: INode): void {
        this._nodes[node.id] = undefined;
        this._length--;
    }

    public forEach(op: (u: INode, list?: NodeList) => void ) {
        for (var id in this._nodes) {
            op(this._nodes[id], this);
        }
    }

    public toArray(): INode[] {
        var nodeArray: INode[] = [];

        this.forEach((node) => nodeArray.push(node));

        return nodeArray;
    }

    public get length(): number { return this._length; }
}

export class EdgeMap {
    private _edges = {};

    public setEdge(one: INode, two: INode, distance: number) {

        if (!this._edges[one.id]) this._edges[one.id] = {};
        if (!this._edges[two.id]) this._edges[two.id] = {};

        this._edges[one.id][two.id] = distance;
        this._edges[two.id][one.id] = distance;
    }

    public getEdge(one: INode, two: INode): number {
        if (this._edges[one.id] === undefined || this._edges[one.id][two.id] === undefined) return Number.POSITIVE_INFINITY;
        else return this._edges[one.id][two.id];
    }

    public forEach(op: (u: INode, v: INode, distance: number) => void ) {
        var _this = this;

        _this.nodes.forEach(function (node1) {
            for (var n2id in _this._edges[node1.id]) {
                var node2 = _this.nodes.getNode(n2id);
                op(node1, node2, _this._edges[node1.id][node2.id]);
            }
        });
    }

    constructor(public nodes: NodeList) {

    }
}

export class DistanceResult {

    constructor(public distance: number, public via: INode) {

    }
}

export class DistanceResultList {
    private _distances = <ResultMap>{};

    public getDistanceFrom(source: INode): DistanceResult {
        if (!this._distances[source.id]) return this._distances[source.id] = new DistanceResult(Number.POSITIVE_INFINITY, null);
        return this._distances[source.id];
    }

    constructor(public destination: INode) {
        this._distances[destination.id] = new DistanceResult(0, null);
    }
}

export class Graph {

    public addNode(node: INode): void {
        this.nodes.addNode(node);
    }

    constructor(public nodes: NodeList, public edges: EdgeMap) {
    }

    public getShortestPathsSync(destination: INode): DistanceResultList {
        var shortestPaths = new DistanceResultList(destination);

        for (var i = 0; i < this.nodes.length - 1; i++) {
            this.edges.forEach(function (u, v, w) {
                var uPath = shortestPaths.getDistanceFrom(u);
                var vPath = shortestPaths.getDistanceFrom(v);

                if (uPath.distance + w < vPath.distance) {
                    vPath.distance = uPath.distance + w;
                    vPath.via = u;
                }
            });
        }

        this.edges.forEach((u, v, w) =>
        {
            if (shortestPaths.getDistanceFrom(u).distance + w
                < shortestPaths.getDistanceFrom(v).distance)
                throw "negative-weight cycle";
        });

        return shortestPaths;
    }
}