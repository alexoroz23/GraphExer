class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set(); // Initialize a set to store nodes
  }

  // Add a single vertex to the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // Add multiple vertices to the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.addVertex(vertex));
  }

  // Add an edge between two vertices
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // Remove an edge between two vertices
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // Remove a vertex from the graph
  removeVertex(vertex) {
    this.nodes.delete(vertex); // Remove the vertex from the graph's nodes

    // Remove references to the vertex from all other vertices' adjacency lists
    this.nodes.forEach(node => {
      node.adjacent.delete(vertex);
    });
  }

  // Depth First Search traversal
  depthFirstSearch(start) {
    const visited = new Set(); // Track visited nodes
    const result = []; // Store the result of DFS traversal

    // Define a recursive function for DFS traversal
    function dfs(node) {
      if (!node) return;
      visited.add(node); // Mark the current node as visited
      result.push(node.value); // Add the current node's value to the result array
      node.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          // Recursively visit unvisited neighbors
          dfs(neighbor);
        }
      });
    }

    dfs(start); // Start DFS traversal from the given start node
    return result;
  }

  // Breadth First Search traversal
  breadthFirstSearch(start) {
    const visited = new Set(); // Track visited nodes
    const queue = [start]; // Initialize a queue for BFS traversal
    const result = []; // Store the result of BFS traversal

    visited.add(start); // Mark the start node as visited

    while (queue.length > 0) {
      const current = queue.shift(); // Dequeue the current node
      result.push(current.value); // Add the current node's value to the result array

      // Visit all unvisited neighbors of the current node
      current.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor); // Mark the neighbor as visited
          queue.push(neighbor); // Enqueue the neighbor for further traversal
        }
      });
    }

    return result;
  }
}

module.exports = { Graph, Node };
