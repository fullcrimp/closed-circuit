module.exports = function isCircuitClosed (matrix) {
  let nodeList = [],
      firstNode = findFirstNode(matrix)

  if (!firstNode) return false // no nodes found at all

  nodeList.push(firstNode)

  for (let nodeIndex = 0, curNode, linkedNodeList; curNode = nodeList[nodeIndex]; nodeIndex++) {
    linkedNodeList = getLinkedNodeList(matrix, curNode)

    // node has not more than two linked nodes: 
    // <2 linked nodes -> ending node -> not closed circuit
    // all nodes have >2 linked nodes ->  the circuit is closed
    if (linkedNodeList.length < 2) return false

    // check if nodes are unique and add those to the node list
    linkedNodeList.forEach((node) => {
      if (!isInList(nodeList, node)) {
        nodeList.push(node)
      }
    })
  }
  return true
}


function findFirstNode (matrix) {
  for (let i = 0, j; row = matrix[i]; i++) {
    j = row.indexOf(1);
    if (j > -1) return [i, j]
  }
  return null
}


// in case of a massive matrix it is faster to
// iterate through linked nodes
function getLinkedNodeList (matrix, posOrigin) {
  let sum = 0,
    linkedNodeList = []

  // looking through all adjacent nodes
  for (let i = -1; i <= 1; i++) {
    for (let j = -1, pos; j <= 1; j++) {
      pos = [posOrigin[0] + i, posOrigin[1] + j]

      if (existPos(matrix, pos) && !equalPos(posOrigin, pos) && matrix[pos[0]][pos[1]]) {
        linkedNodeList.push(pos)
      }
    }
  }
  return linkedNodeList
}

// utility functions
function isInList (nodeList, node) {
  return nodeList.some((nodeInList) => equalPos(node, nodeInList))
}


function existPos (matrix, pos) {
  return pos[0] >= 0 && pos[1] >= 0 && pos[0] < matrix.length - 1 && pos[1] < matrix[0].length - 1
}


function equalPos (firstArr, secondArr) {
  return firstArr.every((element, i) => firstArr[i] === secondArr[i])
}