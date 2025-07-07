// =============================================================================
// KAIROS FRONTEND - VISUAL RULE BUILDER FOR ELIGIBILITYATOMS
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/components/atoms/VisualRuleBuilder.tsx
// Purpose: Drag-and-drop interface for composing EligibilityAtoms
// =============================================================================

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  BeakerIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  Cog6ToothIcon,
  LinkIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';
import { EligibilityAtom, AtomType, AtomCategory } from '@/stores/useAppStore';
import { useAtoms } from '@/hooks/useApi';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface RuleNode {
  id: string;
  type: 'atom' | 'operator' | 'group';
  atomId?: string;
  operator?: 'AND' | 'OR' | 'NOT';
  conditions?: RuleCondition[];
  children?: RuleNode[];
  parent?: string;
  position: { x: number; y: number };
}

interface RuleCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in_range' | 'between';
  value: any;
  weight?: number;
}

interface RuleComposition {
  id: string;
  name: string;
  description: string;
  nodes: RuleNode[];
  connections: RuleConnection[];
  isValid: boolean;
  estimatedPerformance?: {
    accuracy: number;
    speed: number;
    complexity: number;
  };
}

interface RuleConnection {
  id: string;
  source: string;
  target: string;
  type: 'AND' | 'OR' | 'NOT';
}

interface AtomLibraryItem {
  atom: EligibilityAtom;
  category: AtomCategory;
  dragId: string;
}

// ============================================================================
// ATOM LIBRARY COMPONENT
// ============================================================================

