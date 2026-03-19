import React, { useState, useEffect } from 'react';
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
  ShieldCheck,
  Check,
  Play,
  QrCode,
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
  Wand2,
  Globe,
  UserPlus,
  Network,
  MapPin,
  X,
  Home,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type MenuType = 'equipment' | 'sop' | 'station' | 'employee' | 'talent' | 'warning' | 'portal' | 'task' | 'task-detail' | 'calendar' | 'personal-tasks' | 'user-management';

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
  const [isSopExpanded, setIsSopExpanded] = useState(true);
  const [isOrgExpanded, setIsOrgExpanded] = useState(true);
  
  const sopSubMenus = [
    { id: 'equipment', label: '机台管理', icon: Settings },
    { id: 'sop', label: 'SOP 文档管理', icon: FileText },
    { id: 'station', label: '岗位管理', icon: Users },
    { id: 'employee', label: '员工详情', icon: UserCircle },
    { id: 'talent', label: '人才分布', icon: Map },
    { id: 'warning', label: '复审预警', icon: Bell },
    { id: 'calendar', label: '部门计划', icon: Calendar },
    { id: 'personal-tasks', label: '个人任务', icon: ClipboardCheck },
  ];

  const orgSubMenus = [
    { id: 'user-management', label: '用户管理', icon: Users },
  ];

  return (
    <div className="w-64 bg-[#151619] text-white h-screen flex flex-col border-r border-white/10">
      <div className="p-6 flex items-center gap-3 border-bottom border-white/5">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <Factory size={20} className="text-white" />
        </div>
        <h1 className="font-bold text-lg tracking-tight">工业管理系统</h1>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-1">
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
        </div>

        <div className="space-y-1">
          <button
            onClick={() => setIsSopExpanded(!isSopExpanded)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
          >
            <FileText size={20} className="text-gray-500 group-hover:text-white" />
            <span className="font-bold text-xs uppercase tracking-widest">SOP管理</span>
            <div className="ml-auto">
              {isSopExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {isSopExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pl-4 space-y-1"
              >
                {sopSubMenus.map((menu) => (
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

        <div className="space-y-1">
          <button
            onClick={() => setIsOrgExpanded(!isOrgExpanded)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
          >
            <Users size={20} className="text-gray-500 group-hover:text-white" />
            <span className="font-bold text-xs uppercase tracking-widest">组织架构</span>
            <div className="ml-auto">
              {isOrgExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
          </button>

          <AnimatePresence initial={false}>
            {isOrgExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pl-4 space-y-1"
              >
                {orgSubMenus.map((menu) => (
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
                        layoutId="active-pill-org"
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
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen]);

  if (!isOpen) return null;

  // Mock data for affected personnel
  const mockPersonnel = [
    { id: '1', name: '张建国', dept: '一期半成品车间', status: 'affected' },
    { id: '2', name: '李卫东', dept: '一期半成品车间', status: 'affected' },
    { id: '3', name: '王志强', dept: '二期成型车间', status: 'affected' },
    { id: '4', name: '赵铁柱', dept: '二期成型车间', status: 'affected' },
    { id: '5', name: '刘小明', dept: '二期成型车间', status: 'affected' },
    { id: '6', name: '周大为', dept: '硫化车间', status: 'affected' },
  ];

  const groupedPersonnel = mockPersonnel.reduce((acc, person) => {
    if (!acc[person.dept]) {
      acc[person.dept] = [];
    }
    acc[person.dept].push(person);
    return acc;
  }, {} as Record<string, typeof mockPersonnel>);

  const deptCount = Object.keys(groupedPersonnel).length;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-10 text-center space-y-8">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle size={40} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">检测到岗位受影响</h3>
                <div className="py-4 px-6 bg-amber-50 rounded-2xl border border-amber-100">
                  <p className="text-sm text-amber-800 leading-relaxed font-medium">
                    检测到 <span className="font-bold underline">“{affectedStations.join('、')}”</span> 受此 SOP 变更影响，涉及 <span className="font-bold">{personCount}人</span>。
                  </p>
                </div>
                <p className="text-sm text-gray-500 font-medium">是否立即发起新一轮岗位培训？</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                >
                  立即发起培训
                </button>
                <button 
                  onClick={() => {
                    alert('文档已更新，未发起培训。');
                    onClose();
                  }}
                  className="w-full py-4 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                >
                  仅更新文档
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="bg-[#1a1a1a] text-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden border border-white/5"
          >
            <div className="p-10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">确认培训下发名单</h3>
                <p className="text-sm text-gray-400">
                  系统已按部门自动拆分为 {deptCount} 个培训计划，请确认受影响人员名单
                </p>
              </div>

              <div className="bg-emerald-500/10 p-4 rounded-2xl text-sm text-emerald-300 border border-emerald-500/20 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <p>点击“确认下发”后，系统将自动向对应部门管理员推送培训任务</p>
              </div>

              <div className="space-y-10 py-2 max-h-[350px] overflow-auto pr-2 custom-scrollbar">
                {Object.entries(groupedPersonnel).map(([dept, people]) => (
                  <div key={dept} className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg text-gray-100">{dept}</span>
                        <span className="text-gray-500 text-sm font-medium">{people.length} 人</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {people.map(p => (
                        <div 
                          key={p.id} 
                          className="px-5 py-2 rounded-full text-sm font-bold bg-[#2d2d2d] text-white border border-gray-700 shadow-sm transition-transform hover:scale-105 flex items-center gap-2"
                        >
                          <span>{p.name}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        </div>
                      ))}
                      <div className="px-5 py-2 rounded-full text-sm font-bold bg-transparent text-gray-600 border border-dashed border-gray-800">
                        等 {personCount - mockPersonnel.length} 人...
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
                <button 
                  onClick={() => setStep(1)}
                  className="px-8 py-4 bg-[#262626] text-gray-300 font-bold rounded-2xl hover:bg-[#333333] transition-all border border-gray-800"
                >
                  返回
                </button>
                <button 
                  onClick={() => {
                    alert('已成功下发培训计划至各部门管理员！');
                    onClose();
                  }}
                  className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
                >
                  确认下发培训
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

  const groupedRecords = selectedRecords.reduce((acc, record) => {
    if (!acc[record.dept]) {
      acc[record.dept] = [];
    }
    acc[record.dept].push(record);
    return acc;
  }, {} as Record<string, WarningRecord[]>);

  const deptCount = Object.keys(groupedRecords).length;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#1a1a1a] text-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden border border-white/5"
      >
        <div className="p-10 space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">发起复审培训</h3>
            <p className="text-sm text-gray-400">
              已选 {selectedRecords.length} 人，系统按部门自动拆分为 {deptCount} 个培训计划，将推送给对应部门管理员排期
            </p>
          </div>

          <div className="bg-[#1e293b]/50 p-4 rounded-2xl text-sm text-blue-300 border border-blue-500/20 flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
            <p>系统将为每个部门生成独立培训计划，部门管理员收到后自行排期下发</p>
          </div>

          <div className="space-y-10 py-2 max-h-[400px] overflow-auto pr-2 custom-scrollbar">
            {Object.entries(groupedRecords).map(([dept, records]) => (
              <div key={dept} className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg text-gray-100">{dept}</span>
                    <span className="text-gray-500 text-sm font-medium">{records.length} 人</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] border border-gray-700 rounded-xl text-sm text-blue-400 hover:bg-[#3d3d3d] transition-all font-bold">
                    选择试卷 <ChevronDown size={14} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {records.map(r => (
                    <div 
                      key={r.id} 
                      className={cn(
                        "px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm transition-transform hover:scale-105",
                        r.status === 'expired' ? "bg-[#fde2e2] text-[#c53030]" :
                        r.status === 'expiring' ? "bg-[#fef3c7] text-[#92400e]" :
                        "bg-[#2d2d2d] text-white border border-gray-700"
                      )}
                    >
                      <span>{r.empName}</span>
                      <span className="opacity-60 text-xs font-medium">
                        {r.status === 'expired' ? '已过期' : `${r.daysRemaining}天`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
            <button 
              onClick={onClose} 
              className="px-8 py-4 bg-[#262626] text-gray-300 font-bold rounded-2xl hover:bg-[#333333] transition-all border border-gray-800"
            >
              取消
            </button>
            <button 
              onClick={() => {
                alert('培训计划已推送至各部门管理员！');
                onClose();
              }}
              className="px-8 py-4 bg-[#262626] text-white font-bold rounded-2xl hover:bg-[#333333] transition-all border border-gray-700 shadow-xl"
            >
              确认推送给部门管理员
            </button>
          </div>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">计划分类</label>
                      <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium">
                        <option value="env">环境</option>
                        <option value="health">职业健康</option>
                        <option value="emergency">应急</option>
                        <option value="fire">消防</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">培训学时</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          defaultValue={2}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">学时</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">培训月份</label>
                      <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium">
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}月</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">培训主题</label>
                      <input 
                        type="text" 
                        defaultValue="2026年春节安全消防培训"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
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
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">培训对象</label>
                    <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium">
                      <option value="worker">一线操作工</option>
                      <option value="leader">班组长</option>
                      <option value="manager">主要负责人</option>
                      <option value="other">其他管理人员</option>
                    </select>
                  </div>
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
// --- User Management Components ---

interface OrgNode {
  id: string;
  name: string;
  type: 'group' | 'factory' | 'dept' | 'team';
  children?: OrgNode[];
}

const ORG_DATA: OrgNode[] = [
  {
    id: 'g1',
    name: '倍耐力',
    type: 'group',
    children: [
      { id: 'ceo', name: '总裁办', type: 'dept' },
      { id: 'func', name: '集团职能中心', type: 'dept' },
      {
        id: 'f1',
        name: '神州',
        type: 'factory',
        children: [
          { id: 'd1', name: 'A-生产部', type: 'dept' },
          { id: 'd2', name: 'A-质检部', type: 'dept' },
          { id: 't1', name: 'A-一班组', type: 'team' },
        ]
      },
      {
        id: 'f2',
        name: '兖州',
        type: 'factory',
        children: [
          { id: 'd3', name: 'B-生产部', type: 'dept' },
          { id: 'd4', name: 'B-仓储部', type: 'dept' },
        ]
      },
      { id: 'f3', name: '焦作', type: 'factory' }
    ]
  }
];

interface UserAuth {
  subsystem: string;
  role: string;
  scope: 'all' | 'factory' | 'custom';
  customFactories?: string[];
  enabled: boolean;
}

interface User {
  id: string;
  name: string;
  account: string;
  dept: string;
  auths: UserAuth[];
}

const MOCK_USERS: (User & { status: 'active' | 'inactive', roleName: string })[] = [
  {
    id: 'u1',
    name: '王建国',
    account: 'U-2024001',
    dept: 'A-生产部',
    roleName: '生产管理员',
    status: 'active',
    auths: [
      { subsystem: '生产管理', role: '生产管理员', scope: 'factory', enabled: true },
      { subsystem: '质量管理', role: '质量查看者', scope: 'all', enabled: true },
    ]
  },
  {
    id: 'u2',
    name: '李明',
    account: 'U-2024002',
    dept: 'A-生产部',
    roleName: '班组长',
    status: 'active',
    auths: [
      { subsystem: '生产管理', role: '班组长', scope: 'factory', enabled: true },
      { subsystem: '培训考试', role: '讲师', scope: 'factory', enabled: true },
    ]
  },
  {
    id: 'u3',
    name: '陈晓红',
    account: 'U-2024003',
    dept: 'A-生产部',
    roleName: '普通员工',
    status: 'active',
    auths: [
      { subsystem: '生产管理', role: '普通员工', scope: 'custom', enabled: true },
    ]
  },
  {
    id: 'u4',
    name: '赵磊',
    account: 'U-2024004',
    dept: 'A-生产部',
    roleName: '普通员工',
    status: 'inactive',
    auths: [
      { subsystem: '生产管理', role: '普通员工', scope: 'custom', enabled: true },
    ]
  },
  {
    id: 'u5',
    name: '刘洋',
    account: 'U-2024005',
    dept: 'A-生产部',
    roleName: '生产管理员',
    status: 'active',
    auths: [
      { subsystem: '生产管理', role: '生产管理员', scope: 'factory', enabled: true },
      { subsystem: '仓储物流', role: '管理员', scope: 'factory', enabled: true },
    ]
  }
];

const SUBSYSTEMS = ['生产管理', '质量管理', '培训考试', '仓储物流', '设备管理'];
const ROLES = ['生产管理员', '班组长', '普通员工', '质量查看者', '讲师', '管理员'];
const SCOPES = [
  { value: 'all', label: '全集团' },
  { value: 'factory', label: '所属工厂' },
  { value: 'custom', label: '自定义工厂' },
];

const OrgTree = ({ onSelect, selectedId }: { onSelect: (node: OrgNode) => void, selectedId?: string }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['g1', 'f1']));

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  const renderNode = (node: OrgNode, level: number = 0) => {
    const isExpanded = expanded.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedId === node.id;

    const getIcon = () => {
      switch (node.type) {
        case 'group': return (
          <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center">
            <Home className="w-3.5 h-3.5 text-blue-500" />
          </div>
        );
        case 'factory': return (
          <div className="w-6 h-6 rounded bg-emerald-50 flex items-center justify-center">
            <Factory className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        );
        case 'dept': return (
          <div className="w-6 h-6 rounded bg-amber-50 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-amber-500" />
          </div>
        );
        case 'team': return (
          <div className="w-6 h-6 rounded bg-pink-50 flex items-center justify-center">
            <Users className="w-3.5 h-3.5 text-pink-500" />
          </div>
        );
      }
    };

    return (
      <div key={node.id} className="select-none">
        <div 
          className={cn(
            "flex items-center py-2 px-3 rounded-lg cursor-pointer transition-all group relative",
            isSelected ? "bg-[#e6f7ff] text-[#1890ff]" : "text-gray-600 hover:bg-gray-50"
          )}
          onClick={() => onSelect(node)}
        >
          <div className="w-4 flex items-center justify-center mr-1">
            {hasChildren && (
              <button onClick={(e) => toggleExpand(node.id, e)} className="p-0.5 hover:bg-gray-200 rounded transition-colors">
                {isExpanded ? <ChevronDown className="w-3 h-3 text-gray-400" /> : <ChevronRight className="w-3 h-3 text-gray-400" />}
              </button>
            )}
          </div>
          <div className="mr-2.5">{getIcon()}</div>
          <span className={cn("flex-1 truncate text-sm", isSelected ? "font-bold" : "font-medium")}>{node.name}</span>
          <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full ml-2">
            {Math.floor(Math.random() * 100) + 5}
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-5 border-l border-gray-100 pl-1 mt-0.5">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-180px)] custom-scrollbar">
      {ORG_DATA.map(node => renderNode(node))}
    </div>
  );
};

const AuthDrawer = ({ 
  user, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  user: User | null; 
  isOpen: boolean; 
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}) => {
  const [auths, setAuths] = useState<UserAuth[]>([]);

  useEffect(() => {
    if (user) {
      const initialAuths = SUBSYSTEMS.map(sys => {
        const existing = user.auths.find(a => a.subsystem === sys);
        return existing || { subsystem: sys, role: ROLES[0], scope: 'factory' as const, enabled: false };
      });
      setAuths(initialAuths);
    }
  }, [user]);

  if (!user) return null;

  const stats = {
    enabledCount: auths.filter(a => a.enabled).length,
    factoryCount: 3, // Mock
    roleCount: auths.filter(a => a.enabled).length,
  };

  const updateAuth = (index: number, updates: Partial<UserAuth>) => {
    const next = [...auths];
    next[index] = { ...next[index], ...updates };
    setAuths(next);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[560px] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">子系统授权配置 · {user.name}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 custom-scrollbar">
              {/* User Info Card */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                  {user.name[0]}
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-400 mt-0.5 flex items-center gap-2">
                    归属：{user.dept} | ID: {user.account}
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold">在职</span>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50/30 p-4 rounded-2xl border border-blue-100">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">已授权子系统</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-blue-600">{stats.enabledCount}</span>
                    <span className="text-xs text-gray-400">共 5 个</span>
                  </div>
                </div>
                <div className="bg-emerald-50/30 p-4 rounded-2xl border border-emerald-100">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">可见工厂</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-emerald-600">{stats.factoryCount}</span>
                    <span className="text-[10px] text-gray-400 truncate">工厂A, 工厂B...</span>
                  </div>
                </div>
                <div className="bg-amber-50/30 p-4 rounded-2xl border border-amber-100">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">角色数量</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-amber-600">{stats.roleCount}</span>
                    <span className="text-xs text-gray-400">跨子系统</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  子系统权限矩阵
                  <div className="h-px flex-1 bg-gray-100" />
                </h3>

                {auths.map((auth, idx) => (
                  <div key={auth.subsystem} className={cn(
                    "bg-white rounded-2xl border transition-all duration-300 p-5",
                    auth.enabled ? "border-blue-200 shadow-sm ring-1 ring-blue-100/50" : "border-gray-100 opacity-60"
                  )}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          auth.enabled ? "bg-blue-50 text-blue-500" : "bg-gray-50 text-gray-300"
                        )}>
                          {auth.subsystem === '质量管理' ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                        </div>
                        <span className="font-bold text-gray-800">{auth.subsystem}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{auth.enabled ? '已启用' : '未启用'}</span>
                        <button 
                          onClick={() => updateAuth(idx, { enabled: !auth.enabled })}
                          className={cn(
                            "w-11 h-6 rounded-full relative transition-colors duration-300",
                            auth.enabled ? "bg-blue-600" : "bg-gray-200"
                          )}
                        >
                          <motion.div 
                            animate={{ x: auth.enabled ? 22 : 2 }}
                            className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                          />
                        </button>
                      </div>
                    </div>

                    {auth.enabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4 pt-4 border-t border-gray-50"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">角色</label>
                            <select 
                              value={auth.role}
                              onChange={(e) => updateAuth(idx, { role: e.target.value })}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                            >
                              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">数据范围</label>
                            <select 
                              value={auth.scope}
                              onChange={(e) => updateAuth(idx, { scope: e.target.value as any })}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20"
                            >
                              {SCOPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                          </div>
                        </div>

                        {auth.scope === 'custom' && (
                          <div className="flex flex-wrap gap-3 pt-2">
                            {['工厂A', '工厂B', '工厂C'].map(f => (
                              <label key={f} className="flex items-center gap-2 cursor-pointer group">
                                <div className={cn(
                                  "w-4 h-4 rounded border flex items-center justify-center transition-all",
                                  auth.customFactories?.includes(f) ? "bg-blue-600 border-blue-600" : "border-gray-300 group-hover:border-blue-400"
                                )} onClick={() => {
                                  const current = auth.customFactories || [];
                                  const next = current.includes(f) 
                                    ? current.filter(x => x !== f)
                                    : [...current, f];
                                  updateAuth(idx, { customFactories: next });
                                }}>
                                  {auth.customFactories?.includes(f) && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className="text-xs text-gray-600">{f}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 flex gap-3 bg-white">
              <button 
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-bold"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  onSave({ ...user, auths: auths.filter(a => a.enabled) });
                  onClose();
                }}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-bold shadow-lg shadow-blue-600/20"
              >
                保存配置
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const UserManagement = () => {
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(ORG_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = MOCK_USERS.filter(u => 
    u.name.includes(searchQuery) || u.account.includes(searchQuery)
  );

  return (
    <div className="flex-1 flex h-full bg-gray-50 overflow-hidden">
      {/* Left Sidebar: Org Tree */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">组织架构</h2>
          <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
            <Plus className="w-4 h-4" /> 新增
          </button>
        </div>
        <OrgTree onSelect={setSelectedNode} selectedId={selectedNode?.id} />
      </div>

      {/* Main Content: User List */}
      <div className="flex-1 flex flex-col min-w-0 bg-white ml-4 my-4 mr-4 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Factory className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-gray-900">{selectedNode?.name || '所有人员'}</h1>
                  <span className="text-[10px] text-gray-400 font-medium">集团总部 / 工厂 A / A-生产部</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">共 {filteredUsers.length} 位成员</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                <Plus className="w-4 h-4" /> 新增成员
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                <Download className="w-4 h-4 rotate-180" /> 导入
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
                <Download className="w-4 h-4" /> 导出
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400">状态</span>
              <div className="flex p-1 bg-gray-100 rounded-xl">
                {['全部', '在职', '离职'].map(s => (
                  <button key={s} className={cn(
                    "px-3 py-1 text-[10px] font-bold rounded-lg transition-all",
                    s === '全部' ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                  )}>{s}</button>
                ))}
              </div>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400">角色</span>
              <select className="bg-gray-100 border-none rounded-xl px-3 py-1.5 text-xs font-bold text-gray-600 outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>全部岗位角色</option>
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400">子系统权限</span>
              <select className="bg-gray-100 border-none rounded-xl px-3 py-1.5 text-xs font-bold text-gray-600 outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>全部子系统</option>
                {SUBSYSTEMS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-gray-50">
                <th className="p-4 w-10"><input type="checkbox" className="rounded border-gray-300" /></th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">姓名</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">归属部门</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">岗位角色</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">子系统权限</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">数据范围</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">状态</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm",
                        user.id === 'u1' ? "bg-blue-600" : user.id === 'u2' ? "bg-emerald-600" : "bg-purple-600"
                      )}>
                        {user.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{user.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{user.account}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-600 text-[10px] font-bold border border-gray-200">
                      {user.dept}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-1 rounded-lg text-[10px] font-bold",
                      user.roleName === '生产管理员' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {user.roleName}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {user.auths.map(auth => (
                        <span key={auth.subsystem} className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold">
                          {auth.subsystem}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-xs text-gray-500 font-medium">
                    {user.auths[0]?.scope === 'all' ? '全集团' : user.auths[0]?.scope === 'factory' ? '工厂A' : '仅本人'}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-1.5 h-1.5 rounded-full", user.status === 'active' ? "bg-emerald-500" : "bg-gray-300")} />
                      <span className={cn("text-xs font-bold", user.status === 'active' ? "text-gray-700" : "text-gray-400")}>
                        {user.status === 'active' ? '在职' : '离职'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors text-xs font-bold">编辑</button>
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setIsAuthDrawerOpen(true);
                        }}
                        className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors text-xs font-bold"
                      >
                        授权
                      </button>
                      <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors text-xs font-bold">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AuthDrawer 
        user={selectedUser}
        isOpen={isAuthDrawerOpen}
        onClose={() => setIsAuthDrawerOpen(false)}
        onSave={(updated) => {
          console.log('Saving user auth:', updated);
        }}
      />
    </div>
  );
};

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
          {activeMenu === 'calendar' && <TrainingCalendar />}
          {activeMenu === 'personal-tasks' && <PersonalWorkbench />}
          {activeMenu === 'user-management' && <UserManagement />}
          {activeMenu === 'portal' && <PortalDashboard onSelectSOP={() => setActiveMenu('sop')} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- Personal Workbench Component ---
const PersonalWorkbench = () => {
  const [activeTab, setActiveTab] = useState<'todo' | 'completed'>('todo');
  const [showSopModal, setShowSopModal] = useState(false);
  const [sopRead, setSopRead] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);

  const onboardingNodes = [
    { id: 'company', label: '公司', status: 'completed' },
    { id: 'factory', label: '工厂', status: 'completed' },
    { id: 'workshop', label: '车间', status: 'completed' },
    { id: 'quality', label: '质量', status: 'current' },
    { id: 'pcs', label: 'PCS', status: 'pending' },
    { id: 'oee', label: 'OEE', status: 'pending' },
    { id: 'comprehensive', label: '综合', status: 'pending' },
  ];

  const todoTasks = [
    { id: 't1', title: '入职安全考核 7 项', progress: '3/7', type: 'onboarding' },
    { id: 't2', title: '成型机 SOP V2.2 更新培训', type: 'sop', urgent: true, deadline: '2026-03-15' },
    { id: 't3', title: '季度安全知识竞赛', type: 'general', deadline: '2026-03-20' },
  ];

  const certifications = [
    { id: 'c1', name: '成型主机岗上岗证', level: '初级', issueDate: '2025-06-10', expiryDate: '2026-06-10', status: 'valid' },
    { id: 'c2', name: '叉车驾驶证', level: 'B类', issueDate: '2023-03-20', expiryDate: '2026-03-20', status: 'warning' },
  ];

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/user123/128/128" 
                alt="Avatar" 
                className="w-20 h-20 rounded-[28px] object-cover border-4 border-white shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black text-gray-900">张三</h2>
                <span className="text-sm font-bold text-gray-400">工号：12345</span>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded-full uppercase tracking-wider border border-emerald-200">
                  新员工（待定岗）
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider border border-blue-200">
                  一期半成品车间
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">本月学习时长</div>
              <div className="text-2xl font-black text-gray-900">12.5 <span className="text-sm font-bold text-gray-400">小时</span></div>
            </div>
            <div className="w-px h-10 bg-gray-200 self-center" />
            <div className="text-right">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">考核合格率</div>
              <div className="text-2xl font-black text-emerald-500">98%</div>
            </div>
          </div>
        </div>

        {/* Onboarding Progress Bar */}
        <div className="mt-10 bg-gray-50 p-6 rounded-[32px] border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" /> 入职准入进度
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">已点亮 3/7 节点</span>
          </div>
          <div className="flex items-center justify-between relative px-4">
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-gray-200 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-8 h-1 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-1000" 
              style={{ width: '33%' }}
            />
            {onboardingNodes.map((node, i) => (
              <div key={node.id} className="relative z-10 flex flex-col items-center gap-3">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm",
                    node.status === 'completed' ? "bg-emerald-500 text-white shadow-emerald-200" :
                    node.status === 'current' ? "bg-white border-2 border-emerald-500 text-emerald-500 animate-pulse" :
                    "bg-white border-2 border-gray-100 text-gray-300"
                  )}
                  onClick={() => {
                    if (node.id === 'comprehensive' && node.status === 'pending') {
                      // Mock completion for demo
                      setShowPromotionModal(true);
                    }
                  }}
                >
                  {node.status === 'completed' ? <Check size={20} /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                <span className={cn(
                  "text-[10px] font-bold tracking-wider",
                  node.status === 'completed' ? "text-emerald-600" :
                  node.status === 'current' ? "text-gray-900" : "text-gray-400"
                )}>
                  {node.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 flex gap-8">
        {/* Left Column: Tasks */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center gap-8 border-b border-gray-100">
            <button 
              onClick={() => setActiveTab('todo')}
              className={cn(
                "pb-4 text-sm font-bold transition-all relative",
                activeTab === 'todo' ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              )}
            >
              待办任务
              {activeTab === 'todo' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full" />}
              <span className="ml-2 px-1.5 py-0.5 bg-rose-500 text-white text-[8px] rounded-full">3</span>
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={cn(
                "pb-4 text-sm font-bold transition-all relative",
                activeTab === 'completed' ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              )}
            >
              已完成记录
              {activeTab === 'completed' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full" />}
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === 'todo' ? (
              todoTasks.map(task => (
                <motion.div 
                  key={task.id}
                  whileHover={{ x: 4 }}
                  className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                  onClick={() => task.type === 'sop' && setShowSopModal(true)}
                >
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                      task.type === 'onboarding' ? "bg-blue-50 text-blue-500" :
                      task.type === 'sop' ? "bg-amber-50 text-amber-500" : "bg-gray-50 text-gray-500"
                    )}>
                      {task.type === 'onboarding' ? <ShieldCheck size={28} /> :
                       task.type === 'sop' ? <BookOpen size={28} /> : <ClipboardCheck size={28} />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900">{task.title}</h4>
                        {task.urgent && (
                          <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-[8px] font-black rounded uppercase tracking-tighter">紧急</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        {task.progress && (
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500" style={{ width: '42%' }} />
                            </div>
                            <span className="text-[10px] font-bold text-blue-600">进度 {task.progress}</span>
                          </div>
                        )}
                        {task.deadline && (
                          <div className="flex items-center gap-1 text-[10px] text-gray-400">
                            <Clock size={12} /> 截止日期: {task.deadline}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <History size={48} className="mb-4 opacity-20" />
                <p className="text-sm">暂无历史记录</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Certifications */}
        <div className="w-96 flex flex-col gap-6">
          <div className="bg-gray-900 rounded-[40px] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Trophy size={20} className="text-emerald-400" /> 我的资质/证书
            </h3>
            <div className="space-y-4">
              {certifications.map(cert => (
                <div 
                  key={cert.id}
                  onClick={() => setShowCertModal(true)}
                  className={cn(
                    "p-5 rounded-3xl border transition-all cursor-pointer group",
                    cert.status === 'warning' 
                      ? "bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20" 
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold">{cert.name}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
                      cert.status === 'warning' ? "bg-amber-500 text-white" : "bg-emerald-500/20 text-emerald-400"
                    )}>
                      {cert.status === 'warning' ? '需复审' : cert.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-white/40">
                    <span>有效期至: {cert.expiryDate}</span>
                    <div className="flex items-center gap-1 group-hover:text-white transition-colors">
                      查看详情 <ChevronRight size={10} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Progress Charts */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-sm font-bold text-gray-900">年度学习概览</h3>
            <div className="flex justify-around">
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#10B981" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-gray-900">75%</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">学习时长达标</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#3B82F6" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="25.1" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-gray-900">90%</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">考核合格率</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SOP Training Modal */}
      <AnimatePresence>
        {showSopModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-900">成型机 SOP V2.2 更新培训</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-600 rounded font-bold">待学习</span>
                    <span>时长: 15 分钟</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSopModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-all"
                >
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-8 space-y-8">
                <div className="aspect-video bg-gray-900 rounded-[32px] relative overflow-hidden group">
                  <img 
                    src="https://picsum.photos/seed/factory/1280/720" 
                    alt="Training Video" 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={() => setSopRead(true)}
                      className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform"
                    >
                      <Play size={32} fill="currentColor" />
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-1/3" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900">培训要点</h4>
                  <ul className="space-y-3">
                    {[
                      '更新了成型机 1# 站位的喂胶角度标准',
                      '新增了紧急停机后的复位检查流程',
                      '优化了半成品胎胚的抓取力度参数'
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                          <Check size={12} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
                <button 
                  disabled={!sopRead}
                  className={cn(
                    "flex-1 py-5 rounded-2xl font-bold transition-all shadow-lg",
                    sopRead 
                      ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                  onClick={() => alert('进入考试模式...')}
                >
                  {sopRead ? "开始考试" : "请先完成视频学习"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
            >
              <div className="p-10 bg-gray-900 text-white text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#10B981_0%,transparent_70%)]" />
                </div>
                <div className="w-20 h-20 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                  <Trophy size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight">电子上岗证</h3>
                  <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase">Electronic Operation Certificate</p>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between text-left">
                  <div className="space-y-1">
                    <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest">持证人</div>
                    <div className="text-sm font-bold">张三</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest">工号</div>
                    <div className="text-sm font-bold">12345</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[8px] font-bold text-white/40 uppercase tracking-widest">岗位</div>
                    <div className="text-sm font-bold">成型主机岗</div>
                  </div>
                </div>
              </div>
              <div className="p-10 flex flex-col items-center gap-8">
                <div className="p-4 bg-white border-2 border-gray-100 rounded-3xl shadow-inner">
                  <div className="w-40 h-40 bg-gray-50 flex items-center justify-center relative">
                    <QrCode size={120} className="text-gray-900" />
                    <div className="absolute inset-0 bg-emerald-500/5 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center">
                        <ShieldCheck size={16} className="text-emerald-500" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xs font-bold text-gray-900">扫码核实操作权限</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed">此二维码包含实时生成的防伪加密信息，<br />巡检人员扫码即可核实该员工是否具备该机台的操作权限。</p>
                </div>
                <button 
                  onClick={() => setShowCertModal(false)}
                  className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Promotion Modal */}
      <AnimatePresence>
        {showPromotionModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-emerald-500/20 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              className="bg-white rounded-[48px] shadow-2xl p-12 text-center max-w-md relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
              <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full mx-auto flex items-center justify-center mb-8">
                <Sparkles size={48} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">恭喜您！</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                您已完成入职考核，身份已晋升为 <span className="text-emerald-600 font-bold">学徒</span>，请等待岗位分配。
              </p>
              <button 
                onClick={() => setShowPromotionModal(false)}
                className="w-full py-5 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
              >
                太棒了，我知道了
              </button>
              <div className="mt-6 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-emerald-200 rounded-full" />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
interface Attendee {
  id: string;
  name: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  indicators: boolean[];
}

interface CalendarTask {
  id: string;
  title: string;
  type: 'annual' | 'sop' | 'urgent' | 'internal';
  date?: string; // YYYY-MM-DD
  personnel: string[];
  attendees?: Attendee[];
  isDraft?: boolean;
  isOverdue?: boolean;
  category?: 'safety' | 'skill' | 'quality';
}

const TrainingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026
  const [tasks, setTasks] = useState<CalendarTask[]>([
    { 
      id: '1', 
      title: '年度消防培训', 
      type: 'annual', 
      date: '2026-03-10', 
      personnel: ['张建国', '李卫东', '王志强'], 
      isDraft: true 
    },
    { 
      id: '2', 
      title: '成型机 SOP V2.1 培训', 
      type: 'sop', 
      date: '2026-03-15', 
      personnel: ['赵铁柱', '刘小明', '王大锤', '李二狗', '张三'],
      attendees: [
        { id: 'E001', name: '赵铁柱', status: 'completed', score: 95, indicators: [true, true, true, true, true, true, true] },
        { id: 'E002', name: '刘小明', status: 'completed', score: 88, indicators: [true, true, true, true, true, false, false] },
        { id: 'E003', name: '王大锤', status: 'in_progress', score: 0, indicators: [true, true, false, false, false, false, false] },
        { id: 'E004', name: '李二狗', status: 'not_started', score: 0, indicators: [false, false, false, false, false, false, false] },
        { id: 'E005', name: '张三', status: 'completed', score: 92, indicators: [true, true, true, true, true, true, true] },
      ]
    },
    { 
      id: '3', 
      title: '资质复审：压力容器操作', 
      type: 'urgent', 
      date: '2026-03-05', 
      personnel: ['孙志远'],
      isOverdue: true,
      attendees: [
        { id: 'E006', name: '孙志远', status: 'not_started', score: 0, indicators: [false, false, false, false, false, false, false] }
      ]
    },
  ]);

  const [sidebarTasks, setSidebarTasks] = useState<CalendarTask[]>([
    { id: '4', title: 'SOP V2.2 更新培训', type: 'sop', personnel: ['四复合 1# 机台 5名员工'] },
    { id: '5', title: '新员工入职安全培训', type: 'annual', personnel: ['刘小明', '周大为'] },
  ]);

  const [selectedTask, setSelectedTask] = useState<CalendarTask | null>(null);
  const [showPersonnelModal, setShowPersonnelModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showInternalModal, setShowInternalModal] = useState(false);
  const [internalStep, setInternalStep] = useState(1);
  const [internalForm, setInternalForm] = useState({
    title: '',
    category: 'safety',
    date: '',
    contentSource: 'library',
    selectionMode: 'machine',
    personnel: [] as string[]
  });

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = daysInMonth(year, month);
  const offset = firstDayOfMonth(year, month);

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - offset + 1;
    if (day > 0 && day <= days) {
      return { day, date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` };
    }
    return null;
  });

  const handleDragStart = (e: React.DragEvent, task: CalendarTask) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const handleDrop = (e: React.DragEvent, date: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const task = sidebarTasks.find(t => t.id === taskId) || tasks.find(t => t.id === taskId);
    
    if (task) {
      const updatedTask = { ...task, date, isDraft: false };
      if (sidebarTasks.find(t => t.id === taskId)) {
        setSidebarTasks(sidebarTasks.filter(t => t.id !== taskId));
        setTasks([...tasks, updatedTask]);
      } else {
        setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
      }
      setSelectedTask(updatedTask);
      setShowPersonnelModal(true);
    }
  };

  const handleTaskClick = (task: CalendarTask) => {
    setSelectedTask(task);
    if (task.isDraft) {
      setShowPersonnelModal(true);
    } else {
      setShowDetailModal(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold text-gray-900">培训排期看板</h2>
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button 
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
            >
              <ChevronRight size={18} className="rotate-180" />
            </button>
            <span className="px-4 font-bold text-sm">{year}年 {month + 1}月</span>
            <button 
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl">
            <Users size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">部门：一期半成品车间</span>
            <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
              <Shield size={10} className="text-white" />
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Filter size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Calendar Grid */}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(day => (
              <div key={day} className="bg-gray-50 py-3 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {day}
              </div>
            ))}
            {calendarDays.map((d, i) => (
              <div 
                key={i} 
                onDragOver={(e: React.DragEvent) => e.preventDefault()}
                onDrop={(e: React.DragEvent) => d && handleDrop(e, d.date)}
                className={cn(
                  "bg-white min-h-[120px] p-2 transition-colors",
                  d ? "hover:bg-gray-50/50" : "bg-gray-50/30"
                )}
              >
                {d && (
                  <div className="flex flex-col h-full">
                    <span className={cn(
                      "text-sm font-bold mb-2 w-7 h-7 flex items-center justify-center rounded-full",
                      d.day === new Date().getDate() && month === new Date().getMonth() ? "bg-emerald-500 text-white" : "text-gray-400"
                    )}>
                      {d.day}
                    </span>
                    <div className="space-y-1">
                      {tasks.filter(t => t.date === d.date).map(task => (
                        <motion.div
                          key={task.id}
                          layoutId={task.id}
                          onClick={() => handleTaskClick(task)}
                          className={cn(
                            "px-2 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all border shadow-sm relative group",
                            task.type === 'annual' && (task.isDraft ? "bg-blue-50 text-blue-600 border-blue-200 border-dashed" : "bg-blue-500 text-white border-blue-600"),
                            task.type === 'sop' && "bg-amber-500 text-white border-amber-600",
                            task.type === 'urgent' && "bg-rose-500 text-white border-rose-600",
                            task.type === 'internal' && "bg-emerald-500 text-white border-emerald-600",
                            task.isOverdue && "border-red-500 border-dashed ring-1 ring-red-500/50"
                          )}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <div className="truncate">{task.title}</div>
                            {task.isOverdue && (
                              <span className="shrink-0 bg-red-600 text-white px-1 rounded-sm text-[8px] animate-pulse">逾期</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5 opacity-80">
                            <Users size={8} /> {task.personnel.length}人
                          </div>
                          
                          {/* Progress Bar */}
                          {!task.isDraft && (
                            <div className="mt-1.5 w-full h-1 bg-black/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-white transition-all duration-500" 
                                style={{ 
                                  width: `${task.attendees ? (task.attendees.filter(a => a.status === 'completed').length / task.attendees.length) * 100 : 0}%` 
                                }} 
                              />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>

        {/* Sidebar Tasks */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-xl z-10">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Inbox size={18} className="text-emerald-500" /> 待排期任务
              </h3>
              <button 
                onClick={() => {
                  setInternalStep(1);
                  setShowInternalModal(true);
                }}
                className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all shadow-sm shadow-emerald-500/20 group"
                title="发起内部培训"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>
            <p className="text-xs text-gray-500">拖拽卡片到日历进行排期</p>
            
            <button 
              onClick={() => {
                setInternalStep(1);
                setShowInternalModal(true);
              }}
              className="w-full py-3 bg-white border-2 border-dashed border-emerald-200 text-emerald-600 rounded-2xl text-xs font-bold hover:bg-emerald-50 hover:border-emerald-300 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={14} /> 发起内部培训
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {sidebarTasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={(e: React.DragEvent) => handleDragStart(e, task)}
                className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    task.type === 'annual' ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"
                  )}>
                    {task.type === 'annual' ? '年度计划' : 'SOP 更新'}
                  </span>
                  <div className="text-gray-300 group-hover:text-emerald-500 transition-colors">
                    <Calendar size={14} />
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{task.title}</h4>
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <Users size={12} />
                  <span>影响人员: {task.personnel.join(', ')}</span>
                </div>
              </div>
            ))}
            {sidebarTasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <CheckCircle2 size={32} className="mb-2 opacity-20" />
                <p className="text-xs">暂无待排期任务</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{selectedTask.title}</h3>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      selectedTask.type === 'annual' ? "bg-blue-500 text-white" : 
                      selectedTask.type === 'sop' ? "bg-amber-500 text-white" :
                      selectedTask.type === 'urgent' ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"
                    )}>
                      {selectedTask.type === 'annual' ? '年度计划' : 
                       selectedTask.type === 'sop' ? 'SOP 培训' :
                       selectedTask.type === 'urgent' ? '资质复审' : '内部培训'}
                    </span>
                    {selectedTask.isOverdue && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-[10px] font-bold border border-red-200">逾期未完成</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">培训日期: {selectedTask.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setShowDetailModal(false);
                      setShowPersonnelModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-sm shadow-emerald-500/20"
                  >
                    <Plus size={16} /> 增补受训人
                  </button>
                  <button 
                    onClick={() => setShowDetailModal(false)}
                    className="w-10 h-10 rounded-full hover:bg-white hover:shadow-sm flex items-center justify-center text-gray-400 transition-all"
                  >
                    <Plus size={24} className="rotate-45" />
                  </button>
                </div>
              </div>

              <div className="p-8 flex-1 overflow-auto space-y-8">
                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: '应到人数', value: selectedTask.personnel.length, icon: Users, color: 'text-blue-500' },
                    { label: '实到人数', value: selectedTask.attendees?.filter(a => a.status === 'completed').length || 0, icon: CheckCircle2, color: 'text-emerald-500' },
                    { label: '合格率', value: selectedTask.attendees ? `${Math.round((selectedTask.attendees.filter(a => (a.score || 0) >= 80).length / selectedTask.attendees.length) * 100)}%` : '0%', icon: Trophy, color: 'text-amber-500' },
                    { label: '平均分', value: selectedTask.attendees ? Math.round(selectedTask.attendees.reduce((acc, curr) => acc + (curr.score || 0), 0) / selectedTask.attendees.length) : 0, icon: BarChart3, color: 'text-indigo-500' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <stat.icon size={12} className={stat.color} /> {stat.label}
                      </div>
                      <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Personnel Table */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-900">人员明细表</h4>
                  <div className="border border-gray-100 rounded-3xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">姓名 / 工号</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">学习状态</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">7项指标点亮</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">考试成绩</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {selectedTask.attendees?.map(attendee => (
                          <tr key={attendee.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-bold text-gray-900">{attendee.name}</div>
                              <div className="text-[10px] text-gray-400">{attendee.id}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "px-2 py-1 rounded-lg text-[10px] font-bold",
                                attendee.status === 'completed' ? "bg-emerald-50 text-emerald-600" :
                                attendee.status === 'in_progress' ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"
                              )}>
                                {attendee.status === 'completed' ? '已完成' :
                                 attendee.status === 'in_progress' ? '进行中' : '未开始'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-1.5">
                                {attendee.indicators.map((passed, i) => (
                                  <div 
                                    key={i} 
                                    className={cn(
                                      "w-2.5 h-2.5 rounded-full transition-all",
                                      passed ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-gray-200"
                                    )} 
                                    title={`科目 ${i + 1}`}
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={cn(
                                "font-black text-lg",
                                (attendee.score || 0) >= 80 ? "text-emerald-500" : "text-gray-900"
                              )}>
                                {attendee.status === 'completed' ? attendee.score : '--'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {attendee.status !== 'completed' && (
                                  <button 
                                    onClick={() => alert(`已向 ${attendee.name} 发送催办通知！`)}
                                    className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                                    title="一键催办"
                                  >
                                    <Bell size={14} />
                                  </button>
                                )}
                                <button 
                                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                                  title="查看成绩单"
                                >
                                  <FileText size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="px-8 py-3 bg-white border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Personnel Modal */}
      <AnimatePresence>
        {showPersonnelModal && selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{selectedTask.isDraft ? selectedTask.title : `增补人员：${selectedTask.title}`}</h3>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      selectedTask.type === 'annual' ? "bg-blue-500 text-white" : "bg-amber-500 text-white"
                    )}>
                      {selectedTask.type === 'annual' ? '年度计划' : 'SOP 培训'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">排期日期: {selectedTask.date}</p>
                </div>
                <button 
                  onClick={() => setShowPersonnelModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-white hover:shadow-sm flex items-center justify-center text-gray-400 transition-all"
                >
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>

              <div className="p-8 space-y-8 flex-1 overflow-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-gray-900">参训人员微调</h4>
                    <span className="text-xs text-gray-500">已选 {selectedTask.personnel.length} 人</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['张建国', '李卫东', '王志强', '赵铁柱', '刘小明', '周大为', '孙志远'].map(name => (
                      <label 
                        key={name}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer group",
                          selectedTask.personnel.includes(name) 
                            ? "bg-emerald-50 border-emerald-200" 
                            : "bg-white border-gray-100 hover:border-emerald-200"
                        )}
                      >
                        <input 
                          type="checkbox" 
                          checked={selectedTask.personnel.includes(name)}
                          onChange={() => {
                            const newPersonnel = selectedTask.personnel.includes(name)
                              ? selectedTask.personnel.filter(p => p !== name)
                              : [...selectedTask.personnel, name];
                            setSelectedTask({ ...selectedTask, personnel: newPersonnel });
                          }}
                          className="w-5 h-5 rounded-lg border-gray-300 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className={cn(
                          "text-sm font-medium transition-colors",
                          selectedTask.personnel.includes(name) ? "text-emerald-700" : "text-gray-600 group-hover:text-emerald-600"
                        )}>{name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                    <Bell size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-amber-900">确认后将立即下发通知</p>
                    <p className="text-xs text-amber-700 leading-relaxed">确认排期后，系统将通过企业微信/钉钉向以上 {selectedTask.personnel.length} 名员工发送培训提醒及相关 SOP 资料。</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
                <button 
                  onClick={() => setShowPersonnelModal(false)}
                  className="flex-1 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                >
                  取消
                </button>
                <button 
                  onClick={() => {
                    const updatedTask = { ...selectedTask, isDraft: false };
                    
                    // If adding to existing task, sync attendees
                    if (!selectedTask.isDraft && selectedTask.attendees) {
                      const existingNames = selectedTask.attendees.map(a => a.name);
                      const newPersonnel = selectedTask.personnel.filter(p => !existingNames.includes(p));
                      const newAttendees: Attendee[] = newPersonnel.map(name => ({
                        id: `E${Math.floor(Math.random() * 9000) + 1000}`,
                        name,
                        status: 'not_started',
                        indicators: [false, false, false, false, false, false, false]
                      }));
                      updatedTask.attendees = [...selectedTask.attendees, ...newAttendees];
                    }

                    setTasks(tasks.map(t => t.id === selectedTask.id ? updatedTask : t));
                    setShowPersonnelModal(false);
                    alert(selectedTask.isDraft ? '排期确认成功，通知已下发！' : '增补人员成功，通知已下发！');
                  }}
                  className="flex-1 py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                >
                  {selectedTask.isDraft ? '确认排期并下发' : '确认增补并下发'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Internal Training Modal */}
      <AnimatePresence>
        {showInternalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">发起内部培训</h3>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map(s => (
                        <div key={s} className={cn("w-2 h-2 rounded-full transition-all", internalStep >= s ? "bg-emerald-500 w-6" : "bg-gray-200")} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {internalStep === 1 && "第一步：填写基础信息"}
                    {internalStep === 2 && "第二步：配置培训内容"}
                    {internalStep === 3 && "第三步：选择培训范围"}
                  </p>
                </div>
                <button 
                  onClick={() => setShowInternalModal(false)}
                  className="w-10 h-10 rounded-full hover:bg-white hover:shadow-sm flex items-center justify-center text-gray-400 transition-all"
                >
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>

              <div className="p-8 flex-1 overflow-auto">
                {internalStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">培训标题</label>
                      <input 
                        type="text" 
                        placeholder="例如：一期半成品车间叉车规范培训"
                        value={internalForm.title}
                        onChange={e => setInternalForm({...internalForm, title: e.target.value})}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">培训类别</label>
                        <select 
                          value={internalForm.category}
                          onChange={e => setInternalForm({...internalForm, category: e.target.value as any})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold"
                        >
                          <option value="safety">安全</option>
                          <option value="skill">技能</option>
                          <option value="quality">品质</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">培训日期</label>
                        <input 
                          type="date" 
                          value={internalForm.date}
                          onChange={e => setInternalForm({...internalForm, date: e.target.value})}
                          className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {internalStep === 2 && (
                  <div className="grid grid-cols-2 gap-6">
                    <button 
                      onClick={() => setInternalForm({...internalForm, contentSource: 'library'})}
                      className={cn(
                        "p-8 rounded-[32px] border-2 transition-all text-left space-y-4",
                        internalForm.contentSource === 'library' ? "bg-emerald-50 border-emerald-500" : "bg-white border-gray-100 hover:border-emerald-200"
                      )}
                    >
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">从库中选择</h4>
                        <p className="text-xs text-gray-500 mt-1">调用 SOP 库或通用试题库</p>
                      </div>
                    </button>
                    <button 
                      onClick={() => setInternalForm({...internalForm, contentSource: 'upload'})}
                      className={cn(
                        "p-8 rounded-[32px] border-2 transition-all text-left space-y-4",
                        internalForm.contentSource === 'upload' ? "bg-emerald-50 border-emerald-500" : "bg-white border-gray-100 hover:border-emerald-200"
                      )}
                    >
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                        <Plus size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">手动上传</h4>
                        <p className="text-xs text-gray-500 mt-1">临时拍摄的照片或 PDF</p>
                      </div>
                    </button>
                  </div>
                )}

                {internalStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex gap-2">
                      {[
                        { id: 'machine', label: '按机台选人' },
                        { id: 'group', label: '按组别选人' },
                        { id: 'custom', label: '自定义勾选' }
                      ].map(mode => (
                        <button
                          key={mode.id}
                          onClick={() => setInternalForm({...internalForm, selectionMode: mode.id as any})}
                          className={cn(
                            "flex-1 py-3 rounded-xl text-xs font-bold transition-all",
                            internalForm.selectionMode === mode.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          )}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {['张建国', '李卫东', '王志强', '赵铁柱', '刘小明', '周大为', '孙志远'].map(name => (
                        <label 
                          key={name}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer group",
                            internalForm.personnel.includes(name) 
                              ? "bg-emerald-50 border-emerald-200" 
                              : "bg-white border-gray-100 hover:border-emerald-200"
                          )}
                        >
                          <input 
                            type="checkbox" 
                            checked={internalForm.personnel.includes(name)}
                            onChange={() => {
                              const newPersonnel = internalForm.personnel.includes(name)
                                ? internalForm.personnel.filter(p => p !== name)
                                : [...internalForm.personnel, name];
                              setInternalForm({ ...internalForm, personnel: newPersonnel });
                            }}
                            className="w-5 h-5 rounded-lg border-gray-300 text-emerald-500 focus:ring-emerald-500"
                          />
                          <span className={cn(
                            "text-sm font-medium transition-colors",
                            internalForm.personnel.includes(name) ? "text-emerald-700" : "text-gray-600 group-hover:text-emerald-600"
                          )}>{name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
                {internalStep > 1 && (
                  <button 
                    onClick={() => setInternalStep(internalStep - 1)}
                    className="flex-1 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    上一步
                  </button>
                )}
                <button 
                  onClick={() => {
                    if (internalStep < 3) {
                      setInternalStep(internalStep + 1);
                    } else {
                      // Submit
                      const newTask: CalendarTask = {
                        id: Math.random().toString(36).substr(2, 9),
                        title: internalForm.title || '部门内部培训',
                        type: 'internal',
                        date: internalForm.date || '2026-03-20',
                        personnel: internalForm.personnel.length > 0 ? internalForm.personnel : ['部门全员'],
                        category: internalForm.category as any
                      };
                      setTasks([...tasks, newTask]);
                      setShowInternalModal(false);
                      alert('内部培训发起成功！');
                    }
                  }}
                  className="flex-1 py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                >
                  {internalStep === 3 ? "提交并发布" : "下一步"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
