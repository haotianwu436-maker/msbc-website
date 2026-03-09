/**
 * MSBC Admin Dashboard
 * Non-technical content management interface.
 * Password-protected. Uses localStorage for data persistence.
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { useCmsData, useAdminAuth } from "@/hooks/useCmsData";
import { useSupabaseCms } from "@/hooks/useSupabaseCms";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Link } from "wouter";
import { toast } from "sonner";
import {
  Settings, Users, Calendar, Award, Building2, HelpCircle, Mail,
  Rocket, Ticket, FileText, Download, Upload, RotateCcw, Lock,
  LogOut, Eye, ChevronRight, Plus, Trash2, Save, ArrowLeft, X,
  Database, AlertCircle,
} from "lucide-react";
import type { Speaker, AgendaSession, Sponsor, University, FaqItem, ContactMethod } from "@/lib/data";
import ImageUpload from "@/components/ImageUpload";

// ─── Login Screen ─────────────────────────────────────────────
function LoginScreen({ 
  onLogin, 
  onSupabaseLogin,
  supabaseAuthAvailable = false,
}: { 
  onLogin: (pw: string) => boolean;
  onSupabaseLogin?: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  supabaseAuthAvailable?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证必填字段
    if (!password.trim()) {
      setError("请输入密码");
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    if (supabaseAuthAvailable && !email.trim()) {
      setError("请输入邮箱");
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // 如果 Supabase Auth 可用，优先使用 Supabase Auth
      if (supabaseAuthAvailable && onSupabaseLogin) {
        const result = await onSupabaseLogin(email.trim(), password);
        
        if (result.success) {
          // Supabase Auth 登录成功
          return;
        } else {
          // Supabase Auth 失败，尝试简单密码验证
          const simpleAuthSuccess = onLogin(password);
          if (!simpleAuthSuccess) {
            setError(result.error || "登录失败：邮箱或密码错误");
            setPassword("");
          }
        }
      } else {
        // 只使用简单密码验证
        const success = onLogin(password);
        if (!success) {
          setError("密码错误");
          setPassword("");
        }
      }
    } catch (err: any) {
      setError(err.message || "登录失败，请重试");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090F] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>MSBC</span>
            <span className="text-[10px] font-medium tracking-wider text-[#2563EB] border border-[#2563EB]/30 px-2 py-0.5" style={{ fontFamily: "var(--font-mono)" }}>ADMIN</span>
          </div>
          <p className="text-sm text-[#6B7280] mb-2" style={{ fontFamily: "var(--font-body)" }}>
            {supabaseAuthAvailable ? "使用 Supabase 登录" : "输入密码访问管理面板"}
          </p>
          {supabaseAuthAvailable && (
            <p className="text-xs text-[#8b99b5] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
              如果 Supabase 登录失败，将自动尝试简单密码验证
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {supabaseAuthAvailable && (
            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@msbc.my"
                className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#2563EB]/50 rounded"
                style={{ fontFamily: "var(--font-body)" }}
                autoFocus
                required={supabaseAuthAvailable}
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-[#6B7280] focus:outline-none focus:border-[#2563EB]/50 rounded"
              style={{ fontFamily: "var(--font-body)" }}
              autoFocus={!supabaseAuthAvailable}
              required
            />
          </div>
          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-medium mb-1">登录失败</p>
                  <p className="text-xs opacity-90">{error}</p>
                </div>
              </div>
            </div>
          )}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-[#2563EB] text-white text-sm font-medium hover:bg-[#1D4ED8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded" 
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                登录中...
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                Sign In
              </>
            )}
          </button>
        </form>
        <div className="mt-6 space-y-2">
          {supabaseAuthAvailable && (
            <div className="flex items-center gap-2 text-xs text-[#8b99b5] px-4 py-2 bg-[#0066ff]/5 border border-[#0066ff]/20 rounded">
              <Database className="w-3.5 h-3.5 text-[#0066ff]" />
              <span style={{ fontFamily: "var(--font-mono)" }}>Supabase Auth 已启用</span>
            </div>
          )}
          {!supabaseAuthAvailable && (
            <p className="text-center text-[11px] text-[#4B5563]" style={{ fontFamily: "var(--font-mono)" }}>
              Default password: msbc2026
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Nav ──────────────────────────────────────────────
const navItems = [
  { id: "site", label: "Site Settings", icon: Settings },
  { id: "event", label: "Event Edition", icon: Calendar },
  { id: "homepage", label: "Homepage Content", icon: FileText },
  { id: "speakers", label: "Speakers", icon: Users },
  { id: "agenda", label: "Agenda", icon: Calendar },
  { id: "sponsors", label: "Sponsors", icon: Award },
  { id: "universities", label: "Universities", icon: Building2 },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "hackathon", label: "Hackathon", icon: Rocket },
  { id: "tickets", label: "Tickets", icon: Ticket },
];

// ─── Field Editor Components ──────────────────────────────────
function TextField({ label, value, onChange, multiline, mono }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; mono?: boolean }) {
  const cls = `w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-[#4B5563] focus:outline-none focus:border-[#2563EB]/50 ${mono ? "font-mono text-xs" : ""}`;
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[#9CA3AF] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} className={cls} style={{ fontFamily: mono ? "var(--font-mono)" : "var(--font-body)" }} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} style={{ fontFamily: mono ? "var(--font-mono)" : "var(--font-body)" }} />
      )}
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[#9CA3AF] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#2563EB]/50" style={{ fontFamily: "var(--font-body)" }}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] p-4 sm:p-6 space-y-4">
      <h3 className="text-sm font-semibold text-[#F0F2F8] uppercase tracking-wider" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      {children}
    </div>
  );
}

// ─── Site Settings Panel ──────────────────────────────────────
function SiteSettingsPanel({ cms }: { cms: ReturnType<typeof useCmsData> }) {
  const s = cms.siteSettings;
  const update = (patch: Partial<typeof s>) => cms.setSiteSettings({ ...s, ...patch });
  return (
    <div className="space-y-6">
      <SectionCard title="General">
        <TextField label="Site Name" value={s.siteName} onChange={(v) => update({ siteName: v })} />
        <TextField label="SEO Title" value={s.defaultSeoTitle} onChange={(v) => update({ defaultSeoTitle: v })} />
        <TextField label="SEO Description" value={s.defaultSeoDescription} onChange={(v) => update({ defaultSeoDescription: v })} multiline />
        <TextField label="Primary Contact Email" value={s.primaryContactEmail} onChange={(v) => update({ primaryContactEmail: v })} mono />
      </SectionCard>
      <SectionCard title="Social Links">
        {s.socialLinks.map((link, i) => (
          <div key={link.platform} className="flex gap-2 items-end">
            <div className="flex-1">
              <TextField label={link.platform.toUpperCase()} value={link.url} onChange={(v) => {
                const updated = [...s.socialLinks];
                updated[i] = { ...link, url: v };
                update({ socialLinks: updated });
              }} mono />
            </div>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

// ─── Event Edition Panel ──────────────────────────────────────
function EventEditionPanel({ cms }: { cms: ReturnType<typeof useCmsData> }) {
  const e = cms.eventEdition;
  const update = (patch: Partial<typeof e>) => cms.setEventEdition({ ...e, ...patch });
  return (
    <div className="space-y-6">
      <SectionCard title="Event Details">
        <TextField label="Event Title" value={e.eventTitle} onChange={(v) => update({ eventTitle: v })} />
        <TextField label="Tagline" value={e.eventTagline} onChange={(v) => update({ eventTagline: v })} />
        <div className="grid grid-cols-2 gap-3">
          <TextField label="City" value={e.city} onChange={(v) => update({ city: v })} />
          <TextField label="Country" value={e.country} onChange={(v) => update({ country: v })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Start Date" value={e.startDate} onChange={(v) => update({ startDate: v })} mono />
          <TextField label="End Date" value={e.endDate} onChange={(v) => update({ endDate: v })} mono />
        </div>
        <TextField label="Countdown Target (ISO)" value={e.countdownTarget} onChange={(v) => update({ countdownTarget: v })} mono />
        <TextField label="Registration URL" value={e.primaryRegistrationUrl} onChange={(v) => update({ primaryRegistrationUrl: v })} mono />
        <SelectField label="Registration Status" value={e.registrationStatus} onChange={(v) => update({ registrationStatus: v as typeof e.registrationStatus })} options={[
          { value: "open", label: "Open" },
          { value: "coming_soon", label: "Coming Soon" },
          { value: "closed", label: "Closed" },
          { value: "sold_out", label: "Sold Out" },
        ]} />
      </SectionCard>
    </div>
  );
}

// ─── Homepage Content Panel ───────────────────────────────────
function HomepageContentPanel({ cms }: { cms: ReturnType<typeof useCmsData> }) {
  const h = cms.homepageContent;
  const update = (section: string, patch: Record<string, unknown>) => {
    cms.setHomepageContent({ ...h, [section]: { ...(h as unknown as Record<string, Record<string, unknown>>)[section], ...patch } });
  };
  return (
    <div className="space-y-6">
      <SectionCard title="Hero Section">
        <TextField label="Title" value={h.hero.title} onChange={(v) => update("hero", { title: v })} />
        <TextField label="Headline" value={h.hero.headline} onChange={(v) => update("hero", { headline: v })} />
        <TextField label="Supporting Copy" value={h.hero.supportingCopy} onChange={(v) => update("hero", { supportingCopy: v })} multiline />
        <TextField label="Brand Line" value={h.hero.brandLine} onChange={(v) => update("hero", { brandLine: v })} />
      </SectionCard>
      <SectionCard title="About Section">
        <TextField label="Section Title" value={h.about.sectionTitle} onChange={(v) => update("about", { sectionTitle: v })} />
        <TextField label="Body Copy" value={h.about.bodyCopy} onChange={(v) => update("about", { bodyCopy: v })} multiline />
      </SectionCard>
      <SectionCard title="Stats">
        {h.stats.map((stat, i) => (
          <div key={i} className="flex gap-2">
            <div className="flex-1"><TextField label={`Stat ${i + 1} Value`} value={stat.value} onChange={(v) => {
              const updated = [...h.stats];
              updated[i] = { ...stat, value: v };
              cms.setHomepageContent({ ...h, stats: updated });
            }} /></div>
            <div className="flex-1"><TextField label={`Stat ${i + 1} Label`} value={stat.label} onChange={(v) => {
              const updated = [...h.stats];
              updated[i] = { ...stat, label: v };
              cms.setHomepageContent({ ...h, stats: updated });
            }} /></div>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

// ─── Speakers Panel ───────────────────────────────────────────
function SpeakersPanel({ cms }: { cms: ReturnType<typeof useCmsData> | ReturnType<typeof useSupabaseCms> }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [localSpeaker, setLocalSpeaker] = useState<Speaker | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 检查是否是 Supabase CMS
  const isSupabase = "isConfigured" in cms && cms.isConfigured;
  
  // 获取 speakers 数组（安全）
  const speakers = (cms.speakers || []) as Speaker[];

  // 保存待处理的更改
  const pendingChangesRef = useRef<Partial<Speaker>>({});

  // 防抖保存函数
  const debouncedSave = useCallback((id: string, patch: Partial<Speaker>) => {
    // 清除之前的定时器
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // 累积所有更改
    pendingChangesRef.current = { ...pendingChangesRef.current, ...patch };

    // 立即更新本地状态（让 UI 响应快）
    setLocalSpeaker((prev) => {
      if (prev && prev.speakerId === id) {
        return { ...prev, ...pendingChangesRef.current };
      }
      return prev;
    });

    // 如果是 localStorage，立即保存
    if (!isSupabase) {
      (cms as ReturnType<typeof useCmsData>).setSpeakers((prev) => 
        prev.map((s) => s.speakerId === id ? { ...s, ...pendingChangesRef.current } : s)
      );
      pendingChangesRef.current = {};
      return;
    }

    // 如果是 Supabase，延迟保存（防抖）- 停止输入 2 秒后才保存
    saveTimeoutRef.current = setTimeout(async () => {
      if (isSupabase && "updateSpeaker" in cms && cms.updateSpeaker && Object.keys(pendingChangesRef.current).length > 0) {
        try {
          setSaving(true);
          const changesToSave = { ...pendingChangesRef.current };
          pendingChangesRef.current = {};
          await cms.updateSpeaker(id, changesToSave);
          toast.success("保存成功");
        } catch (error: any) {
          console.error("Failed to update speaker:", error);
          const errorMessage = error?.message || error?.toString() || "未知错误";
          toast.error("更新失败", {
            description: errorMessage,
          });
        } finally {
          setSaving(false);
        }
      }
    }, 2000); // 2 秒延迟 - 停止输入 2 秒后才保存
  }, [isSupabase, cms]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const addSpeaker = async () => {
    const newSpeaker: Speaker = {
      speakerId: `sp-${Date.now()}`,
      fullName: "New Speaker",
      photo: "",
      title: "Title",
      organisation: "Organisation",
      shortBio: "",
      topicTags: [],
      socialLinks: [],
      featured: false,
      sortOrder: speakers.length + 1,
    };
    
    if (isSupabase && "createSpeaker" in cms && cms.createSpeaker) {
      try {
        setSaving(true);
        await cms.createSpeaker(newSpeaker);
        setEditing(newSpeaker.speakerId);
        toast.success("演讲者创建成功");
      } catch (error: any) {
        console.error("Failed to create speaker:", error);
        const errorMessage = error?.message || error?.toString() || "未知错误";
        toast.error("创建失败", {
          description: errorMessage,
        });
      } finally {
        setSaving(false);
      }
    } else {
      (cms as ReturnType<typeof useCmsData>).setSpeakers([...speakers, newSpeaker]);
      setEditing(newSpeaker.speakerId);
    }
  };

  const updateSpeaker = (id: string, patch: Partial<Speaker>) => {
    debouncedSave(id, patch);
  };

  const deleteSpeaker = async (id: string) => {
    if (!confirm("确定要删除这个演讲者吗？")) return;
    
    if (isSupabase && "deleteSpeaker" in cms && cms.deleteSpeaker) {
      try {
        setSaving(true);
        await cms.deleteSpeaker(id);
        if (editing === id) setEditing(null);
        toast.success("演讲者删除成功");
      } catch (error: any) {
        console.error("Failed to delete speaker:", error);
        const errorMessage = error?.message || error?.toString() || "未知错误";
        toast.error("删除失败", {
          description: errorMessage,
        });
      } finally {
        setSaving(false);
      }
    } else {
      (cms as ReturnType<typeof useCmsData>).setSpeakers(speakers.filter((s) => s.speakerId !== id));
      if (editing === id) setEditing(null);
    }
  };

  const editingSpeaker = localSpeaker || speakers.find((s) => s.speakerId === editing);

  // 当切换到编辑模式时，初始化本地状态
  useEffect(() => {
    if (editing) {
      const speaker = speakers.find((s) => s.speakerId === editing);
      if (speaker) {
        setLocalSpeaker(speaker);
        pendingChangesRef.current = {}; // 重置待处理的更改
      }
    } else {
      setLocalSpeaker(null);
      pendingChangesRef.current = {};
      // 清除未保存的更改
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    }
  }, [editing, speakers]);

  if (editingSpeaker) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-sm text-[#2563EB] hover:text-[#3B82F6]" style={{ fontFamily: "var(--font-display)" }}>
            <ArrowLeft className="w-4 h-4" /> Back to List
          </button>
          {isSupabase && (
            <div className="flex items-center gap-3">
              {saving ? (
                <div className="bg-[#0066ff]/10 border border-[#0066ff]/30 text-[#0066ff] px-4 py-2 rounded text-sm inline-flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-[#0066ff] border-t-transparent rounded-full animate-spin" />
                  保存中...
                </div>
              ) : (
                <div className="text-xs text-[#8b99b5]">
                  停止输入 2 秒后自动保存
                </div>
              )}
              <button
                onClick={async () => {
                  if (editing && "updateSpeaker" in cms && cms.updateSpeaker) {
                    // 清除防抖定时器
                    if (saveTimeoutRef.current) {
                      clearTimeout(saveTimeoutRef.current);
                    }
                    try {
                      setSaving(true);
                      // 保存所有待处理的更改
                      const changesToSave = { ...pendingChangesRef.current };
                      pendingChangesRef.current = {};
                      if (Object.keys(changesToSave).length > 0) {
                        await cms.updateSpeaker(editing, changesToSave);
                      }
                    } catch (error: any) {
                      console.error("Failed to save:", error);
                      const errorMessage = error?.message || error?.toString() || "未知错误";
                      alert(`保存失败: ${errorMessage}`);
                    } finally {
                      setSaving(false);
                    }
                  }
                }}
                disabled={saving || Object.keys(pendingChangesRef.current).length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-[#0066ff] text-white text-sm font-medium hover:bg-[#0052cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <Save className="w-4 h-4" />
                立即保存
              </button>
            </div>
          )}
        </div>
        <SectionCard title={`Edit: ${editingSpeaker.fullName}`}>
          <TextField label="Full Name" value={editingSpeaker.fullName} onChange={(v) => updateSpeaker(editing!, { fullName: v })} />
          
          {/* Image Upload for Supabase */}
          {isSupabase && "uploadImage" in cms ? (
            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Photo Upload
              </label>
              <ImageUpload
                bucket="SPEAKER_PHOTOS"
                currentUrl={editingSpeaker.photo}
                onUploadComplete={(url) => {
                  updateSpeaker(editing!, { photo: url });
                  toast.success("图片上传成功");
                }}
                onError={(error) => {
                  console.error("Image upload error:", error);
                  toast.error("图片上传失败", {
                    description: error.message,
                  });
                }}
                maxSizeMB={5}
              />
            </div>
          ) : null}
          
          <TextField label="Photo URL" value={editingSpeaker.photo} onChange={(v) => updateSpeaker(editing!, { photo: v })} mono />
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Title" value={editingSpeaker.title} onChange={(v) => updateSpeaker(editing!, { title: v })} />
            <TextField label="Organisation" value={editingSpeaker.organisation} onChange={(v) => updateSpeaker(editing!, { organisation: v })} />
          </div>
          <TextField label="Short Bio" value={editingSpeaker.shortBio} onChange={(v) => updateSpeaker(editing!, { shortBio: v })} multiline />
          <TextField label="Topic Tags (comma-separated)" value={editingSpeaker.topicTags.join(", ")} onChange={(v) => updateSpeaker(editing!, { topicTags: v.split(",").map((t) => t.trim()).filter(Boolean) })} />
          <div className="flex items-center gap-3">
            <label className="text-xs text-[#9CA3AF]" style={{ fontFamily: "var(--font-mono)" }}>FEATURED</label>
            <input type="checkbox" checked={editingSpeaker.featured} onChange={(e) => updateSpeaker(editing!, { featured: e.target.checked })} className="accent-[#2563EB]" />
          </div>
          <TextField label="Sort Order" value={String(editingSpeaker.sortOrder)} onChange={(v) => updateSpeaker(editing!, { sortOrder: parseInt(v) || 0 })} mono />
        </SectionCard>
      </div>
    );
  }

  // 检查加载状态和错误
  const isLoading = isSupabase && "loading" in cms ? cms.loading : false;
  const error = isSupabase && "errors" in cms ? cms.errors?.speakers : null;

  return (
    <div className="space-y-4">
      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded text-sm">
          <strong>错误：</strong> {error?.message || String(error) || "加载演讲者数据失败"}
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8 text-[#8b99b5]">
          加载中...
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>{speakers.length} speakers</span>
        <button onClick={addSpeaker} disabled={saving || isLoading} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white text-xs font-medium hover:bg-[#1D4ED8] transition-colors disabled:opacity-50" style={{ fontFamily: "var(--font-display)" }}>
          <Plus className="w-3 h-3" /> Add Speaker
        </button>
      </div>
      {speakers.length === 0 && !isLoading && (
        <div className="text-center py-8 text-[#8b99b5]">
          暂无演讲者数据。点击 "Add Speaker" 添加第一个。
        </div>
      )}
      {speakers.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map((speaker) => (
        <div key={speaker.speakerId} className="bg-white/[0.02] border border-white/[0.06] p-3 sm:p-4 flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white/[0.04] border border-white/[0.06] overflow-hidden shrink-0">
            {speaker.photo ? <img src={speaker.photo} alt="" className="w-full h-full object-cover" /> : <Users className="w-5 h-5 text-[#4B5563] m-auto mt-2.5" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F0F2F8] truncate" style={{ fontFamily: "var(--font-display)" }}>{speaker.fullName}</p>
            <p className="text-xs text-[#6B7280] truncate" style={{ fontFamily: "var(--font-body)" }}>{speaker.title}, {speaker.organisation}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {speaker.featured && <span className="text-[9px] px-1.5 py-0.5 bg-[#2563EB]/20 text-[#2563EB] font-medium" style={{ fontFamily: "var(--font-mono)" }}>FEATURED</span>}
            <button onClick={() => setEditing(speaker.speakerId)} className="p-1.5 text-[#6B7280] hover:text-[#2563EB] transition-colors"><ChevronRight className="w-4 h-4" /></button>
            <button onClick={() => deleteSpeaker(speaker.speakerId)} className="p-1.5 text-[#6B7280] hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Generic List Panel (Agenda, Sponsors, Universities, FAQ, Contact) ──
function AgendaPanel({ cms }: { cms: ReturnType<typeof useCmsData> }) {
  const [editing, setEditing] = useState<string | null>(null);

  const addSession = () => {
    const newSession: AgendaSession = {
      sessionId: `ses-${Date.now()}`, title: "New Session", shortDescription: "", date: "2026-08-29",
      startTime: "09:00", endTime: "10:00", format: "keynote", track: "Main Stage", stage: "Main Hall",
      speakerIds: [], featured: false, sortOrder: cms.agendaSessions.length + 1,
    };
    cms.setAgendaSessions([...cms.agendaSessions, newSession]);
    setEditing(newSession.sessionId);
  };

  const update = (id: string, patch: Partial<AgendaSession>) => {
    cms.setAgendaSessions(cms.agendaSessions.map((s) => s.sessionId === id ? { ...s, ...patch } : s));
  };

  const del = (id: string) => {
    cms.setAgendaSessions(cms.agendaSessions.filter((s) => s.sessionId !== id));
    if (editing === id) setEditing(null);
  };

  const editingItem = cms.agendaSessions.find((s) => s.sessionId === editing);

  if (editingItem) {
    return (
      <div className="space-y-6">
        <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-sm text-[#2563EB] hover:text-[#3B82F6]" style={{ fontFamily: "var(--font-display)" }}>
          <ArrowLeft className="w-4 h-4" /> Back to List
        </button>
        <SectionCard title={`Edit: ${editingItem.title}`}>
          <TextField label="Title" value={editingItem.title} onChange={(v) => update(editing!, { title: v })} />
          <TextField label="Description" value={editingItem.shortDescription} onChange={(v) => update(editing!, { shortDescription: v })} multiline />
          <div className="grid grid-cols-3 gap-3">
            <TextField label="Date" value={editingItem.date} onChange={(v) => update(editing!, { date: v })} mono />
            <TextField label="Start Time" value={editingItem.startTime} onChange={(v) => update(editing!, { startTime: v })} mono />
            <TextField label="End Time" value={editingItem.endTime} onChange={(v) => update(editing!, { endTime: v })} mono />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <SelectField label="Format" value={editingItem.format} onChange={(v) => update(editing!, { format: v })} options={[
              { value: "keynote", label: "Keynote" }, { value: "panel", label: "Panel" }, { value: "workshop", label: "Workshop" },
              { value: "fireside_chat", label: "Fireside Chat" }, { value: "hackathon_session", label: "Hackathon Session" },
            ]} />
            <TextField label="Track" value={editingItem.track} onChange={(v) => update(editing!, { track: v })} />
            <TextField label="Stage" value={editingItem.stage} onChange={(v) => update(editing!, { stage: v })} />
          </div>
          <TextField label="Sort Order" value={String(editingItem.sortOrder)} onChange={(v) => update(editing!, { sortOrder: parseInt(v) || 0 })} mono />
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>{cms.agendaSessions.length} sessions</span>
        <button onClick={addSession} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white text-xs font-medium hover:bg-[#1D4ED8] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
          <Plus className="w-3 h-3" /> Add Session
        </button>
      </div>
      {cms.agendaSessions.sort((a, b) => a.sortOrder - b.sortOrder).map((session) => (
        <div key={session.sessionId} className="bg-white/[0.02] border border-white/[0.06] p-3 sm:p-4 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F0F2F8] truncate" style={{ fontFamily: "var(--font-display)" }}>{session.title}</p>
            <p className="text-xs text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>{session.date} · {session.startTime}–{session.endTime} · {session.format}</p>
          </div>
          <button onClick={() => setEditing(session.sessionId)} className="p-1.5 text-[#6B7280] hover:text-[#2563EB] transition-colors"><ChevronRight className="w-4 h-4" /></button>
          <button onClick={() => del(session.sessionId)} className="p-1.5 text-[#6B7280] hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
    </div>
  );
}

function SponsorsPanel({ cms }: { cms: ReturnType<typeof useCmsData> }) {
  const [editing, setEditing] = useState<string | null>(null);
  const addSponsor = () => {
    const n: Sponsor = { sponsorId: `spo-${Date.now()}`, companyName: "New Sponsor", logo: "", tier: "silver", websiteUrl: "#", shortDescription: "", featured: false, displayOrder: cms.sponsors.length + 1 };
    cms.setSponsors([...cms.sponsors, n]);
    setEditing(n.sponsorId);
  };
  const update = (id: string, patch: Partial<Sponsor>) => cms.setSponsors(cms.sponsors.map((s) => s.sponsorId === id ? { ...s, ...patch } : s));
  const del = (id: string) => { cms.setSponsors(cms.sponsors.filter((s) => s.sponsorId !== id)); if (editing === id) setEditing(null); };
  const editingItem = cms.sponsors.find((s) => s.sponsorId === editing);

  if (editingItem) {
    return (
      <div className="space-y-6">
        <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-sm text-[#2563EB]"><ArrowLeft className="w-4 h-4" /> Back</button>
        <SectionCard title={`Edit: ${editingItem.companyName}`}>
          <TextField label="Company Name" value={editingItem.companyName} onChange={(v) => update(editing!, { companyName: v })} />
          <TextField label="Logo URL" value={editingItem.logo} onChange={(v) => update(editing!, { logo: v })} mono />
          <TextField label="Website URL" value={editingItem.websiteUrl} onChange={(v) => update(editing!, { websiteUrl: v })} mono />
          <TextField label="Description" value={editingItem.shortDescription} onChange={(v) => update(editing!, { shortDescription: v })} multiline />
          <SelectField label="Tier" value={editingItem.tier} onChange={(v) => update(editing!, { tier: v as Sponsor["tier"] })} options={[
            { value: "title", label: "Title Sponsor" }, { value: "platinum", label: "Platinum" }, { value: "gold", label: "Gold" },
            { value: "silver", label: "Silver" }, { value: "community_partner", label: "Community Partner" },
            { value: "university_partner", label: "University Partner" }, { value: "media_partner", label: "Media Partner" },
          ]} />
          <TextField label="Display Order" value={String(editingItem.displayOrder)} onChange={(v) => update(editing!, { displayOrder: parseInt(v) || 0 })} mono />
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>{cms.sponsors.length} sponsors</span>
        <button onClick={addSponsor} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white text-xs font-medium hover:bg-[#1D4ED8]"><Plus className="w-3 h-3" /> Add Sponsor</button>
      </div>
      {cms.sponsors.sort((a, b) => a.displayOrder - b.displayOrder).map((s) => (
        <div key={s.sponsorId} className="bg-white/[0.02] border border-white/[0.06] p-3 sm:p-4 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F0F2F8] truncate" style={{ fontFamily: "var(--font-display)" }}>{s.companyName}</p>
            <p className="text-xs text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>{s.tier}</p>
          </div>
          <button onClick={() => setEditing(s.sponsorId)} className="p-1.5 text-[#6B7280] hover:text-[#2563EB]"><ChevronRight className="w-4 h-4" /></button>
          <button onClick={() => del(s.sponsorId)} className="p-1.5 text-[#6B7280] hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
    </div>
  );
}

function UniversitiesPanel({ cms }: { cms: ReturnType<typeof useCmsData> | ReturnType<typeof useSupabaseCms> }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Check if Supabase is configured (check both cms.isConfigured and environment variables)
  const isSupabaseConfigured = 
    ("isConfigured" in cms && cms.isConfigured) || 
    !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
  
  const addUni = () => {
    const n: University = { universityId: `uni-${Date.now()}`, universityName: "New University", logo: "", category: "participating", roleDescription: "", websiteUrl: "#", city: "Kuala Lumpur", displayOrder: cms.universities.length + 1 };
    cms.setUniversities([...cms.universities, n]);
    setEditing(n.universityId);
  };
  const update = (id: string, patch: Partial<University>) => cms.setUniversities(cms.universities.map((u) => u.universityId === id ? { ...u, ...patch } : u));
  const del = (id: string) => { cms.setUniversities(cms.universities.filter((u) => u.universityId !== id)); if (editing === id) setEditing(null); };
  const editingItem = cms.universities.find((u) => u.universityId === editing);

  const handleLogoUpload = async (url: string) => {
    if (editingItem) {
      update(editing!, { logo: url });
      setUploadError(null);
      toast.success("Logo 上传成功");
    }
  };

  const handleUploadError = (error: Error) => {
    setUploadError(error.message);
    toast.error("Logo 上传失败", { description: error.message });
  };

  if (editingItem) {
    return (
      <div className="space-y-6">
        <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-sm text-[#2563EB]"><ArrowLeft className="w-4 h-4" /> Back</button>
        <SectionCard title={`Edit: ${editingItem.universityName}`}>
          <TextField label="University Name" value={editingItem.universityName} onChange={(v) => update(editing!, { universityName: v })} />
          
          {/* Logo Upload - 如果 Supabase 已配置，使用图片上传；否则显示 URL 输入框 */}
          {isSupabaseConfigured ? (
            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Logo Upload
              </label>
              <ImageUpload
                bucket="logos"
                currentUrl={editingItem.logo || undefined}
                onUploadComplete={handleLogoUpload}
                onError={handleUploadError}
                maxSizeMB={2}
                className="mb-2"
              />
              {uploadError && (
                <p className="text-xs text-red-400 mt-1">{uploadError}</p>
              )}
              {editingItem.logo && (
                <TextField 
                  label="Logo URL (可手动编辑)" 
                  value={editingItem.logo} 
                  onChange={(v) => update(editing!, { logo: v })} 
                  mono 
                  className="mt-2"
                />
              )}
            </div>
          ) : (
            <TextField label="Logo URL" value={editingItem.logo} onChange={(v) => update(editing!, { logo: v })} mono />
          )}
          
          <TextField label="Website URL" value={editingItem.websiteUrl} onChange={(v) => update(editing!, { websiteUrl: v })} mono />
          <TextField label="City" value={editingItem.city} onChange={(v) => update(editing!, { city: v })} />
          <TextField label="Role Description" value={editingItem.roleDescription} onChange={(v) => update(editing!, { roleDescription: v })} />
          <SelectField label="Category" value={editingItem.category} onChange={(v) => update(editing!, { category: v as University["category"] })} options={[
            { value: "organising", label: "Organising" }, { value: "participating", label: "Participating" }, { value: "student_club", label: "Student Club" },
          ]} />
          <TextField label="Display Order" value={String(editingItem.displayOrder)} onChange={(v) => update(editing!, { displayOrder: parseInt(v) || 0 })} mono />
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>{cms.universities.length} universities</span>
        <button onClick={addUni} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white text-xs font-medium hover:bg-[#1D4ED8]"><Plus className="w-3 h-3" /> Add University</button>
      </div>
      {cms.universities.sort((a, b) => a.displayOrder - b.displayOrder).map((u) => (
        <div key={u.universityId} className="bg-white/[0.02] border border-white/[0.06] p-3 sm:p-4 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F0F2F8] truncate" style={{ fontFamily: "var(--font-display)" }}>{u.universityName}</p>
            <p className="text-xs text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>{u.category} · {u.city}</p>
          </div>
          <button onClick={() => setEditing(u.universityId)} className="p-1.5 text-[#6B7280] hover:text-[#2563EB]"><ChevronRight className="w-4 h-4" /></button>
          <button onClick={() => del(u.universityId)} className="p-1.5 text-[#6B7280] hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
    </div>
  );
}

function FaqPanel({ cms }: { cms: ReturnType<typeof useCmsData> }) {
  const [editing, setEditing] = useState<string | null>(null);
  const addFaq = () => {
    const n: FaqItem = { faqId: `faq-${Date.now()}`, category: "general", question: "New Question?", answer: "Answer here.", sortOrder: cms.faqItems.length + 1 };
    cms.setFaqItems([...cms.faqItems, n]);
    setEditing(n.faqId);
  };
  const update = (id: string, patch: Partial<FaqItem>) => cms.setFaqItems(cms.faqItems.map((f) => f.faqId === id ? { ...f, ...patch } : f));
  const del = (id: string) => { cms.setFaqItems(cms.faqItems.filter((f) => f.faqId !== id)); if (editing === id) setEditing(null); };
  const editingItem = cms.faqItems.find((f) => f.faqId === editing);

  if (editingItem) {
    return (
      <div className="space-y-6">
        <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-sm text-[#2563EB]"><ArrowLeft className="w-4 h-4" /> Back</button>
        <SectionCard title="Edit FAQ">
          <TextField label="Question" value={editingItem.question} onChange={(v) => update(editing!, { question: v })} />
          <TextField label="Answer" value={editingItem.answer} onChange={(v) => update(editing!, { answer: v })} multiline />
          <SelectField label="Category" value={editingItem.category} onChange={(v) => update(editing!, { category: v as FaqItem["category"] })} options={[
            { value: "general", label: "General" }, { value: "registration", label: "Registration" }, { value: "hackathon", label: "Hackathon" },
            { value: "sponsorship", label: "Sponsorship" }, { value: "university", label: "University" },
          ]} />
          <TextField label="Sort Order" value={String(editingItem.sortOrder)} onChange={(v) => update(editing!, { sortOrder: parseInt(v) || 0 })} mono />
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>{cms.faqItems.length} items</span>
        <button onClick={addFaq} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white text-xs font-medium hover:bg-[#1D4ED8]"><Plus className="w-3 h-3" /> Add FAQ</button>
      </div>
      {cms.faqItems.sort((a, b) => a.sortOrder - b.sortOrder).map((f) => (
        <div key={f.faqId} className="bg-white/[0.02] border border-white/[0.06] p-3 sm:p-4 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F0F2F8] truncate" style={{ fontFamily: "var(--font-display)" }}>{f.question}</p>
            <p className="text-xs text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>{f.category}</p>
          </div>
          <button onClick={() => setEditing(f.faqId)} className="p-1.5 text-[#6B7280] hover:text-[#2563EB]"><ChevronRight className="w-4 h-4" /></button>
          <button onClick={() => del(f.faqId)} className="p-1.5 text-[#6B7280] hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
    </div>
  );
}

function ContactPanel({ cms }: { cms: ReturnType<typeof useCmsData> }) {
  const [editing, setEditing] = useState<string | null>(null);
  const addContact = () => {
    const n: ContactMethod = { contactId: `ct-${Date.now()}`, contactType: "general", label: "New Contact", description: "", ctaLabel: "Contact", email: "hello@msbc.my", displayOrder: cms.contactMethods.length + 1 };
    cms.setContactMethods([...cms.contactMethods, n]);
    setEditing(n.contactId);
  };
  const update = (id: string, patch: Partial<ContactMethod>) => cms.setContactMethods(cms.contactMethods.map((c) => c.contactId === id ? { ...c, ...patch } : c));
  const del = (id: string) => { cms.setContactMethods(cms.contactMethods.filter((c) => c.contactId !== id)); if (editing === id) setEditing(null); };
  const editingItem = cms.contactMethods.find((c) => c.contactId === editing);

  if (editingItem) {
    return (
      <div className="space-y-6">
        <button onClick={() => setEditing(null)} className="flex items-center gap-2 text-sm text-[#2563EB]"><ArrowLeft className="w-4 h-4" /> Back</button>
        <SectionCard title={`Edit: ${editingItem.label}`}>
          <TextField label="Label" value={editingItem.label} onChange={(v) => update(editing!, { label: v })} />
          <TextField label="Description" value={editingItem.description} onChange={(v) => update(editing!, { description: v })} multiline />
          <TextField label="Email" value={editingItem.email} onChange={(v) => update(editing!, { email: v })} mono />
          <TextField label="CTA Label" value={editingItem.ctaLabel} onChange={(v) => update(editing!, { ctaLabel: v })} />
          <SelectField label="Type" value={editingItem.contactType} onChange={(v) => update(editing!, { contactType: v as ContactMethod["contactType"] })} options={[
            { value: "general", label: "General" }, { value: "sponsorship", label: "Sponsorship" }, { value: "media", label: "Media" }, { value: "community", label: "Community" },
          ]} />
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>{cms.contactMethods.length} contacts</span>
        <button onClick={addContact} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white text-xs font-medium hover:bg-[#1D4ED8]"><Plus className="w-3 h-3" /> Add Contact</button>
      </div>
      {cms.contactMethods.sort((a, b) => a.displayOrder - b.displayOrder).map((c) => (
        <div key={c.contactId} className="bg-white/[0.02] border border-white/[0.06] p-3 sm:p-4 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F0F2F8] truncate" style={{ fontFamily: "var(--font-display)" }}>{c.label}</p>
            <p className="text-xs text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>{c.email}</p>
          </div>
          <button onClick={() => setEditing(c.contactId)} className="p-1.5 text-[#6B7280] hover:text-[#2563EB]"><ChevronRight className="w-4 h-4" /></button>
          <button onClick={() => del(c.contactId)} className="p-1.5 text-[#6B7280] hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
    </div>
  );
}

function HackathonPanel({ cms }: { cms: ReturnType<typeof useCmsData> }) {
  const h = cms.hackathonContent;
  const update = (patch: Partial<typeof h>) => cms.setHackathonContent({ ...h, ...patch });
  return (
    <div className="space-y-6">
      <SectionCard title="Hero">
        <TextField label="Headline" value={h.heroHeadline} onChange={(v) => update({ heroHeadline: v })} />
        <TextField label="Supporting Copy" value={h.heroSupportingCopy} onChange={(v) => update({ heroSupportingCopy: v })} multiline />
        <TextField label="CTA Label" value={h.heroPrimaryCta.label} onChange={(v) => update({ heroPrimaryCta: { ...h.heroPrimaryCta, label: v } })} />
        <TextField label="CTA URL" value={h.heroPrimaryCta.url} onChange={(v) => update({ heroPrimaryCta: { ...h.heroPrimaryCta, url: v } })} mono />
      </SectionCard>
      <SectionCard title="Why Join">
        <TextField label="Title" value={h.whyJoin.title} onChange={(v) => update({ whyJoin: { ...h.whyJoin, title: v } })} />
        <TextField label="Body Copy" value={h.whyJoin.bodyCopy} onChange={(v) => update({ whyJoin: { ...h.whyJoin, bodyCopy: v } })} multiline />
      </SectionCard>
      <SectionCard title="Final CTA">
        <TextField label="Title" value={h.finalCta.title} onChange={(v) => update({ finalCta: { ...h.finalCta, title: v } })} />
        <TextField label="Body Copy" value={h.finalCta.bodyCopy} onChange={(v) => update({ finalCta: { ...h.finalCta, bodyCopy: v } })} multiline />
        <TextField label="CTA Label" value={h.finalCta.ctaLabel} onChange={(v) => update({ finalCta: { ...h.finalCta, ctaLabel: v } })} />
        <TextField label="CTA URL" value={h.finalCta.ctaUrl} onChange={(v) => update({ finalCta: { ...h.finalCta, ctaUrl: v } })} mono />
      </SectionCard>
    </div>
  );
}

function TicketsPanel({ cms }: { cms: ReturnType<typeof useCmsData> }) {
  const t = cms.ticketsContent;
  const update = (patch: Partial<typeof t>) => cms.setTicketsContent({ ...t, ...patch });
  return (
    <div className="space-y-6">
      <SectionCard title="Page Content">
        <TextField label="Headline" value={t.heroHeadline} onChange={(v) => update({ heroHeadline: v })} />
        <TextField label="Supporting Copy" value={t.heroSupportingCopy} onChange={(v) => update({ heroSupportingCopy: v })} multiline />
        <TextField label="Registration URL" value={t.primaryRegistrationUrl} onChange={(v) => update({ primaryRegistrationUrl: v })} mono />
      </SectionCard>
      <SectionCard title="Ticket Types">
        {t.ticketTypes.map((ticket, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/[0.06] p-3 space-y-3">
            <TextField label={`Ticket ${i + 1} Name`} value={ticket.name} onChange={(v) => {
              const updated = [...t.ticketTypes]; updated[i] = { ...ticket, name: v }; update({ ticketTypes: updated });
            }} />
            <TextField label="Price" value={ticket.price} onChange={(v) => {
              const updated = [...t.ticketTypes]; updated[i] = { ...ticket, price: v }; update({ ticketTypes: updated });
            }} />
            <TextField label="Description" value={ticket.description} onChange={(v) => {
              const updated = [...t.ticketTypes]; updated[i] = { ...ticket, description: v }; update({ ticketTypes: updated });
            }} multiline />
            <TextField label="CTA URL" value={ticket.ctaUrl} onChange={(v) => {
              const updated = [...t.ticketTypes]; updated[i] = { ...ticket, ctaUrl: v }; update({ ticketTypes: updated });
            }} mono />
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

// ─── Main Admin Component ─────────────────────────────────────
export default function Admin() {
  const simpleAuth = useAdminAuth();
  const supabaseAuth = useSupabaseAuth();
  const cms = useCmsData();
  const supabaseCms = useSupabaseCms();
  const [activePanel, setActivePanel] = useState("site");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use Supabase if configured, otherwise fall back to localStorage
  const useSupabase = supabaseCms.isConfigured;
  const activeCms = useSupabase ? supabaseCms : cms;
  
  // Use Supabase Auth if configured, otherwise use simple password auth
  const useSupabaseAuthForLogin = supabaseAuth.isConfigured;
  const isAuthenticated = useSupabaseAuthForLogin ? supabaseAuth.isAuthenticated : simpleAuth.isAuthenticated;
  const isLoadingAuth = useSupabaseAuthForLogin ? supabaseAuth.isLoading : false;

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#07090F] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#6B7280]" style={{ fontFamily: "var(--font-body)" }}>检查登录状态...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen 
        onLogin={simpleAuth.login} 
        onSupabaseLogin={useSupabaseAuthForLogin ? supabaseAuth.login : undefined}
        supabaseAuthAvailable={useSupabaseAuthForLogin}
      />
    );
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = cms.importData(ev.target?.result as string);
      if (result) {
        toast.success("数据导入成功");
      } else {
        toast.error("数据导入失败", {
          description: "请检查文件格式是否正确",
        });
      }
    };
    reader.readAsText(file);
  };

  const renderPanel = () => {
    switch (activePanel) {
      case "site": return <SiteSettingsPanel cms={cms} />;
      case "event": return <EventEditionPanel cms={cms} />;
      case "homepage": return <HomepageContentPanel cms={cms} />;
      case "speakers": return <SpeakersPanel cms={activeCms} />;
      case "agenda": return <AgendaPanel cms={cms} />;
      case "sponsors": return <SponsorsPanel cms={cms} />;
      case "universities": return <UniversitiesPanel cms={cms} />;
      case "faq": return <FaqPanel cms={cms} />;
      case "contact": return <ContactPanel cms={cms} />;
      case "hackathon": return <HackathonPanel cms={cms} />;
      case "tickets": return <TicketsPanel cms={cms} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090F] text-[#F0F2F8] flex">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/[0.06] border border-white/[0.08] text-white"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0A0D16] border-r border-white/[0.06] flex flex-col transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>MSBC</span>
            <span className="text-[9px] font-medium tracking-wider text-[#2563EB] border border-[#2563EB]/30 px-1.5 py-0.5" style={{ fontFamily: "var(--font-mono)" }}>ADMIN</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActivePanel(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                activePanel === item.id
                  ? "bg-[#2563EB]/10 text-[#2563EB] border-l-2 border-[#2563EB]"
                  : "text-[#9CA3AF] hover:text-white hover:bg-white/[0.03]"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/[0.06] space-y-1.5">
          <Link href="/2026" className="flex items-center gap-2 px-3 py-2 text-xs text-[#6B7280] hover:text-[#2563EB] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
            <Eye className="w-3.5 h-3.5" /> View Website
          </Link>
          <button onClick={() => {
            cms.exportData();
            toast.success("数据导出成功");
          }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#6B7280] hover:text-[#2563EB] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
            <Download className="w-3.5 h-3.5" /> Export Data
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#6B7280] hover:text-[#2563EB] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
            <Upload className="w-3.5 h-3.5" /> Import Data
          </button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          <button onClick={() => { 
            if (confirm("确定要重置所有数据为默认值吗？此操作不可撤销。")) {
              cms.resetAll();
              toast.success("数据已重置为默认值");
            }
          }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#6B7280] hover:text-orange-400 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
            <RotateCcw className="w-3.5 h-3.5" /> Reset to Defaults
          </button>
                 <button onClick={() => {
                   if (useSupabaseAuthForLogin) {
                     supabaseAuth.logout();
                   } else {
                     simpleAuth.logout();
                   }
                 }} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#6B7280] hover:text-red-400 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                   <LogOut className="w-3.5 h-3.5" /> Sign Out
                 </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-[#07090F]/90 backdrop-blur-sm border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-bold text-[#F0F2F8] pl-10 lg:pl-0" style={{ fontFamily: "var(--font-display)" }}>
              {navItems.find((n) => n.id === activePanel)?.label}
            </h1>
            <div className="flex items-center gap-4">
              {/* 临时禁用 Supabase 状态显示 */}
              <div className="flex items-center gap-2 text-[11px] text-[#8b99b5] hidden sm:flex" style={{ fontFamily: "var(--font-mono)" }}>
                <AlertCircle className="w-3.5 h-3.5" />
                Using Local Storage
              </div>
              <p className="text-[11px] text-[#4B5563] hidden sm:block" style={{ fontFamily: "var(--font-mono)" }}>
                Changes save automatically
              </p>
            </div>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
          {renderPanel()}
        </div>
      </main>
    </div>
  );
}