const AtomLibrary: React.FC<{
  onSelectAtom: (atom: EligibilityAtom) => void;
}> = ({ onSelectAtom }) => {
  const { data: atoms, isLoading } = useAtoms();
  const [selectedCategory, setSelectedCategory] = useState<AtomCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categorizedAtoms = useMemo(() => {
    if (!atoms?.data) return {};
    
    return atoms.data.reduce((acc: Record<AtomCategory, EligibilityAtom[]>, atom) => {
      if (!acc[atom.category]) {
        acc[atom.category] = [];
      }
      acc[atom.category].push(atom);
      return acc;
    }, {} as Record<AtomCategory, EligibilityAtom[]>);
  }, [atoms?.data]);

  const filteredAtoms = useMemo(() => {
    if (!atoms?.data) return [];
    
    let filtered = atoms.data;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(atom => atom.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(atom => 
        atom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        atom.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        atom.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  }, [atoms?.data, selectedCategory, searchQuery]);

  const categories: { key: AtomCategory | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'All Atoms', icon: '🧪' },
    { key: 'Demographic', label: 'Demographic', icon: '👥' },
    { key: 'Behavioral', label: 'Behavioral', icon: '🎯' },
    { key: 'Geographic', label: 'Geographic', icon: '🌍' },
    { key: 'Temporal', label: 'Temporal', icon: '⏰' },
    { key: 'Predictive', label: 'Predictive', icon: '🔮' },
    { key: 'Contextual', label: 'Contextual', icon: '🌟' },
  ];

  const AtomCard: React.FC<{ atom: EligibilityAtom }> = ({ atom }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      isDragging,
    } = useSortable({ id: `atom-${atom.id}` });

    const style = {
      transform: CSS.Transform.toString(transform),
      opacity: isDragging ? 0.5 : 1,
    };

    const getAtomTypeIcon = (type: AtomType): string => {
      const iconMap: Record<AtomType, string> = {
        'AgeRangeAtom': '📅',
        'GeographyAtom': '🗺️',
        'TenureAtom': '📊',
        'SegmentAtom': '🎯',
        'TimeOfDayAtom': '🕐',
        'DeviceTypeAtom': '📱',
        'ConsentAtom': '✅',
        'PurchaseFrequencyAtom': '🛒',
        'EngagementScoreAtom': '💡',
        'ChurnRiskAtom': '⚠️',
        'WeatherImpactAtom': '🌤️',
        'BehaviorPatternAtom': '🔄',
      };
      return iconMap[type] || '⚛️';
    };

    return (
      <motion.div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="
          bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-xl p-4 cursor-grab
          hover:border-primary/50 hover:bg-gray-900/70 transition-all duration-200
          active:cursor-grabbing
        "
        onClick={() => onSelectAtom(atom)}
      >
        <div className="flex items-start space-x-3">
          <div className="text-2xl">{getAtomTypeIcon(atom.type)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-100 truncate">{atom.name}</h4>
              <div className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${atom.isActive 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }
              `}>
                {atom.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
            <p className="text-sm text-gray-400 line-clamp-2 mb-3">{atom.description}</p>
            
            {atom.performance && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Accuracy</span>
                <span className="text-primary font-medium">{atom.performance.accuracy}%</span>
              </div>
            )}
            
            {atom.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {atom.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {atom.tags.length > 3 && (
                  <span className="text-xs text-gray-500">+{atom.tags.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-950/80 backdrop-blur-xl border-r border-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2 mb-4">
          <BeakerIcon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-100">EligibilityAtoms Library</h3>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search atoms..."
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary"
          />
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-1">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`
                px-3 py-1 text-xs font-medium rounded-full transition-all duration-200
                ${selectedCategory === category.key
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:bg-gray-800'
                }
              `}
            >
              <span className="mr-1">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Atoms List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredAtoms.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <BeakerIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No atoms found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <DndContext
            sensors={useSensors(
              useSensor(PointerSensor),
              useSensor(KeyboardSensor, {
                coordinateGetter: sortableKeyboardCoordinates,
              })
            )}
            collisionDetection={closestCenter}
          >
            <SortableContext items={filteredAtoms.map(atom => `atom-${atom.id}`)} strategy={verticalListSortingStrategy}>
              {filteredAtoms.map(atom => (
                <AtomCard key={atom.id} atom={atom} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// RULE NODE COMPONENT
// ============================================================================

const RuleNodeComponent: React.FC<{
  node: RuleNode;
  atom?: EligibilityAtom;
  onUpdate: (nodeId: string, updates: Partial<RuleNode>) => void;
  onDelete: (nodeId: string) => void;
  onConnect: (sourceId: string, targetId: string, type: 'AND' | 'OR' | 'NOT') => void;
}> = ({ node, atom, onUpdate, onDelete, onConnect }) => {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.7 : 1,
  };

  const getNodeIcon = () => {
    switch (node.type) {
      case 'atom':
        return <BeakerIcon className="w-5 h-5" />;
      case 'operator':
        return <LinkIcon className="w-5 h-5" />;
      case 'group':
        return <Square3Stack3DIcon className="w-5 h-5" />;
      default:
        return <InformationCircleIcon className="w-5 h-5" />;
    }
  };

  const getNodeColor = () => {
    switch (node.type) {
      case 'atom':
        return 'border-primary text-primary';
      case 'operator':
        return 'border-secondary text-secondary';
      case 'group':
        return 'border-accent text-accent';
      default:
        return 'border-gray-600 text-gray-400';
    }
  };

  const getOperatorDisplay = () => {
    switch (node.operator) {
      case 'AND':
        return { label: 'AND', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
      case 'OR':
        return { label: 'OR', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
      case 'NOT':
        return { label: 'NOT', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
      default:
        return { label: 'LOGIC', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' };
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`
        relative bg-gray-900/80 backdrop-blur-xl border-2 rounded-xl p-4 cursor-move
        hover:bg-gray-900/90 transition-all duration-200 min-w-[200px] max-w-[300px]
        ${getNodeColor()}
        ${isDragging ? 'shadow-2xl z-50' : 'shadow-lg'}
      `}
      {...listeners}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getNodeIcon()}
          <span className="font-medium text-gray-100">
            {node.type === 'atom' && atom ? atom.name : 
             node.type === 'operator' ? getOperatorDisplay().label :
             node.type === 'group' ? 'Group' : 'Node'}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          {node.type === 'atom' && (
            <button
              onClick={() => setIsConfiguring(true)}
              className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
              title="Configure atom"
            >
              <Cog6ToothIcon className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={() => setIsConnecting(!isConnecting)}
            className={`
              p-1 transition-colors
              ${isConnecting ? 'text-primary' : 'text-gray-400 hover:text-gray-300'}
            `}
            title="Connect to other nodes"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(node.id)}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
            title="Delete node"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {node.type === 'atom' && atom && (
          <>
            <p className="text-sm text-gray-400 line-clamp-2">{atom.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Type</span>
              <span className="text-gray-300">{atom.type}</span>
            </div>
            {atom.performance && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Accuracy</span>
                <span className="text-primary font-medium">{atom.performance.accuracy}%</span>
              </div>
            )}
            {node.conditions && node.conditions.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-700">
                <p className="text-xs text-gray-500 mb-1">Conditions:</p>
                {node.conditions.map((condition, index) => (
                  <div key={index} className="text-xs text-gray-400">
                    {condition.field} {condition.operator} {JSON.stringify(condition.value)}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {node.type === 'operator' && (
          <div className="text-center">
            <div className={`
              inline-flex px-3 py-1 rounded-full text-sm font-medium border
              ${getOperatorDisplay().color}
            `}>
              {getOperatorDisplay().label}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Logic operator for combining results
            </p>
          </div>
        )}

        {node.type === 'group' && (
          <div className="text-center">
            <div className="text-sm text-gray-400">
              Contains {node.children?.length || 0} child nodes
            </div>
          </div>
        )}
      </div>

      {/* Connection Points */}
      {isConnecting && (
        <div className="absolute -top-2 -right-2 flex space-x-1">
          {['AND', 'OR', 'NOT'].map(op => (
            <button
              key={op}
              className="w-6 h-6 bg-gray-800 border border-gray-600 rounded-full text-xs font-medium text-gray-300 hover:bg-gray-700 transition-colors"
              title={`Connect with ${op}`}
            >
              {op[0]}
            </button>
          ))}
        </div>
      )}

      {/* Configuration Modal */}
      <AnimatePresence>
        {isConfiguring && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm rounded-xl flex items-center justify-center z-10"
          >
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 max-w-sm w-full mx-4">
              <h4 className="font-medium text-gray-100 mb-3">Configure Atom</h4>
              <p className="text-sm text-gray-400 mb-4">
                Atom configuration interface will be implemented here
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsConfiguring(false)}
                  className="px-3 py-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsConfiguring(false)}
                  className="px-3 py-2 bg-primary text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ============================================================================
// RULE CANVAS COMPONENT
// ============================================================================

const RuleCanvas: React.FC<{
  composition: RuleComposition;
  atoms: EligibilityAtom[];
  onUpdateComposition: (updates: Partial<RuleComposition>) => void;
}> = ({ composition, atoms, onUpdateComposition }) => {
  const [draggedNode, setDraggedNode] = useState<RuleNode | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const node = composition.nodes.find(n => n.id === event.active.id);
    setDraggedNode(node || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedNode(null);

    if (active.id !== over?.id) {
      const oldIndex = composition.nodes.findIndex(n => n.id === active.id);
      const newIndex = composition.nodes.findIndex(n => n.id === over?.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newNodes = arrayMove(composition.nodes, oldIndex, newIndex);
        onUpdateComposition({ nodes: newNodes });
      }
    }
  };

  const handleNodeUpdate = (nodeId: string, updates: Partial<RuleNode>) => {
    const updatedNodes = composition.nodes.map(node =>
      node.id === nodeId ? { ...node, ...updates } : node
    );
    onUpdateComposition({ nodes: updatedNodes });
  };

  const handleNodeDelete = (nodeId: string) => {
    const updatedNodes = composition.nodes.filter(node => node.id !== nodeId);
    const updatedConnections = composition.connections.filter(conn =>
      conn.source !== nodeId && conn.target !== nodeId
    );
    onUpdateComposition({ 
      nodes: updatedNodes,
      connections: updatedConnections 
    });
  };

  const handleConnect = (sourceId: string, targetId: string, type: 'AND' | 'OR' | 'NOT') => {
    const newConnection = {
      id: `conn_${Date.now()}`,
      source: sourceId,
      target: targetId,
      type,
    };
    onUpdateComposition({
      connections: [...composition.connections, newConnection]
    });
  };

  const addOperatorNode = (type: 'AND' | 'OR' | 'NOT') => {
    const newNode: RuleNode = {
      id: `operator_${Date.now()}`,
      type: 'operator',
      operator: type,
      position: { x: 200, y: 200 },
    };
    onUpdateComposition({
      nodes: [...composition.nodes, newNode]
    });
  };

  return (
    <div className="flex-1 relative bg-gray-950/50 overflow-hidden">
      {/* Canvas Header */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex items-center justify-between bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-xl p-3">
          <div>
            <h3 className="font-semibold text-gray-100">{composition.name}</h3>
            <p className="text-sm text-gray-400">{composition.description}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Add Operator Buttons */}
            <div className="flex space-x-1">
              {['AND', 'OR', 'NOT'].map(op => (
                <button
                  key={op}
                  onClick={() => addOperatorNode(op as 'AND' | 'OR' | 'NOT')}
                  className="px-3 py-1 bg-gray-800/50 border border-gray-600 text-gray-300 text-sm rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  {op}
                </button>
              ))}
            </div>
            
            {/* Actions */}
            <button className="p-2 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary/30 transition-colors">
              <PlayIcon className="w-4 h-4" />
            </button>
            <button className="p-2 bg-gray-800/50 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700/50 transition-colors">
              <EyeIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="h-full pt-20 p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="h-full relative">
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />

            {/* Nodes */}
            <SortableContext items={composition.nodes.map(n => n.id)} strategy={verticalListSortingStrategy}>
              <div className="absolute inset-0 p-4">
                {composition.nodes.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <BeakerIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">Start Building Your Rule</h3>
                      <p className="text-sm">Drag atoms from the library to create your composition</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {composition.nodes.map(node => {
                      const atom = node.atomId ? atoms.find(a => a.id === node.atomId) : undefined;
                      return (
                        <RuleNodeComponent
                          key={node.id}
                          node={node}
                          atom={atom}
                          onUpdate={handleNodeUpdate}
                          onDelete={handleNodeDelete}
                          onConnect={handleConnect}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </SortableContext>

            {/* Connections */}
            <svg className="absolute inset-0 pointer-events-none">
              {composition.connections.map(connection => (
                <motion.line
                  key={connection.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  x1="100"
                  y1="100"
                  x2="200"
                  y2="200"
                  stroke={
                    connection.type === 'AND' ? '#22c55e' :
                    connection.type === 'OR' ? '#eab308' :
                    '#ef4444'
                  }
                  strokeWidth="2"
                  strokeDasharray={connection.type === 'NOT' ? '5,5' : 'none'}
                  markerEnd="url(#arrowhead)"
                />
              ))}
              
              {/* Arrow marker */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="currentColor"
                  />
                </marker>
              </defs>
            </svg>
          </div>

          <DragOverlay>
            {draggedNode && (
              <div className="bg-gray-900/90 border-2 border-primary rounded-xl p-4 shadow-2xl">
                <div className="font-medium text-gray-100">
                  {draggedNode.type === 'atom' ? 'Atom Node' : 
                   draggedNode.type === 'operator' ? `${draggedNode.operator} Operator` :
                   'Group Node'}
                </div>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Performance Indicator */}
      {composition.estimatedPerformance && (
        <div className="absolute bottom-4 right-4">
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-xl p-3">
            <div className="text-xs text-gray-400 mb-2">Estimated Performance</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Accuracy</span>
                <span className="text-green-400">{composition.estimatedPerformance.accuracy}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Speed</span>
                <span className="text-blue-400">{composition.estimatedPerformance.speed}ms</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Complexity</span>
                <span className="text-yellow-400">{composition.estimatedPerformance.complexity}/10</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN VISUAL RULE BUILDER COMPONENT
// ============================================================================

export const VisualRuleBuilder: React.FC<{
  onSave?: (composition: RuleComposition) => void;
  initialComposition?: RuleComposition;
}> = ({ onSave, initialComposition }) => {
  const { data: atomsData } = useAtoms();
  const atoms = atomsData?.data || [];

  const [composition, setComposition] = useState<RuleComposition>(
    initialComposition || {
      id: `composition_${Date.now()}`,
      name: 'New Rule Composition',
      description: 'Describe your rule composition',
      nodes: [],
      connections: [],
      isValid: false,
    }
  );

  const handleSelectAtom = useCallback((atom: EligibilityAtom) => {
    const newNode: RuleNode = {
      id: `node_${Date.now()}`,
      type: 'atom',
      atomId: atom.id,
      position: { x: 100 + composition.nodes.length * 50, y: 100 + composition.nodes.length * 50 },
    };
    
    setComposition(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
    }));
  }, [composition.nodes.length]);

  const handleUpdateComposition = useCallback((updates: Partial<RuleComposition>) => {
    setComposition(prev => ({ ...prev, ...updates }));
  }, []);

  const handleSave = () => {
    onSave?.(composition);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-950">
      {/* Atom Library Sidebar */}
      <div className="w-80 flex-shrink-0">
        <AtomLibrary onSelectAtom={handleSelectAtom} />
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        <RuleCanvas
          composition={composition}
          atoms={atoms}
          onUpdateComposition={handleUpdateComposition}
        />
        
        {/* Bottom Actions */}
        <div className="border-t border-gray-800 bg-gray-950/80 backdrop-blur-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`
                flex items-center space-x-2 px-3 py-1 rounded-full text-sm
                ${composition.isValid 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
                }
              `}>
                {composition.isValid ? (
                  <CheckCircleIcon className="w-4 h-4" />
                ) : (
                  <XCircleIcon className="w-4 h-4" />
                )}
                <span>{composition.isValid ? 'Valid' : 'Invalid'} Composition</span>
              </div>
              
              <div className="text-sm text-gray-400">
                {composition.nodes.length} nodes, {composition.connections.length} connections
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                Preview
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Save Composition
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualRuleBuilder;