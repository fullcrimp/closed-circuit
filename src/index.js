module.exports = function isCircuitClosed(matrix) {
  let nodeList = [],
    firstNode = findFirstNode(matrix)


  // no nodes found
  if (!firstNode) return false

  nodeList.push(firstNode)


  for (let nodeIndex = 0, curNode, linkedNodes; curNode = nodeList[nodeIndex]; nodeIndex++) {

    linkedNodes = getLinkedNodesList(matrix, curNode)

    // node has not more than two linked nodes -> ending node, not circular
    if (linkedNodes.length < 2) return false

    linkedNodes.forEach((node) => {
      if (!isInNodeList(nodeList, node)) {
        nodeList.push(node)
      }
    })
  }
  return true
}


function findFirstNode(matrix) {
  for (let i = 0, j; row = matrix[i]; i++) {
    j = row.indexOf(1);
    if (j > -1) return [i, j]
  }
  return null
}


/**
 * in case of a massive matrix it is faster to
 * iterate through linked nodes
 */
function getLinkedNodesList(matrix, pos) {
  let sum = 0,
    linkedNodeList = []

  for (let i = -1; i <= 1; i++) {
    for (let j = -1, posToCheck; j <= 1; j++) {
      posToCheck = [pos[0] + i, pos[1] + j]

      if (isRealPosition(matrix, posToCheck) && !isSamePosition(pos, posToCheck) && matrix[posToCheck[0]][posToCheck[1]] > 0) {
        linkedNodeList.push(posToCheck)
      }
    }
  }
  return linkedNodeList
}


function isInNodeList(nodeList, node) {
  return nodeList.some((nodeInList) => isSamePosition(node, nodeInList))
}


function isRealPosition(matrix, pos) {
  let rowNum = matrix.length - 1,
    colNum = matrix[0].length - 1
  return pos[0] >= 0 && pos[1] >= 0 && pos[0] < rowNum && pos[1] < colNum
}


function isSamePosition(posA, posB) {
  return posA[0] === posB[0] && posA[1] === posB[1]
}