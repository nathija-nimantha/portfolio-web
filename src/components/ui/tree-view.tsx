import React from "react"

export interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
}

interface TreeViewProps {
  nodes: TreeNode[]
  onSelect?: (id: string) => void
  selectedId?: string
  renderNode?: (node: TreeNode) => React.ReactNode
}

export const TreeView: React.FC<TreeViewProps> = ({ nodes, onSelect, selectedId, renderNode }) => {
  const renderTree = (nodes: TreeNode[]) => (
    <ul className="pl-4">
      {nodes.map((node) => (
        <li key={node.id}>
          {typeof renderNode === 'function' ? (
            <span onClick={() => onSelect?.(node.id)}>
              {renderNode(node)}
            </span>
          ) : (
            <button
              className={`w-full text-left py-1 px-2 rounded transition-colors font-mono text-sm ${selectedId === node.id ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"}`}
              onClick={() => onSelect?.(node.id)}
            >
              {node.label}
            </button>
          )}
          {node.children && node.children.length > 0 && renderTree(node.children)}
        </li>
      ))}
    </ul>
  )
  return <nav>{renderTree(nodes)}</nav>
}
