bellmanford
===========

An implementation of the Bellman-Ford algorithm in TypeScript.
It is not dependent on node.js, but it does use CommonJS style
exports.

To install, use:
	
	npm install bellmanford

It can be used from both TypeScript and JavaScript. The NodeList
expects elements that implement the interface INode. INode has only
one property: id of type number. As long as your nodes each have
distinct ids, you should be fine.

TypeScript:
-----------

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

	var shortestPaths = graph.getShortestPathsSync(nodeArray[0]);