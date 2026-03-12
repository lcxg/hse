import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Users, 
  Plus, 
  Download, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Edit, 
  Trash2, 
  ArrowUpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRightLeft,
  BookOpen,
  ClipboardCheck,
  Factory,
  Warehouse,
  UserCircle,
  GraduationCap,
  Trophy,
  Clock,
  Map,
  Bell,
  ShieldAlert,
  CalendarClock,
  Send,
  Shield,
  Wrench,
  Leaf,
  History,
  Calendar,
  List,
  Inbox,
  Filter,
  BarChart3,
  Circle,
  Sparkles,
  Wand2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type MenuType = 'equipment' | 'sop' | 'station' | 'employee' | 'talent' | 'warning' | 'portal' | 'task' | 'task-detail';

const FACTORY_WORKSHOPS: Record<string, string[]> = {
  '兖州工厂': ['一期半成品车间', '密炼车间', '成型车间'],
  '神州工厂': ['二期成型车间', '硫化车间', '动力车间'],
  '焦作工厂': ['三期硫化车间', '成品车间', '仓储中心'],
};

const AVAILABLE_STATIONS = ['成型主机岗', '成型备料岗', '四复合喂胶岗', '硫化操作岗', '质检岗'];

// Mock data for linkage check
const MOCK_STATIONS: Record<string, string[]> = {
  '四复合喂胶岗': ['安全生产总则', '四复合喂胶标准操作', '紧急停机 SOP'],
  '成型主机岗': ['安全生产总则', '成型机标准操作规程'],
};

interface Equipment {
  id: string;
  name: string;
  factory: string;
  workshop: string;
  stationCount: number;
  status: 'running' | 'stopped' | 'maintenance';
}

interface SOP {
  id: string;
  name: string;
  version: string;
  status: 'published' | 'revising';
  effectiveDate: string;
  category: 'safety' | 'quality' | 'operation';
}

interface Station {
  id: string;
  name: string;
  category: 'HSE' | 'production' | 'general';
  description: string;
  validityMonths: number;
  passScore: number;
  practicalRequirement: string;
  status: 'active' | 'inactive';
  associatedEquipments: string[];
  requiredSOPs: string[];
  examConfig: {
    written: string;
    practical: string;
  };
}

interface Certificate {
  stationName: string;
  issueDate: string;
  expiryDate: string;
  daysRemaining: number;
}

interface Employee {
  id: string;
  name: string;
  role: 'apprentice' | 'employee';
  certificates: Certificate[];
}

interface Trainee {
  id: string;
  name: string;
  progress: {
    completed: number;
    total: number;
  };
}

interface WarningRecord {
  id: string;
  empName: string;
  empId: string;
  dept: string;
  certName: string;
  issueDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'normal' | 'expiring' | 'expired';
}

// --- Components ---

const PortalDashboard = ({ onSelectSOP }: { onSelectSOP: () => void }) => {
  const cards = [
    { title: "HSE Safety Management", icon: Shield, color: "bg-rose-500" },
    { title: "Equipment Lifecycle", icon: Wrench, color: "bg-blue-500" },
    { title: "Environmental Monitoring", icon: Leaf, color: "bg-emerald-500" },
    { title: "SOP Management", icon: GraduationCap, color: "bg-amber-500", action: onSelectSOP },
  ];

  return (
    <div className="flex-1 bg-white flex flex-col h-screen overflow-hidden">
      <header className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <LayoutDashboard size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">应用门户</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">Welcome, Administrator</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Enterprise SaaS Dashboard</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-white shadow-sm" />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50/30 overflow-auto">
        <div className="max-w-4xl w-full space-y-12 py-12">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Choose Your Application</h1>
            <p className="text-gray-500">Select a module to begin managing your industrial operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card, idx) => (
              <motion.button
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={card.action}
                className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all text-left flex flex-col gap-6 group"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg", card.color)}>
                  <card.icon size={32} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{card.title}</h3>
                  <p className="text-sm text-gray-500">Click to launch the {card.title} module and access all its features.</p>
                </div>
                <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Launch Module <ChevronRight size={14} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const Sidebar = ({ activeMenu, setActiveMenu }: { activeMenu: MenuType, setActiveMenu: (m: MenuType) => void }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const subMenus = [
    { id: 'equipment', label: '机台管理', icon: Settings },
    { id: 'sop', label: 'SOP 文档管理', icon: FileText },
    { id: 'station', label: '岗位管理', icon: Users },
    { id: 'employee', label: '员工详情', icon: UserCircle },
    { id: 'talent', label: '人才分布', icon: Map },
    { id: 'warning', label: '复审预警', icon: Bell },
  ];

  return (
    <div className="w-64 bg-[#151619] text-white h-screen flex flex-col border-r border-white/10">
      <div className="p-6 flex items-center gap-3 border-bottom border-white/5">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <Factory size={20} className="text-white" />
        </div>
        <h1 className="font-bold text-lg tracking-tight">工业管理系统</h1>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        <button
          onClick={() => setActiveMenu('portal')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group mb-1",
            activeMenu === 'portal' 
              ? "bg-emerald-500/10 text-emerald-400" 
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          )}
        >
          <LayoutDashboard size={20} className={cn(
            activeMenu === 'portal' ? "text-emerald-400" : "text-gray-500 group-hover:text-white"
          )} />
          <span className="font-bold text-xs uppercase tracking-widest">应用门户</span>
        </button>

        <button
          onClick={() => setActiveMenu('task')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group mb-2",
            activeMenu === 'task' 
              ? "bg-emerald-500/10 text-emerald-400" 
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          )}
        >
          <ClipboardCheck size={20} className={cn(
            activeMenu === 'task' ? "text-emerald-400" : "text-gray-500 group-hover:text-white"
          )} />
          <span className="font-bold text-xs uppercase tracking-widest">任务中台</span>
        </button>

        <div className="space-y-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
          >
            <LayoutDashboard size={20} className="text-gray-500 group-hover:text-white" />
            <span className="font-bold text-xs uppercase tracking-widest">SOP管理</span>
            <div className="ml-auto">
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pl-4 space-y-1"
              >
                {subMenus.map((menu) => (
                  <button
                    key={menu.id}
                    onClick={() => setActiveMenu(menu.id as MenuType)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                      activeMenu === menu.id 
                        ? "bg-emerald-500/10 text-emerald-400" 
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <menu.icon size={18} className={cn(
                      activeMenu === menu.id ? "text-emerald-400" : "text-gray-500 group-hover:text-white"
                    )} />
                    <span className="text-sm font-medium">{menu.label}</span>
                    {activeMenu === menu.id && (
                      <motion.div 
                        layoutId="active-pill"
                        className="ml-auto w-1 h-1 rounded-full bg-emerald-400"
                      />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">管理员</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Super Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Menu 1: Equipment Management ---
const EquipmentModal = ({ isOpen, onClose, initialData }: { isOpen: boolean, onClose: () => void, initialData?: Equipment }) => {
  const [factory, setFactory] = useState(initialData?.factory || '');
  const [workshop, setWorkshop] = useState(initialData?.workshop || '');
  const [name, setName] = useState(initialData?.name || '');
  const [id, setId] = useState(initialData?.id || '');
  const [remarks, setRemarks] = useState('');

  const workshops = factory ? FACTORY_WORKSHOPS[factory] || [] : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-900">{initialData ? '编辑机台' : '新增机台'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-600">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Row 1: Factory & Workshop */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                所属工厂 <span className="text-rose-500">*</span>
              </label>
              <select 
                value={factory}
                onChange={(e) => {
                  setFactory(e.target.value);
                  setWorkshop(''); // Reset workshop on factory change
                }}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              >
                <option value="">选择工厂</option>
                <option value="兖州工厂">兖州工厂</option>
                <option value="神州工厂">神州工厂</option>
                <option value="焦作工厂">焦作工厂</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                所属车间 <span className="text-rose-500">*</span>
              </label>
              <select 
                value={workshop}
                onChange={(e) => setWorkshop(e.target.value)}
                disabled={!factory}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">选择车间</option>
                {workshops.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2: Name & ID */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                机台名称 <span className="text-rose-500">*</span>
              </label>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例：成型机 1#"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                机台编号 <span className="text-rose-500">*</span>
              </label>
              <input 
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="例：JX-CXJ-01"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Row 4: Remarks */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">备注</label>
            <textarea 
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              placeholder="请输入机台相关备注信息..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none"
            />
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
          >
            取消
          </button>
          <button 
            onClick={() => {
              // Logic to save data would go here
              onClose();
            }}
            className="px-8 py-2.5 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            确定
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const EquipmentManagement = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Equipment | undefined>(undefined);

  const data: Equipment[] = [
    { id: 'EQP-YZ-001', name: '四复合 1# 机台', factory: '兖州工厂', workshop: '一期半成品车间', stationCount: 3, status: 'running' },
    { id: 'EQP-YZ-002', name: '四复合 2# 机台', factory: '兖州工厂', workshop: '一期半成品车间', stationCount: 2, status: 'running' },
    { id: 'EQP-SZ-001', name: '成型 1# 机台', factory: '神州工厂', workshop: '二期成型车间', stationCount: 5, status: 'maintenance' },
    { id: 'EQP-JZ-001', name: '硫化 1# 机台', factory: '焦作工厂', workshop: '三期硫化车间', stationCount: 4, status: 'stopped' },
  ];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">机台管理</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setEditingItem(undefined);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span>新增机台</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={18} />
            <span>导出数据</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <button 
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Search size={18} />
              <span>搜索筛选</span>
            </div>
            <ChevronDown size={18} className={cn("text-gray-400 transition-transform", !isSearchExpanded && "-rotate-90")} />
          </button>
          
          <AnimatePresence>
            {isSearchExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">所属工厂</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all">
                    <option>全部工厂</option>
                    <option>兖州工厂</option>
                    <option>神州工厂</option>
                    <option>焦作工厂</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">所属车间</label>
                  <input placeholder="输入车间名称..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">机台状态</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all">
                    <option>全部状态</option>
                    <option>运行中</option>
                    <option>已停止</option>
                    <option>维护中</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">机台编号</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">机台名称</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">所属工厂</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">所属车间</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">关联岗位数</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">运行状态</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">{item.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-gray-600">{item.factory}</td>
                  <td className="px-6 py-4 text-gray-600">{item.workshop}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold hover:bg-emerald-100 transition-colors">
                      {item.stationCount}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        item.status === 'running' ? "bg-emerald-500 animate-pulse" : 
                        item.status === 'maintenance' ? "bg-amber-500" : "bg-gray-400"
                      )} />
                      <span className="text-sm text-gray-700">
                        {item.status === 'running' ? '运行中' : item.status === 'maintenance' ? '维护中' : '已停止'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          setEditingItem(item);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <EquipmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={editingItem}
      />
    </div>
  );
};

// --- Menu 2: SOP Management ---
const VersionUpgradeModal = ({ 
  isOpen, 
  onClose, 
  sop, 
  onConfirm 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  sop?: SOP, 
  onConfirm: (revision: string) => void 
}) => {
  const [revision, setRevision] = useState('');
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen || !sop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <ArrowUpCircle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">版本升级</h3>
              <p className="text-xs text-gray-500">{sop.name} ({sop.version})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">上传新版本 PDF</label>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all">
                <FileText size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">点击或拖拽上传</p>
                <p className="text-xs text-gray-400 mt-1">支持 PDF 格式，最大 20MB</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">修订说明</label>
            <textarea 
              value={revision}
              onChange={(e) => setRevision(e.target.value)}
              rows={4}
              placeholder="请详细描述本次版本升级的修改内容..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
            />
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors">
            取消
          </button>
          <button 
            disabled={!revision}
            onClick={() => onConfirm(revision)}
            className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            确认升级
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const TrainingPromptModal = ({ 
  isOpen, 
  onClose, 
  affectedStations,
  personCount = 20
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  affectedStations: string[],
  personCount?: number
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle size={40} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">检测到岗位受影响</h3>
            <div className="py-3 px-4 bg-amber-50 rounded-2xl border border-amber-100">
              <p className="text-sm text-amber-800 leading-relaxed">
                检测到 <span className="font-bold underline">“{affectedStations.join('、')}”</span> 受此 SOP 变更影响，人数 <span className="font-bold">{personCount}人</span>。
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-4 font-medium">是否立即发起新一轮岗位培训？</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <button 
              onClick={() => {
                alert('已成功发起培训流程！');
                onClose();
              }}
              className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
            >
              发起培训
            </button>
            <button 
              onClick={() => {
                alert('文档已更新，未发起培训。');
                onClose();
              }}
              className="px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all"
            >
              仅更新文档
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const VersionHistoryModal = ({ 
  isOpen, 
  onClose, 
  sop 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  sop?: SOP 
}) => {
  if (!isOpen || !sop) return null;

  const history = [
    { version: 'V1.1', status: '已发起', scope: '四复合喂胶岗, 成型主机岗', headcount: 45, date: '2024-02-10' },
    { version: 'V1.0', status: '已完成', scope: '四复合喂胶岗', headcount: 20, date: '2023-11-05' },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl overflow-hidden border border-slate-200"
      >
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/20">
              <History size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">SOP 版本历史</h3>
              <p className="text-sm text-slate-500 font-medium">{sop.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900">
            <Plus size={28} className="rotate-45" />
          </button>
        </div>

        <div className="p-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">版本</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">培训状态</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">影响范围</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">受训人数</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">日期</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((h) => (
                  <tr key={h.version} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-black tracking-wider">
                        {h.version}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold",
                        h.status === '已发起' ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"
                      )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full", h.status === '已发起' ? "bg-blue-500" : "bg-emerald-500")} />
                        {h.status}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-xs">{h.scope}</p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-sm font-black text-slate-900">{h.headcount}</span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500 font-medium">
                      {h.date}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-900 hover:text-white transition-all">
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
          >
            关闭历史
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const SOPManagement = () => {
  const [upgradingSop, setUpgradingSop] = useState<SOP | undefined>(undefined);
  const [viewingHistorySop, setViewingHistorySop] = useState<SOP | undefined>(undefined);
  const [affectedStations, setAffectedStations] = useState<string[]>([]);
  const [showTrainingPrompt, setShowTrainingPrompt] = useState(false);

  const categories = [
    { id: 'safety', label: '安全类', count: 12 },
    { id: 'quality', label: '质量类', count: 8 },
    { id: 'operation', label: '操作类', count: 24 },
  ];

  const data: SOP[] = [
    { id: 'SOP-HSE-FEED-01', name: '四复合岗位标准化操作流程 (SOP)', version: 'V2.0', status: 'published', effectiveDate: '2024-01-15', category: 'operation' },
    { id: 'SOP-SAF-GEN-01', name: '安全生产总则', version: 'V1.5', status: 'published', effectiveDate: '2023-12-01', category: 'safety' },
    { id: 'SOP-QUA-CHK-02', name: '成品质量检验标准', version: 'V1.2', status: 'revising', effectiveDate: '2024-02-20', category: 'quality' },
  ];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">SOP 文档管理</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm">
          <Plus size={18} />
          <span>上传文档</span>
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Tree */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">文档分类</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button key={cat.id} className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all group">
                  <div className="flex items-center gap-2">
                    <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-sm font-medium">{cat.label}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">SOP 编号</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">文档名称</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">当前版本</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">状态</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">生效日期</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">附件</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">{item.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{item.name}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">{item.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-bold">
                        {item.version}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                        item.status === 'published' ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      )}>
                        {item.status === 'published' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {item.status === 'published' ? '已发布' : '修订中'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.effectiveDate}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 text-gray-400 hover:text-emerald-500 transition-colors">
                        <Download size={18} />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setUpgradingSop(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all"
                        >
                          <ArrowUpCircle size={14} />
                          <span>版本升级</span>
                        </button>
                        <button 
                          onClick={() => setViewingHistorySop(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all"
                        >
                          <History size={14} />
                          <span>版本历史</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <VersionUpgradeModal 
        isOpen={!!upgradingSop}
        sop={upgradingSop}
        onClose={() => setUpgradingSop(undefined)}
        onConfirm={(revision) => {
          if (upgradingSop) {
            // Find affected stations
            const affected = Object.entries(MOCK_STATIONS)
              .filter(([_, sops]) => sops.includes(upgradingSop.name))
              .map(([name]) => name);
            
            setUpgradingSop(undefined);
            
            if (affected.length > 0) {
              setAffectedStations(affected);
              setShowTrainingPrompt(true);
            } else {
              alert('版本升级成功！');
            }
          }
        }}
      />

      <TrainingPromptModal 
        isOpen={showTrainingPrompt}
        affectedStations={affectedStations}
        personCount={20}
        onClose={() => setShowTrainingPrompt(false)}
      />

      <VersionHistoryModal 
        isOpen={!!viewingHistorySop}
        sop={viewingHistorySop}
        onClose={() => setViewingHistorySop(undefined)}
      />
    </div>
  );
};

// --- Menu 3: Station Management ---
const StationList = ({ onAdd, onEdit }: { onAdd: () => void, onEdit: (s: Station) => void }) => {
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const stations: Station[] = [
    {
      id: 'ST-001',
      name: '四复合喂胶岗',
      category: 'production',
      description: '负责四复合机台的喂胶操作及日常维护',
      validityMonths: 12,
      passScore: 80,
      practicalRequirement: '合格',
      status: 'active',
      associatedEquipments: ['四复合 1#', '四复合 2#'],
      requiredSOPs: ['安全生产总则', '四复合喂胶标准操作', '紧急停机 SOP'],
      examConfig: { written: 'HSE 题库 A', practical: '喂胶机启动、紧急停机' }
    },
    {
      id: 'ST-002',
      name: '成型主机岗',
      category: 'production',
      description: '成型机主机操作',
      validityMonths: 24,
      passScore: 85,
      practicalRequirement: '优秀',
      status: 'active',
      associatedEquipments: ['成型 1#'],
      requiredSOPs: ['安全生产总则', '成型机标准操作规程'],
      examConfig: { written: '生产技术题库', practical: '成型全流程操作' }
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">岗位管理</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span>新增岗位</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors">
            <Trash2 size={18} />
            <span>批量删除</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">岗位名称</label>
            <input 
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="输入岗位名称..." 
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">所属分类</label>
            <select 
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            >
              <option value="">全部分类</option>
              <option value="HSE">HSE 类</option>
              <option value="production">生产类</option>
              <option value="general">通用类</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors">
              查询
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">岗位名称</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">关联机台数</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">关联 SOP 数</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">笔试合格分</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">实操要求</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">证书有效期(月)</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">状态</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stations.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">{item.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold hover:bg-indigo-100 transition-colors">
                      {item.associatedEquipments.length}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold hover:bg-emerald-100 transition-colors">
                      {item.requiredSOPs.length}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-700">{item.passScore}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold">{item.practicalRequirement}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600">{item.validityMonths}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className={cn("w-1.5 h-1.5 rounded-full", item.status === 'active' ? "bg-emerald-500" : "bg-gray-300")} />
                      <span className="text-xs text-gray-600">{item.status === 'active' ? '启用' : '禁用'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(item)}
                        className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const StationDetail = ({ station, onBack }: { station?: Station, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'equip' | 'sop' | 'exam'>('basic');
  
  // Form States
  const [name, setName] = useState(station?.name || '');
  const [description, setDescription] = useState(station?.description || '');
  const [validity, setValidity] = useState(station?.validityMonths || 12);
  const [selectedEquips, setSelectedEquips] = useState<string[]>(station?.associatedEquipments || []);
  const [selectedSOPs, setSelectedSOPs] = useState<string[]>(station?.requiredSOPs || []);
  const [writtenBank, setWrittenBank] = useState(station?.examConfig.written || '');
  const [passLine, setPassLine] = useState(station?.passScore || 80);
  const [practicalItems, setPracticalItems] = useState(station?.examConfig.practical || '');

  const availableEquips = ['四复合 1#', '四复合 2#', '四复合 3#', '成型 1#', '成型 2#', '硫化 1#'];
  const allSOPs = ['安全生产总则', '四复合喂胶标准操作', '紧急停机 SOP', '质量控制手册', '设备维护指南', '消防安全规程'];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <ChevronRight size={24} className="rotate-180" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{station ? '编辑岗位' : '新增岗位'}</h2>
            <p className="text-xs text-gray-500">配置岗位的基础信息、关联资源及考核标准</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 max-w-6xl mx-auto w-full">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
          <div className="flex border-b border-gray-200 bg-gray-50/50">
            {[
              { id: 'basic', label: '基础配置', icon: FileText },
              { id: 'equip', label: '关联机台', icon: Settings },
              { id: 'sop', label: '所需 SOP', icon: BookOpen },
              { id: 'exam', label: '考核设置', icon: ClipboardCheck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-8 py-4 text-sm font-medium transition-all relative",
                  activeTab === tab.id ? "text-emerald-600 bg-white" : "text-gray-500 hover:text-gray-700"
                )}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                )}
              </button>
            ))}
          </div>

          <div className="p-8 flex-1">
            {activeTab === 'basic' && (
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">岗位名称</label>
                  <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="如：四复合喂胶工"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">岗位描述</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="请输入岗位职责描述..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">证书有效期 (月)</label>
                  <input 
                    type="number"
                    value={validity}
                    onChange={(e) => setValidity(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" 
                  />
                </div>
              </div>
            )}

            {activeTab === 'equip' && (
              <div className="flex items-center gap-6 h-full">
                <div className="flex-1 space-y-4">
                  <h4 className="text-sm font-bold text-gray-700">可选机台</h4>
                  <div className="border border-gray-200 rounded-xl p-2 space-y-1 bg-gray-50/50 h-[400px] overflow-auto">
                    {availableEquips.filter(e => !selectedEquips.includes(e)).map(eq => (
                      <div 
                        key={eq} 
                        onClick={() => setSelectedEquips([...selectedEquips, eq])}
                        className="p-3 bg-white border border-gray-100 rounded-lg text-sm text-gray-600 hover:border-emerald-200 hover:shadow-sm transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <span>{eq}</span>
                        <Plus size={14} className="text-gray-300 group-hover:text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <ArrowRightLeft size={24} className="text-gray-300" />
                </div>
                <div className="flex-1 space-y-4">
                  <h4 className="text-sm font-bold text-gray-700">已选机台</h4>
                  <div className="border border-gray-200 rounded-xl p-2 space-y-1 h-[400px] overflow-auto">
                    {selectedEquips.map(eq => (
                      <div key={eq} className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-700 font-medium flex items-center justify-between group">
                        <span>{eq}</span>
                        <Trash2 
                          size={14} 
                          className="cursor-pointer text-emerald-300 hover:text-rose-500 transition-colors" 
                          onClick={() => setSelectedEquips(selectedEquips.filter(e => e !== eq))}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sop' && (
              <div className="flex items-center gap-6 h-full">
                <div className="flex-1 space-y-4">
                  <h4 className="text-sm font-bold text-gray-700">SOP 库</h4>
                  <div className="border border-gray-200 rounded-xl p-2 space-y-1 bg-gray-50/50 h-[400px] overflow-auto">
                    {allSOPs.filter(s => !selectedSOPs.includes(s)).map(sop => (
                      <div 
                        key={sop} 
                        onClick={() => setSelectedSOPs([...selectedSOPs, sop])}
                        className="p-3 bg-white border border-gray-100 rounded-lg text-sm text-gray-600 hover:border-emerald-200 hover:shadow-sm transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <span>{sop}</span>
                        <Plus size={14} className="text-gray-300 group-hover:text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <ArrowRightLeft size={24} className="text-gray-300" />
                </div>
                <div className="flex-1 space-y-4">
                  <h4 className="text-sm font-bold text-gray-700">已选 SOP</h4>
                  <div className="border border-gray-200 rounded-xl p-2 space-y-1 h-[400px] overflow-auto">
                    {selectedSOPs.map(sop => (
                      <div key={sop} className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-700 font-medium flex items-center justify-between group">
                        <span>{sop}</span>
                        <Trash2 
                          size={14} 
                          className="cursor-pointer text-emerald-300 hover:text-rose-500 transition-colors" 
                          onClick={() => setSelectedSOPs(selectedSOPs.filter(s => s !== sop))}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'exam' && (
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">关联题库</label>
                  <select 
                    value={writtenBank}
                    onChange={(e) => setWrittenBank(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  >
                    <option value="">选择题库</option>
                    <option value="HSE 题库 A">HSE 题库 A</option>
                    <option value="生产技术题库">生产技术题库</option>
                    <option value="通用安全题库">通用安全题库</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">笔试及格线 (分)</label>
                  <input 
                    type="number"
                    value={passLine}
                    onChange={(e) => setPassLine(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">实操考评项</label>
                  <textarea 
                    value={practicalItems}
                    onChange={(e) => setPracticalItems(e.target.value)}
                    rows={6}
                    placeholder="请输入实操考评的具体内容，每行一项..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none" 
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-4">
          <button 
            onClick={onBack}
            className="px-8 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
          >
            取消
          </button>
          <button 
            onClick={() => {
              alert('保存成功！');
              onBack();
            }}
            className="px-12 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            保存岗位
          </button>
        </div>
      </main>
    </div>
  );
};

const StationManagement = () => {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [editingStation, setEditingStation] = useState<Station | undefined>(undefined);

  if (view === 'detail') {
    return (
      <StationDetail 
        station={editingStation} 
        onBack={() => {
          setView('list');
          setEditingStation(undefined);
        }} 
      />
    );
  }

  return (
    <StationList 
      onAdd={() => {
        setEditingStation(undefined);
        setView('detail');
      }}
      onEdit={(s) => {
        setEditingStation(s);
        setView('detail');
      }}
    />
  );
};

// --- Menu 4: Employee Details ---
const EmployeeDetails = () => {
  const employee: Employee = {
    id: 'EMP-2024-088',
    name: '张建国',
    role: 'employee',
    certificates: [
      { stationName: '四复合喂胶', issueDate: '2023-05-10', expiryDate: '2024-05-10', daysRemaining: -15 },
      { stationName: '成型主机', issueDate: '2023-11-20', expiryDate: '2024-11-20', daysRemaining: 265 },
      { stationName: '安全生产员', issueDate: '2024-01-05', expiryDate: '2025-01-05', daysRemaining: 312 },
    ]
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <header className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <UserCircle size={32} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                employee.role === 'employee' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              )}>
                {employee.role === 'employee' ? '正式员工' : '学徒'}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-mono">工号: {employee.id}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">
            编辑资料
          </button>
          <button className="px-6 py-2.5 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
            打印档案
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-900">
            <Trophy size={20} className="text-amber-500" />
            <h3 className="text-lg font-bold">技能证书</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employee.certificates.map((cert) => {
              const isExpired = cert.daysRemaining < 0;
              return (
                <motion.div 
                  key={cert.stationName}
                  whileHover={{ y: -4 }}
                  className={cn(
                    "p-6 rounded-3xl border transition-all relative overflow-hidden group",
                    isExpired 
                      ? "bg-rose-50 border-rose-200 shadow-rose-100 shadow-xl" 
                      : "bg-white border-gray-100 shadow-sm hover:shadow-xl"
                  )}
                >
                  {isExpired && (
                    <div className="absolute top-0 right-0 px-4 py-1 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
                      已逾期
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        isExpired ? "bg-rose-100 text-rose-600" : "bg-emerald-50 text-emerald-600"
                      )}>
                        <GraduationCap size={20} />
                      </div>
                      <h4 className="font-bold text-gray-900">{cert.stationName}</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">拿证时间</span>
                        <span className="font-medium text-gray-700">{cert.issueDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">复审倒计时</span>
                        <div className="flex items-center gap-1.5 font-bold">
                          <Clock size={14} className={isExpired ? "text-rose-500" : "text-emerald-500"} />
                          <span className={isExpired ? "text-rose-600" : "text-emerald-600"}>
                            {isExpired ? `逾期 ${Math.abs(cert.daysRemaining)} 天` : `${cert.daysRemaining} 天`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isExpired && (
                      <button className="w-full mt-2 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20">
                        立即重新培训
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Menu 5: Talent Distribution ---
const TalentDistribution = () => {
  const [selectedStation, setSelectedStation] = useState('成型主机岗');
  
  const stations = ['成型主机岗', '四复合喂胶岗', '硫化操作岗', '密炼操作岗', '质检岗'];
  
  const certifiedPersonnel = [
    { name: '张建国', factory: '兖州工厂', workshop: '一期半成品车间' },
    { name: '李卫东', factory: '兖州工厂', workshop: '二期成型车间' },
    { name: '王志强', factory: '神州工厂', workshop: '二期成型车间' },
    { name: '赵铁柱', factory: '焦作工厂', workshop: '三期硫化车间' },
  ];

  const trainees: Trainee[] = [
    { id: 'T-001', name: '刘小明', progress: { completed: 5, total: 7 } },
    { id: 'T-002', name: '周大为', progress: { completed: 2, total: 7 } },
    { id: 'T-003', name: '孙志远', progress: { completed: 6, total: 7 } },
  ];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">岗位人才分布图</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Map size={16} />
          <span>实时人才梯队监控</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Station Selection */}
        <aside className="w-72 bg-white border-r border-gray-200 p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">选择岗位</h3>
            <div className="space-y-1">
              {stations.map((station) => (
                <button
                  key={station}
                  onClick={() => setSelectedStation(station)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                    selectedStation === station 
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <Users size={18} className={cn(
                    selectedStation === station ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                  )} />
                  <span className="text-sm font-medium">{station}</span>
                  {selectedStation === station && (
                    <ChevronRight size={16} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Content: Lists */}
        <main className="flex-1 overflow-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Certified Personnel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-900">
                <CheckCircle2 size={20} className="text-emerald-500" />
                <h3 className="text-lg font-bold">持证人员</h3>
              </div>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                {certifiedPersonnel.length} 人
              </span>
            </div>
            
            <div className="space-y-3">
              {certifiedPersonnel.map((person) => (
                <div key={person.name} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                      <UserCircle size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.factory} · {person.workshop}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-300 hover:text-emerald-500 transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Trainees */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-900">
                <GraduationCap size={20} className="text-amber-500" />
                <h3 className="text-lg font-bold">在练人才（学徒）</h3>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                {trainees.length} 人
              </span>
            </div>

            <div className="space-y-3">
              {trainees.map((trainee) => (
                <div key={trainee.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-900">{trainee.name}</p>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{trainee.id}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">考核进度</span>
                      <span className="font-bold text-emerald-600">{trainee.progress.completed} / {trainee.progress.total} 项</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(trainee.progress.completed / trainee.progress.total) * 100}%` }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// --- Menu 6: Review Warning Center ---
const TrainingPlanModal = ({ 
  isOpen, 
  onClose, 
  selectedRecords 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  selectedRecords: WarningRecord[] 
}) => {
  if (!isOpen) return null;

  const stationName = selectedRecords[0]?.certName || '多岗位';
  const planName = `关于 ${stationName} 的定期复审培训`;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-emerald-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Send size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">发起培训计划</h3>
              <p className="text-xs text-gray-500">自动填充复审培训相关配置</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <Plus size={24} className="rotate-45" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">计划名称</label>
            <input 
              defaultValue={planName}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">受训名单 ({selectedRecords.length} 人)</label>
            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border border-gray-200 rounded-xl max-h-[120px] overflow-auto">
              {selectedRecords.map(r => (
                <span key={r.id} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                  {r.empName} ({r.empId})
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">关联 SOP</label>
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <p className="text-xs font-bold text-emerald-700">系统自动调取：</p>
                <p className="text-sm text-emerald-800 mt-1">《{stationName} 标准化操作规程》</p>
                <p className="text-sm text-emerald-800">《安全生产通用总则》</p>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">关联题库</label>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <p className="text-xs font-bold text-blue-700">系统自动调取：</p>
                <p className="text-sm text-blue-800 mt-1">{stationName} 复审专项题库</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors">
            取消
          </button>
          <button 
            onClick={() => {
              alert('培训计划已下发至受训人员手机端！');
              onClose();
            }}
            className="px-8 py-2.5 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            下发计划
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const WarningCenter = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const stats = [
    { label: '已过期总数', value: 12, color: 'rose', icon: ShieldAlert },
    { label: '30天内到期', value: 24, color: 'amber', icon: Clock },
    { label: '待复审人数', value: 45, color: 'blue', icon: CalendarClock },
  ];

  const records: WarningRecord[] = [
    { id: '1', empName: '张建国', empId: 'EMP-088', dept: '一期半成品车间', certName: '四复合喂胶岗', issueDate: '2023-05-10', expiryDate: '2024-05-10', daysRemaining: -15, status: 'expired' },
    { id: '2', empName: '李卫东', empId: 'EMP-102', dept: '二期成型车间', certName: '成型主机岗', issueDate: '2023-11-20', expiryDate: '2024-03-20', daysRemaining: 21, status: 'expiring' },
    { id: '3', empName: '王志强', empId: 'EMP-156', dept: '二期成型车间', certName: '成型主机岗', issueDate: '2023-11-20', expiryDate: '2024-03-25', daysRemaining: 26, status: 'expiring' },
    { id: '4', empName: '赵铁柱', empId: 'EMP-204', dept: '三期硫化车间', certName: '硫化操作岗', issueDate: '2023-12-15', expiryDate: '2024-12-15', daysRemaining: 291, status: 'normal' },
  ];

  const selectedRecords = records.filter(r => selectedIds.includes(r.id));

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">证书复审预警中心</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Bell size={16} className="text-rose-500" />
          <span>当前有 {stats[0].value} 项证书已过期，请尽快处理</span>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 space-y-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">所属工厂</label>
            <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
              <option>全部工厂</option>
              <option>兖州工厂</option>
              <option>神州工厂</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">所属部门</label>
            <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
              <option>全部部门</option>
              <option>一期半成品车间</option>
              <option>二期成型车间</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">作业岗位</label>
            <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
              <option>全部岗位</option>
              <option>成型主机岗</option>
              <option>四复合喂胶岗</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">过期时间范围</label>
            <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
              <option>全部范围</option>
              <option>未来30天内</option>
              <option>已过期</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                stat.color === 'rose' ? "bg-rose-50 text-rose-500" : 
                stat.color === 'amber' ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"
              )}>
                <stat.icon size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-4xl font-black text-gray-900 tracking-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* List Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button 
              disabled={selectedIds.length === 0}
              onClick={() => setShowPlanModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
            >
              <Send size={18} />
              <span>一键发起复审培训</span>
              {selectedIds.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {selectedIds.length}
                </span>
              )}
            </button>
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>共 {records.length} 条记录</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="px-6 py-4 w-12">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                      checked={selectedIds.length === records.length}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedIds(records.map(r => r.id));
                        else setSelectedIds([]);
                      }}
                    />
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">员工姓名</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">工号</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">所属部门</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">证书名称</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">截止日期</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">剩余天数</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((record) => (
                  <tr key={record.id} className={cn(
                    "hover:bg-gray-50/50 transition-colors group",
                    selectedIds.includes(record.id) && "bg-emerald-50/30"
                  )}>
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                        checked={selectedIds.includes(record.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedIds([...selectedIds, record.id]);
                          else setSelectedIds(selectedIds.filter(id => id !== record.id));
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">{record.empName}</td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-500">{record.empId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.dept}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{record.certName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.expiryDate}</td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "flex items-center gap-1.5 font-bold text-sm",
                        record.status === 'expired' ? "text-rose-500" : 
                        record.status === 'expiring' ? "text-amber-500" : "text-emerald-500"
                      )}>
                        <Clock size={14} />
                        <span>{record.daysRemaining < 0 ? `逾期 ${Math.abs(record.daysRemaining)}` : record.daysRemaining} 天</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                        record.status === 'expired' ? "bg-rose-100 text-rose-700" : 
                        record.status === 'expiring' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                      )}>
                        {record.status === 'expired' ? '已过期' : record.status === 'expiring' ? '临期' : '正常'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <TrainingPlanModal 
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        selectedRecords={selectedRecords}
      />
    </div>
  );
};

// --- Menu 7: Task Center ---

const TaskCenter = ({ onAddPlan }: { onAddPlan?: () => void }) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedType, setSelectedType] = useState('all');
  
  const stats = [
    { label: '本月计划总数', value: 128, icon: ClipboardCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '待处理触发任务', value: 12, icon: Bell, color: 'text-rose-600', bg: 'bg-rose-50', hasDot: true },
    { label: '进行中人数', value: 456, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '本月合格率', value: '94.2%', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const planTypes = [
    { id: 'all', label: '全部类型', color: 'bg-gray-500' },
    { id: 'annual', label: '年度计划', color: 'bg-indigo-500' },
    { id: 'level3', label: '三级培训', color: 'bg-emerald-500' },
    { id: 'sop', label: 'SOP 培训', color: 'bg-amber-500' },
    { id: 'review', label: '复审培训', color: 'bg-rose-500' },
    { id: 'transfer', label: '转岗培训', color: 'bg-blue-500' },
    { id: 'new', label: '四新培训', color: 'bg-red-500' },
  ];

  const listData = [
    { name: '2024年度安全生产全员培训', source: '手动', progress: 85, passRate: '92%', status: '进行中', type: 'annual' },
    { name: '四复合岗位 SOP 变更专项培训', source: '自动', progress: 100, passRate: '100%', status: '已完成', type: 'sop' },
    { name: '成型车间 Q1 技能复审', source: '自动', progress: 45, passRate: '88%', status: '进行中', type: 'review' },
    { name: '新员工入职三级教育 - 3月批次', source: '手动', progress: 12, passRate: '-', status: '未开始', type: 'level3' },
  ];

  const triggerInbox = [
    { id: 1, title: 'SOP 更新触发：四复合喂胶标准', type: 'SOP 更新', time: '2小时前', desc: '检测到 V2.1 版本发布，涉及 24 人需重新培训。' },
    { id: 2, title: '证书过期触发：成型主机岗', type: '证书过期', time: '5小时前', desc: '张建国等 3 人证书将于 15 天内过期。' },
    { id: 3, title: 'SOP 更新触发：紧急停机流程', type: 'SOP 更新', time: '昨天', desc: '全厂通用 SOP 更新，涉及 150 人。' },
  ];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      {/* Top: Statistics Bar */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">任务中台</h2>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode('calendar')}
                className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2", viewMode === 'calendar' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700")}
              >
                <Calendar size={14} /> 日历视图
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2", viewMode === 'list' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700")}
              >
                <List size={14} /> 列表视图
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 relative">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
              {stat.hasDot && (
                <div className="absolute top-4 right-4 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Month & Type Picker */}
        <aside className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col gap-8 overflow-auto">
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">时间选择</h3>
            <div className="grid grid-cols-2 gap-2">
              <select className="bg-gray-50 border-none rounded-xl px-3 py-2 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500/20">
                <option>2024年</option>
                <option>2023年</option>
              </select>
              <select className="bg-gray-50 border-none rounded-xl px-3 py-2 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-emerald-500/20">
                <option>3月</option>
                <option>4月</option>
                <option>5月</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">计划类型</h3>
            <div className="space-y-1">
              {planTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group",
                    selectedType === type.id ? "bg-gray-900 text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <div className={cn("w-2 h-2 rounded-full", type.color)} />
                  <span className="text-sm font-medium">{type.label}</span>
                  {selectedType === type.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <button 
              onClick={() => onAddPlan?.()}
              className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} /> 新建培训计划
            </button>
          </div>
        </aside>

        {/* Middle: Main View */}
        <main className="flex-1 overflow-auto p-8">
          {viewMode === 'calendar' ? (
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
              <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
                {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(day => (
                  <div key={day} className="py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">{day}</div>
                ))}
              </div>
              <div className="flex-1 grid grid-cols-7 grid-rows-5">
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i - 3; // Offset for March 2024
                  const isCurrentMonth = day > 0 && day <= 31;
                  return (
                    <div key={i} className={cn("border-r border-b border-gray-50 p-2 min-h-[100px] transition-colors hover:bg-gray-50/50", !isCurrentMonth && "bg-gray-50/30 opacity-30")}>
                      <span className="text-xs font-bold text-gray-400">{isCurrentMonth ? day : ''}</span>
                      {day === 5 && (
                        <div className="mt-1 p-1.5 bg-indigo-500 text-white text-[10px] font-bold rounded-lg shadow-sm">年度安全培训</div>
                      )}
                      {day === 12 && (
                        <div className="mt-1 p-1.5 bg-emerald-500 text-white text-[10px] font-bold rounded-lg shadow-sm">新员工三级教育</div>
                      )}
                      {day === 15 && (
                        <div className="mt-1 p-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg shadow-sm">SOP 专项培训</div>
                      )}
                      {day === 22 && (
                        <div className="mt-1 p-1.5 bg-rose-500 text-white text-[10px] font-bold rounded-lg shadow-sm">复审考核</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">计划名称</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">来源</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">进度</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">及格率</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {listData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-2 h-2 rounded-full", planTypes.find(t => t.id === item.type)?.color)} />
                          <span className="font-bold text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={cn("px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider", item.source === '自动' ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600")}>
                          {item.source}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${item.progress}%` }} className="h-full bg-emerald-500" />
                          </div>
                          <span className="text-xs font-bold text-gray-600">{item.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center font-bold text-gray-900">{item.passRate}</td>
                      <td className="px-6 py-5 text-right">
                        <span className={cn("text-xs font-bold", item.status === '已完成' ? "text-emerald-500" : item.status === '进行中' ? "text-blue-500" : "text-gray-400")}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>

        {/* Right: Trigger Inbox */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
            <div className="flex items-center gap-2">
              <Inbox size={18} className="text-rose-500" />
              <h3 className="text-sm font-bold text-gray-900">触发任务收件箱</h3>
            </div>
            <span className="w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-rose-500/20">
              {triggerInbox.length}
            </span>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {triggerInbox.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-3 group cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">{item.type}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{item.time}</span>
                </div>
                <h4 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                <button className="w-full py-2 bg-gray-50 text-gray-600 text-[10px] font-bold rounded-xl hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2">
                  <ArrowRightLeft size={12} /> 一键转为计划
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50/50 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 text-center font-medium leading-relaxed">
              系统自动检索 SOP 更新与证书过期情况<br />并实时推送到此收件箱
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

// --- Menu 8: Training Plan Detail ---

const TrainingPlanDetail = ({ onBack }: { onBack: () => void }) => {
  const [trainingType, setTrainingType] = useState('annual');
  const [selectedStation, setSelectedStation] = useState('');
  const [personnelScope, setPersonnelScope] = useState('all'); // all, dept, factory
  
  // Scenario B logic: Auto-trigger for '成型主机岗'
  const isSOPType = trainingType === 'sop';
  const isAutoMode = isSOPType && selectedStation === '成型主机岗';

  const mockSOPs = ['安全生产总则', '成型机标准操作规程'];
  const mockExams = ['成型主机岗理论考试 A 卷', '成型主机岗实操考核表'];
  const mockTrainees = ['张三', '李四', '王五', '赵六', '钱七'];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
      {/* Header */}
      <header className="px-8 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ChevronRight className="rotate-180" size={20} />
          </button>
          <h2 className="text-xl font-bold text-gray-900">新增培训计划</h2>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-all">取消</button>
          <button className="px-8 py-2 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all">提交计划</button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 max-w-5xl mx-auto w-full">
        <div className="space-y-8 pb-20">
          {/* Top: Training Type Dropdown */}
          <section className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <div className="max-w-md">
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                培训类型 <span className="text-rose-500">*</span>
              </label>
              <select 
                value={trainingType}
                onChange={(e) => setTrainingType(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
              >
                <option value="annual">通用/年度培训</option>
                <option value="sop">SOP/岗位专项</option>
                <option value="level3">三级教育</option>
                <option value="review">复审培训</option>
              </select>
            </div>
          </section>

          {trainingType === 'annual' ? (
            /* Scenario A: Universal/Annual Training */
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">培训主题</label>
                    <input 
                      type="text" 
                      defaultValue="2026年春节安全消防培训"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">培训内容</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center hover:border-emerald-500 transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                        <Plus size={24} />
                      </div>
                      <p className="text-sm font-bold text-gray-900">点击上传附件</p>
                      <p className="text-xs text-gray-400 mt-1">支持 PDF, PPT, MP4 等格式</p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <button className="text-xs font-bold text-emerald-500 hover:underline">从公共课件库勾选</button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">选择试卷</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center hover:border-blue-500 transition-all cursor-pointer group bg-white">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                        <ClipboardCheck size={24} />
                      </div>
                      <p className="text-sm font-bold text-gray-900">点击选择或生成试卷</p>
                      <p className="text-xs text-gray-400 mt-1">支持从库里选择或立即生成</p>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-4">
                        <button className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1">
                          从库勾选
                        </button>
                        <div className="w-1 h-1 bg-gray-200 rounded-full" />
                        <button className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1">
                          自定义生成
                        </button>
                        <div className="w-1 h-1 bg-gray-200 rounded-full" />
                        <button className="text-xs font-bold text-indigo-500 hover:underline flex items-center gap-1">
                          <Sparkles size={12} />  一键生成
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700">人员选择</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setPersonnelScope('all')}
                        className={cn("flex-1 py-2.5 rounded-xl text-xs font-bold transition-all", personnelScope === 'all' ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200")}
                      >
                        全员
                      </button>
                      <button 
                        onClick={() => setPersonnelScope('dept')}
                        className={cn("flex-1 py-2.5 rounded-xl text-xs font-bold transition-all", personnelScope === 'dept' ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200")}
                      >
                        按部门勾选
                      </button>
                      <button 
                        onClick={() => setPersonnelScope('factory')}
                        className={cn("flex-1 py-2.5 rounded-xl text-xs font-bold transition-all", personnelScope === 'factory' ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200")}
                      >
                        按工厂勾选
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4 min-h-[160px] border border-gray-100 flex items-center justify-center">
                      <p className="text-sm font-bold text-gray-400">
                        {personnelScope === 'all' ? "已选择：全厂人员 (1250人)" : "请点击上方按钮进行具体勾选"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Scenario B: SOP/Station Specific */
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="max-w-md">
                <label className="block text-sm font-bold text-gray-700 mb-2">关联作业岗位</label>
                <select 
                  value={selectedStation}
                  onChange={(e) => setSelectedStation(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                >
                  <option value="">请选择岗位...</option>
                  <option value="成型主机岗">成型主机岗</option>
                  <option value="四复合喂胶岗">四复合喂胶岗</option>
                  <option value="硫化操作岗">硫化操作岗</option>
                </select>
              </div>

              {selectedStation === '成型主机岗' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 space-y-4">
                      <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                        <BookOpen size={14} /> 关联 SOP (只读)
                      </h4>
                      <ul className="space-y-2">
                        {mockSOPs.map(sop => (
                          <li key={sop} className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-xl border border-emerald-100/50">
                            <FileText size={14} className="text-emerald-500" /> {sop}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 space-y-4">
                      <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                        <ClipboardCheck size={14} /> 关联试卷 (只读)
                      </h4>
                      <ul className="space-y-2">
                        {mockExams.map(exam => (
                          <li key={exam} className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-xl border border-blue-100/50">
                            <FileText size={14} className="text-blue-500" /> {exam}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700">培训人员 (穿梭框自动勾选)</label>
                    <div className="border border-gray-200 rounded-3xl overflow-hidden flex h-[320px]">
                      <div className="flex-1 flex flex-col">
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-widest">待选人员</div>
                        <div className="flex-1 overflow-auto p-2 space-y-1">
                          {['赵铁柱', '王大锤', '李二狗'].map(name => (
                            <div key={name} className="px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg">{name}</div>
                          ))}
                        </div>
                      </div>
                      <div className="w-12 border-x border-gray-200 flex flex-col items-center justify-center gap-4 bg-gray-50/50">
                        <button className="p-1 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-emerald-500 transition-colors"><ChevronRight size={16} /></button>
                        <button className="p-1 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-emerald-500 transition-colors"><ChevronRight size={16} className="rotate-180" /></button>
                      </div>
                      <div className="flex-1 flex flex-col bg-emerald-50/20">
                        <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">已选人员 (自动)</div>
                        <div className="flex-1 overflow-auto p-2 space-y-1">
                          {mockTrainees.map(name => (
                            <div key={name} className="px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-emerald-100 rounded-lg shadow-sm">{name}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Common: Bottom Settings */}
          <section className="pt-8 border-t border-gray-100">
            <div className="max-w-md space-y-6">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <ClipboardCheck size={18} className="text-emerald-500" /> 考试设置
              </h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">及格分数</label>
                <div className="relative">
                  <input type="number" defaultValue={80} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">分</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('equipment');

  return (
    <div className="flex h-screen w-full font-sans text-gray-900 overflow-hidden">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMenu}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex"
        >
          {activeMenu === 'equipment' && <EquipmentManagement />}
          {activeMenu === 'sop' && <SOPManagement />}
          {activeMenu === 'station' && <StationManagement />}
          {activeMenu === 'employee' && <EmployeeDetails />}
          {activeMenu === 'talent' && <TalentDistribution />}
          {activeMenu === 'warning' && <WarningCenter />}
          {activeMenu === 'task' && <TaskCenter onAddPlan={() => setActiveMenu('task-detail')} />}
          {activeMenu === 'task-detail' && <TrainingPlanDetail onBack={() => setActiveMenu('task')} />}
          {activeMenu === 'portal' && <PortalDashboard onSelectSOP={() => setActiveMenu('sop')} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
