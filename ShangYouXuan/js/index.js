window.onload = function() {
    const navPath = document.getElementById('navPath')
    const path = goodData.path

    for (let i = 0; i < path.length; i++) {
        if (path.length - 1 === i) {
            const aNode = document.createElement('a')
            aNode.innerText = path[i].title
            navPath.appendChild(aNode)
        } else {
            const aNode = document.createElement('a')
            aNode.innerText = path[i].title
            aNode.href = path[i].url

            const iNode = document.createElement('i')
            iNode.innerText = '/'

            navPath.appendChild(aNode)
            navPath.appendChild(iNode)
        }
    }
}