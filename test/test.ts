/// <reference path="../bellmanford.ts" />
/// <reference path="node.d.ts" />

import as = module("assert");
import bf = module("../bellmanford");

interface assertFunc {
    (assertion: bool, message?: string): void;
}

var assert = <assertFunc>(<any>as);

declare var describe: (descriptor: string, suite: () => void ) => void;
declare var it: (descriptor: string, test: (done?: (err?) => void ) => void ) => void;

describe("BellmanFordSearch", function() {
    describe("#getShortestPaths()", function () {
        var nodeList = new bf.NodeList();
        for (var i = 0; i < 6; i++) {
            nodeList.addNode(new bf.Node());
        }

        var nodeArray = nodeList.toArray();

        var edgeMap = new bf.EdgeMap(nodeList);

        edgeMap.setEdge(nodeArray[0], nodeArray[1], 3);
        edgeMap.setEdge(nodeArray[0], nodeArray[2], 2);
        edgeMap.setEdge(nodeArray[0], nodeArray[3], 5);
        
        edgeMap.setEdge(nodeArray[1], nodeArray[3], 1);
        edgeMap.setEdge(nodeArray[1], nodeArray[4], 4);

        edgeMap.setEdge(nodeArray[2], nodeArray[3], 2);
        edgeMap.setEdge(nodeArray[2], nodeArray[5], 1);

        edgeMap.setEdge(nodeArray[3], nodeArray[4], 3);
        
        edgeMap.setEdge(nodeArray[4], nodeArray[5], 2);

        var graph = new bf.BellmanFordSearch(nodeList, edgeMap);

        it("should return true", function () {
            assert(true,"Value was not true");
        });

        it("should not be equal", function () {
            as.notStrictEqual(1, 3);
        });

        it("should have 6 nodes", function () {
            as.equal(graph.nodes.length, 6);
        });

        it("should have the following shortest paths to node 1", function () {
            var shortestPaths = graph.getShortestPathsSync(nodeArray[0]);

            as.equal(shortestPaths.getDistanceFrom(nodeArray[1]).distance, 3);
            as.equal(shortestPaths.getDistanceFrom(nodeArray[2]).distance, 2);
            as.equal(shortestPaths.getDistanceFrom(nodeArray[3]).distance, 4);
            as.equal(shortestPaths.getDistanceFrom(nodeArray[4]).distance, 5);
            as.equal(shortestPaths.getDistanceFrom(nodeArray[5]).distance, 3);
        });

        it("should have the following shortest paths to node 2", function () {
            var shortestPaths = graph.getShortestPathsSync(nodeArray[1]);

            as.equal(shortestPaths.getDistanceFrom(nodeArray[0]).distance, 3);
            as.equal(shortestPaths.getDistanceFrom(nodeArray[2]).distance, 3);
            as.equal(shortestPaths.getDistanceFrom(nodeArray[3]).distance, 1);
            as.equal(shortestPaths.getDistanceFrom(nodeArray[4]).distance, 4);
            as.equal(shortestPaths.getDistanceFrom(nodeArray[5]).distance, 4);
        });
    });
});