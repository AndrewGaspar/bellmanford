/// <reference path="../bellmanford.ts" />
/// <reference path="node.d.ts" />

import as = module("assert");
import bf = module("../bellmanford");

interface assertFunc {
    (assertion: bool, message?: string): void;
}

var assert = <assertFunc>(<any>as);

declare var describe: (descriptor: string, suite: () => void ) => void;
//declare var it: (descriptor: string, test: () => void ) => void;
declare var it: (descriptor: string, test: (done: (err?: any) => void ) => void ) => void;

class Node implements bf.INode {
    constructor(public id: number) { }
}

function compareShortestPaths(paths: bf.DistanceResultList, nodeArray: bf.INode[], distanceVec: number[]) {
    for (var i = 0; i < nodeArray.length; i++) {
        if (paths.getDistanceFrom(nodeArray[i]).distance != distanceVec[i]) return false;
    }
    return true;
}

describe("BellmanFordSearch", function() {
    describe("#getShortestPaths()", function () {
        var nodeList = new bf.NodeList();
        for (var i = 0; i < 6; i++) {
            nodeList.addNode(new Node(i+1));
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

        var graph = new bf.Graph(nodeList, edgeMap);

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

            assert(compareShortestPaths(shortestPaths, nodeArray, [3, 0, 3, 1, 4, 4]), "don't match");
        });

        it("should still work async", function (done: (err?) => void ) {
            var shortestPaths = graph.getShortestPathsAsync(nodeArray[5])
                .then(function (paths) {
                    if (compareShortestPaths(paths, nodeArray, [3, 4, 1, 3, 2, 0])) done();
                    else done("don't match");
                }, done);
        });
    });
});